import React, { Component } from 'react';
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';


class Logout extends Component {
  state = {
  logged: true,
};

handleChange = (event, logged) => {
  this.setState({logged: logged});
};



  render() {
    return (
      <div className="logout">
             <Toggle
               label="Logged"
               defaultToggled={true}
               onToggle={this.handleChange}
               labelPosition="right"
               style={{margin: 20}}
             />
             <AppBar
               title="Title"
               iconElementLeft={<IconButton><NavigationClose /></IconButton>}
               iconElementRight={this.state.logged ? <Logged /> : <Login />}
             />
           </div>
    );
  }
}

export default Logout;
