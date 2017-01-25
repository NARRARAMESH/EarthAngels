import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import ShareBox from './shareBox.js';


const style = {
  Paper: {
    height: 800,
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
    height: 800
  }
};


class Feed extends Component {
  constructor () {
    super()
    this.state = {
      feed: []
    }
  }

  componentDidMount (){
    base.fetch(`feed`, {
      context: this,
      asArray: true,
      then: (data) => {
        this.setState({
          feed: data
        })
      }
    })
  }


  render() {
    return (
      <div style={style.Feed}>
        <MuiThemeProvider>
            <Paper style={style.Paper}>
            <ShareBox />
            <ul>
              {this.state.feed.map((post, index) => {
                  return <li>
                            <p>{post.text}</p>
                         </li>
                })
              }
            </ul>

            </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Feed;




// <div style={style.ShareDiv}>
//   <input style={style.Input} placeholder="👐  Share some Love... 👐" />
//   <button style={style.Button}>
//     <IconButton iconStyle={style.Share} tooltip="share" tooltipPosition="top-center"><FilterDrama /></IconButton>
//   </button>
// </div>
