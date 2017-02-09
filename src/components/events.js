import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import './responsive.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Search from 'material-ui/svg-icons/action/search';
import InfiniteScroll from 'react-infinite-scroll-component';
import Favorite from 'material-ui/svg-icons/action/favorite';
import { Link } from 'react-router'
import CreateEvent from './createEvent.js';
import EventList from './eventList.js';
import CircularProgress from 'material-ui/CircularProgress';


const style = {
  Events: {
    height: 1000,
    display: 'flex',
    alignContent: 'space-between'
  },
  Paper: {
    height: 800,
    width: 600,
    marginLeft: 350,
    marginTop: 60,
    textAlign: 'center',
    display: 'block',
    fontFamily: 'Cinzel Decorative'
  },
  AppBar: {
    fontFamily: 'Cinzel Decorative',
  },
  CreateEvent: {
    color: 'white',
    width: 48,
    height: 48,
    backgroundColor: '#adadf4',
    borderRadius: 120,
    boxShadow: '1px 1.5px 2px  gray',
    marginTop: -5,
  },
  List: {
    listStyleType: 'none'
  },
  EventInfo: {
    textAlign: 'center',
    marginLeft: -20,
    color: 'black'
  },
  Link: {
    textDecoration: 'none'
  },
  Title: {
    display: 'block',
    margin: 'auto',
    backgroundColor: '#1C3285',
    width: 400,
    color: 'white',
    opacity: .95,
    borderRadius: 5,
    padding: 10,
    boxShadow: '1px 1.5px 2px  gray',
  },
  Heart: {
    color: 'white'
  },
  Spinner: {
    marginLeft: 34
  },
  Hr: {
    color: '#ccc'
  }
};


class Events extends Component {
  constructor () {
    super()
    this.state=({
      dialog: false,
      events: [],
      created: [],
      attending: [],
      deviceLat: "",
      deviceLng: "",
      distance: false
    })
  }


  localizeEvents (lat, lng) {
  	var radlat = Math.PI * lat/180
  	var deviceRadlat = Math.PI * this.state.deviceLat/180
  	var theta = lng-this.state.deviceLng
  	var radtheta = Math.PI * theta/180
  	var distance = Math.sin(radlat) * Math.sin(deviceRadlat) + Math.cos(radlat) * Math.cos(deviceRadlat) * Math.cos(radtheta);
  	distance = Math.acos(distance)
  	distance = distance * 180/Math.PI
  	distance = distance * 60 * 1.1515
  	return distance
  }


  getLocation (data) {
    navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          deviceLat: position.coords.latitude,
          deviceLng: position.coords.longitude
        })
        var localEvents = data.filter((event) => this.localizeEvents(event.lat, event.lng) < 50)
        this.setState({
          events: localEvents
        })
    })
  }

  componentDidMount () {
    base.listenTo('events', {
      context: this,
      asArray: true,
      queries: {
      orderByChild: 'timeStamp',
    },
      then: (data) => {
        this.getLocation(data)
      }
    })
  }

  toggleDialog = () => this.setState({ dialog: !this.state.dialog })

  toggleDistance = () => this.setState({ distance: !this.state.distance })


  showSpinner() {
    if (this.state.events.length === 0) {
      return  <CircularProgress size={80} thickness={5} style={style.Spinner} />

    }
  }


  render() {
    return (
      <div style={style.Events} className="container">
        <MuiThemeProvider>
            <Paper style={style.Paper} className="events" zDepth={2}>
                <AppBar
                  style={style.AppBar}
                  title="Angel Events near you"
                  iconElementLeft={<IconButton><Search onClick={this.toggleDistance}/></IconButton>}
                >
                <IconButton tooltip="Create Event"
                    iconStyle={style.CreateEvent}
                    onClick={this.toggleDialog.bind(this)}>
                    <ContentAdd />
                </IconButton>
                </AppBar>

                <InfiniteScroll
                  height={700}
                  endMessage={<Favorite/>}
                  loader={<h4>Loading...</h4>}>

                  <ul style={style.List}>
                    {this.state.events.map((event, index) => {
                        return <li key={index}>
                                  <div >
                                  <Link style={style.Link} className="link" to={`/events/${event.title}`} activeClassName="active">
                                    <h2 style={style.Title} className="title" >{event.title}</h2>
                                    <p style={style.EventInfo}>{event.date}</p>
                                    <p style={style.EventInfo}>{event.time} {event.AmPm}</p>
                                    <p style={style.EventInfo}>{event.location}</p>
                                    <hr style={style.Hr} />
                                  </Link>
                                  </div>
                               </li>
                    })
                    }
                    </ul>
                    {this.showSpinner()}
                  </InfiniteScroll>

            </Paper>
        </MuiThemeProvider>

        <EventList uid={this.props.uid} events={this.state.events} />
        <CreateEvent uid={this.props.uid} dialog={this.state.dialog} toggleDialog={this.toggleDialog} username={this.props.username} avatar={this.props.avatar}/>

      </div>
    );
  }
}

export default Events;




// <Distance distance={this.state.distance} toggleDialog={this.toggleDistance} newLocation={this.newLocation}/>

// newLocation (distance) {
//   navigator.geolocation.getCurrentPosition((position) => {
//       this.setState({
//         deviceLat: position.coords.latitude,
//         deviceLng: position.coords.longitude
//       })
//       var localEvents = this.state.events.filter((event) => this.localizeEvents(event.lat, event.lng) <= distance)
//       this.setState({
//         events: localEvents
//       })
//   })
// }
