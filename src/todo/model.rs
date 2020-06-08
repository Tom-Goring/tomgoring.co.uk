use serde::{Serialize, Deserialize};
use actix_web::{HttpResponse, HttpRequest, Responder, Error};
use futures::future::{ready, Ready};
use sqlx::{PgPool, FromRow, Row};
use sqlx::postgres::PgRow;
use anyhow::Result;

#[derive(Serialize, Deserialize)]
pub struct TodoRequest {
    pub description: String,
    pub done: i32,
}

#[derive(Serialize, Deserialize)]
pub struct Todo {
    pub id: i32,
    pub description: String,
    pub done: i32,
}

impl Responder for Todo {
    type Error = Error;
    type Future = Ready<Result<HttpResponse, Error>>;

    fn respond_to(self, _req: &HttpRequest) -> Self::Future {
        let body = serde_json::to_string(&self).unwrap();

        ready(Ok(HttpResponse::Ok()
            .content_type("application/json")
            .body(body)))
    }
}

impl Todo {
    pub async fn create(todo: TodoRequest, pool: &PgPool) -> Result<Todo> {
        println!("Creating new todo");
        let mut tx = pool.begin().await?;
        let todo = sqlx::query(
            "INSERT INTO todos (description, done) VALUES ($1, $2) RETURNING id, description, done",
        )
        .bind(&todo.description)
        .bind(todo.done)
        .map(|row: PgRow| Todo {
            id: row.get(0),
            description: row.get(1),
            done: row.get(2),
        })
        .fetch_one(&mut tx)
        .await?;

        tx.commit().await?;
        Ok(todo)
    }

    pub async fn find_by_id(id: i32, pool: &PgPool) -> Result<Todo> {
        let rec = sqlx::query!(
            r#"
                SELECT * FROM todos WHERE id = $1
            "#,
            id
        )
        .fetch_one(&*pool)
        .await?;

        Ok(Todo {
            id: rec.id,
            description: rec.description,
            done: rec.done,
        })
    }
}
