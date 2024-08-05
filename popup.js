import init, { parse_terms } from './pkg/t_c_ai.js';

async function run() {
    await init(); // Initializing the webAssembly module
    const result = parse_terms("These terms and conditions are skeptical to say the least");
    console.log(result); //output the result to the console
    document.getElementById("output").textContent = result;

}

run();