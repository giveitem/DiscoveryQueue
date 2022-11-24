import logo from './logo.svg';
import './App.css';
import Five4Five from './pages/five4five';
import Head2Head from './pages/head2head';
import Explore from './pages/explore';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route } from 'react-router-dom';
import BasicExample from './components/BasicExample';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
      <div className="Header">
      <BasicExample />
      </div>
      <div className="Main">
      <BrowserRouter>
        <Route path="/Five4Five" component={Five4Five} />
        <Route path="/Head2Head" component={Head2Head} />
        <Route path="/Explore" component={Explore} />
        <Route exact path="/" component={HomePage} />
      </BrowserRouter>
      </div>
      <div className="Footer">
      <Footer />
      </div>
    </div>
  );
}

export default App;
