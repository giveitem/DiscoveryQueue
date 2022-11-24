const express = require('express');
const mysql = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1 - register as GET 
app.get('/', routes.hello);
app.get('/search', routes.search);
app.get('/random', routes.random);
app.get('/getRandom', routes.sendRandom);
app.get('/getBars', routes.getBar);
app.get('/getBarArtist', routes.getBarArtist);
app.get('/getSongs', routes.getSearchResult);

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
