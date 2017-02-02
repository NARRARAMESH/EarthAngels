import React, { Component } from 'react';
// import { Link } from 'react-router'
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
    marginTop: -70,
    fontWeight: 'bolder'
  },
  Avatar: {
    marginTop: -60,
    width: 150,
    height: 150,
    borderRadius: 100,
    border: 'none'
  },
  AOK: {
    paddingTop: 140,
    textAlign: 'center',
    fontSize: 22,
    marginTop: 0,
    marginLeft: -5
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
    marginTop: 20,
    marginRight: -780
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
    marginBottom: -22
  }
};


class Profile extends Component {
  constructor () {
    super()
    this.state = {
      user: {},
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
        console.log('profile data is', data)
        this.setState({
          user: data,
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


  // renderChatIcon () {
  //   if (this.props.params.uid !== this.props.uid ) {
  //     return <IconButton iconStyle={style.ChatIcon}>
  //             <Chat />
  //           </IconButton>
  //   }
  // }

  render() {
    console.log('this.state.username is', this.state.username)
    console.log('this.state.avatar is', this.state.avatar)
    console.log('this.state.AOKs is', this.state.AOKs)
    console.log('this.state.AOKs is', this.state.AOKs)


    var AOKsCopy = this.state.AOKs.slice(0)
    var AOKsReverse = AOKsCopy.reverse()
    return (
      <div style={style.Component} className="dashboardButtons">

        <MuiThemeProvider>
            <Paper style={style.Paper}>
            <div style={style.Header}>
              <IconButton iconStyle={style.ChatIcon}>
                <Chat />
              </IconButton>
              <h5 style={style.UserName}>{this.state.username}</h5>
              <img src={this.state.avatar} style={style.Avatar} role="presentation" className="sidebarAvatar" />
            </div>

            <p style={style.AOK}>Acts of Kindness: {this.state.AOKs.filter(item => item.complete === true).length} </p>

              <InfiniteScroll
                height={500}
                endMessage={<Favorite/>}
                loader={<h4>Loading...</h4>}>

              <ul style={style.List}>
                {AOKsReverse.map((AOK, index) => {
                  if (AOK.complete === true) {
                  return (
                    <li key={index}>
                      <p style={style.AOKText}>{AOK.text}</p>
                      <p style={style.Time}>{this.timeSince(AOK.elapsedTime)}</p>

                      <hr/>
                    </li>
                  )
                 }
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
