import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';

const style = {
  Dialog: {
    width: 500,
    height: 800,
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
    height: 80,
    marginTop: 20
  },
  TextField: {
    width: 400,
  },
  TextField1: {
    marginTop: 50,
    width: 400,
  },
  TextField5: {
    marginTop: 30,
    marginBottom: 50,
    width: 400,
  },
  Picker: {
    marginLeft: 90,
    marginTop: 10
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
    margin: 'auto',
  },
  TimeDiv: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center'
  },
   AmPm: {
    width: 70
  },
  Time: {
    width: 70
  },
  DatePicker: {
    marginTop: 20,
    marginLeft: 110
  }
};


class CreateEvent extends Component {
  constructor() {
  super()
  this.state = ({
    startDate: moment(),
    AmPm: "PM",
    time: "time"
  })
}


  createEvent () {
    if (this.title.value === "" || this.desc.value === "" || this.location.value === "") {
      alert('Input fields cannot be blank')
    } else {
      var location = this.location.value.trim()

      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDrokgrRy4bLs2HvjuA5Qa2zRbXp-q3ERk`)
           .then(response => {
             var lat = response.data.results[0].geometry.location.lat
             var lng = response.data.results[0].geometry.location.lng
             let event = {
                createdBy: this.props.username,
                title: this.title.value.trim(),
                desc: this.desc.value.trim(),
                date: this.state.startDate.format("dddd, MMMM Do"),
                time: this.state.time,
                AmPm: this.state.AmPm,

                location: location,
                lat: lat,
                lng: lng
              }
            base.update(`events/${event.title}`, {
              data: event
            })
            base.update(`users/${this.props.uid}/events/${event.title}`, {
              data: {title: event.title, date: event.date, time: event.time, location: event.location, created: true, AmPm: event.AmPm}
            })
    this.title.value = ""
    this.desc.value = ""
    this.location.value = ""
     })
   }
   this.props.toggleDialog()
 }


 handleAmPmChange = (event, index, AmPm) => {
   this.setState({AmPm});
 };

 handleTimeChange = (event, index, time) => {
   this.setState({time});
 };

 handleDateChange = (date) => {
   console.log('date', date)
  this.setState({
    startDate: date
  })
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
                  <input
                   ref={input => this.title = input}
                   style={style.TextField1}
                   placeholder="Event title"/>

                  <input style={style.TextArea}
                   ref={input => this.desc = input}
                   placeholder="Description . . ."/>

                   <div style={style.TimeDiv}>
                     <SelectField
                       value={this.state.time}
                       onChange={this.handleTimeChange}
                       maxHeight={200}
                       style={style.Time}
                       ref={input => this.time = input}
                     >
                       <MenuItem value="1" key="1" primaryText="1"  />
                       <MenuItem value="2" key="2" primaryText="2" />
                       <MenuItem value="3" key="3" primaryText="3"  />
                       <MenuItem value="4" key="4" primaryText="4" />
                       <MenuItem value="5" key="5" primaryText="5"  />
                       <MenuItem value="6" key="6" primaryText="6" />
                       <MenuItem value="7" key="7" primaryText="7"  />
                       <MenuItem value="8" key="8" primaryText="8" />
                       <MenuItem value="9" key="9" primaryText="9"  />
                       <MenuItem value="10" key="10" primaryText="10" />
                       <MenuItem value="11" key="11" primaryText="11"  />
                       <MenuItem value="12" key="12" primaryText="12" />
                     </SelectField>

                      <SelectField
                        value={this.state.AmPm}
                        onChange={this.handleAmPmChange}
                        maxHeight={200}
                        style={style.AmPm}
                        ref={input => this.AmPm = input}
                      >
                        <MenuItem value="AM" key="1" primaryText="AM"  />
                        <MenuItem value="PM" key="2" primaryText="PM" />
                      </SelectField>
                    </div>

                   <div style={style.DatePicker}>
                     <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleDateChange}
                      ref={input => this.date = input}
                     />
                  </div>

                 <input
                  ref={input => this.location = input}
                  style={style.TextField5}
                  placeholder="Location address"/>
              <button style={style.Button} onClick={this.createEvent.bind(this)}>Create</button>

            </Dialog>
        </MuiThemeProvider>

      </div>
    );
  }
}

export default CreateEvent;
