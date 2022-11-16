import config from './config.json'

const getSearchSongs = async (name) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search?name=${name}`, {
        method: 'GET',
    })
    var ans = await res.json()
    console.log(ans)
    return ans;
}
const getRandSongs = async (attr) => {
    var resultArray = []

    const highres = await fetch(`http://${config.server_host}:${config.server_port}/random?attr=${attr}&endpoint=high`);
    const highans = await highres.json();
    resultArray.push(highans.results[0]);

    const lowres = await fetch(`http://${config.server_host}:${config.server_port}/random?attr=${attr}&endpoint=low`);
    const lowans = await lowres.json();
    resultArray.push(lowans.results[0]);


    return resultArray;
}
export { getSearchSongs, getRandSongs }