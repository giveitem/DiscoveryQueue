import { Link } from 'react-router-dom'



function HomePage() {
  return (
    <div className='HomePage'>
      <h1>Home Page</h1>
      <Link to="/Five4Five">Five4Five</Link>
      <p>

      </p>
      <Link to="/Head2Head">Head2Head</Link>
    </div>

  )
}

export default HomePage;