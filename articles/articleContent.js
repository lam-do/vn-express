const puppeteer = require('puppeteer');

async function getContentFromArticleLink(link) {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(link, { waitUntil: 'load', timeout: 0 });
            let contents = await page.evaluate(() => {
                const title = document.querySelector('.title_gn_detail').innerHTML;
                const authorName = document.querySelector('.avata_box_author strong').innerHTML;
                const getTime = document.querySelector('.time').innerHTML;
                const processDate = getTime.split(',')[1].trim().split('/');
                const processTime = getTime.split(',')[2].trim().split(' ')[0];
                const time = processDate[2] + '-' + processDate[1] + '-' + processDate[0]  + ' ' + processTime;
                const sectionContents = Array.from(document.querySelectorAll('.fck_detail p.Normal'));
                const getContent = sectionContents.map(content => content.innerHTML);
                let content = '';
                for (let i in getContent) {
                    content += getContent[i];
                }
                return { title, authorName, time, content };
            })
            browser.close();
            return resolve(contents);
        } catch (e) {
            return reject(e);
        }
    })
}

async function objectToString(object) {
    let result = '';
    for (let i in object) {
        result += object[i];
    }
    return result;
}

module.exports = getContentFromArticleLink;