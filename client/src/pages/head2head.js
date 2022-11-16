import { useState, useEffect, useRef } from 'react';
import { getRandSongs } from '../fetcher.js'

const Head2Head = (props) => {
    const [selectedSongs, setSelected] = useState([]);
    const [songsResults, setSongsResults] = useState([]);
    const [songPair1, setSongPair1] = useState([]);
    const [songPair2, setSongPair2] = useState([]);

    let attrs = ["valence", "danceability", "energy", "acousticness", "tempo"];

    let rand1 = Math.floor(Math.random() * songPair1.length);
    let rand2 = Math.floor(Math.random() * songPair2.length);
    let temp = undefined;


    useEffect(() => {
        getRandSongs(attrs[0]).then((res) => {
            setSongPair1(res);
        })
    }, []);

    console.log(songPair1);

    return (
        <div className='head2head' >
            <h1>head2head</h1>
            {songPair1 && songPair1.map(song => (
                <div key={song.id}>
                    <div> {song.name} </div>
                    <button>Select</button>
                </div>
            ))}
        </div>
    )


}

export default Head2Head;