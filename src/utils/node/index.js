const puppeteer = require('puppeteer')
process.stdin.setEncoding('utf8')
const regex = /start (.+)$/;
process.stdin.on('data', async (data) =>{
    data = data.trim()
    
    let result = data.match(regex)
    if(result){
        try {
            const browser = await puppeteer.launch({
                headless: "new"
            })
            const page = await browser.newPage()
            await page.goto(result[1].trim())

            try {
                await page.waitForSelector('video[src*="scontent.cdninstagram"]', {timeout: 5000})
                const enlacev = await page.$eval('video[src*="scontent.cdninstagram"]', video => video.src)
                console.log(enlacev);
            } catch (_) {
                await page.waitForSelector('img[src*="scontent.cdninstagram"]')
                const enlace = await page.$eval('img[src*="scontent.cdninstagram"]', img => img.src)
                console.log(enlace);
            }
            finally{
                await browser.close()
            }
        } catch (error) {
            console.log(`error ${error}`)
        }
    }
})