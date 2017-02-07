import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import Paper from 'material-ui/Paper';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import InfiniteScroll from 'react-infinite-scroll-component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Delete from 'material-ui/svg-icons/action/delete';


const style = {
  Component: {
    display: 'flex',
    justifyContent: 'center'
  },
  Chat: {
    display: 'block',
    margin: 'auto',
    backgroundColor: 'white',
    width: 500,
    height: 600,
    marginTop: 40,
  },
  Header: {
    height: 40,
    backgroundColor: '#1C3285'
  },
  Time: {
    color: '#ccc',
    fontFamily: 'verdana',
    fontSize: 12,
    float: 'right',
    marginRight: 40,
    fontWeight: 'lighter'
  },
  List: {
    listStyleType: 'none'
  },
  Avatar: {
    float: 'left',
    marginRight: 25,
    width: 45,
    height: 45,
    borderRadius: 10,
    border: 'none',
    marginBottom: 60,
  },
  Username: {
    fontFamily: 'Cinzel Decorative',
    fontSize: 16
  },
  CommentText: {
    fontFamily: 'Josefin Sans',
    fontSize: 20,
    marginRight: 80,
    textAlign: 'justify',
    lineHeight: 1.5
  },
  PostButton: {
    color: 'white',
    display: 'block',
    backgroundColor: '#36cee2',
    border: 'none',
    width: 55,
    height: 30,
    borderRadius: 11,
    boxShadow: '1px 1.5px 2px  gray'
  },
  Delete: {
    color: '#f79e9e',
    width: 18,
    height: 18,
    marginLeft: -500,
    marginBottom: -40
  }
}


class Chat extends Component {
  constructor () {
    super()
    this.state = {
      messages: [],
    }
  }

  componentWillReceiveProps(props) {
    base.listenTo(`chats/${this.props.params.user1}/${this.props.params.user2}`, {
      context: this,
      then(data){
        if (data === null) {
          base.post(`chats/${this.props.params.user1}/${this.props.params.user2}`, {
            data: {user1: this.props.params.user1, user2: this.props.params.user2,  messages: {}},
        })
      }
     }
    })
    base.syncState(`chats/${this.props.params.user1}/${this.props.params.user2}/messages`, {
      context: this,
      state: 'messages',
      asArray: true,
    })
    if (`${this.props.uid}` === `${this.props.params.user1}`) {
      var userData = `${this.props.params.user2}`
    } else {
      var userData = `${this.props.params.user1}`
    }
    base.update(`users/${this.props.uid}/chats`, {
      data: {[userData]: userData}
    })
  }


  postMessage () {
    if(this.input.input.value === "") {
      alert("chat field cannot be blank")
    } else {
    var timeStamp = new Date() + ''
    base.push(`chats/${this.props.params.user1}/${this.props.params.user2}/messages`, {
      data: {uid: this.props.uid, username: this.props.username, text: this.input.input.value.trim(), avatar: this.props.avatar, timeStamp: timeStamp }
    })
    this.input.input.value = ""
   }
  }


renderDeleteButton (message) {
  if (message.uid === this.props.uid)
    return (
      <IconButton iconStyle={style.Delete}>
        <Delete  onClick={this.deleteMessage.bind(this, message)}/>
      </IconButton>
    )
}

deleteMessage(clickedMessage) {
  var newMessageArray = this.state.messages.filter(message => message !==clickedMessage)
  this.setState({
    messages: newMessageArray
  })
}


  timeSince (date) {
    if (typeof date !== 'object') {
        date = new Date(date);
    }
    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;
    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }
    if (interval > 1 || interval === 0) {
        intervalType += 's';
    }
    return interval + ' ' + intervalType + ' ago';
}


  render() {
    return (
      <div style={style.Component}>
        <MuiThemeProvider>
          <Paper style={style.Chat}>
            <div style={style.Header} />
              <InfiniteScroll
                height={450}
                endMessage={"post a comment"}
                loader={<h4>Loading...</h4>}>

                <ul style={style.List}>
        					{this.state.messages.map((message, index) => {
                      return <li key={index}>
                                <div>
                                    <p style={style.Time}>{this.timeSince(message.timeStamp)}</p>
                                    <img src={message.avatar} style={style.Avatar} role="presentation" />
                                    <p style={style.Username}>{message.username}</p>
                                    <p style={style.CommentText}>{message.text}</p>
                                    {this.renderDeleteButton(message)}
                                </div>
                                <hr />
        					           </li>
                 })
                }
        				</ul>
              </InfiniteScroll>

          <MuiThemeProvider>
              <TextField ref={input => this.input = input} />
          </MuiThemeProvider>


          <MuiThemeProvider>
              <IconButton iconStyle={style.PostButton}>
                <CloudUpload style={style.Post} onClick={this.postMessage.bind(this)} />
              </IconButton>
          </MuiThemeProvider>
          </Paper>
          </MuiThemeProvider>

      </div>
    )
  }
}


export default Chat;
