import React, { Component } from 'react';
import '../App.css';
import './responsive.css';
import base from '../config.js'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper';
import InfiniteScroll from 'react-infinite-scroll-component';
import Favorite from 'material-ui/svg-icons/action/favorite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



const style = {
  Paper: {
    marginTop: -730,
    width: 300,
    height: 1025,
    float: 'right'
  },
  List: {
    listStyleType: 'none',
    marginLeft: -30
  },
  Avatar: {
    display: 'block',
    margin: 'auto',
    width: 60,
    height: 60,
    borderRadius: 120,
    border: 'none'
  },
  Username: {
    fontFamily: 'Cinzel Decorative',
    fontSize: 22
  },
  Link: {
    textDecoration: 'none'
  },
  Div: {
    marginTop: 0,
    paddingTop: 20,
    height: 50,
    backgroundColor:'#1C3285',
    color: 'white',
    fontFamily: 'Cinzel Decorative'
  }
}


class ChatList extends Component {
  constructor () {
    super()
    this.state = {
      uids: [],
      users: []
    }
  }

  componentDidMount () {
      base.listenTo(`users/${this.props.uid}/chats`, {
        context: this,
        asArray: true,
        then: (data) => {
          this.setState({ uids: data })
          var newArray = data.map((uid) => {
            return base.fetch(`users/${uid}`, {
              context: this,
            })
          })
          Promise.all(newArray).then( values => {
            this.setState({ users: values })
          })
        }
      })
  }


  chatRoute(chatUid) {
    var uids = [`${this.props.uid}`, `${chatUid}`]
    var uidsAlph = uids.sort()
    return `/chats/${uidsAlph[0]}/${uidsAlph[1]}`
  }



  render() {
    return (
      <div style={style.Component}>
      <MuiThemeProvider>
        <Paper style={style.Paper} className="chatList">
        <div style={style.Div} className="chatListHeader">My Chats</div>


            <InfiniteScroll
              height={300}
              endMessage={<Favorite />}
              loader={<h4>Loading...</h4>}>

              <ul style={style.List}>
      					{this.state.users.map((user, index) => {
                    return <li key={index}>
                              <div>
                                  <Link style={style.Link} className="link" to={this.chatRoute(user.uID)} activeClassName="active">
                                    <img src={user.avatar} style={style.Avatar} role="presentation" />
                                    <h1 style={style.Username}>{user.username}</h1>
                                  </Link>
                              </div>
                              <hr />
      					           </li>
               })
              }
      				</ul>
            </InfiniteScroll>
        </Paper>
        </MuiThemeProvider>


      </div>
    )
  }
}


export default ChatList;
