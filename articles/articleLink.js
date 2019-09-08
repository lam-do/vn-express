const puppeteer = require('puppeteer');

async function getArticlesLinkFromPage(url) {
    const browser = await puppeteer.launch();
    console.log('Browser openned');
    const page = await browser.newPage();
    await page.goto(url);
    console.log('Page loaded');

    const articlesLinkArr = await page.evaluate(() => {
        const mostInterested = Array.from(document.querySelectorAll('.box_banquantam > article h2 a'));
        const articlesLink = mostInterested.map(article => article.getAttribute('href'));
        return articlesLink;
    })

    await browser.close();

    return articlesLinkArr;
}

module.exports = getArticlesLinkFromPage;