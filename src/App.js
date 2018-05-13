import React, { Component } from 'react';
import './App.css'

let fakeUserData = {
  user: {
    name: 'Tyler K.',
    playlists: [
      {name: 'Groovy Stuff',
        tracks: [
          {name:'groove to dis'},
          {name:'always groovin'},
          {name:'never stop Groovin'}
        ]
      },
      {name: 'Nice Jams',
        tracks: [
          {name:'synthy business'},
          {name: 'lush piano'},
          {name: 'airy chords'}
        ]
      },
      {name: 'rappin captain',
        tracks: [
          {name:'its a rap thing'},
          {name:'always gonna rap'},
          {name:'rappin like a captain'}
        ]
      },
      {name: 'the best playlist',
        tracks: [
          {name:'the best around'},
          {name:'dont stop thinking about tomorrow'},
          {name:'oh boy'}
        ]
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render () {
    return (
      <div className='playlistCounterContent'>
        <h3>Number of playlists: {
          this.props.playlists.length}</h3> 
      </div>
    );
  }
}
class SongCounter extends Component {
  render() {
    let allTracks = this.props.playlists.reduce((tracks, eachPlaylist) => {
      return tracks.concat(eachPlaylist.tracks)
    }, [])
  return (
    <div className = 'songCounterContent'>
      <h3>Total Tracks:{allTracks.length}</h3>
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
          <PlaylistCounter playlists={
            this.state.serverData.user.playlists }/>   
          <SongCounter playlists={
            this.state.serverData.user.playlists }/>
          <Filter/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </div>: <h3>Loading your content!</h3> 
        }
      </div>
    );
  }
}

export default App;
