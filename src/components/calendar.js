import React, { Component } from 'react';
import '../App.css';
// import base from '../config.js';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dayz, {EventsCollection}  from "dayz";
import moment from 'moment'
import MomentRange from 'moment-range';
import '../dayz.css'



const style = {
  Calendar: {
    width: 300,
    height: 300
  }
}


class Calendar extends Component {
  constructor () {
    super()
    this.state=({
      dialog: false,
      events: [],
      date: '01-31-2017'
    })
  }

  componentWillMount() {
        const date = moment('2011-10-21');
        console.log('eventscollection is', Dayz.EventsCollection)
        const events = new Dayz.EventsCollection([
            { content: 'A short event',
              range: moment.range( date.clone(),
                                   date.clone().add(1, 'day') ) },
            { content: 'Two Hours ~ 8-10',
              range: moment.range( date.clone().hour(8),
                                   date.clone().hour(10) ) },
            { content: "A Longer Event",
              range: moment.range( date.clone().subtract(2,'days'),
                                   date.clone().add(8,'days') ) }
        ]);
        this.setState({events, date});
    }

  render() {
    return (

        <Dayz
         display='day'
         date={this.state.date}
         events={this.state.events}
        />

    )
  }




}

  export default Calendar;
