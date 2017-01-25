import React, { Component } from 'react';
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Close from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';


const style = {
  Dialog: {
    width: 400,
  },
  Menu: {
    backgroundColor: '#1C3285',
    position: 'fixed',
    top: 0,
    width: 400,
    height: 50,
    marginLeft: -24
  },
  MenuItem: {
    marginTop: 50,
  },
  MenuItem2: {
    marginBottom: 30,
  },
  Button: {
    display: 'block',
    margin: 'auto'
  },
  CloseButton: {
    color: 'white',
    marginLeft: 345
  }
};


class Login extends Component {

  render() {
    return (
      <div className="login">
        <MuiThemeProvider>
            <Dialog
              className="dialog"
              contentStyle={style.Dialog}
              open={this.props.logInOpen}
            >
              <Menu>
                <div style={style.Menu}>
                  <IconButton iconStyle={style.CloseButton} onTouchTap={this.props.logInClose}>
                      <Close />
                  </IconButton>

                </div>
                <MenuItem style={style.MenuItem}><TextField hintText="username" /></MenuItem>
                <MenuItem><TextField hintText="email" /></MenuItem>
                <MenuItem style={style.MenuItem2}><TextField hintText="password" /></MenuItem>
              </Menu>

              <RaisedButton
                style={style.Button}
                onTouchTap={this.props.userLogIn}
                label="Login with Google"
              />
              <RaisedButton
                style={style.Button}
                onTouchTap={this.props.userLogOut}
                label="Logout"
              />

            </Dialog>
         </MuiThemeProvider>
      </div>
    );
  }
}

export default Login;
