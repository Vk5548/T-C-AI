use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};


// Struct to represent the incoming request data
#[derive(Deserialize)]
pub struct TermsData {
    pub terms: String,
}

// Struct to represent the response data
#[derive(Serialize)]
pub struct AnalysisResult {
    pub summary: String,
    pub flags: Vec<String>,
}

// Core function to handle the analysis
pub async fn analyze_terms(terms: web::Json<TermsData>) -> HttpResponse {
    // Here you would integrate with Meta's LLaMA 3.1 model for actual AI processing
    let summary = "This is a summary of the terms"; // Example summary
    let flags = vec!["skeptical point 1".to_string(), "beneficial point 1".to_string()]; // Example flags

    let result = AnalysisResult { summary: summary.to_string(), flags };

    HttpResponse::Ok().json(result)
}
