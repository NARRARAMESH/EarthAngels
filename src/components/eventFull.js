import React, { Component } from 'react';
import base from '../config.js'
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import CloudDone from 'material-ui/svg-icons/file/cloud-done';
import Comments from './comments.js'
import {Gmaps, Marker} from 'react-gmaps';


const style = {
  Events: {
    display: 'flex',
    justifyConent: 'space-around',
    height: 1000,
    marginLeft: 100
  },
  Paper: {
    height: 900,
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
    paddingBottom: 20
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
    marginTop: 135,
    marginLeft: 40
  }
};


class EventFull extends Component {
  constructor() {
  super()
  this.state = ({
    event: {}
  })
}

componentDidMount () {
    base.fetch(`events/${this.props.params.eventFull}`, {
      context: this,
      then: (data) => {
        this.setState({
          event: data
        })
      }
    })
  }


  attendEvent () {
    base.update(`events/${this.state.event.title}/attending/users/${this.props.uid}`, {
      data: {username: this.props.username}
    })
    base.update(`users/${this.props.uid}/events/attending/${this.state.event.title}`, {
      data: {date: this.state.event.date, time: this.state.event.time, location: this.state.event.location}
    })
  }


    onMapCreated (map) {
      map.setOptions({
        disableDefaultUI: true
      })
    }


  renderMap () {
    if (this.state.event.lat !== "" && this.state.event.lat !== "") {
      return (
               <div style={style.MapDiv}>
                 <Gmaps
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

  render() {
    return (
      <div style={style.Events}>

      <MuiThemeProvider>
          <Paper style={style.Paper} zDepth={2}>
          <AppBar
            showMenuIconButton={false}
            iconElementRight={<button
                              onClick={this.attendEvent.bind(this)}
                              style={style.Button}
                              >
                                <CloudDone style={style.CloudDone}/>
                              </button>
                             }
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

          </Paper>
      </MuiThemeProvider>

      {this.renderMap()}
      </div>
    );
  }
}

export default EventFull;
