import React, {Component} from 'react';
import '../App.css';
import Paper from 'material-ui/Paper';
import FilterDrama from 'material-ui/svg-icons/image/filter-drama';
// import PhotoCamera from 'material-ui/svg-icons/image/photo-camera';


const style = {
  Div: {
    backgroundColor: '#edfbff',
    height: 190
  },
  Input: {
    display: 'block',
    marginLeft: '3.3%',
    float: 'left',
    width: '90%',
    height: 60,
    marginTop: 50,
    marginBottom: 15
  },
  Characters: {
    fontSize: 17,
    color: '#ccc',
    fontFamily: 'Josefin Sans',
    marginLeft: -40,
  },
  Length: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    marginBottom: -35,
    backgroundColor: '#f79e9e'
  },
  PostButton: {
    display: 'block',
    backgroundColor: '#36cee2',
    border: 'none',
    marginTop: -30,
    marginLeft: 500,
    marginBottom: 200,
    width: 55,
    height: 30,
    borderRadius: 11,
    boxShadow: '1px 1.5px 2px  gray'
  },
  PostIcon: {
    color: 'white'
  }
  // PhotoButton: {
  //   marginTop: -18,
  //   marginLeft: -3,
  //   color: 'white',
  //   display: 'block',
  //   backgroundColor: '#36cee2',
  //   border: 'none',
  //   float: 'right',
  //   width: 55,
  //   height: 30,
  //   borderRadius: 11,
  //   fontSize: 10,
  //   boxShadow: '1px 1.5px 2px  gray'
  // }
};

class ShareBox extends Component {
  constructor(){
    super()
    this.state = {
      text: "",
      photoAdded: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.togglePhoto = this.togglePhoto.bind(this)
  }


handleChange (event) {
  this.setState({ text: event.target.value })
}

 togglePhoto (event) {
   this.setState({ photoAdded: !this.state.photoAdded });
 }

remainingCharacters () {
  if (this.state.photoAdded) {
    return 150 - 23 - this.state.text.length;
  } else {
    return 150 - this.state.text.length;
  }
}

overflowAlert () {
  if (this.remainingCharacters() < 0) {
    return (
      <Paper>
        <p style={style.Length}>Please shorten your post</p>
      </Paper>
    )
  }
}

post () {
  var time = new Date() + ''
  if (this.textArea.value === "") {
    alert('Please type about your kindness')
  } else if (this.textArea.value.length > 150) {
    alert('Please shorten your post')
  }
    let post = {
    username: this.props.username,
    text: this.textArea.value.trim(),
    avatar: this.props.avatar,
    image: "",
    likeCount: "",
    timeStamp: time
  }
  this.textArea.value = ""
  this.props.newArray(post)
}

  renderInput () {
    if (this.props.uid === "") {
      return (
        <div>
          <p>Earth Angels is a social app for daily acts of kindness.</p>
          <p>We are guardians of goodness in the world. Protectors of peace.</p>
          <p>👐 Join us. Rise up. 👐</p>
        </div>
      )
    } else {
      return (
          <div>
             {this.overflowAlert()}
             <textarea
             style={style.Input}
             onChange={this.handleChange}
             ref={textArea => this.textArea = textArea}
             placeholder="👐  Share about Your Kindess . . . 👐"
             />

             <span style={style.Characters}>{this.remainingCharacters()}</span>

             <button style={style.PostButton} onClick={this.post.bind(this)}>
              <FilterDrama style={style.PostIcon} />
             </button>
           </div>
      )
    }
  }


    render() {
        return (
          <div>
            <div style={style.Div}>
              {this.renderInput()}
            </div>
          </div>
        )
    }
}

export default ShareBox;

// <IconButton iconStyle={style.PhotoButton} tooltip="add photo" tooltipPosition="top-center"><PhotoCamera /></IconButton>

// disabled={this.remainingCharacters() === 140} // for post button
