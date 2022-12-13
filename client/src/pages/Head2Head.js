import { useState, useEffect } from 'react';
import { getRandSongs, getRandResults } from '../fetcher.js'
import Button from '@mui/material/Button';
import './Head2Head.css';
import { Audio } from 'react-loader-spinner';

const Head2Head = (props) => {

    const [loadingSongs, setLoadingSongs] = useState(false);
    const [songsResults, setSongsResults] = useState(null);
    const [songPair1, setSongPair1] = useState([]);
    const [counter, setCounter] = useState(0);
    const [query, setQuery] = useState([]);
    const [imgs, setImgs] = useState([]);
    let attrs = ["valence", "danceability", "energy", "acousticness", "tempo"];




    useEffect(() => {
        setLoadingSongs(true);
        getRandSongs(attrs[counter]).then((res) => {
            setSongPair1(res);
            //console.log(res);
            setLoadingSongs(false);
        });
        //console.log(songPair1);
    }, [counter]);




    const handleClick = (highlow) => {
        if (counter < 4) {
            setCounter(counter + 1);
            setQuery([...query, highlow]);
        } else {
            setCounter(counter + 1);
            setLoadingSongs(true);
            getRandResults(query).then((res) => {
                setSongsResults(res.results);
                //console.log(res);
                setLoadingSongs(false);
            });
        }
    }

    //console.log(query);
    return (
        <div className='head2head' >
            <h1>Head2Head</h1>
            {(loadingSongs === true) && <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100',
                    width: '100',
                    color: 'white'
                }}> <Audio
                    height="100"
                    width="100"
                    color="#4fa94d"
                    ariaLabel="audio-loading"
                    wrapperStyle={{}}
                    wrapperClass="wrapper-class"
                    visible={true}
                    justifyContent="center"

                />Loading....</div>}
            {/* <h4>{attrs[counter]}</h4> */}
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
                            <h3 style={{ color: 'white' }}> {song.track_name} </h3>
                            <h5 style={{ color: 'white' }}> By: {song.artist_name} </h5>
                            <a href={`https://open.spotify.com/track/${song.track_id}`} class="btn  btn-link" target="_blank">Go Listen on Spotify</a>
                            <div></div>
                            <audio controls>
                                <source src={song.preview} type="audio/mpeg" />
                            </audio>
                            <div></div>
                            <img src={song.cover} alt="Cover" />
                        </div>
                    ))}
                </div>
            }

        </div >
    )


}

export default Head2Head;