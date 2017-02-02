import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import Delete from 'material-ui/svg-icons/action/delete';
import Check from 'material-ui/svg-icons/navigation/check';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

const style = {
  Text: {
    marginTop: 20,
    width: 300,
    height: 50,
    fontSize: 24,
    fontFamily: 'Josefin Sans'
  },
  Items: {
    width: '100%',
    backgroundColor: '#edfbff',
    listStyleType: 'none',
    marginLeft: -20,
    marginTop: 10
  },
  ItemText: {
    fontSize: 22,
    lineHeight: 1.4,
    marginBottom: -7,
    paddingRight: 30,
    marginTop: 20
  },
  Icons: {
    color: '#1C3285',
    width: 20,
    height: 20
  },
  Toggle: {
    paddingTop: 9,
    paddingBottom: 3,
    marginRight: -230,
  },
  Delete: {
    color: '#f79e9e',
    width: 18,
    height: 18,
    paddingBottom: 20,
    marginRight: -240
  },
  Check: {
    color: 'white',
    width: 40,
    height: 40,
    backgroundColor: '#adadf4',
    borderRadius: 120,
    boxShadow: '1px 1.5px 1.5px  gray',
    marginBottom: -20,
    marginLeft: -50,
  },
  Help: {
    color: '#ccc',
    marginRight: 27,
    textAlign: 'center',
    lineHeight: 1.4,
    fontSize: 16,
    letterSpacing: .5
  },
  Snackbar: {
    backgroundColor: '#adadf4',
  }
}


class ToDoList extends Component {
  constructor () {
    super()
    this.state = {
      todos: [],
      editing: false,
      open: false
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.uid === null) {
    } else {
    if (this.sync) {
      base.removeBinding(this.sync)
    }
    this.sync = base.syncState(`users/${this.props.uid}/todos`, {
      state: 'todos',
      context: this,
      asArray: true
     })
    }
  }


  addItem(e) {
    if(this.input.value === "") {
      alert("Please type a to-do item")
    } else if (e.keyCode === 13) {
    let item = {
      text: this.input.value.trim(),
      complete: false,
      public: false,
    }
    let newItemArray = this.state.todos.concat(item)
    this.setState({
      todos: newItemArray
    })
    this.input.value = ""
   }
  }

  toggleItem(clickedItem) {
    var item = this.state.todos.filter(item => item === clickedItem)
    var pub = item[0].public
    base.update(`users/${this.props.uid}/todos/${item[0].key}`, {
      data: {public: !pub}
    })
  }

  // editItem (clickedItem) {
  //   var item = this.state.todos.filter(item => item === clickedItem)
  //   console.log('clickedItem is', clickedItem)
  //   base.update(`users/${this.props.uid}/todos/${item[0].key}`, {
  //     data: {text: this.pTag.index.innerText}
  //   })
  // }

  completeItem(clickedItem) {
    var item = this.state.todos.filter(item => item === clickedItem)
    base.update(`users/${this.props.uid}/todos/${item[0].key}`, {
      data: {complete: true},
      then: () => {
        var elapsedTime = new Date() + ''
        var timeStamp = Date.now()
        if (item[0].public === true) {
        this.showMessage()
        base.update(`feed/${timeStamp}`, {
          data: {uid: this.props.uid, username: this.props.username, avatar: this.props.avatar, text: item[0].text, likeCount: 0, timeStamp: timeStamp, elapsedTime: elapsedTime}
      })
     }
   }
  })
}

  deleteItem(clickedItem) {
    var newList = this.state.todos.filter(item => item !==clickedItem)
    this.setState({
      todos: newList
    })
  }

  showMessage = () => {
    this.setState({
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };



  render() {
    return (
      <div>
            <input style={style.Text}
            placeholder="My acts of kindess are . . ."
            ref={input => this.input = input}
            onKeyUp={this.addItem.bind(this)}/>
            <ul>
    					{this.state.todos.map((item, index) => {
                  if (item.complete === false) {
                  return <li style={style.Items} key={index}>
                            <div>
                                <IconButton style={style.Toggle} tooltip="make post public" tooltipPosition="bottom-center">
                                <Toggle  onToggle={this.toggleItem.bind(this, item)} />
                                </IconButton>

                                <IconButton iconStyle={style.Check}>
                                  <Check  onClick={this.completeItem.bind(this, item)} />
                                </IconButton>

                                <p style={style.ItemText}>{item.text}</p>
                                <IconButton iconStyle={style.Delete}>
                                  <Delete  onClick={this.deleteItem.bind(this, item)}/>
                                </IconButton>
                            </div>
    					           </li>
                  } else {
                    return null
                  }
             })
            }
    				</ul>
            <p style={style.Help}>To share your tasks publicly, turn toggle on before marking task complete</p>

        <Snackbar
          bodyStyle={style.Snackbar}
          open={this.state.open}
          message="Posted to public feed"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default ToDoList;
