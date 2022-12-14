import { Link } from 'react-router-dom';
import black from '../public/dq_black.png';
import fff from '../public/fff.jpg';
import hth from '../public/hth.jpg';
import explore from '../public/explore.jpg';



function HomePage() {
  return (
    <div className='HomePage'>
      <h1>Welcome to Discovery Queue</h1>
      <h6>Tools for discovering your new favourite song</h6>
      <div className='homepage-container'>
        <div className='homepage-card'>
          <h2>Five4Five</h2>
          <Link to="/Five4Five"><img src={fff} height="200px" /></Link>
          <p>Enter your five favorite songs and we'll pull five songs that match your interest and taste!</p>
        </div>
        <div className='homepage-card'>
          <h2>Head2Head</h2>
          <Link to="/Head2Head"><img src={hth} height="200px" /></Link>
          <p>Buzzfeed style quiz to find your new favourite song</p>
        </div>
        <div className='homepage-card'>
          <h2>Explore</h2>
          <Link to="/Explore"><img src={explore} height="200px" /></Link>
          <p>Search songs based on key musicality attributes including valence, intrumentalness, time signature, energy, and danceability</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage;