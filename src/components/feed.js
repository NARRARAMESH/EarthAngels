import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import { Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import ShareBox from './shareBox.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';


const style = {
  Paper: {
    height: 1000,
    width: 600,
    // marginLeft: 250,
    textAlign: 'center',
    display: 'inline-block',
    zDepth: 1
  },
  Favorite : {
    color: '#c63535'
  },
  Feed: {
    height: 1000
  },
  Avatar: {
    float: 'left',
    marginRight: 25,
    marginBottom: 48,
    width: 45,
    height: 45,
    borderRadius: 10,
    border: 'none'
  },
  FeedUL: {
    listStyleType: 'none'
  },
  Link: {
    textDecoration: 'none'
  },
  Username: {
    fontFamily: 'Cinzel Decorative',
    fontSize: 16
  },
  PostText: {
    fontFamily: 'Josefin Sans',
    fontSize: 20,
    marginRight: 100,
    textAlign: 'justify',
    lineHeight: 1.3,
  },
  Time: {
    color: '#ccc',
    fontFamily: 'verdana',
    fontSize: 12,
    float: 'right',
    marginRight: 40,
    fontWeight: 'lighter'
  },
  Heart: {
    marginTop: -50,
    marginLeft: 480,
    marginBottom: -5
  },
  Love: {
    color: '#ccc',
    marginLeft: 450,
    fontSize: 12
  },
  Delete: {
    color: '#f79e9e',
    width: 18,
    height: 18,
    marginLeft: -600,
    marginBottom: 0,
    letterSpacing: 50
  }
};


class Feed extends Component {
  constructor () {
    super()
    this.state = {
      feed: [],
      checked: false
    }
  }

  componentDidMount () {
    base.syncState(`feed`, {
      context: this,
      state: 'feed',
      asArray: true,
      queries: {
      orderByChild: 'timeStamp',
    }
    })
  }


  newArray (post) {
      let newFeedArray = this.state.feed.concat(post)
      this.setState({
        feed: newFeedArray
      })
   }


likePost (likedPost) {
  var post = this.state.feed.filter(post => post === likedPost)
  var likeCount = post[0].likeCount
  base.update(`feed/${post[0].key}`, {
    data: {likeCount: likeCount + 1},
    then: () => {
      var time = new Date()
      base.update(`likes/${post[0].uid}/${time}`, {
        data: {text: post[0].text, username: this.props.username, time: time}
    })
   }
 })
}

  renderLikeCount (likeCount) {
    if (likeCount === 0) {
      return null
    } else if (likeCount === 1) {
      return <span style={style.Love}>{likeCount} love</span>
    } else {
      return <span style={style.Love}>{likeCount} loves</span>
    }
  }

  renderDeleteButton (post) {
    if (post.uid === this.props.uid)
      return (
        <IconButton iconStyle={style.Delete}>
          <Delete  onClick={this.deletePost.bind(this, post)}/>
        </IconButton>
      )
  }

  deletePost (clickedPost) {
    var newFeedArray = this.state.feed.filter(post => post !==clickedPost)
    this.setState({
      feed: newFeedArray
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
    var feedCopy = this.state.feed.slice(0)
    var feedReverse = feedCopy.reverse()
    return (
      <div style={style.Feed}>
        <MuiThemeProvider>
            <Paper style={style.Paper}>
            <ShareBox uid={this.props.uid} username={this.props.username} avatar={this.props.avatar} newArray={this.newArray.bind(this)} />

            <InfiniteScroll
              height={750}
              endMessage={<Favorite/>}
              loader={<h4>Loading...</h4>}>

            <ul style={style.FeedUL}>
              {feedReverse.map((post, index) => {
                  return <li key={index}>
                              <div>
                                <p style={style.Time}>{this.timeSince(post.elapsedTime)}</p>

                                <Link style={style.Link} className="link" to={`/profile/${post.uid}`} activeClassName="active">
                                  <img src={post.avatar} style={style.Avatar} role="presentation" />
                                  <p style={style.Username}><strong>{post.username}</strong></p>
                                </Link>

                                <p style={style.PostText}>{post.text}</p>

                                {this.renderDeleteButton(post)}

                                <Checkbox
                                  checkedIcon={<ActionFavorite />}
                                  uncheckedIcon={<ActionFavoriteBorder />}
                                  onCheck={this.likePost.bind(this, post)}
                                  style={style.Heart}
                                />
                                {this.renderLikeCount(post.likeCount)}
                                <hr />

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

export default Feed;
