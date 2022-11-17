import { Link } from 'react-router-dom'



function HomePage() {
  return (
    <div className='HomePage'>
      <h1>Home Page</h1>
      <Link to="/Five4Five">Five4Five</Link>
      <p>

      </p>
      <Link to="/Head2Head">Head2Head</Link>
      <p>

      </p>
      <Link to="/Explore">Explore</Link>
      <p>   </p>
      <img src="https://i.kym-cdn.com/photos/images/newsfeed/001/018/899/936.jpg" alt="cat" width="500" height="600">
      </img>
    </div>
  )
}

export default HomePage;