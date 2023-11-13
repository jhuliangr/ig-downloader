use tokio::fs::File;
use tokio::io::AsyncWriteExt;
use reqwest;

pub struct DownloadReel{}

impl DownloadReel{
    pub async fn download(url: &str) -> Result<String,Box<dyn std::error::Error>> {

        let response = reqwest::get(url)
            .await?;
        if !response.status().is_success() {
            return Err("Error de URL".into());
        }
        let mut file = File::create("./output/reel.mp4")
            .await?;
        let response_body = response.bytes()
            .await?;
        file.write_all(&response_body)
            .await?;
        Ok("Success".to_string())
    }
}