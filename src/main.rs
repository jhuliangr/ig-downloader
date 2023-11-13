use std::io;
// use std::process::{Command, Stdio};
// use utils::DownloadPic;
use utils::PipeToNode;
mod utils;

#[tokio::main]
async fn main() {
    let mut user_input = String::new();
    
    println!("Text the link of the publication you want to download");
    io::stdin().read_line(&mut user_input).expect("Failed to read client's message");

    PipeToNode::pipe_to_node(&user_input).await;
    
}
// https://instagram.com/p/CuVige9p0n-

//hacer features para que pueda descargar videos

// async fn pipe_to_node(user_input: &str) -> (){
//     let mut node_process = Command::new("node")
//         .arg("src/utils/node/index")
//         .stdin(Stdio::piped())
//         .stdout(Stdio::piped())
//         .spawn()
//         .expect("It was'nt possible to excecute the NODE JS program");

//         if let Some(mut stdin) = node_process.stdin.take(){
//             writeln!(stdin, "start {}", user_input.trim()).expect("Error on writing to the NODE JS app");
//         }
//         else {
//             println!("It was'nt possible to write on the NODE JS app")
//         }
    
//         if let Some(mut stdout) = node_process.stdout.take(){
//             let mut buffer = String::new();
//             stdout.read_to_string(&mut buffer).expect("Error on reading the output of the NODE JS app");
//             println!("Recibido: {}", buffer.trim());
//             let pic = buffer.trim();
    
//             match DownloadPic::download(pic).await {
//                 Ok(text) => println!("{}", text),
//                 Err(text) => println!("Error: {}", text),
//             }
//         }
//         else {
//             println!("It was'nt possible to read from the NODE JS app")
//         }    
//         node_process.kill().expect("The NODE JS app process could'nt be terminated");
// }