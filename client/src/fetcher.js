import config from './config.json'

const getSearchSongs = async (name) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search?name=${name}`, {
        method: 'GET',
    })
    var ans = await res.json()
    console.log(ans)
    return ans;
}
const getRandSongs = async () => {


    var attrs = ["valence", "danceability", "energy", "acousticness", "tempo"]
    var resultArray = []
    attrs.forEach(attr => {
        var highRes = await fetch(`http://${config.server_host}:${config.server_port}/random?attr=${attr}&endpoint=high`, {
            method: 'GET',
        });
        var lowRes = await fetch(`http://${config.server_host}:${config.server_port}/random?attr=${attr}&endpoint=low`, {
            method: 'GET',
        });
        var highRes = await highRes.json();
        var lowRes = await lowRes.json();
        resultArray.push((highRes, lowRes));
    })
    return resultArray;
}
export { getSearchSongs }