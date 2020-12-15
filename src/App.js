import React from 'react';
import './App.css';
import Header from './Components/Header'
import MyIngrContainer from './Containers/MyIngrContainer'

class App extends React.Component {

  state = {
    userIngApi: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/user_ingredients')
    .then(r => r.json())
    .then(data => this.setState({ userIngApi: data}))
}

  render() {

    return (
      <div className="App">
        <Header />
        <MyIngrContainer userIngApi={this.state.userIngApi}/>
      </div>
    );
  }
  }

export default App;
