import React, { Component } from 'react';
import '../App.css';
import './responsive.css';
import { hashHistory } from 'react-router'
import base from '../config.js';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChatList from './chatList.js'


const style = {
  Component: {
    height: 1000
  },
  Paper: {
    backgroundColor: 'white'
  },
  InputDiv: {
    marginTop: 30,
    display: 'block',
    margin: 'auto',
    width: 350,
    backgroundColor: 'white',
    boxShadow: '1px 1.5px 2px  gray',
    paddingBottom: 15
  },
  Input: {
    marginTop: 40,
    width: 300,
    paddingBottom: 15,
  },
  ChatButton: {
    color: '#5DBCD2',
    marginLeft: 20
  },
}



class ChatDashboard extends Component {
  constructor() {
  super()
  this.state = ({
    usernames: []
  })
}

  componentDidMount () {
    base.listenTo('usernames', {
      context: this,
      asArray: true,
      then: (data) => {
        var usernameArray = data.map(username => {
          return username.username
        })
          this.setState({
            usernames: usernameArray
          })
        }
    })
  }

  newChat (searchText, index) {
    base.fetch(`usernames/${searchText}`, {
      context: this,
      then: (data) => {
        var uid = data.uid
        var uids = [`${this.props.uid}`, `${uid}`]
        var uidsAlph = uids.sort()
        hashHistory.push(`/chats/${uidsAlph[0]}/${uidsAlph[1]}`)
      }
    })
  }



  render() {
    var childrenWithProps = this.props.children && React.cloneElement(this.props.children, {
      uid: this.props.uid, username: this.props.username, avatar: this.props.avatar})

    return (
      <div style={style.Component} className="chatDashboard">
            <div style={style.InputDiv}>
              <MuiThemeProvider>
                <AutoComplete
                  floatingLabelText="Search for an Angel"
                  filter={AutoComplete.fuzzyFilter}
                  dataSource={this.state.usernames}
                  maxSearchResults={5}
                  onNewRequest={this.newChat.bind(this)}
                />
              </MuiThemeProvider>

              <MuiThemeProvider>
                <ChatBubble style={style.ChatButton} />
              </MuiThemeProvider>
            </div>
            {childrenWithProps}
            <ChatList uid={this.props.uid}/>

      </div>
    )
  }
}


export default ChatDashboard;
