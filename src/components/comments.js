import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import Delete from 'material-ui/svg-icons/action/delete';
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import InfiniteScroll from 'react-infinite-scroll-component';
import Favorite from 'material-ui/svg-icons/action/favorite';

// const style = {
// }


class Comments extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
  }


  componentDidMount () {
      base.listenTo(`comments/${this.props.event.title}`, {
        context: this,
        asArray: true,
        then: (data) => {
          console.log('data is', data)
          this.setState({
            comments: data
          })
        }
      })
    }


    postComment () {
      if(this.input.input.value === "") {
        alert("comment field cannot be blank")
      } else {
      // base.update(`comments/${this.props.event.title}/${Math.floor(Math.random() * 100000000000000)}`, {
      base.push(`comments/${this.props.event.title}`, {
        data: {username: this.props.username, text: this.input.input.value.trim(), avatar: this.props.avatar }
      })
      this.input.input.value = ""
     }
    }


  // deleteComment (clickedComment) {
  //   var newCommentArray = this.state.comments.filter(item => item !==clickedComment)
  //   this.setState({
  //     todos: newCommentArray
  //   })
  // }


  render() {
    console.log('this.state.comments is', this.state.comments)
    console.log('this.props.event.title is', this.props.event.title)
    return (
      <div>
            <InfiniteScroll
              height={300}
              endMessage={<Favorite/>}
              loader={<h4>Loading...</h4>}>

              <ul>
      					{this.state.comments.map((comment, index) => {
                    return <li key={index}>
                              <div>
                                  <p>{comment.text}</p>
                                  <IconButton>
                                    <Delete  onClick={this.deleteComment.bind(this, comment)}/>
                                  </IconButton>
                              </div>
      					           </li>
               })
              }
      				</ul>
            </InfiniteScroll>

            <TextField
              hintText="write a comment here"
              ref={input => this.input = input}
            />

            <CloudUpload onClick={this.postComment.bind(this)} />

      </div>
    )
  }
}


export default Comments;
