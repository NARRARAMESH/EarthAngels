import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import { Link } from 'react-router'
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import InfiniteScroll from 'react-infinite-scroll-component';
// import Delete from 'material-ui/svg-icons/action/delete';


const style = {
  List: {
    listStyleType: 'none'
  },
  Avatar: {
    float: 'left',
    marginRight: 25,
    width: 45,
    height: 45,
    borderRadius: 10,
    border: 'none',
    marginBottom: 60,
  },
  Username: {
    fontFamily: 'Cinzel Decorative',
    fontSize: 16
  },
  CommentText: {
    fontFamily: 'Josefin Sans',
    fontSize: 20,
    marginRight: 80,
    textAlign: 'justify',
    lineHeight: 1.5
  },
  PostButton: {
    color: 'white',
    display: 'block',
    backgroundColor: '#36cee2',
    border: 'none',
    width: 55,
    height: 30,
    borderRadius: 11,
    boxShadow: '1px 1.5px 2px  gray'
  },
  Post: {
    color: 'white',
  },
  Time: {
    color: '#ccc',
    fontFamily: 'verdana',
    fontSize: 12,
    float: 'right',
    marginRight: 40,
    fontWeight: 'lighter'
  }
  // Delete: {
  //   color: '#f79e9e',
  //   width: 18,
  //   height: 18,
  //   marginRight: -300,
  //   marginTop: -200,
  //   marginBottom: 0
  // }
}


class Comments extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
  }

  componentWillReceiveProps (props) {
      if (this.props.event.title !== "") {
      base.listenTo(`comments/${this.props.event.title}`, {
        context: this,
        asArray: true,
        then: (data) => {
          this.setState({
            comments: data
          })
        }
      })
     }
    }


    postComment () {
      if(this.input.input.value === "") {
        alert("comment field cannot be blank")
      } else {
      var time = new Date() + ''
      base.push(`comments/${this.props.event.title}`, {
        data: {uid: this.props.uid, username: this.props.username, text: this.input.input.value.trim(), avatar: this.props.avatar, timeStamp: time }
      })
      this.input.input.value = ""
     }
    }

  // deleteComment (clickedComment) {
  //   var comment = this.state.comments.filter(item => item !==clickedComment)
  //   base.remove(`comments/${this.props.event.title}/${comment}`, {
  //   })
  // }

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
    return (
      <div>
            <InfiniteScroll
              height={250}
              endMessage={"post a comment"}
              loader={<h4>Loading...</h4>}>

              <ul style={style.List}>
      					{this.state.comments.map((comment, index) => {
                    return <li key={index}>
                              <div>
                                  <p style={style.Time}>{this.timeSince(comment.timeStamp)}</p>
                                  <img src={this.props.avatar} style={style.Avatar} role="presentation" />
                                  <Link style={style.Link} className="link" to={`/profile/${comment.uid}`} activeClassName="active">
                                    <p style={style.Username}>{this.props.username}</p>
                                  </Link>
                                  <p style={style.CommentText}>{comment.text}</p>
                              </div>
                              <hr />
      					           </li>
               })
              }
      				</ul>
            </InfiniteScroll>

            <TextField
              ref={input => this.input = input}
            />

            <IconButton iconStyle={style.PostButton}>
              <CloudUpload style={style.Post} onClick={this.postComment.bind(this)} />
            </IconButton>

      </div>
    )
  }
}


export default Comments;

// <IconButton  iconStyle={style.Delete}>
//   <Delete  onClick={this.deleteComment.bind(this, comment)}/>
// </IconButton>
