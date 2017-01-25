import React, { Component } from 'react';
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ToDoList from './toDoList.js';
import Close from 'material-ui/svg-icons/navigation/close';



const style = {
  AppBar: {
    fontFamily: "Cinzel Decorative",
    fontWeight: 'bolder',
    wordSpacing: 10
  },
  CloseButton: {
    color: 'white',
    backgroundColor: '#1C3285',
    width: 25,
    height: 25,
    borderRadius: 120,
    marginRight: -20
  }
};


class ToDo extends Component {
  constructor() {
  super()
  this.state = ({
    left: false,
  })
}

  render() {
    return (
      <div className="todo">
        <MuiThemeProvider>
            <Drawer
                className="toDoList"
                docked={true}
                width={360}
                open={this.props.toDo}
                openSecondary={true}
                onRequestChange={(left) => this.setState({left})}
            >
              <AppBar
                title="Today's To-Dos"
                style={style.AppBar}
                showMenuIconButton={false}
              >
                <IconButton iconStyle={style.CloseButton}>
                    <Close className="closeToDo" onClick={this.props.toggleToDo} />
                </IconButton>
              </AppBar>

              <ToDoList uid={this.props.uid}/>

            </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default ToDo;
