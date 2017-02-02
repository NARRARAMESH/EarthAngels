import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import InfiniteScroll from 'react-infinite-scroll-component';
import Favorite from 'material-ui/svg-icons/action/favorite';
import { Link } from 'react-router'


const style = {
  EventList: {
    width: 440,
    height: 440,
    backgroundColor: 'white',
    marginTop: 135,
    marginLeft: 40
  },
  List: {
    listStyleType: 'none'
  },
  AppBar: {
    height: 55
  },
  EventInfo: {
    textAlign: 'center',
    marginLeft: -20,
    color: 'black'
  },
  Link: {
    textDecoration: 'none'
  },
  Hr: {
    color: '#ccc'
  }
};


class EventList extends Component {
  constructor () {
    super()
    this.state=({
      eventList: []
    })
  }


  componentWillReceiveProps (props) {
    base.listenTo(`users/${this.props.uid}/events`, {
      context: this,
      asArray: true,
      then: (data) => {
        this.setState({
          eventList: data
        })
      }
    })
  }

  render() {
    return (
      <div>

      <MuiThemeProvider>
          <Paper style={style.EventList} zDepth={2}>
              <AppBar
                title="My Events"
                style={style.AppBar}
                showMenuIconButton={false}
                >
              </AppBar>

              <InfiniteScroll
                height={380}
                endMessage={<Favorite/>}
                loader={<h4>Loading...</h4>}>

                <ul style={style.List}>
                  {this.state.eventList.map((event, index) => {
                      return <li key={index}>
                                <div >
                                  <Link style={style.Link} className="link" to={`/events/${event.title}`} activeClassName="active">
                                    <h3 >{event.title}</h3>
                                    <p style={style.EventInfo}>{event.date}</p>
                                    <p style={style.EventInfo}style={style.EventInfo}>{event.time} {event.AmPm}</p>
                                    <p style={style.EventInfo}>{event.location}</p>
                                    <hr style={style.Hr}/>
                                  </Link>
                                </div>
                             </li>
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

export default EventList;
