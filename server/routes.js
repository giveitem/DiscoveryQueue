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
    switch (req.query.attr) {
        case "valence":
            if (req.query.endpoint == "high") {
                var highQuery = "SELECT name, id FROM Tracks WHERE valence > 0.8 AND valence < 0.9 ORDER BY RAND() LIMIT 1;";
                connection.query(highQuery, function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    }
                    else if (results) {
                        res.json({ results: results })
                    }
                });
            } else {
                var lowQuery = "SELECT name, id FROM Tracks WHERE valence > 0.1 AND valence < 0.2 ORDER BY RAND() LIMIT 1;";
                connection.query(lowQuery, function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    }
                    else if (results) {
                        res.json({ results: results })
                    }
                });
            }
            break;
        case "danceability":
            if (req.query.endpoint == "high") {
                var highQuery = "SELECT name, id FROM Tracks WHERE danceability > 0.8 AND danceability < 0.9 ORDER BY RAND() LIMIT 1;";
                connection.query(highQuery, function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    }
                    else if (results) {
                        res.json({ results: results })
                    }
                });
            } else {
                var lowQuery = "SELECT name, id FROM Tracks WHERE danceability > 0.2 AND danceability < 0.4 ORDER BY RAND() LIMIT 1;";
                connection.query(lowQuery, function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    }
                    else if (results) {
                        res.json({ results: results })
                    }
                });
            }
            break;
        case "energy":
            if (req.query.endpoint == "high") {
                var highQuery = "SELECT name, id FROM Tracks WHERE energy > 0.8 AND energy < 0.9 ORDER BY RAND() LIMIT 1;";
                connection.query(highQuery, function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    }
                    else if (results) {
                        res.json({ results: results })
                    }
                });
            } else {
                var lowQuery = "SELECT name, id FROM Tracks WHERE energy > 0.2 AND energy < 0.4 ORDER BY RAND() LIMIT 1;";
                connection.query(lowQuery, function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    }
                    else if (results) {
                        res.json({ results: results })
                    }
                });
            }
            break;

        case "acousticness":
            if (req.query.endpoint == "high") {
                var highQuery = "SELECT name, id FROM Tracks WHERE acousticness > 0.88 AND acousticness < 0.98 ORDER BY RAND() LIMIT 1;";
                connection.query(highQuery, function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    }
                    else if (results) {
                        res.json({ results: results })
                    }
                });
            } else {
                var lowQuery = "SELECT name, id FROM Tracks WHERE acousticness > 0.14 AND acousticness < 0.2 ORDER BY RAND() LIMIT 1;";
                connection.query(lowQuery, function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    }
                    else if (results) {
                        res.json({ results: results })
                    }
                });
            }
            break;
        case "tempo":
            if (req.query.endpoint == "high") {
                var highQuery = "SELECT name, id FROM Tracks WHERE tempo > 150 AND tempo < 170 ORDER BY RAND() LIMIT 1;";
                connection.query(highQuery, function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    }
                    else if (results) {
                        res.json({ results: results })
                    }
                });
            } else {
                var lowQuery = "SELECT name, id FROM Tracks WHERE  tempo > 83 AND tempo < 89 ORDER BY RAND() LIMIT 1;";
                connection.query(lowQuery, function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    }
                    else if (results) {
                        res.json({ results: results })
                    }
                });
            }
            break;

        default:
            break;
    }

}


module.exports = {
    hello,
    random,
    search
}