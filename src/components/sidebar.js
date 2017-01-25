import React, { Component } from 'react';
import { Link } from 'react-router'
import base from '../config.js'
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Assignment from 'material-ui/svg-icons/action/assignment';
import FilterDrama from 'material-ui/svg-icons/image/filter-drama';
import Language from 'material-ui/svg-icons/action/language';



const style = {
  Paper: {
    zDepth: 1,
    float: 'left',
    height: 1000,
    width: 220,
    backgroundColor: '#1C3285',
    position: 'fixed',
    top: 0,
    background: 'linear-gradient(to top left, #3b10d3, #5DBCD2)',
  },
  Avatar: {
    marginTop: 90,
    width: 90,
    height: 90,
    borderRadius: 100,
    border: 'none'
  },
  UserName: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Cinzel Decorative',
    marginTop: 17,
    fontWeight: 'bolder'
  },
  AOK: {
    color: 'white',
    fontSize: 16,
    marginTop: 0,
    marginBottom: 100,
    marginLeft: 45
  },
  icon: {
    color: 'white',
    marginRight: 15,
    width: 20,
    height: 20,
  },
  icon2: {
    color: 'white',
    marginRight: 15,
    marginLeft: -50,
    width: 20,
    height: 20,
  },
};


class Sidebar extends Component {
  constructor () {
    super()
    this.state = {
      completeTodos: []
    }
  }



  componentWillReceiveProps(props) {
    if (this.props.uid === null) {
    } else {
    if (this.sync) {
      base.removeBinding(this.sync)
    }
    this.sync = base.bindToState(`users/${this.props.uid}/todos`, {
      state: 'completeTodos',
      context: this,
      asArray: true
    })
   }
  }



  render() {
    return (

      <div style={style.Paper} className="dashboardButtons">
        <MuiThemeProvider>
            <Paper
              style={style.Paper}
            >
            <img src={this.props.avatar} style={style.Avatar} role="presentation" className="sidebarAvatar" />

            <h5 style={style.UserName}>{this.props.username}</h5>

            <p style={style.AOK}>Acts of Kindness: {this.state.completeTodos.filter(item => item.complete === true).length} </p>


            <div className="dashboardButtons">
              <MuiThemeProvider>
                <Link to="/feedofKindness" activeClassName="active">
                  <button className="sidebarButton" >
                    <FilterDrama style={style.icon}/>
                    Earth Angels
                  </button>
                </Link>
              </MuiThemeProvider>

              <MuiThemeProvider>
                <Link>
                  <button className="sidebarButton" onClick={this.props.toggleToDo}>
                    <Assignment style={style.icon2}/>
                    To-Do
                  </button>
                </Link>
              </MuiThemeProvider>

              <MuiThemeProvider>
                <Link>
                  <button className="sidebarButton" onClick={this.props.toggleJournal}>
                    <ContentCreate style={style.icon2} />
                    Journal
                  </button>
                </Link>
              </MuiThemeProvider>

              <MuiThemeProvider>
                <Link to="/events" activeClassName="active">
                  <button className="sidebarButton">
                    <Language style={style.icon}/>
                    Global Action
                  </button>
                </Link>
              </MuiThemeProvider>
            </div>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Sidebar;
