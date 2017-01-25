import React, { Component } from 'react';
import base from '../config.js'
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import CloudDownload from 'material-ui/svg-icons/file/cloud-download';
import Close from 'material-ui/svg-icons/navigation/close';


const style = {
  AppBar: {
    fontFamily: "Cinzel Decorative",
    fontWeight: 'bolder',
    wordSpacing: 2
  },
  Text: {
    marginTop: 40,
    width: 600,
    height: 500,
    fontSize: 24
  },
  SaveButton: {
    display: 'block',
    backgroundColor: '#36cee2',
    border: 'none',
    margin: 'auto',
    color: 'white',
    width: 55,
    height: 30,
    borderRadius: 11,
    fontSize: 10,
    boxShadow: '1px 1.5px 2px  gray',
    marginTop: -22,
    marginLeft: -3,
  },
  CloseButton: {
    color: 'white',
    backgroundColor: '#1C3285',
    width: 30,
    height: 30,
    borderRadius: 120,
  }
};


class Journal extends Component {
  constructor() {
  super()
  this.state = ({
    right: false,
  })
}

componentWillReceiveProps(props) {
  if (this.props.uid === null) {
  } else {
  if (this.sync) {
    base.removeBinding(this.sync)
  }
  this.sync = base.syncState(`users/${this.props.uid}/journal`, {
    state: 'journal',
    context: this
    })
  }
}

  render() {
    return (
      <div className="journal">

        <MuiThemeProvider>
            <Drawer
                docked={true}
                width={950}
                open={this.props.journal}
                openSecondary={true}
                onRequestChange={(right) => this.setState({right})}
            >

            <AppBar
              title="Reflect on the Day"
              style={style.AppBar}
              showMenuIconButton={false}
            >
              <IconButton iconStyle={style.CloseButton} tooltipPosition="bottom-center">
                <Close onClick={this.props.toggleJournal}/>
              </IconButton>
            </AppBar>
              <textarea style={style.Text}/>

                <IconButton iconStyle={style.SaveButton} tooltip="save" tooltipPosition="bottom-center">
                  <CloudDownload />
                </IconButton>
            </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Journal;

// <RaisedButton className="journalSave" onClick={this.closeJournal} label="save" />
