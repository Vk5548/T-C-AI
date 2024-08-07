use actix_web::{web, get , post, App, HttpServer, HttpResponse, Responder};
use serde::Deserialize;
use serde_json::json;

#[derive(Deserialize)]
struct TermsData {
    terms: String,
}

async fn analyze_terms(terms: web::Json<TermsData>) -> impl Responder {
    //    for now just checking the functionality so just eching back the same data
    HttpResponse::Ok().json(json!({
        "summary": "This is a summary of the terms",
        "flags": ["skeptical point 1", "beneficial point 1"]
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/analyze", web::post().to(analyze_terms)))
        .bind("127.0.0.1:8080")?
        .run()
        .await
}
