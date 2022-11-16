import { useState, useEffect } from 'react';
import { getRandSongs, getRandResults } from '../fetcher.js'

const Head2Head = (props) => {
    const [songsResults, setSongsResults] = useState(null);
    const [songPair1, setSongPair1] = useState([]);
    const [counter, setCounter] = useState(0);
    const [query, setQuery] = useState([]);
    let attrs = ["valence", "danceability", "energy", "acousticness", "tempo"];




    useEffect(() => {
        getRandSongs(attrs[counter]).then((res) => {
            setSongPair1(res);
        })
        console.log("fired");
    }, [counter]);

    const handleClick = (highlow) => {
        if (counter < 4) {
            setCounter(counter + 1);
            setQuery([...query, highlow]);
        } else {
            setCounter(counter + 1);
            getRandResults(query).then((res) => {
                setSongsResults(res);
                console.log(res);
            });
        }
    }

    console.log(query);
    return (
        <div className='head2head' >
            <h1>head2head</h1>
            <div>{attrs[counter]}</div>
            {counter < 5 && songPair1[0] &&
                <div>
                    <div key={songPair1[0].id}>
                        <div> {songPair1[0].name} </div>
                        <a href={songPair1[0].preview_url}>Preview</a>

                        <button onClick={() => handleClick("high")}>Select</button>
                    </div>
                    <div key={songPair1[1].id}>
                        <div> {songPair1[1].name} </div>
                        <a href={songPair1[1].preview_url}>Preview</a>
                        <button onClick={() => handleClick("low")}>Select</button>
                    </div>
                </div >
            }
            {songsResults &&
                <div>
                    {songsResults.map(song => (
                        <div key={song.id}>
                            <a href={song.preview_url}>Preview</a>
                            <div> {song.name} </div>
                        </div>
                    ))}
                </div>
            }

        </div >
    )


}

export default Head2Head;