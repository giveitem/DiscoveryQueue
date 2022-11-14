const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');


const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello
    connection.query(`SELECT Name, Id FROM Tracks where danceability >0.32 and danceability < 0.33 LIMIT 10`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });

}


async function search(req, res) {
    let base = "SELECT name, id FROM Tracks WHERE name LIKE '%" + req.query.name + "%'";
    let page = req.query.page ? req.query.page : 1;
    let pagesize = req.query.pagesize ? req.query.pagesize : 10;
    let offset = (page - 1) * pagesize;
    let limit = " LIMIT " + pagesize + " OFFSET " + offset;
    let query = base + limit;
    console.log(query);
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function random(req, res) {

}


module.exports = {
    hello,
    search
}