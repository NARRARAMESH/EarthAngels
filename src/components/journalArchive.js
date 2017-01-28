import React, { Component } from 'react';
import base from '../config.js'
import '../App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ImportContacts from 'material-ui/svg-icons/communication/import-contacts';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Dialog from 'material-ui/Dialog';
import Close from 'material-ui/svg-icons/navigation/close';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const style = {
  Div: {
    display: 'block',
    margin: 'auto',
    marginRight: 250,
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: .5,
    width: '50%',
    marginBottom: 50
  },
  CountText: {
    fontFamily: 'Josefin Sans',
    fontSize: 16,
  },
  Header: {
    marginBottom: -5
  },
  Card: {
    marginTop: 15
  },
  List: {
    listStyleType: 'none'
  },
  CloseButton: {
    color: 'white',
    marginLeft: 645
  },
  Dialog: {
    width: 700
  },
  Menu: {
    backgroundColor: '#1C3285',
    position: 'fixed',
    top: '0px',
    width: '700px',
    height: '50px',
    marginLeft: '-24px',
    color: 'white'
  },
  EntryTextDiv: {
    // maxWidth: 550,
    // overflowX: 'hidden',
    // wordWrap: 'break-word'
  },
  EntryText: {
    paddingTop: 50,
    paddingBottom: 100,
    paddingLeft: 10,
    paddingRight: 20,
    fontSize: 24,
    textJustify: 'inter-word',
    fontFamily: 'Josefin Sans',
    lineHeight: 1.4,
    color: 'black',
    whiteSpace: 'pre'
  }
};


class JournalArchive extends Component {
  constructor() {
  super()
  this.state = ({
    archive: [],
    dialog: false,
    entry: {}
  })
}

  componentWillReceiveProps(props) {
    base.listenTo(`users/${this.props.uid}/journal`, {
      context: this,
      asArray: true,
      then: (data) => {
        this.setState({
          archive: data
        })
      }
    })
  }

  expandEntry (clickedEntry) {
    var entry = this.state.archive.filter(entry => entry === clickedEntry)
      this.setState({ dialog: !this.state.dialog, entry: entry[0] })
  }

  closeEntry = () => this.setState({ dialog: !this.state.dialog })


  render() {
    return (
      <div style={style.Div}>
      <h3 style={style.Header}>Archive</h3>
      <span style={style.CountText}>{this.state.archive.length} entries</span>

      <Card style={style.Card}>
      <InfiniteScroll
        height={300}
        endMessage={<Favorite />}
        loader={<h4>Loading...</h4>}>
      <ul style={style.List}>
        {this.state.archive.map((entry, index) => {
            return <li key={index}>
                      <IconButton tooltip="expand" tooltipPosition="top-center">
                        <ImportContacts onClick={this.expandEntry.bind(this, entry)}/>
                      </IconButton>

                        <p>{entry.date}</p>
                        <p>{(entry.text).substr(0, 50)}</p>
                        <hr />
                   </li>
                 })
               }
      </ul>
      </InfiniteScroll>
      </Card>

      <MuiThemeProvider>
          <Dialog
            contentStyle={style.Dialog}
            open={this.state.dialog}>
            <div style={style.Menu}>
              <IconButton iconStyle={style.CloseButton} onTouchTap={this.closeEntry}>
                <Close />
              </IconButton>
            </div>
            <InfiniteScroll
              height={600}
              endMessage={<Favorite/>}
              loader={<h4>Loading...</h4>}>
            <div style={style.EntryTextDiv}>
              <p style={style.EntryText}>{this.state.entry.text}</p>
            </div>
            </InfiniteScroll>


          </Dialog>
      </MuiThemeProvider>

      </div>
    );
  }
}

export default JournalArchive;
