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
        fetch(`http://${config.server_host}:${config.server_port}/random?attr=${attr}&endpoint=high`, {
            method: 'GET',
        }).then((res) => {
            res.json().then((res) => {
                //console.log(res)
                resultArray.push(res)
            })
        })
        fetch(`http://${config.server_host}:${config.server_port}/random?attr=${attr}&endpoint=low`, {
            method: 'GET',
        }).then((res) => {
            res.json().then((res) => {
                //console.log(res)
                resultArray.push(res)
            })
        });

    });
    return resultArray;
}
export { getSearchSongs, getRandSongs }