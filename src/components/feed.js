import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import ShareBox from './shareBox.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import Favorite from 'material-ui/svg-icons/action/favorite';



const style = {
  Paper: {
    height: 1000,
    width: 600,
    marginLeft: 250,
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
    marginBottom: 60,
    width: 45,
    height: 45,
    borderRadius: 10,
    border: 'none'
  },
  FeedUL: {
    listStyleType: 'none'
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
    lineHeight: 1.3
  },
  Time: {
    color: '#ccc',
    fontFamily: 'verdana',
    fontSize: 12,
    float: 'right',
    marginRight: 40,
    fontWeight: 'lighter'
  }
};


class Feed extends Component {
  constructor () {
    super()
    this.state = {
      feed: []
    }
  }

  componentDidMount () {
    base.syncState(`feed`, {
      context: this,
      state: 'feed',
      asArray: true
    })
  }


  newArray (post) {
      let newFeedArray = this.state.feed.concat(post)
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
                              <p style={style.Time}>{this.timeSince(post.timeStamp)}</p>
                              <img src={post.avatar} style={style.Avatar} role="presentation" />
                              <p style={style.Username}><strong>{post.username}</strong></p>
                              <p style={style.PostText}>{post.text}</p>
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
