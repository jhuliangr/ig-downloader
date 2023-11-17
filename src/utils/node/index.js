
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