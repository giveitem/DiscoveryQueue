import React, { useState, useEffect, useRef } from 'react';
import config from '../config.json'
import './HomePage.css';
import { getSearchSongs } from '../fetcher.js'

// class HomePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       search: "",
//       selectedSongs: [],
//       searchResults: [],

//       addingSong: false,
//       loadingSongs: false
//     };
//     this.realUpdateSelectedSongs = this.realUpdateSelectedSongs.bind(this);
//     this.handleNameQueryChange = this.handleNameQueryChange.bind(this);
//     this.updateSearchResults = this.updateSearchResults.bind(this);
//     this.updateSelectedSongs = this.updateSelectedSongs.bind(this);
//   }

//   // const [selectedSongs, setSelected] = useState([])
//   // const [songsResults, setSongsResults] = useState([])
//   // const [search, setSearch] = useState('')
//   // const [loadingSongs, setLoadingSongs] = useState(false)

//   // useEffect(() => {
//   //   fetch('http://127.0.0.1:8080/')
//   //     .then(res => res.json())
//   //     .then(json => setSongsResults(json.results))
//   // }, [])



//   handleNameQueryChange(event) {
//     this.setState({ search: event.target.value });
//   }


//   updateSearchResults() {
//     getSearchSongs(this.state.search)
//       .then(res => {
//         this.setState({ searchResults: res.results });
//         this.setState({ loadingSongs: false })
//         console.log(this.state.searchResults);
//       }
//       );
//   }

//   realUpdateSelectedSongs(song) {
//     //this.setState({ selectedSongs: [...this.state.selectedSongs, song] });
//   }

//   updateSelectedSongs(song) {
//     this.setState({ addingSong: true });
//     this.realUpdateSelectedSongs(song);
//     this.setState({ addingSong: false });
//     //this.setState({ selectedSongs: this.state.selectedSongs.filter(s => s.id !== song.id) })
//   }

//   componentDidMount() {
//     getSearchSongs(this.state.search)
//       .then(res => {
//         this.setState({ searchResults: res.results });
//         this.setState({ loadingSongs: false })
//         console.log(this.state.searchResults);
//       });
//   }


//   render() {
//     return (
//       <div className='HomePage' >
//         <h1>Home Page</h1>
//         <input type='text' placeholder="Song Name" onChange={this.handleNameQueryChange} /> <button onClick={this.updateSearchResults}>Search</button>


//         <div className='Selected'>
//           {this.state.selectedSongs.map(song => (
//             <div key={song.id}>
//               {song.name}
//               <button onClick={this.setState({ selectedSongs: this.state.selectedSongs.filter(s => s.id !== song.id) })}>Remove</button>
//             </div>
//           ))}
//         </div>


//         <div className='Songs'>
//           {this.state.searchResults.map(song => (
//             <div key={song.id}>
//               <div> {song.name} </div>
//               <button onClick={() => this.updateSelectedSongs(song)}>Add</button>
//             </div>
//           ))}
//         </div>

//       </div >
//     );


//   }
// }
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