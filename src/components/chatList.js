import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper';
import InfiniteScroll from 'react-infinite-scroll-component';
import Favorite from 'material-ui/svg-icons/action/favorite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



const style = {
  Paper: {
    width: 300,
    height: '100%'
  },
  List: {
    listStyleType: 'none'
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

          // console.log('data is', data)
          data.forEach((uid) => {
            // console.log('uid is', uid)
            base.fetch(`users/${uid}`, {
              context: this,
            })
          })
            // this.setState({ users: newArray })
          }
      })
  }




// Promise.all()

  chatRoute(chatUid) {
    var uids = [`${this.props.uid}`, `${chatUid}`]
    var uidsAlph = uids.sort()
    return `/chats/${uidsAlph[0]}/${uidsAlph[1]}`
  }




  render() {
    console.log('uids is', this.state.uids)
    console.log('users is', this.state.users)
    return (
      <div style={style.Component}>
      <MuiThemeProvider>
        <Paper style={style.Paper}>

            <InfiniteScroll
              height={400}
              endMessage={<Favorite />}
              loader={<h4>Loading...</h4>}>

              <ul style={style.List}>
      					{this.state.users.map((user, index) => {
                    return <li key={index}>
                              <div>
                                  <img src={user.avatar} style={style.Avatar} role="presentation" />
                                  <Link style={style.Link} className="link" to={this.chatRoute()} activeClassName="active">
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
