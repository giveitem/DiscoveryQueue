const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');
const request = require('request');
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


//////////////////////SPOTIFY API//////////////////////
const SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();
var client_id = 'f48056d142d3469bb32b209af9fdd3ed';
var client_secret = '16662dbdb7544a1dbb712a7e5cc7263f';
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};
var token = "";
let first = timer();
let myVar = setInterval(function () { timer() }, 3500000);
function timer() {
    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            token = body.access_token;
            spotifyApi.setAccessToken(token);
        }
    })
    console.log("token refreshed");
}

function stopFunction() {
    clearInterval(myVar);
}
////////////////////////////////////////////////////////////////////////




// Search route for Five4Five
async function search(req, res) {
    console.log(req.query)
    let query = "";
    if (req.query.songName && !req.query.artistName) {
        query += "WITH tracks_alb (track_name, alb_id, track_id) as (SELECT name, album_id, id from tracks),     tracks_alb_art_id (track_name, t_id, art_id, al_name, al_date) as (SELECT tracks_alb.track_name, tracks_alb.track_id, artist_id, albums.name, albums.release_date  from tracks_alb join albums on tracks_alb.alb_id = albums.id), tracks_alb_art_na (track_name, t_id, gen_id, al_name, al_date) as (SELECT tracks_alb_art_id.track_name, tracks_alb_art_id.t_id, artists.name, tracks_alb_art_id.al_name, tracks_alb_art_id.al_date from tracks_alb_art_id join artists on tracks_alb_art_id.art_id = artists.id)  select track_name as name, gen_id as artists_name, t_id, al_name as album, al_date as date from tracks_alb_art_na where track_name like '%" + req.query.songName + "%';"
    } else if (!req.query.songName && req.query.artistName) {
        query += "WITH tracks_alb (track_name, alb_id, track_id) as (SELECT name, album_id, id from tracks),     tracks_alb_art_id (track_name, t_id, art_id, al_name, al_date) as (SELECT tracks_alb.track_name, tracks_alb.track_id, artist_id, albums.name, albums.release_date  from tracks_alb join albums on tracks_alb.alb_id = albums.id),     tracks_alb_art_na (track_name, t_id, gen_id, al_name, al_date) as (SELECT tracks_alb_art_id.track_name, tracks_alb_art_id.t_id, artists.name, tracks_alb_art_id.al_name, tracks_alb_art_id.al_date from tracks_alb_art_id join artists on tracks_alb_art_id.art_id = artists.id)  select track_name as name, gen_id as artists_name, t_id, al_name as album, al_date as date from tracks_alb_art_na where gen_id like '%" + req.query.artistName + "%';"
        // query += "WITH artist_ids (track_id, art_id, art_name) as         (SELECT track_id, id,name from artists WHERE name LIKE '%" + req.query.artistName + "%')  SELECT tracks.name as name, artist_ids.art_name as artists_name from artist_ids join tracks on artist_ids.track_id = tracks.id;";
    } else if (req.query.songName && req.query.artistName) {
        query += "WITH tracks_alb (track_name, alb_id, track_id) as (SELECT name, album_id, id from tracks),     tracks_alb_art_id (track_name, t_id, art_id, al_name, al_date) as (SELECT tracks_alb.track_name, tracks_alb.track_id, artist_id, albums.name, albums.release_date  from tracks_alb join albums on tracks_alb.alb_id = albums.id),     tracks_alb_art_na (track_name, t_id, gen_id, al_name, al_date) as (SELECT tracks_alb_art_id.track_name, tracks_alb_art_id.t_id, artists.name, tracks_alb_art_id.al_name, tracks_alb_art_id.al_date from tracks_alb_art_id join artists on tracks_alb_art_id.art_id = artists.id)  select track_name as name, gen_id as artists_name, t_id, al_name as album, al_date as date from tracks_alb_art_na where gen_id like '%" + req.query.artistName + "%' and track_name like '%" + req.query.songName + "%';"
    } else {
        query += "WITH tracks_alb (track_name, alb_id, track_id) as (SELECT name, album_id, id from tracks),     tracks_alb_art_id (track_name, t_id, art_id, al_name, al_date) as (SELECT tracks_alb.track_name, tracks_alb.track_id, artist_id, albums.name, albums.release_date  from tracks_alb join albums on tracks_alb.alb_id = albums.id),     tracks_alb_art_na (track_name, t_id, gen_id, al_name, al_date) as (SELECT tracks_alb_art_id.track_name, tracks_alb_art_id.t_id, artists.name, tracks_alb_art_id.al_name, tracks_alb_art_id.al_date from tracks_alb_art_id join artists on tracks_alb_art_id.art_id = artists.id)  select track_name as name, gen_id as artists_name, t_id, al_name as album, al_date as date from tracks_alb_art_na;"
    }

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

//Get result route for Five4Five
async function getSearchResult(req, res) {
    var query = `WITH inital(id) as (select top_song from tracks where id = '${req.query.songId}') SELECT inital.id as id, tracks.name as name from inital join tracks on inital.id = tracks.id;`
    console.log(query)
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        }
        else if (results) {
            res.json({ results: results })
        }
    });
}

//Route for selecting random track for each attribute (Head2Head)
async function random(req, res) {
    switch (req.query.attr) {
        case "valence":
            if (req.query.endpoint == "high") {
                var highQuery = "SELECT name, id, preview_url FROM tracks WHERE valence > 0.8 AND valence < 0.9 ORDER BY RAND() LIMIT 1;";
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
                var lowQuery = "SELECT name, id, preview_url FROM tracks WHERE valence > 0.1 AND valence < 0.2 ORDER BY RAND() LIMIT 1;";
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
                var highQuery = "SELECT name, id, preview_url FROM tracks WHERE danceability > 0.8 AND danceability < 0.9 ORDER BY RAND() LIMIT 1;";
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
                var lowQuery = "SELECT name, id, preview_url FROM tracks WHERE danceability > 0.2 AND danceability < 0.4 ORDER BY RAND() LIMIT 1;";
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
                var highQuery = "SELECT name, id, preview_url FROM tracks WHERE energy > 0.8 AND energy < 0.9 ORDER BY RAND() LIMIT 1;";
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
                var lowQuery = "SELECT name, id, preview_url FROM tracks WHERE energy > 0.2 AND energy < 0.4 ORDER BY RAND() LIMIT 1;";
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
                var highQuery = "SELECT name, id, preview_url FROM tracks WHERE acousticness > 0.88 AND acousticness < 0.98 ORDER BY RAND() LIMIT 1;";
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
                var lowQuery = "SELECT name, id, preview_url FROM tracks WHERE acousticness > 0.14 AND acousticness < 0.2 ORDER BY RAND() LIMIT 1;";
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
                var highQuery = "SELECT name, id, preview_url FROM tracks WHERE tempo > 150 AND tempo < 170 ORDER BY RAND() LIMIT 1;";
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
                var lowQuery = "SELECT name, id, preview_url FROM tracks WHERE  tempo > 83 AND tempo < 89 ORDER BY RAND() LIMIT 1;";
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

//Route for sending back result for Head2Head
async function sendRandom(req, res) {
    var prefix = "WITH selected_tracks (name,id,album_id,preview) as(";
    var base = "SELECT name, id, album_id, preview_url FROM tracks WHERE ";

    //valence
    if (req.query.valence == "high") {
        base += "valence > 0.59 AND valence < 0.95 AND ";
    } else {
        base += "valence > 0.15 AND valence < 0.55 AND ";
    }
    //danceability
    if (req.query.danceability == "high") {
        base += "danceability > 0.59 AND danceability < 0.95 AND ";
    } else {
        base += "danceability > 0.15 AND danceability < 0.5 AND ";
    }
    //energy
    if (req.query.energy == "high") {
        base += "energy > 0.7 AND energy < 0.95 AND ";

    } else {
        base += "energy > 0.2 AND energy < 0.59 AND ";
    }
    //acousticness
    if (req.query.acousticness == "high") {
        base += "acousticness > 0.5 AND acousticness < 0.9 AND ";
    } else {
        base += "acousticness > 0.15 AND acousticness < 0.45 AND ";
    }

    //tempo
    if (req.query.tempo == "high") {
        base += "tempo > 111 AND tempo < 178 ORDER BY RAND() LIMIT 5";
    } else {
        base += "tempo > 74 AND tempo < 110 ORDER BY RAND() LIMIT 5";
    }
    var postfix = "), selected_artist (name,id, preview, artist_id) as ( SELECT selected_tracks.name, selected_tracks.id, selected_tracks.preview, artist_id FROM albums join selected_tracks on selected_tracks.album_id = albums.id) select selected_artist.name as track_name, selected_artist.id as track_id, selected_artist.preview as preview, artists.name as artist_name from artists join selected_artist on selected_artist.artist_id = artists.id;"
    var finalQuery = prefix + base + postfix;

    console.log(finalQuery);
    connection.query(finalQuery, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        }
        else if (results) {
            res.json({ results: results })
        }
    });
}

//Route for sending back result for Explore
async function getBar(req, res) {
    const { tempoLow, tempoHigh, valenceLow, valenceHigh, danceLow, danceHigh, energyLow, energyHigh } = req.query;
    var base = `WITH beta (track_name, album_id, preview)         as (SELECT name, album_id,  preview_url FROM tracks WHERE tempo > ${tempoLow} AND tempo < ${tempoHigh} AND valence > ${valenceLow} AND valence < ${valenceHigh} AND danceability > ${danceLow} AND danceability < ${danceHigh} AND energy > ${energyLow} AND energy < ${energyHigh}),     album_named (track_name, album_name, artists_id, preview, release_date)         as (SELECT beta.track_name, albums.name, albums.artist_id, beta.preview, albums.release_date FROM beta join albums on beta.album_id = albums.id), artists_named (track_name, album_name, artists_name, preview, release_date)         as (SELECT album_named.track_name, album_named.album_name, artists.name, album_named.preview, album_named.release_date FROM album_named join artists on album_named.artists_id = artists.id) SELECT * FROM artists_named;`



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


//Route for sending back recommended artists for Explore
async function getBarArtist(req, res) {
    const { tempoLow, tempoHigh, valenceLow, valenceHigh, danceLow, danceHigh, energyLow, energyHigh } = req.query;
    var aggr = `WITH getAlb(id) as (SELECT album_id FROM tracks WHERE tempo > ${tempoLow} AND tempo < ${tempoHigh} AND valence > ${valenceLow} AND valence < ${valenceHigh} AND danceability > ${danceLow} AND danceability < ${danceHigh} AND energy > ${energyLow} AND energy < ${energyHigh}), getArt(id) as (SELECT artist_id from getAlb join albums on albums.id = getAlb.id group by getAlb.id ORDER BY count(*) DESC LIMIT 1, 5) select name, artists.id AS artists_id from getArt join artists on artists.id = getArt.id;`
    connection.query(aggr, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        }
        else if (results) {
            console.log(aggr);
            res.json({ results: results })
        }
    });
}


//Route for returning the album art for a given track
async function getAlbCover(req, res) {
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    spotifyApi.getTrack(req.query.songId)
        .then(function (data) {
            if (data.body.album.images[1]) {
                res.json({ results: data.body.album.images[1].url })
            } else {
                res.json({ results: 'https://play-lh.googleusercontent.com/P2VMEenhpIsubG2oWbvuLGrs0GyyzLiDosGTg8bi8htRXg9Uf0eUtHiUjC28p1jgHzo=w480-h960' })
            }
        }, function (err) {
            console.error(err);
        });
}

module.exports = {
    random,
    search,
    sendRandom,
    getBar,
    getBarArtist,
    getSearchResult,
    getAlbCover
}