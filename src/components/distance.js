import React, { Component } from 'react';
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Close from 'material-ui/svg-icons/navigation/close';


const style = {
  Distance: {
    width: '300px',
    height: '400px'
  },
  Button: {
    marginTop: 20,
    width: 60,
    height: 30,
    backgroundColor: '#adadf4',
    borderRadius: 5,
    border: 'none',
    color: 'white',
    boxShadow: '1px 1.5px 2px  gray',
    fontWeight: 'bolder',
    fontSize: 14,
    display: 'block',
    margin: 'auto'
  },
  CloseButton: {
  margin: -20
  }
};


class Distance extends Component {
  constructor () {
    super()
    this.state=({
      value: 50
    })
  }



  handleChange = (event, index, value) => this.setState({value});




  render() {
    return (
      <div>

        <MuiThemeProvider>
            <Dialog
              contentStyle={style.Distance}
              open={this.props.distance}>
              <div  style={style.Menu}>
                <IconButton iconStyle={style.CloseButton} onTouchTap={this.props.toggleDistance}>
                  <Close />
                </IconButton>
              </div>

              <SelectField
                floatingLabelText="event distance"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <MenuItem value={100} primaryText="100 miles" />
                <MenuItem value={40} primaryText="40 miles" />
                <MenuItem value={20} primaryText="20 miles" />
                <MenuItem value={10} primaryText="10 miles" />
                <MenuItem value={5} primaryText="5 miles" />
              </SelectField>


            </Dialog>
        </MuiThemeProvider>

      </div>
    );
  }
}

export default Distance;


// <button style={style.Button} onClick={this.props.newLocation(this.state.value)}>Search</button>
