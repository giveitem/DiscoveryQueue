import { useState, useEffect } from 'react';
import { getRandSongs, getRandResults } from '../fetcher.js'
import Button from '@mui/material/Button';
import './Head2Head.css';

const Head2Head = (props) => {
    const [songsResults, setSongsResults] = useState(null);
    const [songPair1, setSongPair1] = useState([]);
    const [counter, setCounter] = useState(0);
    const [query, setQuery] = useState([]);
    const [imgs, setImgs] = useState([]);
    let attrs = ["valence", "danceability", "energy", "acousticness", "tempo"];




    useEffect(() => {

        getRandSongs(attrs[counter]).then((res) => {

            setSongPair1(res);
            console.log(res);
        });
        console.log(songPair1);

    }, [counter]);




    const handleClick = (highlow) => {
        if (counter < 4) {
            setCounter(counter + 1);
            setQuery([...query, highlow]);
        } else {
            setCounter(counter + 1);
            getRandResults(query).then((res) => {
                setSongsResults(res.results);
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
                        <div key={songPair1[0].song.id} >
                            <h3 style={{ color: 'white' }}> {songPair1[0].song.name} </h3>
                            <audio controls>
                                <source src={songPair1[0].song.preview_url} type="audio/mpeg" />
                            </audio>
                        </div>
                        <img src={songPair1[0].cover} alt="Cover" />
                        <Button onClick={() => handleClick("high")}>Select</Button>
                    </div>

                    <div className="eachSong">
                        <div key={songPair1[1].song.id} >
                            <h3 style={{ color: 'white' }}> {songPair1[1].song.name} </h3>
                            <audio controls>
                                <source src={songPair1[1].song.preview_url} type="audio/mpeg" />
                            </audio>
                        </div>
                        <img src={songPair1[1].cover} alt="Cover" />
                        <Button onClick={() => handleClick("low")}>Select</Button>
                    </div>
                </div >
            }
            {songsResults &&
                <div>
                    <h2 style={{ color: 'white' }}> Results</h2>
                    {songsResults.map(song => (
                        <div key={song.id} className='result'>
                            <h4 style={{ color: 'white' }}> {song.track_name} </h4>
                            <h5 style={{ color: 'white' }}> By: {song.artist_name} </h5>
                            <a href={`https://open.spotify.com/track/${song.track_id}`} class="btn  btn-link" target="_blank">Go Listen on Spotify</a>
                            <div> </div>
                            <audio controls>
                                <source src={song.preview} type="audio/mpeg" />
                            </audio>
                        </div>
                    ))}
                </div>
            }

        </div >
    )


}

export default Head2Head;