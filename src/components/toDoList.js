import React, { Component } from 'react';
import '../App.css';
import base from '../config.js'
import Delete from 'material-ui/svg-icons/action/delete';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
// import CloudDownload from 'material-ui/svg-icons/file/cloud-download';
// import CloudUpload from 'material-ui/svg-icons/file/cloud-upload';
// import TextField from 'material-ui/TextField';


const style = {
  Text: {
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
    fontSize: 20,
    lineHeight: 1.4,
    marginTop: 8,
    marginBottom: -7,
    paddingRight: 30
  },
  Icons: {
    color: '#1C3285',
    width: 20,
    height: 20
  },
  Toggle: {
    paddingTop: 9,
    paddingBottom: 3,
    marginLeft: 260,
  },
  Delete: {
    color: '#f79e9e',
    width: 18,
    height: 18,
    paddingBottom: 10,
    marginRight: -260

  },
  Check: {
    marginTop: -7,
    width: 34,
    height: 34,
  },
  CheckLabel: {
    fontSize: 12,
    marginLeft: -85,
    marginTop: -10,
    color: '#ccc'
  },
  Help: {
    color: '#ccc',
    marginRight: 27,
    textAlign: 'center',
    lineHeight: 1.4,
    fontSize: 16,
    letterSpacing: .5,
  }
}


class ToDoList extends Component {
  constructor () {
    super()
    this.state = {
      todos: []
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
      public: false
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


  completeItem(clickedItem) {
    var item = this.state.todos.filter(item => item === clickedItem)
    base.update(`users/${this.props.uid}/todos/${item[0].key}`, {
      data: {complete: true},
      then() {
      base.update('feed', {
        data: {username: this.state.username, text: item.text}
    })
    }
  })
}


  deleteItem(clickedItem) {
    var newList = this.state.todos.filter(item => item !==clickedItem)
    this.setState({
      todos: newList
    })
  }


  render() {
    return (
      <div>
            <input style={style.Text}
            ref={input => this.input = input}
            onKeyUp={this.addItem.bind(this)}/>
            <ul>
    					{this.state.todos.map((item, index) => {
                  if (item.complete === false) {
                  return <li style={style.Items} key={index}>
                            <div>
                                <Toggle style={style.Toggle} onToggle={this.toggleItem.bind(this, item)} />
                                <Checkbox iconStyle={style.Check} onCheck={this.completeItem.bind(this, item)} label="✓ to complete" labelStyle={style.CheckLabel}/>
                                <p style={style.ItemText}>{item.text}</p>
                                <IconButton iconStyle={style.Delete}>
                                  <Delete  onClick={this.deleteItem.bind(this, item)}/>
                                </IconButton>
                            </div>
    					           </li>
                  }
             })
            }
    				</ul>
            <p style={style.Help}>To share your tasks publicly, turn toggle on before marking task complete</p>

      </div>
    )
  }
}


export default ToDoList;


// <footer className="footer">
//   <span className="todo-count"><strong>{this.state.todos.length}</strong> item{this.state.itemCount} left</span>
//   <ul className="filters">
//     <li>
//       <a className="selected" href="#/">All</a>
//     </li>
//     <li>
//       <a href="#/active">Active</a>
//     </li>
//     <li>
//       <a href="#/completed">Completed</a>
//     </li>
//   </ul>
//   <button hidden={this.state.todos.length == 0} className="clear-completed">Clear completed</button>
// </footer>



// <div>
//   <input onClick={this.completeItem.bind(this)} />
//
//   <label
//   ref={label => this.label = label}
//   onDoubleClick={this.editItem.bind(this)}>
//   {item.text}
//   </label>
//
//   <button ref={button => this.button = button}
//     onClick={this.deleteItem.bind(this, item)}className="destroy">
//   </button>
// </div>
// <input className="edit" value={item.text}/>


//
// <IconButton iconStyle={style.Icons} tooltip="public items are shared to feed">
//   <CloudDownload onClick={this.archiveItem.bind(this, item)}/>
// </IconButton>
//
// <IconButton iconStyle={style.Icons} tooltip="share">
//   <CloudUpload onClick={this.shareItem.bind(this, item)}/>
// </IconButton>

// hintText="My acts of kindness are..."
