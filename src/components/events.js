import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Search from 'material-ui/svg-icons/action/search';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import Close from 'material-ui/svg-icons/navigation/close';
import InfiniteScroll from 'react-infinite-scroll-component';
import Favorite from 'material-ui/svg-icons/action/favorite';
import { Link } from 'react-router'


const style = {
  Events: {
    height: 1000,
    display: 'flex',
    alignContent: 'space-between'
  },
  Attending: {
    height: 360,
    width: 300,
    marginTop: 60,
    marginLeft: 80
  },
  Paper: {
    height: 800,
    width: 600,
    marginLeft: 350,
    marginTop: 60,
    textAlign: 'center',
    display: 'inline-block',
    fontFamily: 'Cinzel Decorative'
  },
  AppBar: {
    fontFamily: 'Cinzel Decorative',
  },
  Dialog: {
    width: '500px',
    height: '700px'
  },
  Menu: {
    backgroundColor: '#1C3285',
    position: 'fixed',
    top: '0px',
    width: '500px',
    height: '50px',
    marginLeft: '-24px',
    color: 'white'
  },
  TextArea: {
    width: 350,
    height: 80
  },
  MenuItem: {
    marginTop: 30,
  },
  MenuItem2: {
    marginBottom: 30,
  },
  TextField: {
    width: 350,
  },
  CloseButton: {
    color: 'white',
    marginLeft: 445
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
    marginLeft: -10,
    color: 'black'
  },
  Link: {
    textDecoration: 'none'
  },
  EventDashboard: {
    display: 'flex',
    flexDirection: 'column'
  },
  Title: {
    backgroundColor: '#1C3285',
    width: 400,
    marginLeft: 50,
    color: 'white',
    opacity: .95,
    borderRadius: 5,
    padding: 10,
    boxShadow: '1px 1.5px 2px  gray',
  }
};


class Events extends Component {
  constructor () {
    super()
    this.state=({
      dialog: false,
      events: [],
      created: [],
      attending: []
    })
  }

  componentDidMount () {
    base.listenTo(`events`, {
      context: this,
      asArray: true,
      then: (data) => {
        this.setState({
          events: data
        })
      }
    })
  }

  componentWillReceiveProps (props) {
  if (this.props.uid !== "") {
  base.listenTo(`user/${this.props.uid}/events/attending`, {
    context: this,
    asArray: true,
    then: (data) => {
      console.log('data is', data)
      this.setState({
        attending: data
      })
    }
  })
 }
}

  toggleEvent = () => this.setState({ dialog: !this.state.dialog })


  createEvent () {
    if (this.title.value === "" || this.desc.value === "" || this.date.value === "" ||
        this.time.value === "" || this.location.value === "") {
      alert('Input fields cannot be blank')
    } else {
      let event= {
        createdBy: this.props.username,
        title: this.title.input.value.trim(),
        desc: this.desc.value.trim(),
        date: this.date.refs.input.input.value.trim(),
        time: this.time.refs.input.input.value.trim(),
        location: this.location.input.value.trim()
      }
    base.update(`events/${event.title}`, {
      data: event
    })
    base.update(`users/${this.props.uid}/events/created/${event.title}`, {
      data: {date: event.date, time: event.time, location: event.location}
    })
    this.title.value = ""
    this.desc.value = ""
    this.date.value = ""
    this.time.value = ""
    this.location.value = ""
   }
   this.setState({ dialog: false })
  }


  render() {
    console.log('this.state.attending is', this.state.attending)
    return (
      <div style={style.Events}>

      <MuiThemeProvider>
          <Paper style={style.Paper} zDepth={2}>
              <AppBar
                style={style.AppBar}
                title="Angel Events near you"
                iconElementLeft={<IconButton><Search /></IconButton>}
              >
              <IconButton tooltip="Create Event"
                  iconStyle={style.CreateEvent}
                  onClick={this.toggleEvent}>
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
                                <h2 style={style.Title}>{event.title}</h2>
                                <p style={style.EventInfo}>{event.date} at {event.time}</p>
                                <p style={style.EventInfo}>{event.location}</p>
                                <hr />
                              </Link>
                              </div>
                           </li>
                  })
                }
                </ul>
                </InfiniteScroll>
          </Paper>
      </MuiThemeProvider>

      <div style={style.EventDashboard}>

        <MuiThemeProvider>
          <Paper style={style.Attending} zDepth={2}>
            <AppBar style={style.AppBar} showMenuIconButton={false} title="Attending" />
            <ul style={style.List}>
              {this.state.attending.map((event, index) => {
                  return <li key={index}>
                            <div >
                              <h3>{event.title}</h3>
                              <span>{event.date} at</span><span> {event.time}</span>
                              <p style={style.Location}>{event.location}</p>
                              <hr />
                            </div>
                         </li>
                })
              }
              </ul>
          </Paper>
        </MuiThemeProvider>

        <MuiThemeProvider>
          <Paper style={style.Attending} zDepth={2}>
            <AppBar style={style.AppBar} showMenuIconButton={false} title="Created" />

          </Paper>
        </MuiThemeProvider>
      </div>


        <MuiThemeProvider>
            <Dialog
              contentStyle={style.Dialog}
              open={this.state.dialog}>
              <div  style={style.Menu}>
                <IconButton iconStyle={style.CloseButton} onTouchTap={this.toggleEvent}>
                  <Close />
                </IconButton>

              </div>
              <Menu>
                <MenuItem style={style.MenuItem}>
                  <TextField
                  ref={input => this.title = input}
                   style={style.TextField}
                   hintText="Event title"/>
                </MenuItem>

                <MenuItem style={style.MenuItem}>
                    <textarea style={style.TextArea}
                     ref={textArea => this.desc = textArea}
                     className="eventTextArea" placeholder="Description..."/>
                </MenuItem>

                <MenuItem>
                  <DatePicker
                   ref={input => this.date = input}
                   hintText="Select date" mode="portrait"/>
                </MenuItem>

                <MenuItem>
                  <TimePicker
                   ref={input => this.time = input}
                   hintText="Select time"/>
                </MenuItem>

                <MenuItem style={style.MenuItem2}>
                 <TextField
                  ref={input => this.location = input}
                  style={style.TextField}
                  hintText="Location address"/></MenuItem>
              </Menu>
              <RaisedButton style={style.Button} onClick={this.createEvent.bind(this)} label='Create' />

            </Dialog>
        </MuiThemeProvider>

        {this.props.children}

      </div>
    );
  }
}

export default Events;
