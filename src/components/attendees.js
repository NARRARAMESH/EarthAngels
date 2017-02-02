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
    height: 300,
    marginTop: -300,
    marginLeft: 640
  },
  List: {
    listStyleType: 'none'
  },
  AppBar: {
    height: 55
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


class Attendees extends Component {
  constructor () {
    super()
    this.state = {
      attendees: []
    }
  }

  componentWillReceiveProps(props) {
      base.listenTo(`events/${this.props.eventTitle}/attending/users`, {
        context: this,
        asArray: true,
        then: (data) => {
          console.log('data is', data)
          this.setState({
            attendees: data
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

              <ul style={style.List}>
      					{this.state.attendees.map((attendee, index) => {
                    return <li key={index}>
                              <div>
                                  <img src={attendee.avatar} style={style.Avatar} role="presentation" />
                                  <Link style={style.Link} className="link" to={`/profile/${attendee.uid}`} activeClassName="active">
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
