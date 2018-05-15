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
        <img src={playlist.imageUrl}/>
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
   //AUTHORIZE USER API CALL!!!
    let parsed = queryString.parse(
      window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => response.json())
      .then(data => this.setState({ 
        user: {
          name: data.display_name || data.id
        }
    }))

    //RETRIEVE PLAYLIST INFO API CALL!!!
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(playlistData => {
        let playlists = playlistData.items
        let trackDataPromises = playlistData.items.map(playlist => {
          let responsePromise =
            fetch(playlist.tracks.href, {
              headers: {'Authorization': 'Bearer ' + accessToken }})
            let trackDataPromise = responsePromise
              .then(response => response.json())
            return trackDataPromise
          })
        let allTrackDataPromises =
          Promise.all(trackDataPromises)
          let playlistPromise = allTrackDataPromises.then(      trackData => {
          trackData.forEach((trackData, i) => {
            playlists[i].trackData = trackData.items.map(item =>
              item.track)
          })
        return playlists
        })
      return playlistPromise
      })
      .then(playlists => this.setState({
        playlists: playlists.map(item => {
          console.log(item.trackData)
          return {
            name: item.name,
            imageUrl: item.images[0].url,
            songs: item.trackData.slice(0,5).map(trackData => ({
              name: trackData.name
            }))
          }
        })
      }))
    }
  
  render() {
    let playlistToRender = 
      this.state.user &&
      this.state.playlists 
        ? this.state.playlists
        .filter(playlist =>
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase()))
        : []
    
      return (
      <div className="App">
        {this.state.user ?
        <div>
          <header className='appHeader'>
            <h1> Sortify </h1>
            <h2> Welcome, 
              <br/>
              {this.state.user.name}
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
