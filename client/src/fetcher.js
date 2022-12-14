import config from './config.json'

const getSearchSongs = async (songName, artistName) => {
    let basic = `http://${config.server_host}:${config.server_port}/search/?`;
    if (songName !== "") {
        basic += `songName=${songName}`;
    }
    if (artistName !== "") {
        basic += `&artistName=${artistName}`;
    }
    //console.log(basic);
    var res = await fetch(basic, {
        method: 'GET',
    })
    var ans = await res.json()
    //console.log(ans)
    return ans;
}
const getSongResults = async (songId) => {
    let qString = `http://${config.server_host}:${config.server_port}/getSongs?songId=${songId}`;
    //console.log(qString);
    const res = await fetch(qString);
    const ans = await res.json();
    // console.log(ans.results);
    return ans.results;
}
const getRandSongs = async (attr) => {
    var songArray = []

    const highres = await fetch(`http://${config.server_host}:${config.server_port}/random?attr=${attr}&endpoint=high`);
    const highans = await highres.json();
    let qString = `http://${config.server_host}:${config.server_port}/getAlbCover?songId=${highans.results[0].id}`;
    let res = await fetch(qString);
    let ans = await res.json();

    songArray.push({ song: highans.results[0], cover: ans.results });


    const lowres = await fetch(`http://${config.server_host}:${config.server_port}/random?attr=${attr}&endpoint=low`);
    const lowans = await lowres.json();
    qString = `http://${config.server_host}:${config.server_port}/getAlbCover?songId=${lowans.results[0].id}`;
    res = await fetch(qString);
    ans = await res.json();
    songArray.push({ song: lowans.results[0], cover: ans.results });
    return songArray;
}
const getRandResults = async (query) => {
    let qString = `http://${config.server_host}:${config.server_port}/getRandom?`;
    if (query[0] === "high") {
        qString += `valence=high&`;
    } else {
        qString += `valence=low&`;
    }
    if (query[1] === "high") {
        qString += `danceability=high&`;
    } else {
        qString += `danceability=low&`;
    }
    if (query[2] === "high") {
        qString += `energy=high&`;
    } else {
        qString += `energy=low&`;
    }
    if (query[3] === "high") {
        qString += `acousticness=high&`;
    } else {
        qString += `acousticness=low&`;
    }
    if (query[4] === "high") {
        qString += `tempo=high`;
    } else {
        qString += `tempo=low`;
    }

    var res = await fetch(qString, {
        method: 'GET',
    });
    var ans = await res.json();

    for (var i = 0; i < ans.results.length; i++) {
        qString = `http://${config.server_host}:${config.server_port}/getAlbCover?songId=${ans.results[i].track_id}`;
        const res = await fetch(qString);
        const ans2 = await res.json();
        ans.results[i].cover = ans2.results;
    }

    return ans;

}
const getBarResults = async (tempoValue, danceValue, energyValue, valenceValue) => {
    let qString = `http://${config.server_host}:${config.server_port}/getBars?`;
    qString += `tempoLow=${tempoValue[0]}&`;
    qString += `danceLow=${danceValue[0] / 100}&`;
    qString += `energyLow=${energyValue[0] / 100}&`;
    qString += `valenceLow=${valenceValue[0] / 100}&`;
    qString += `tempoHigh=${tempoValue[1]}&`;
    qString += `danceHigh=${danceValue[1] / 100}&`;
    qString += `energyHigh=${energyValue[1] / 100}&`;
    qString += `valenceHigh=${valenceValue[1] / 100}`;


    const res = await fetch(qString);
    const ans = await res.json();

    return ans.results;
}
const getBarArtist = async (tempoValue, danceValue, energyValue, valenceValue) => {
    let qString = `http://${config.server_host}:${config.server_port}/getBarArtist?`;
    qString += `tempoLow=${tempoValue[0]}&`;
    qString += `danceLow=${danceValue[0] / 100}&`;
    qString += `energyLow=${energyValue[0] / 100}&`;
    qString += `valenceLow=${valenceValue[0] / 100}&`;
    qString += `tempoHigh=${tempoValue[1]}&`;
    qString += `danceHigh=${danceValue[1] / 100}&`;
    qString += `energyHigh=${energyValue[1] / 100}&`;
    qString += `valenceHigh=${valenceValue[1] / 100}`;


    const res = await fetch(qString);
    const ans = await res.json();
    return ans.results;
}
const getAlbCover = async (songId) => {
    let qString = `http://${config.server_host}:${config.server_port}/getAlbCover?songId=${songId}`;

    const res = await fetch(qString);
    const ans = await res.json();

    return ans.results;

}
export { getSearchSongs, getRandSongs, getRandResults, getBarResults, getSongResults, getBarArtist, getAlbCover }