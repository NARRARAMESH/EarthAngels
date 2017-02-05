import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper';
import InfiniteScroll from 'react-infinite-scroll-component';
import Favorite from 'material-ui/svg-icons/action/favorite';
import AppBar from 'material-ui/AppBar';


const style = {
  Paper: {
    width: 440,
    height: 360,
    marginTop: -300,
    marginLeft: 640
  },
  List: {
    listStyleType: 'none',
    marginLeft: -38
  },
  AppBar: {
    height: 55
  },
  Avatar: {
    display: 'block',
    margin: 'auto',
    marginTop: 10,
    width: 60,
    height: 60,
    borderRadius: 120,
    border: 'none'
  },
  Username: {
    fontFamily: 'Cinzel Decorative',
    fontSize: 22,
    marginLeft: -10,
  },
  Creator: {
    textAlign: 'center',
    marginLeft: -10,
    fontFamily: 'Cinzel Decorative',
    fontSize: 22
  },
  Link: {
    textDecoration: 'none'
  }
}


class Attendees extends Component {
  constructor () {
    super()
    this.state = {
      attendees: [],
      creator: "",
      creatorAvatar: "",
      creatorUid: ""
    }
  }

  componentWillReceiveProps(props) {
      base.listenTo(`events/${this.props.eventTitle}/attending/users`, {
        context: this,
        asArray: true,
        then: (data) => {
          this.setState({
            attendees: data
          })
        }
    })
    base.fetch(`events/${this.props.eventTitle}`, {
      context: this,
      then: (data) => {
        this.setState({
          creator: data.createdBy,
          creatorAvatar: data.creatorAvatar,
          creatorUid: data.creatorUid
        })
      }
    })
  }



  render() {
    console.log('this.state.attending is', this.state.attending)
    return (
      <div>
        <Paper style={style.Paper}>
          <AppBar
            title="Attendees"
            style={style.AppBar}
            showMenuIconButton={false}
          />

            <InfiniteScroll
              height={250}
              endMessage={<Favorite />}
              loader={<h4>Loading...</h4>}>

              <Link style={style.Link} className="link" to={`/profile/${this.state.creatorUid}`} activeClassName="active">
                <img src={this.state.creatorAvatar} style={style.Avatar} role="presentation" />
                <p style={style.Creator}>{this.state.creator}, Creator</p>
              </Link>
              <hr />

              <ul style={style.List}>
      					{this.state.attendees.map((attendee, index) => {
                    return <li key={index}>
                              <div>
                                  <Link style={style.Link} className="link" to={`/profile/${attendee.uid}`} activeClassName="active">
                                    <img src={attendee.avatar} style={style.Avatar} role="presentation" />
                                    <h1 style={style.Username}>{attendee.username}</h1>
                                  </Link>
                              </div>
                              <hr />
      					           </li>
               })
              }
      				</ul>
            </InfiniteScroll>
        </Paper>

      </div>
    )
  }
}


export default Attendees;
