import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import MainContainer from './Containers/MainContainer'
import TendrHeader from './Components/TendrHeader';
import Footer from './Components/Footer'

class App extends React.Component {
 
  render() {

    return (
      <div className="App">
          <BrowserRouter>
            <div className='main'>
              <TendrHeader />
              <MainContainer />
              <Footer />
            </div>
          </BrowserRouter>
      </div>
    );
  }
  }
export default App;
