import React, { Component } from 'react';
import base from './config.js';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ToDo from './components/todo.js';
import Journal from './components/journal.js';
import Login from './components/login.js';
import Sidebar from './components/sidebar.js';


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
    logInOpen: false,
    toDo: false,
    journal: false
  })
}

  componentDidMount () {
    this.unsubscribe = base.onAuth(this.authStateChanged.bind(this))
  }


  logIn () {
    base.authWithOAuthPopup('google', this.authStateChanged.bind(this))
  }

  logOut(){
    base.unauth()
    this.setState({
      user: {}
    })
  }


  authStateChanged (user) {
    if (user) {
       this.setState({
       uid: user.uid,
       username: user.displayName,
       avatar: user.photoURL
     })
     base.fetch(`users/${user.uid}`, {
       context: this,
       then(data){
         if (data === null) {
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
   } else {
     this.setState({
     user: {}
   })
   }
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

  renderButton() {
    if (this.state.uid === "") {
      return <FlatButton
              style={style.FlatButton}
              onTouchTap={this.logInOpen}
              label="Login"
            />
    } else {
      return <FlatButton
        style={style.FlatButton}
        onTouchTap={this.logOut}
        label="Logout"
      />
    }
  }


  render() {
    var childrenWithProps = React.cloneElement(this.props.children, {
      uid: this.state.uid, username: this.state.username, avatar: this.state.avatar})

    return (
      <div className="App">

        <MuiThemeProvider>
            <AppBar
              style={style.AppBar}
              title="Earth Angels"
              showMenuIconButton={false}
            >
            {this.renderButton()}

            </AppBar>
        </MuiThemeProvider>

        <Login logInOpen={this.state.logInOpen} logInClose={this.logInClose} userLogIn={this.logIn.bind(this)} userLogOut={this.logOut.bind(this)} />

        <Sidebar toDo={this.state.toDo} toggleToDo={this.toggleToDo}
                 journal={this.state.journal} toggleJournal={this.toggleJournal}
                 avatar={this.state.avatar}
                 username={this.state.username}
                 uid={this.state.uid}
        />

        <ToDo toDo={this.state.toDo} toggleToDo={this.toggleToDo} uid={this.state.uid} username={this.state.username} avatar={this.state.avatar}/>
        <Journal journal={this.state.journal} toggleJournal={this.toggleJournal} uid={this.state.uid}/>

        {childrenWithProps}


      </div>
    );
  }
}

export default App;
