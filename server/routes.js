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
    console.log(req.query)
    let query = "";
    if (req.query.songName && !req.query.artistName) {
        query += "WITH tracks_alb (track_name, alb_id, track_id) as (SELECT name, album_id, id from tracks),     tracks_alb_art_id (track_name, t_id, art_id, al_name, al_date) as (SELECT tracks_alb.track_name, tracks_alb.track_id, artist_id, albums.name, albums.release_date  from tracks_alb join albums on tracks_alb.alb_id = albums.id),     tracks_alb_art_na (track_name, t_id, gen_id, al_name, al_date) as (SELECT tracks_alb_art_id.track_name, tracks_alb_art_id.t_id, artists.name, tracks_alb_art_id.al_name, tracks_alb_art_id.al_date from tracks_alb_art_id join artists on tracks_alb_art_id.art_id = artists.id)  select track_name as name, gen_id as artists_name, t_id, al_name as album, al_date as date from tracks_alb_art_na where track_name like '%" + req.query.songName + "%';"
    } else if (!req.query.songName && req.query.artistName) {
        query += "WITH tracks_alb (track_name, alb_id, track_id) as (SELECT name, album_id, id from tracks),     tracks_alb_art_id (track_name, t_id, art_id, al_name, al_date) as (SELECT tracks_alb.track_name, tracks_alb.track_id, artist_id, albums.name, albums.release_date  from tracks_alb join albums on tracks_alb.alb_id = albums.id),     tracks_alb_art_na (track_name, t_id, gen_id, al_name, al_date) as (SELECT tracks_alb_art_id.track_name, tracks_alb_art_id.t_id, artists.name, tracks_alb_art_id.al_name, tracks_alb_art_id.al_date from tracks_alb_art_id join artists on tracks_alb_art_id.art_id = artists.id)  select track_name as name, gen_id as artists_name, t_id, al_name as album, al_date as date from tracks_alb_art_na where gen_id like '%" + req.query.artistName + "%';"
        // query += "WITH artist_ids (track_id, art_id, art_name) as         (SELECT track_id, id,name from artists WHERE name LIKE '%" + req.query.artistName + "%')  SELECT tracks.name as name, artist_ids.art_name as artists_name from artist_ids join tracks on artist_ids.track_id = tracks.id;";
    } else if (req.query.songName && req.query.artistName) {
        query += "WITH tracks_alb (track_name, alb_id, track_id) as (SELECT name, album_id, id from tracks),     tracks_alb_art_id (track_name, t_id, art_id, al_name, al_date) as (SELECT tracks_alb.track_name, tracks_alb.track_id, artist_id, albums.name, albums.release_date  from tracks_alb join albums on tracks_alb.alb_id = albums.id),     tracks_alb_art_na (track_name, t_id, gen_id, al_name, al_date) as (SELECT tracks_alb_art_id.track_name, tracks_alb_art_id.t_id, artists.name, tracks_alb_art_id.al_name, tracks_alb_art_id.al_date from tracks_alb_art_id join artists on tracks_alb_art_id.art_id = artists.id)  select track_name as name, gen_id as artists_name, t_id, al_name as album, al_date as date from tracks_alb_art_na where gen_id like '%" + req.query.artistName + "%' and track_name like '%" + req.query.songName + "%';"
        // query += "WITH artist_ids (track_id, art_id, art_name) as         (SELECT track_id, id,name from artists WHERE name LIKE '%" + req.query.artistName + "%')  SELECT tracks.name as name, artist_ids.art_name as artists_name from artist_ids join tracks on artist_ids.track_id = tracks.id WHERE tracks.name LIKE '%" + req.query.songName + "%';";
    }
    // let base = "SELECT name, id,artists_id FROM Tracks WHERE name LIKE '%" + req.query.name + "%';";
    // let page = req.query.page ? req.query.page : 1;
    // let pagesize = req.query.pagesize ? req.query.pagesize : 10;
    // let offset = (page - 1) * pagesize;
    // let limit = " LIMIT " + pagesize + " OFFSET " + offset;

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
                var highQuery = "SELECT name, id, preview_url FROM Tracks WHERE valence > 0.8 AND valence < 0.9 ORDER BY RAND() LIMIT 1;";
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
                var lowQuery = "SELECT name, id, preview_url FROM Tracks WHERE valence > 0.1 AND valence < 0.2 ORDER BY RAND() LIMIT 1;";
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
                var highQuery = "SELECT name, id, preview_url FROM Tracks WHERE danceability > 0.8 AND danceability < 0.9 ORDER BY RAND() LIMIT 1;";
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
                var lowQuery = "SELECT name, id, preview_url FROM Tracks WHERE danceability > 0.2 AND danceability < 0.4 ORDER BY RAND() LIMIT 1;";
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
                var highQuery = "SELECT name, id, preview_url FROM Tracks WHERE energy > 0.8 AND energy < 0.9 ORDER BY RAND() LIMIT 1;";
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
                var lowQuery = "SELECT name, id, preview_url FROM Tracks WHERE energy > 0.2 AND energy < 0.4 ORDER BY RAND() LIMIT 1;";
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
                var highQuery = "SELECT name, id, preview_url FROM Tracks WHERE acousticness > 0.88 AND acousticness < 0.98 ORDER BY RAND() LIMIT 1;";
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
                var lowQuery = "SELECT name, id, preview_url FROM Tracks WHERE acousticness > 0.14 AND acousticness < 0.2 ORDER BY RAND() LIMIT 1;";
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
                var highQuery = "SELECT name, id, preview_url FROM Tracks WHERE tempo > 150 AND tempo < 170 ORDER BY RAND() LIMIT 1;";
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
                var lowQuery = "SELECT name, id, preview_url FROM Tracks WHERE  tempo > 83 AND tempo < 89 ORDER BY RAND() LIMIT 1;";
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
async function sendRandom(req, res) {
    var base = "SELECT name, id,preview_url FROM Tracks WHERE ";

    //valence
    if (req.query.valence == "high") {
        base += "valence > 0.7 AND valence < 0.95 AND ";
    } else {
        base += "valence > 0.15 AND valence < 0.32 AND ";
    }
    //danceability
    if (req.query.danceability == "high") {
        base += "danceability > 0.7 AND danceability < 0.95 AND ";
    } else {
        base += "danceability > 0.3 AND danceability < 0.5 AND ";
    }
    //energy
    if (req.query.energy == "high") {
        base += "energy > 0.83 AND energy < 0.95 AND ";

    } else {
        base += "energy > 0.2 AND energy < 0.4 AND ";
    }
    //acousticness
    if (req.query.acousticness == "high") {
        base += "acousticness > 0.7 AND acousticness < 0.9 AND ";
    } else {
        base += "acousticness > 0.2 AND acousticness < 0.4 AND ";
    }

    //tempo
    if (req.query.tempo == "high") {
        base += "tempo > 140 AND tempo < 178 ORDER BY RAND() LIMIT 5;";
    } else {
        base += "tempo > 74 AND tempo < 88 ORDER BY RAND() LIMIT 5;";
    }
    connection.query(base, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        }
        else if (results) {
            res.json({ results: results })
        }
    });
}

async function getBar(req, res) {
    var base = 'SELECT name, id,preview_url FROM Tracks WHERE ';

    const { tempoLow, tempoHigh, valenceLow, valenceHigh, danceLow, danceHigh, energyLow, energyHigh } = req.query;

    base += `tempo > ${tempoLow} AND tempo < ${tempoHigh} AND valence > ${valenceLow} AND valence < ${valenceHigh} AND danceability > ${danceLow} AND danceability < ${danceHigh} AND energy > ${energyLow} AND energy < ${energyHigh};`;

    connection.query(base, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        }
        else if (results) {
            console.log(base);
            res.json({ results: results })
        }
    });
}
module.exports = {
    hello,
    random,
    search,
    sendRandom,
    getBar
}