import React, { Component } from 'react';
import base from './config.js'
import './App.css';
import { hashHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ToDo from './components/todo.js'
import Journal from './components/journal.js'
import Login from './components/login.js'
import Sidebar from './components/sidebar.js'


injectTapEventPlugin()

const style = {
  AppBar: {
    fontFamily: "Cinzel Decorative",
    fontWeight: 'bolder'
  },
  FlatButton: {
    color: 'white',
    marginTop: '10px',
    fontFamily: 'Josefin Sans'
  }
}


class App extends Component {
  constructor() {
  super()
  this.state = ({
    user: {},
    uid: "",
    username: "",
    avatar: "",
    // open: false,
    logInOpen: false,
    toDo: false,
    journal: false
  })
}



  componentDidMount () {
    this.unsubscribe = base.onAuth(this.authStateChanged.bind(this))
  }


  logIn () {
    console.log('this is', this)
    base.authWithOAuthPopup('google', this.authStateChanged.bind(this))

    .then(() => {
      hashHistory.push('/feedofKindness')
    })
  }

  logOut(){
    base.unauth()
    this.setState({
      user: ""
    })
  }


  authStateChanged (user) {
     this.setState({
       uid: user.uid,
       username: user.displayName,
       avatar: user.photoURL
     })
     base.fetch(`users/${user.uid}`, {
       context: this,
       then(data){
         if (data === null) {
           console.log('user is', user)
           base.post(`users/${user.uid}`, {
             data: {uID: user.uid},
           })
         } else {
           base.update(`users/${user.uid}`, {
             data: {uID: user.uid},
           })
         }
       }
     })
  }

  componentWillUnmount () {
    base.removeBinding(this.sync)
    this.unsubscribe()
  }


  logInOpen = () => this.setState({ logInOpen: true })
  logInClose = () => this.setState({ logInOpen: false })

  toggleToDo = () => this.setState({toDo: !this.state.toDo});
  closeToDo = () => this.setState({toDo: false});

  toggleJournal = () => this.setState({journal: !this.state.journal});
  closeJournal = () => this.setState({journal: false});


  render() {
    return (
      <div className="App">

        <MuiThemeProvider>
            <AppBar
              style={style.AppBar}
              title="Earth Angels"
              showMenuIconButton={false}
            >
            <FlatButton
              style={style.FlatButton}
              onTouchTap={this.logInOpen}
              label="Login"
            />
            </AppBar>
        </MuiThemeProvider>

        <Login logInOpen={this.state.logInOpen} logInClose={this.logInClose} userLogIn={this.logIn.bind(this)} userLogOut={this.logOut.bind(this)} />

        <Sidebar toDo={this.state.toDo} toggleToDo={this.toggleToDo}
                 journal={this.state.journal} toggleJournal={this.toggleJournal}
                 avatar={this.state.avatar}
                 username={this.state.username}
                 uid={this.state.uid}
        />

        <ToDo toDo={this.state.toDo} toggleToDo={this.toggleToDo} uid={this.state.uid}/>
        <Journal journal={this.state.journal} toggleJournal={this.toggleJournal} uid={this.state.uid}/>
        {this.props.children}

      </div>
    );
  }
}

export default App;
