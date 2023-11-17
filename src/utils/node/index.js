const puppeteer = require('puppeteer')
process.stdin.setEncoding('utf8')
const fs = require('fs')
const regexstart = /start (.+)$/;
const regexget = /get (.+)$/;
process.stdin.on('data', async (data) =>{
    data = data.trim()
    let result = data.match(regexget)
    if (result){
        try {
            const browser = await puppeteer.launch({
                headless: "new"
            })
            const page = await browser.newPage()
            await page.goto(result[1].trim())
            try {
                
                setTimeout(async () =>{
                }, 10000)
                await page.waitForSelector('div[class="_ac7v  _al3n"]', {timeout: 30000})
                const enlacev = await page.$$eval('a',  a => {
                    return a.map(href => href.href);
                })
                const posprocessing = enlacev.filter(a => a.includes('/p/'))
                const final = posprocessing.filter(a => !a.includes(result[1].trim()))
                console.log(final);
                const html = await page.content()
                fs.writeFileSync('html.html', html)
            } catch (err) {
                console.log('ERROR: ', err);
            }
            finally{
                await browser.close()
            }
        } catch (error) {
            console.log(`error ${error}`)
        }
    }
    result = data.match(regexstart)
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