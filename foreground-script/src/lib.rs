use gloo_console as console;
use gloo_utils::format::JsValueSerdeExt;
use gloo_utils::{body, document};
use wasm_bindgen::{prelude::*, JsCast};
use web_extensions_sys::{chrome, Port};
use gloo_net::http::Request; // Added for sending http requests

#[wasm_bindgen]
pub fn start() {
    console::info!("Start foreground script");
    render_container();
    let port = connect();

    // Static terms data to be sent to the backend for AI-processing
    let terms = "Some example terms and conditions to analyze";

    // Sending terms to backend using an async function
    wasm_bindgen_futures::spawn_local(async move{
        send_terms_to_backend(terms).await;
    });
    


    let on_message = |msg: JsValue| {
        console::info!("Received message:", msg);
    };
    let closure: Closure<dyn Fn(JsValue)> = Closure::new(on_message);
    let callback = closure.as_ref().unchecked_ref();
    port.on_message().add_listener(callback);
    closure.forget();


    let payload = messages::PortRequestPayload::Ping;
    let msg = JsValue::from_serde(&messages::Request::new(payload)).unwrap();
    port.post_message(&msg);

    let payload = messages::PortRequestPayload::StartStreaming { num_items: 5 };
    let msg = JsValue::from_serde(&messages::Request::new(payload)).unwrap();
    port.post_message(&msg);
}

async fn send_terms_to_backend(terms : &str){
    let backend_url = "http://127.0.0.1:8080/analyze"; // backend server url
    let body = serde_json::json!({
        "terms": terms
    });

    //sending request and getting Response
    // let resp = Request::post(backend_url)
    //             .header("Content-type", "application/json")
    //             .body(JsValue::from_serde(&body).unwrap())
    //             .send()
    //             .await;

    let resp_result = Request::post(backend_url)
                .header("Content-Type", "application/json")
                .body(JsValue::from_serde(&body).unwrap());
                
    if let Ok(req) = resp_result {
        let resp = req.send().await; //Sending the request asynchronously

        match resp {
            Ok(response) => {
                let data = response.text().await.unwrap();
                console::info!("Backend Response : ", data);
            },
            Err(err) => {
                console::error!("Failed to send the data to the backend : ", err.to_string());
            }
        }
    } else {
        console::error!("Failed to create the request");
    }
                

    
}

fn render_container() {
    let container = document().create_element("div").unwrap();
    container
        .class_list()
        .add_1("wea-example-container")
        .unwrap();

    let title = document().create_element("h2").unwrap();
    title.set_inner_html("Example Web Extension Foreground");

    let data = document().create_element("div").unwrap();
    data.set_inner_html("Hello from foreground script");

    container.append_child(&title).unwrap();
    container.append_child(&data).unwrap();
    body().append_child(&container).unwrap();
}

fn connect() -> Port {
    let connect_info = JsValue::null();
    chrome().runtime().connect(None, connect_info.as_ref().unchecked_ref())
}
