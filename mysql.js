const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'vn_express',
    port: 13306
});

connection.connect((err) => {
    if (!err) {
        console.log('DB connection successfully!');
    } else {
        console.log('DB connection fail \n Error: ' + JSON.stringify(err));
    }
});

function createTable(params) {
    let query = 'CREATE TABLE articles (id int not null AUTO_INCREMENT, title varchar(255), author_name varchar(50), time timestamp, body text, PRIMARY KEY (id))';
    connection.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
    });
}

function insertRecord(title, authorName, time, body) {
    let query = `INSERT INTO articles (title, author_name, time, body) VALUES ('${title}', '${authorName}', '${time}', '${body}')`;
    connection.query(query, (err, result) => {
        if (err) {
            throw err;
        }
    });
}

function getRecord(params) {
    const query = 'SELECT * FROM articles';
    connection.query(query, (err, result) => {
        if (err) {
            throw err;
        }
       console.log(result);
    });
}

module.exports = {insertRecord, getRecord};