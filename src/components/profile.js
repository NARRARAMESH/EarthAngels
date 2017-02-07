import React, { Component } from 'react';
import { Link } from 'react-router'
import base from '../config.js'
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Chat from 'material-ui/svg-icons/communication/chat';
import Favorite from 'material-ui/svg-icons/action/favorite';
import InfiniteScroll from 'react-infinite-scroll-component';


const style = {
  Component: {
    height: 930
  },
  Paper: {
    display: 'block',
    margin: 'auto',
    zDepth: 1,
    height: 900,
    width: 900,
    backgroundColor: 'white',
    marginTop: 50,
    marginLeft: 400,
  },
  Header: {
    top: 0,
    backgroundColor: '#1C3285',
    width: 900,
    height: 140,
    marginTop: 30
  },
  UserName: {
    color: 'white',
    fontSize: 44,
    fontFamily: 'Cinzel Decorative',
    marginTop: -105,
    fontWeight: 'bolder'
  },
  Avatar: {
    marginTop: -60,
    width: 150,
    height: 150,
    borderRadius: 100,
    border: 'none',
    boxShadow: '0px 1.5px 1.5px gray',
  },
  AOKnumber: {
    fontFamily: 'Cinzel Decorative',
    paddingTop: 120,
    textAlign: 'center',
    fontSize: 44,
    marginTop: 5,
    marginLeft: 5,
    color: '#5DBCD2'
  },
  AOK: {
    textAlign: 'center',
    fontSize: 22,
    marginTop: -40,
    marginLeft: 0
  },
  List: {
    listStyleType: 'none',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  ChatIcon: {
    color: 'white',
    width: 55,
    height: 55,
    marginBottom: 20,
    marginRight: -1120
  },
  Time: {
    color: '#ccc',
    fontFamily: 'verdana',
    fontSize: 12,
    marginLeft: 650,
    fontWeight: 'lighter'
  },
  AOKText: {
    marginLeft: 100,
    marginBottom: -22,
    fontSize: 20
  },
  LeftWings: {
    height: 100,
    width: 140,
    marginLeft: -1001,
    marginTop: 15,
    paddingRight: 500
  },
  RightWings: {
    height: 100,
    width: 140,
    marginRight: -1000,
    marginTop: 15
  }
}


class Profile extends Component {
  constructor () {
    super()
    this.state = {
      user: {},
      uid: "",
      username: "Loading",
      avatar: "",
      AOKs: [],
      // open: false,
    }
  }



  componentDidMount() {
    base.listenTo(`users/${this.props.params.uid}/`, {
      context: this,
      then: (data) => {
        this.setState({
          user: data,
          uid: data.uID,
          username: data.username,
          avatar: data.avatar,
          AOKs: data.todos,

        })
      }
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


  renderChatIcon () {
    if (this.props.params.uid === this.props.uid ) {
      return  (
        <img style={style.RightWings} src={require('../images/ea.png')} role="presentation" />
      )
    } else {
      return (
        <Link style={style.Link} className="link" to={this.chatRoute()} activeClassName="active">
          <IconButton iconStyle={style.ChatIcon}>
            <Chat />
          </IconButton>
        </Link>
      )
    }
  }


  chatRoute () {
    var uids = [`${this.props.uid}`, `${this.state.uid}`]
    var uidsAlph = uids.sort()
    return `/chats/${uidsAlph[0]}/${uidsAlph[1]}`
  }


  render() {
    var AOKsCopy = this.state.AOKs.slice(0)
    var AOKsReverse = AOKsCopy.reverse()
    return (
      <div style={style.Component} className="dashboardButtons">

        <MuiThemeProvider>
            <Paper style={style.Paper}>
            <div style={style.Header}>

            <img style={style.LeftWings} src={require('../images/ea.png')} role="presentation" />

            {this.renderChatIcon()}

              <h5 style={style.UserName}>{this.state.username}</h5>
              <img src={this.state.avatar} style={style.Avatar} role="presentation" className="sidebarAvatar" />
            </div>

            <p style={style.AOKnumber}>{this.state.AOKs.filter(item => item.complete === true).length}</p>
            <p style={style.AOK}>Acts of Kindness</p>

              <InfiniteScroll
                height={500}
                endMessage={<Favorite/>}
                loader={<h4>Loading...</h4>}>

              <ul style={style.List}>
                {AOKsReverse.map((AOK, index) => {
                  if (AOK.complete === true && AOK.public === true) {
                  return (
                    <li key={index}>
                      <p style={style.AOKText}>{AOK.text}</p>
                      <p style={style.Time}>{this.timeSince(AOK.elapsedTime)}</p>

                      <hr/>
                    </li>
                  )
                 }
                 return null
                })
              }
              </ul>
              </InfiniteScroll>

          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Profile;
