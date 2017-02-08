import React, { Component } from 'react';
import base from '../config.js'
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Save from 'material-ui/svg-icons/content/save';
import Close from 'material-ui/svg-icons/navigation/close';
import JournalArchive from './journalArchive.js';


const style = {
  journal: {
    width: 950,
    zIndex: 1800
  },
  AppBar: {
    fontFamily: "Cinzel Decorative",
    fontWeight: 'bolder',
    wordSpacing: 2
  },
  Text: {
    marginTop: 40,
    width: 550,
    height: 600,
    fontSize: 24
  },
  SaveButton: {
    display: 'block',
    backgroundColor: '#36cee2',
    border: 'none',
    margin: 'auto',
    color: 'white',
    width: 40,
    height: 40,
    borderRadius: 11,
    boxShadow: '1px 1.5px 2px  gray',
    marginLeft: 16,
  },
  CloseButton: {
    color: 'white',
    backgroundColor: '#1C3285',
    width: 30,
    height: 30,
    borderRadius: 120,
  },
  Journal: {
    zIndex: 1550,
    width: 950
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
  if (!this.props.uid) {
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


saveEntry () {
  var today = new Date()
  if (this.textArea.value === "") {
    alert('Cannot save an empty journal entry')
  } else {
  let entry = {
    text: this.textArea.value.trim(),
    date: today.toDateString(),
    timeStamp: Date.now()
  }
  base.push(`users/${this.props.uid}/journal`, {
    data: entry
  })
  this.textArea.value = ""
 }
}

  render() {
    return (
      <div>

        <MuiThemeProvider>
            <Drawer
                width={950}
                containerClassName="journal"
                containerStyle={style.Journal}
                docked={true}
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

              <textarea style={style.Text} className="journalTextArea"
                ref={textArea => this.textArea = textArea}
              />

                <IconButton iconStyle={style.SaveButton} tooltip="save" tooltipPosition="top-right">
                  <Save onClick={this.saveEntry.bind(this)}/>
                </IconButton>

                <JournalArchive uid={this.props.uid} toggleJournal={this.props.toggleJournal}/>
            </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Journal;
