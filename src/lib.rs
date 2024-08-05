// This imports all the necessary items from the wasm-bindgen crate.
// The prelude module is a convenience module that brings in everything
// you need to start using wasm-bindgen easily.

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn parse_terms(terms: &str) -> String {
    format!("the hell is here {} ", terms)
}

pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
