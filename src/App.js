import React, { Component } from 'react';
import './App.css'
import queryString from 'query-string';


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
          {name:'dont stop'},
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
          this.props.playlist.length}</h3> 
      </div>
    );
  }
}
class SongCounter extends Component {
  render() {
    let allTracks = this.props.playlist.reduce((tracks, eachPlaylist) => {
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
      <div className ='filterContent'>
        <img/>
        <input type='text' onKeyUp={
          event => this.props.onTextChange(event.target.value)}/>
        Filter
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div className ='playlist'>
        <h3 style={{textAlign: 'center'}}> {playlist.name}</h3>
        <ul>
          {playlist.songs.map(track =>
            <li>{track.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  
  componentDidMount(){
    let parsed = queryString.parse(
      window.location.search);
    let accessToken = parsed.access_token;
    
    fetch('https://api.spotify.com/v1/me', {headers: {
      'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => {
      const displayName = data.display_name || data.id
      this.setState({
      serverData: {
        user: {
          name: displayName
        }}
      })
    })

  fetch('https://api.spotify.com/v1/me/playlists', { headers: {
    'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
  .then(data => {
    this.setState({
      serverData: { 
        user: { 
          playlists: data.items.map(item => ({
            name: item.name, 
            songs: [] 
          }))
        }
      }
    })})
  }

  render() {
    let playlistToRender = 
      this.state.serverData.user &&
      this.state.serverData.user.playlists 
        ? this.state.serverData.user.playlists
        .filter(playlist =>
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase()))
        : []
    
      return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <header className='appHeader'>
            <h1> Sortify </h1>
            <h2> Welcome, 
              <br/>
              {this.state.serverData.user.name}
            </h2>
          </header>
          <PlaylistCounter playlist={playlistToRender}/>
          <SongCounter playlist={playlistToRender}/> 
          <Filter onTextChange={text => this.setState({
            filterString: text})}/>
          {playlistToRender.map(playlist => 
            <Playlist playlist={playlist}/>
          )}
        </div>: <button onClick={() => 
          window.location='http://localhost:8888/login'}>Sign in with Spotify</button> 
        }
      </div>
    );
  }
}

export default App;
