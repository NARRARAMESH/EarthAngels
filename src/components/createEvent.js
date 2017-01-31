import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import Close from 'material-ui/svg-icons/navigation/close';
// import Calendar from './calendar.js'


const style = {
  Dialog: {
    width: '500px',
    height: '800px'
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
    width: 400,
    height: 80
  },
  TextField: {
    width: 400,
  },
  TextField1: {
    marginTop: 50,
    width: 400,
  },
  TextField5: {
    marginBottom: 50,
    width: 400,
  },
  CloseButton: {
    color: 'white',
    marginLeft: 445
  },
  List: {
    listStyleType: 'none'
  },
  EventInfo: {
    textAlign: 'center',
    marginLeft: -10,
    color: 'black'
  },
  Button: {
    width: 90,
    height: 40,
    backgroundColor: '#adadf4',
    borderRadius: 5,
    border: 'none',
    color: 'white',
    boxShadow: '1px 1.5px 2px  gray',
    fontWeight: 'bolder',
    fontSize: 16,
    display: 'block',
    margin: 'auto'
  },
};


class CreateEvent extends Component {


  createEvent () {
    if (this.title.value === "" || this.desc.value === "" || this.date.value === "" ||
        this.time.value === "" || this.location.value === "") {
      alert('Input fields cannot be blank')
    } else {
      var location = this.location.input.value.trim()

      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDrokgrRy4bLs2HvjuA5Qa2zRbXp-q3ERk`)
           .then(response => {
             var lat = response.data.results[0].geometry.location.lat
             var lng = response.data.results[0].geometry.location.lng
             let event = {
                createdBy: this.props.username,
                title: this.title.input.value.trim(),
                desc: this.desc.input.value.trim(),
                date: this.date.refs.input.input.value.trim(),
                time: this.time.refs.input.input.value.trim(),
                location: location,
                lat: lat,
                lng: lng
              }
            base.update(`events/${event.title}`, {
              data: event
            })
            base.update(`users/${this.props.uid}/events/created/${event.title}`, {
              data: {date: event.date, time: event.time, location: event.location}
            })
    this.title.input.value = ""
    this.desc.input.value = ""
    this.location.input.value = ""
     })
   }
   this.props.toggleDialog()
 }


  render() {
    return (
      <div style={style.Events}>

        <MuiThemeProvider>
            <Dialog
              contentStyle={style.Dialog}
              open={this.props.dialog}>
              <div  style={style.Menu}>
                <IconButton iconStyle={style.CloseButton} onTouchTap={this.props.toggleDialog}>
                  <Close />
                </IconButton>

              </div>
                  <TextField
                  ref={input => this.title = input}
                   style={style.TextField1}
                   hintText="Event title"/>

                    <TextField style={style.TextArea}
                     ref={input => this.desc = input}
                     className="eventTextArea" placeholder="Description..."/>

                  <DatePicker
                   ref={input => this.date = input}
                   hintText="Select date" mode="portrait"/>

                  <TimePicker
                   ref={input => this.time = input}
                   hintText="Select time"/>

                 <TextField
                  ref={input => this.location = input}
                  style={style.TextField5}
                  hintText="Location address"/>
              <button style={style.Button} onClick={this.createEvent.bind(this)}>Create</button>

            </Dialog>
        </MuiThemeProvider>

      </div>
    );
  }
}

export default CreateEvent;
