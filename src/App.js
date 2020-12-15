import React from 'react';
import './App.css';
import Header from './Components/Header'
import MyIngrContainer from './Containers/MyIngrContainer'

class App extends React.Component {



  render() {

    return (
      <div className="App">
        <Header />
        <MyIngrContainer />
      </div>
    );
  }
  }

export default App;
