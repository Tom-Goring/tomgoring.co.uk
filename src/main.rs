#[macro_use]
extern crate log;

use actix_web::{web, App, HttpRequest, HttpServer, Responder};
use listenfd::ListenFd;
use dotenv::dotenv;
use std::env;
use sqlx::PgPool;
use anyhow::Result;

mod todo;

async fn index(_req: HttpRequest) -> impl Responder {
    "Hello!"
}

#[actix_rt::main]
async fn main() -> Result<()> {
    dotenv().ok();

    let mut listenfd = ListenFd::from_env();

    let database_url = "postgresql://postgres:docker@localhost/app";
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
    let db_pool = PgPool::new(&database_url).await?;

    let mut server = HttpServer::new(move || {
        App::new()
            .data(db_pool.clone())
            .route("/", web::get().to(index))
            .configure(todo::init)
    });

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l)?
    } else {
        server.bind("127.0.0.1:3000")?
    };

    info!("Starting server");
    server.run().await?;

    Ok(())
}
