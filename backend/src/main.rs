use actix_web::{web, App, HttpServer, Responder};
use serde::Deserialize;

#[derive(Deserialize)]
struct TermsData {
    terms: String,
}

async fn analyze_terms(terms: web::Json<TermsData>) -> impl Responder {
    //    for now just checking the functionality so just eching back the same data
    format!("Received terms : {}", terms.terms)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/analyze", web::post().to(analyze_terms)))
        .bind("127.0.0.1:8080")?
        .run()
        .await
}
