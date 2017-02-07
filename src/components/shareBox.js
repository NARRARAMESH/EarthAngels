import React, {Component} from 'react';
import '../App.css';
import Paper from 'material-ui/Paper';
import FilterDrama from 'material-ui/svg-icons/image/filter-drama';
// import PhotoCamera from 'material-ui/svg-icons/image/photo-camera';


const style = {
  Div: {
    backgroundColor: '#edfbff',
    height: 210,
  },
  LogoutDiv: {
    backgroundColor: '#1C3285',
    height: 210,
    padding: 20,
    paddingBottom: 60
  },
  Input: {
    display: 'block',
    marginLeft: '3.8%',
    float: 'left',
    width: '90%',
    height: 80,
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
  DisabledButton: {
    display: 'block',
    backgroundColor: '#ccc',
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
  },
  PhotoButton: {
    display: 'block',
    backgroundColor: '#36cee2',
    border: 'none',
    marginTop: -30,
    marginLeft: 400,
    marginBottom: 200,
    width: 55,
    height: 30,
    borderRadius: 11,
    boxShadow: '1px 1.5px 2px  gray'
  },
  Wings: {
    height: 200,
    width: 280,
  },
  Tagline: {
    color: 'white',
    textAlign: 'center',
    marginLeft: 0,
    marginTop: 10,
    fontFamily: 'Cinzel Decorative',
    paddingBottom: 20
  },
  Uploader: {
    marginTop: -300
  }
};

class ShareBox extends Component {
  constructor(){
    super()
    this.state = {
      text: "",
      photoAdded: false,
      button: false,
      username: '',
      avatar: '',
      isUploading: false,
      progress: 0,
      avatarURL: ''
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

renderButton () {
  if (this.remainingCharacters() < 0 || (this.textArea && this.textArea.value === "")) {
    return (
      <button style={style.DisabledButton} onClick={this.post.bind(this)} disabled>
       <FilterDrama style={style.PostIcon} />
      </button>
    )
  } else {
    return (
      <button style={style.PostButton} onClick={this.post.bind(this)}>
      <FilterDrama style={style.PostIcon} />
      </button>
    )
  }
}

post () {
  var elapsedTime = new Date() + ''
  var timeStamp = Date.now()
    let post = {
    uid: this.props.uid,
    username: this.props.username,
    text: this.textArea.value.trim(),
    avatar: this.props.avatar,
    image: "",
    likeCount: 0,
    timeStamp: timeStamp,
    elapsedTime: elapsedTime
  }
  this.textArea.value = ""
  this.props.newArray(post)
}

  renderInput () {
    if (this.props.uid === "") {
      return (
        <div style={style.LogoutDiv}>
          <img style={style.Wings} src={require('../images/ea.png')} role="presentation" />
          <p style={style.Tagline}>A social network for acts of kindness</p>
        </div>
      )
    } else {
      return (
            <div style={style.Div}>
             {this.overflowAlert()}
             <textarea
             style={style.Input}
             onChange={this.handleChange}
             ref={textArea => this.textArea = textArea}
             placeholder="👐  Share about Your Kindess . . . 👐"
             />
             <span style={style.Characters}>{this.remainingCharacters()}</span>
             {this.renderButton()}



           </div>
      )
    }
  }


    render() {
        return (
          <div>
              {this.renderInput()}
          </div>
        )
    }
}

export default ShareBox;
