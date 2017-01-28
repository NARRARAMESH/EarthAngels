import React, { Component } from 'react';
import base from '../config.js'
import '../App.css';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Comments from './comments.js'


const style = {
  Events: {
    height: 1000
  },
  Paper: {
    height: 800,
    width: 600,
    marginLeft: 250,
    marginTop: 60,
    textAlign: 'center',
    display: 'inline-block',
    fontFamily: 'Cinzel Decorative'
  },
  Div: {
    backgroundColor: '#f7f9f9',
    marginRight: 40,
    paddingTop: 5,
    paddingBottom: 20
  },
  List: {
    listStyleType: 'none'
  },
  Location: {
    textAlign: 'center',
    marginLeft: -10
  },
  Desc: {
    textAlign: 'center',
    marginLeft: -10
  },
  CheckBox: {
    margin: 'auto',
    marginLeft: -40,
    width: 50,
    height: 50,
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


  render() {
    return (
      <div style={style.Events}>

      <MuiThemeProvider>
          <Paper style={style.Paper} zDepth={2}>

          <ul style={style.List}>
            <li>
                <div style={style.Div}>
                  <h3>{this.state.event.title}</h3>
                  <span>{this.state.event.date} at</span><span> {this.state.event.time}</span>
                  <p style={style.Location}>{this.state.event.location}</p>
                  <hr />
                  <p style={style.Desc}>{this.state.event.desc}</p>



                  <IconButton tooltip="attending?" tooltipPosition="top-center">
                    <Checkbox
                      onCheck={this.attendEvent.bind(this)}
                      iconStyle={style.CheckBox}
                      labelStyle={style.Label}
                    />
                  </IconButton>
                </div>

            </li>
          </ul>

          <Comments uid={this.props.uid} username={this.props.username} event={this.state.event} avatar={this.props.avatar}/>

          </Paper>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default EventFull;

// {this.showAttendees()}

//
// showAttendees () {
//   if (this.state.event.attending) {
//   var usernames = Object.keys(this.state.event.attending.users).map((key, index) => {
//     return {this.state.event.attending.users[key].username}
//   })
// }
// return <span>Attending:{usernames}</span>
// }
