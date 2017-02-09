import React, { Component } from 'react';
import base from '../config.js'
import '../App.css';
import './responsive.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import CloudDone from 'material-ui/svg-icons/file/cloud-done';
import Comments from './comments.js'
import Attendees from './attendees.js'
import {Gmaps, Marker} from 'react-gmaps';


const style = {
  Events: {
    display: 'flex',
    justifyConent: 'space-around',
    height: 1000,
    marginLeft: 100
  },
  Paper: {
    height: 930,
    width: 600,
    marginLeft: 250,
    marginTop: 60,
    textAlign: 'center',
    display: 'inline-block',
    fontFamily: 'Cinzel Decorative'
  },
  Div: {
    marginRight: 40,
    paddingTop: 5,
    paddingBottom: 20,
    marginTop: -30
  },
  Card: {
    backgroundColor: '#edfbff',
    zDepth: 3
  },
  List: {
    listStyleType: 'none'
  },
  EventInfo: {
    marginTop: 10,
    textAlign: 'center',
    marginLeft: -10,
    color: 'black',
    fontFamily: 'Josefin Sans',
    fontSize: 22
  },
  Desc: {
    textAlign: 'center',
    marginLeft: -10,
    fontSize: 20
  },
  CheckBox: {
    marginLeft: -25,
    width: 48,
    height: 48,
    backgroundColor: '#adadf4',
    borderRadius: 5,
  },
  Button: {
    width: 70,
    height: 50,
    backgroundColor: '#adadf4',
    borderRadius: 5,
    border: 'none',
    color: 'white',
    boxShadow: '1px 1.5px 2px  gray',
    fontFamily: 'Josefin Sans',
    fontWeight: 'bolder',
    letterSpacing: 1,
    fontSize: 26,
    float: 'right',
    marginRight: 10,
    marginBottom: 10
  },
  CloudDone: {
    color: 'white',
    width: 50,
    height: 48
  },
  TitleStyle: {
    fontFamily: 'Josefin Sans',
    fontSize: 30,
    marginRight: -300
  },
  InfoHeader: {
    fontFamily: 'Cinzel Decorative',
    fontWeight: 'bolder',
    fontSize: 30
  },
  Title: {
    backgroundColor: '#1C3285',
    maxWidth: '100%',
    color: 'white',
    marginTop: 15,
    opacity: .95,
    borderRadius: 5,
    padding: 10,
    boxShadow: '1px 1.5px 2px  gray'
  },
  MapBox: {
    width: 400,
    height: 400,
    display: 'block',
    margin: 'auto',
    marginTop: 20
  },
  MapDiv: {
    width: 440,
    height: 440,
    backgroundColor: 'white',
    marginTop: 125,
    marginLeft: 40
  },
  AppBarTitle: {
    marginLeft: 270
  }
};


class EventFull extends Component {
  constructor() {
  super()
  this.state = ({
    event: {},
    title: "✓ to attend",
    isAttending: {}
  })
}

componentDidMount() {
    base.fetch(`events/${this.props.params.eventFull}`, {
      context: this,
      then: (data) => {
        this.setState({
          event: data
        })
        base.listenTo(`users/${this.props.uid}/events/${this.state.event.title}`, {
          context: this,
          then: (data) => {
            this.setState({
              isAttending: data
            })
          }
        })
      }
    })
  }


  attendEvent () {
    base.update(`events/${this.state.event.title}/attending/users/${this.props.uid}`, {
      data: {uid: this.props.uid, username: this.props.username, avatar: this.props.avatar}
    })
    base.update(`users/${this.props.uid}/events/${this.state.event.title}`, {
      data: {title: this.state.event.title, date: this.state.event.date, time: this.state.event.time, AmPm: this.state.event.AmPm, location: this.state.event.location, isAttending: true}
    })
    this.setState({title: "Attending"})
  }


  onMapCreated (map) {
    map.setOptions({
      disableDefaultUI: true
    })
  }


  renderMap () {
    if (this.state.event.lat !== "" && this.state.event.lat !== "") {
      return (
               <div style={style.MapDiv} className="MapDiv">
                 <Gmaps
                    className="MapBox"
                    style={style.MapBox}
                    lat={this.state.event.lat}
                    lng={this.state.event.lng}
                    zoom={12}
                    params={{v: '3.exp', key: 'AIzaSyAl-RCx1yHNi4DFSEZiPwgb4qhoUT39RTk'}}>
                  <Marker
                    lat={this.state.event.lat}
                    lng={this.state.event.lng}
                    draggable={true}
                    onDragEnd={this.onDragEnd} />
                </Gmaps>
              </div>
            )
    }
  }

  renderButton () {
    if (this.state.isAttending.isAttending === true || this.state.isAttending.created === true ) {
      return null
    } else {
      return <button
              onClick={this.attendEvent.bind(this)}
              style={style.Button}
              className="attendButton"
              >
                <CloudDone style={style.CloudDone}/>
              </button>
      }
  }

  renderTitle () {
    if (this.state.isAttending.created === true ) {
      return "Your Event"
    }
    if (this.state.isAttending.isAttending === true ) {
      return "Attending"
    } else {
      return this.state.title
      }
  }

  render() {
    return (
      <div style={style.Events} className="container">

      <MuiThemeProvider>
          <Paper style={style.Paper} zDepth={2} className="eventFull">
          <AppBar
            title={this.renderTitle()}
            titleStyle={style.AppBarTitle}
            showMenuIconButton={false}
            iconElementRight={this.renderButton()}
          />
          <Card style={style.Card}>
          <ul style={style.List}>
            <li>
                <div style={style.Div}>
                  <h1 style={style.Title}>{this.state.event.title}</h1>
                  <span style={style.InfoHeader}>When:</span>
                  <p style={style.EventInfo}>{this.state.event.date} at {this.state.event.time}</p>
                  <span style={style.InfoHeader}>Where:</span>
                  <p style={style.EventInfo}>{this.state.event.location}</p>
                  <span style={style.InfoHeader}>Why:</span>
                  <p style={style.Desc}>{this.state.event.desc}</p>
                </div>
            </li>
          </ul>
          </Card>

          <Comments uid={this.props.uid} username={this.props.username} event={this.state.event} avatar={this.props.avatar}/>
          <Attendees eventTitle={this.state.event.title} uid={this.props.uid} username={this.props.username} event={this.state.event} avatar={this.props.avatar}/>

          </Paper>
      </MuiThemeProvider>

      {this.renderMap()}
      </div>
    );
  }
}

export default EventFull;
