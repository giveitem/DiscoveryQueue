import { useState, useEffect, useRef } from 'react';
import { getRandSongs } from '../fetcher.js'

const Head2Head = (props) => {
    const [selectedSongs, setSelected] = useState([]);
    const [songsResults, setSongsResults] = useState([]);
    const [songPair1, setSongPair1] = useState([]);
    const [songPair2, setSongPair2] = useState([]);

    let rand1 = Math.floor(Math.random() * songPair1.length);
    let rand2 = Math.floor(Math.random() * songPair2.length);
    getRandSongs().then((res) => {


        console.log(res);
    });



    return (
        <div className='head2head' >
            <h1>head2head</h1>
        </div>
    )
}

export default Head2Head;