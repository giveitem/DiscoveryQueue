import { useState, useEffect } from 'react';
import { getRandSongs, getRandResults } from '../fetcher.js'
import Button from '@mui/material/Button';
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
                setLoadingSongs(false);
            });
        }
    }

    return (
        <div className='head2head' >



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
                    <h1>Head2Head</h1>
                    <p style={{ color: 'white' }}>Round {counter + 1} out of 5, select the one you prefer</p>
                    <div className='head-container'>

                        <div>
                            <div className='head-card'>
                                <div key={songPair1[0].song.id} >
                                    <h5 style={{ color: 'white' }}> {songPair1[0].song.name} </h5>
                                    <audio controls>
                                        <source src={songPair1[0].song.preview_url} type="audio/mpeg" />
                                    </audio>
                                </div>
                                <img src={songPair1[0].cover} width="90%" alt="Cover" />
                                <br></br>
                                <Button onClick={() => handleClick("high")}>Select</Button>
                            </div>
                            <div className='head-card'>
                                <div key={songPair1[1].song.id} >
                                    <h5 style={{ color: 'white' }}> {songPair1[1].song.name} </h5>
                                    <audio controls>
                                        <source src={songPair1[1].song.preview_url} type="audio/mpeg" />
                                    </audio>
                                </div>
                                <img src={songPair1[1].cover} width="90%" alt="Cover" />
                                <br></br>
                                <Button onClick={() => handleClick("low")}>Select</Button>
                            </div>
                        </div >
                    </div>
                </div>
            }
            {songsResults &&
                <div>
                    <h1>Head2Head Results</h1>
                    {/* <h2 style={{ color: 'white' }}> Results</h2> */}
                    {songsResults.map(song => (
                        <div class="head-result-container">
                            <div class="head-result">
                                <div key={song.id} className='result'>
                                    <div class="head-result-col1">
                                        <img src={song.cover} height="80px" alt="Cover" />
                                    </div>
                                    <div class="head-result-col2">
                                        <h5 style={{ color: 'white' }}> {song.track_name} </h5>
                                        <p style={{ color: 'white' }}> By: {song.artist_name} </p>
                                    </div>
                                    <div class="head-result-col3">
                                        <audio controls height="90px">
                                            <source src={song.preview} type="audio/mpeg" />
                                        </audio>
                                        <a href={`https://open.spotify.com/track/${song.track_id}`} class="btn  btn-link" target="_blank">Listen on Spotify</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }

        </div >
    )


}

export default Head2Head;