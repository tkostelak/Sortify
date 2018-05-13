import React, { Component } from 'react';
import './App.css'

let fakeUserData = {
  user: {
    name: 'Tyler K.',
    playlists: [
      {name: 'Groovy Stuff',
        tracks: ['groove to dis',
          'always groovin',
          'never stop Groovin']},
      {name: 'Nice Jams',
        tracks: ['synthy business',
        'lush piano',
        'airy chords']},
      {name: 'rappin captain',
        tracks: ['its a rap thing',
          'always gonna rap',
          'rappin like a captain'
      ]},
      {name: 'the best playlist',
        tracks: ['the best around',
        'dont stop thinking about tomorrow',
        'oh boy',
        'oh baby']}
    ]
  }
}

class ControlPanel extends Component {
  render () {
    return (
      <div className='controlPanel'>
        <div className='playlistCount'>
          <h3>Number of playlists: {this.props.playlists &&
            this.props.playlists.length}</h3>
        </div>  
        <div className = 'songCount'>
          <h3>Number of songs: </h3>
        </div>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <img/>
        <input type='text'/>
        Filter
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    return (
      <div className ='playlist'>
        <h3> Playlist Name </h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
    this.setState({serverData: fakeUserData});
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <header className='appHeader'>
          <h1> Sortify </h1>
          <h2> Hello,  {this.state.serverData.user.name}
          </h2>
          </header>
          <ControlPanel playlists={
            this.state.serverData.user.playlists }/>   
          <Filter/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </div>: 'Loading'
        }
      </div>
    );
  }
}

export default App;
