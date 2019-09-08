const getLink = require('./articleLink');
const getContent = require('./articleContent');
const mysql = require('../mysql');

async function article() {
    const url = 'https://vnexpress.net/goc-nhin';
    const articlesLink = await getLink(url);
    articlesLink.forEach(async (link) => {
        const contents = await getContent(link);
        mysql.insertRecord(contents.title, contents.authorName, contents.time, contents.content);
    });
}

module.exports = article;