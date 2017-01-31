import React, { Component } from 'react';
import '../App.css';
// import base from '../config.js';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dayz from "react-day-picker";
import moment from 'moment'


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
      date: '01-30-2017'
    })
  }

  componentWillMount() {
        const date = moment('2011-10-21');
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
        this.state({events, date});
    }

  render() {
    return (
      <MuiThemeProvider>

      <Paper style={style.Calendar}>

        <Dayz
         display='week'
         date={this.state.date}
        />


      </Paper>
      </MuiThemeProvider>



    )
  }




}

  export default Calendar;
