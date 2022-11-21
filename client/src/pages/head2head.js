import { useState, useEffect } from 'react';
import { getRandSongs, getRandResults } from '../fetcher.js'
import Button from '@mui/material/Button';
import './Head2Head.css';

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
            <h1>Head2Head</h1>
            <h4>{attrs[counter]}</h4>
            {counter < 5 && songPair1[0] &&
                <div>
                    <div className="eachSong">
                        <div key={songPair1[0].id} >
                            <div> {songPair1[0].name} </div>
                            <audio controls>
                                <source src={songPair1[0].preview_url} type="audio/mpeg" />
                            </audio>
                        </div>
                        <Button onClick={() => handleClick("high")}>Select</Button>
                    </div>

                    <div className="eachSong">
                        <div key={songPair1[1].id} >
                            <div> {songPair1[1].name} </div>
                            <audio controls>
                                <source src={songPair1[1].preview_url} type="audio/mpeg" />
                            </audio>
                        </div>
                        <Button onClick={() => handleClick("low")}>Select</Button>
                    </div>
                </div >
            }
            {songsResults &&
                <div>
                    {songsResults.map(song => (
                        <div key={song.id}>
                            <audio controls>
                                <source src={song.preview_url} type="audio/mpeg" />
                            </audio>
                            <div> {song.name} </div>
                        </div>
                    ))}
                </div>
            }

        </div >
    )


}

export default Head2Head;