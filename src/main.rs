use utils::PipeToNode;
use std::io::stdin;
mod utils;

#[tokio::main]
async fn main() {
    let mut user_input = String::new();
    
    println!("Text the link of the publication you want to download");
    stdin().read_line(&mut user_input).expect("Failed to read client's message");

    PipeToNode::pipe_to_node(&user_input).await;
    
}