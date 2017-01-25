import React, { Component } from 'react';
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Search from 'material-ui/svg-icons/action/search';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import Close from 'material-ui/svg-icons/navigation/close';




const style = {
  Events: {
    height: 800
  },
  Paper: {
    height: 600,
    width: 500,
    marginLeft: 250,
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
    width: 40,
    height: 40,
    backgroundColor: '#1C3285',
    borderRadius: 120
  }
};


class Events extends Component {
  constructor () {
    super()
    this.state=({
      dialog: false
    })
  }

  toggleEvent = () => this.setState({ dialog: !this.state.dialog })


  render() {
    return (
      <div style={style.Events}>

        <MuiThemeProvider>
            <Paper style={style.Paper} zDepth={2}>
                <AppBar
                  style={style.AppBar}
                  title="Let's heal the world"
                  iconElementLeft={<IconButton><Search /></IconButton>}
                >
                <IconButton tooltip="Create Event"
                    iconStyle={style.CreateEvent}
                    onClick={this.toggleEvent}>
                    <ContentAdd />
                </IconButton>
                </AppBar>
            </Paper>
        </MuiThemeProvider>

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
                <MenuItem style={style.MenuItem}><TextField style={style.TextField} hintText="Event title"/></MenuItem>
                <MenuItem style={style.MenuItem}><textarea style={style.TextArea} className="eventTextArea" placeholder="Description..."/></MenuItem>
                <MenuItem><DatePicker  hintText="Select date" mode="portrait"/></MenuItem>
                <MenuItem><TimePicker  hintText="Select time"/></MenuItem>
                <MenuItem style={style.MenuItem2}><TextField style={style.TextField} hintText="Location"/></MenuItem>
              </Menu>
              <RaisedButton style={style.Button} onClick={this.toggleEvent} label='Create' />

            </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Events;
