const express = require('express');
const article = require('./articles/article');
const mysql = require('./mysql');

const app = express();
app.get("/", (req, res) => {
    res.send("Hello World")
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
})

app.get('/goc-nhin', (req, res) => {
    mysql.getRecord();
    res.send('Article fetch date successfully...');
});


