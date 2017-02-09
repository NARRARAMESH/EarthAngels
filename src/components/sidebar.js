import React, { Component } from 'react';
import { Link } from 'react-router'
import base from '../config.js'
import '../App.css';
import './responsive.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Assignment from 'material-ui/svg-icons/action/assignment';
import FilterDrama from 'material-ui/svg-icons/image/filter-drama';
import Language from 'material-ui/svg-icons/action/language';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import Chat from 'material-ui/svg-icons/communication/chat';
import Popover from 'material-ui/Popover/Popover';
import Favorite from 'material-ui/svg-icons/action/favorite';
import InfiniteScroll from 'react-infinite-scroll-component';


const style = {
  Paper: {
    zDepth: 3,
    float: 'left',
    height: 1000,
    width: 220,
    backgroundColor: '#1C3285',
    position: 'fixed',
    top: 0,
    background: 'linear-gradient(to top left, #3b10d3, #5DBCD2)',
  },
  Avatar: {
    marginTop: 90,
    width: 90,
    height: 90,
    borderRadius: 100,
    border: 'none'
  },
  UserName: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Cinzel Decorative',
    marginTop: 17,
    fontWeight: 'bolder'
  },
  Link: {
    textDecoration: 'none'
  },
  AOK: {
    color: 'white',
    fontSize: 16,
    marginTop: 0,
    marginBottom: 100,
    marginLeft: 45
  },
  icon: {
    color: 'white',
    marginRight: 15,
    width: 20,
    height: 20,
    marginLeft: 10
  },
  icon2: {
    color: 'white',
    marginRight: 15,
    marginLeft: -50,
    width: 20,
    height: 20,
  },
  icon3: {
    color: 'white',
    marginRight: 15,
    width: 20,
    height: 20,
    marginLeft: -50
  },
  Popover: {
    maxWidth: 400,
    maxHeight: 200,
    marginTop: 64
  },
  Love: {
    display: 'block',
    margin: 'auto',
    width: 70,
    height: 70,
    marginLeft: -35,
    marginTop: -15,
    position: 'relative'
  },
  List: {
    listStyleType: 'none',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  Notifications: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bolder',
    textAlign: 'center',
    marginTop: -11,
    marginLeft: 69,
    position: 'absolute',
    zIndex: 1
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
  },
  ChatIcon: {
    color: 'white',
    width: 55,
    height: 55,
    marginTop: 30,
  }
};


class Sidebar extends Component {
  constructor () {
    super()
    this.state = {
      completeTodos: [],
      notifications: [],
      open: false,
      anchorEl: {},
      alert: "No new notifications"
    }
  }


  stateSync () {
    this.sync = base.bindToState(`users/${this.props.uid}/todos`, {
      state: 'completeTodos',
      context: this,
      asArray: true
    })
  }

  componentDidMount () {
    this.stateSync ()
    base.listenTo(`likes/${this.props.uid}`, {
      context: this,
      asArray: true,
      then: (data) => {
        this.setState({
          notifications: data
        })
      }
    })
  }


  componentWillReceiveProps(props) {
    if (this.props.uid === null) {
    } else {
    if (this.sync) {
      base.removeBinding(this.sync)
    }
    this.stateSync ()
   }
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
    base.remove(`likes/${this.props.uid}`)
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


renderNotificationAmount () {
  if (this.state.notifications.length !== 0) {
  return <p style={style.Notifications}>{this.state.notifications.length}</p>
  }
}

notificationText (notification){
if (this.state.notifications.length === 0) {
  return this.state.alert
}
  return notification
}




  render() {
    var notificationsCopy = this.state.notifications.slice(0)
    var notificationsReverse = notificationsCopy.reverse()
    return (
      <div style={style.Paper} className="sidebar">
        <MuiThemeProvider>
            <Paper
              style={style.Paper}
            >
            <Link style={style.Link} className="link" to={`/profile/${this.props.uid}`} activeClassName="active">
              <img src={this.props.avatar} style={style.Avatar} role="presentation" className="sidebarAvatar" />
              <h5 style={style.UserName}>{this.props.username}</h5>
            </Link>

            <p style={style.AOK} className="AOK">Acts of Kindness: {this.state.completeTodos.filter(item => item.complete === true).length} </p>


            <div className="sidebarButtons">
              <MuiThemeProvider>
                <Link to="/feedofKindness" activeClassName="active">
                  <button className="sidebarButton" >
                    <FilterDrama style={style.icon}/>
                  Kindness Feed
                  </button>
                </Link>
              </MuiThemeProvider>

              <MuiThemeProvider>
                <Link>
                  <button className="sidebarButton" onClick={this.props.toggleToDo}>
                    <Assignment style={style.icon2}/>
                    To-Do
                  </button>
                </Link>
              </MuiThemeProvider>

              <MuiThemeProvider>
                <Link>
                  <button className="sidebarButton" onClick={this.props.toggleJournal}>
                    <ContentCreate style={style.icon2} />
                    Journal
                  </button>
                </Link>
              </MuiThemeProvider>

              <MuiThemeProvider>
                <Link to="/events" activeClassName="active">
                  <button className="sidebarButton">
                    <Language style={style.icon3}/>
                    Events
                  </button>
                </Link>
              </MuiThemeProvider>

              <IconButton className="notifications" onClick={this.handleTouchTap.bind()} tooltip="notifications" tooltipPosition="bottom-right">
                <Checkbox
                  checked={true}
                  checkedIcon={<ActionFavorite />}
                  iconStyle={style.Love}
                  style={style.Color}
                />
              </IconButton>

              <Link style={style.Link} className="chatIcon" to={'/chats'} activeClassName="active">
                <IconButton iconStyle={style.ChatIcon}>
                  <Chat />
                </IconButton>
              </Link>

              {this.renderNotificationAmount()}

              <Popover
                style={style.Popover}
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                onRequestClose={this.handleRequestClose}
              >
              <InfiniteScroll
                height={300}
                endMessage={<Favorite/>}
                loader={<h4>Loading...</h4>}>

              <ul style={style.List}>
                {notificationsReverse.map((notification, index) => {
                  return (
                    <li key={index}>
                      <p style={style.NotificationAlert}>{notification.username} loved your post:</p>
                      <p style={style.NotificationText}>{this.notificationText(notification.text)}</p>
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
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Sidebar;
