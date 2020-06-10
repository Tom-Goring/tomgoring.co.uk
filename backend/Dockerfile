FROM ekidd/rust-musl-builder as build

RUN user=rust USER=rust cargo new todo-app
WORKDIR todo-app
ADD --chown=rust Cargo.toml Cargo.lock ./
RUN cargo build --release
RUN rm src/*.rs

COPY ./src ./src

RUN find . -type f -name '*todo*' -delete
RUN cargo build --release

RUN cp target/x86_64-unknown-linux-musl/release/todo-app /home/rust/

FROM scratch
COPY --from=build /home/rust/todo-app /usr/local/bin/
USER 1000
CMD ["/usr/local/bin/todo-app"]
