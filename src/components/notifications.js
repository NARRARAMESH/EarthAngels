import React, { Component } from 'react';
import { Link } from 'react-router'
import base from '../config.js'
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Assignment from 'material-ui/svg-icons/action/assignment';
import FilterDrama from 'material-ui/svg-icons/image/filter-drama';
import Language from 'material-ui/svg-icons/action/language';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import Popover from 'material-ui/Popover/Popover';
import Favorite from 'material-ui/svg-icons/action/favorite';
import InfiniteScroll from 'react-infinite-scroll-component';


const style = {
  Popover: {
    maxWidth: 400,
    marginTop: 64
  },
  Love: {
    display: 'block',
    margin: 'auto',
    width: 70,
    height: 70,
    marginTop: 20,
    // marginLeft: 5,
  },
  Notifications: {
    color: '#f79e9e',
    marginLeft: 32,
    fontSize: 20,
  },
  List: {
    listStyleType: 'none',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  NotificationAlert: {
    fontSize: 20,
    color: '#5DBCD2'
  },
  NotificationText: {
    fontSize: 16,
    marginRight: 30,
    lineHeight: 1.5
  },
  NotificationTime: {
    fontSize: 14,
    marginLeft: 260,
    marginBottom: -20,
    color: "#ccc"
  }
};


class Notifications extends Component {
  constructor () {
    super()
    this.state = {
      notifications: [],
      open: false,
      anchorEl: event.currentTarget
    }
  }


  componentDidMount () {
    base.listenTo(`likes/${this.props.uid}`, {
      context: this,
      asArray: true,
      then: (data) => {
        console.log('data is', data)
        this.setState({
          notifications: data
        })
      }
    })
  }



  handleTouchTap = (event) => {
    event.preventDefault()
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
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
    var notificationsCopy = this.state.notifications.slice(0)
    var notificationsReverse = notificationsCopy.reverse()
    return (
      <div>

              <span style={style.Notifications}>{this.state.notifications.length}</span>

              <Popover
                style={style.Popover}
                open={this.props.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
              >
              <InfiniteScroll
                height={750}
                endMessage={<Favorite/>}
                loader={<h4>Loading...</h4>}>

              <ul style={style.List}>
                {notificationsReverse.map((notification, index) => {
                  return (
                    <li key={index}>
                      <p style={style.NotificationAlert}>{notification.username} loved your post:</p>
                      <p style={style.NotificationText}>"{notification.text}"</p>
                      <p style={style.NotificationTime}>{this.timeSince(notification.time)}</p>
                      <hr/>
                    </li>
                  )
                })
              }
              </ul>
              </InfiniteScroll>
              </Popover>

      </div>
    );
  }
}

export default Notifications;
