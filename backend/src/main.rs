use actix_web::{web, App, HttpServer};
use t_c_ai::analyze_terms;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/analyze", web::post().to(analyze_terms))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
