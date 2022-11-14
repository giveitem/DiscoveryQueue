import { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import { getSearchSongs } from '../fetcher.js'

const HomePage = (props) => {
  const [selectedSongs, setSelected] = useState([]);
  const [songsResults, setSongsResults] = useState([]);
  const [search, setSearch] = useState('');
  const [loadingSongs, setLoadingSongs] = useState(false);

  const addSong = (song) => {
    if (!selectedSongs.includes(song)) {
      setSelected([...selectedSongs, song]);
    }
  }


  const updateSearchResults = () => {
    setLoadingSongs(true);
    getSearchSongs(search)

      .then(res => {
        setSongsResults(res.results);
        setLoadingSongs(false);
        console.log(songsResults);
      });
  };
  return (
    <div className='HomePage' >
      <h1>Home Page</h1>

      <input type='text' placeholder="Song Name" onChange={(event) => setSearch(event.target.value)} />
      <button onClick={() => updateSearchResults()}>Search</button>


      <div className='Selected'>
        {selectedSongs.map(song => (
          <div key={song.id}>
            <div>{song.name}</div>
            <button onClick={() => setSelected(selectedSongs.filter(s => s.id !== song.id))}>Remove</button>
          </div>
        ))}
      </div>


      <div className='Songs'>
        {songsResults.map(song => (
          <div key={song.id}>
            <div> {song.name} </div>
            <button onClick={() => addSong(song)}>Add</button>
          </div>
        ))}
      </div>

    </div >
  );
}



export default HomePage;