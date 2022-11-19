import config from './config.json'

const getSearchSongs = async (songName, artistName) => {
    let basic = `http://${config.server_host}:${config.server_port}/search/?`;
    if (songName !== "") {
        basic += `songName=${songName}`;
    }
    if (artistName !== "") {
        basic += `&artistName=${artistName}`;
    }
    console.log(basic);
    var res = await fetch(basic, {
        method: 'GET',
    })
    var ans = await res.json()
    console.log(ans)
    return ans;
}
const getRandSongs = async (attr) => {
    var songArray = []

    const highres = await fetch(`http://${config.server_host}:${config.server_port}/random?attr=${attr}&endpoint=high`);
    const highans = await highres.json();
    songArray.push(highans.results[0]);

    const lowres = await fetch(`http://${config.server_host}:${config.server_port}/random?attr=${attr}&endpoint=low`);
    const lowans = await lowres.json();
    songArray.push(lowans.results[0]);


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
    console.log(qString)
    const res = await fetch(qString);
    const ans = await res.json();
    return ans.results;

}
export { getSearchSongs, getRandSongs, getRandResults }