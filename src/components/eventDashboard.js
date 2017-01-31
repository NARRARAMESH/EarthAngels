//   componentWillReceiveProps (props) {
//   if (this.props.uid !== "") {
//   base.listenTo(`user/${this.props.uid}/events/attending`, {
//     context: this,
//     asArray: true,
//     then: (data) => {
//       console.log('data is', data)
//       this.setState({
//         attending: data
//       })
//     }
//   })
//  }
// }


// <div style={style.EventDashboard}>
//
//   <MuiThemeProvider>
//     <Paper style={style.Attending} zDepth={2}>
//       <AppBar style={style.AppBar} showMenuIconButton={false} title="Attending" />
//       <ul style={style.List}>
//         {this.state.attending.map((event, index) => {
//             return <li key={index}>
//                       <div >
//                         <h3>{event.title}</h3>
//                         <span>{event.date} at</span><span> {event.time}</span>
//                         <p style={style.Location}>{event.location}</p>
//                         <hr />
//                       </div>
//                    </li>
//           })
//         }
//         </ul>
//     </Paper>
//   </MuiThemeProvider>
//
//   <MuiThemeProvider>
//     <Paper style={style.Attending} zDepth={2}>
//       <AppBar style={style.AppBar} showMenuIconButton={false} title="Created" />
//
//     </Paper>
//   </MuiThemeProvider>
// </div>






// {this.showAttendees()}

//
// showAttendees () {
//   if (this.state.event.attending) {
//   var usernames = Object.keys(this.state.event.attending.users).map((key, index) => {
//     return {this.state.event.attending.users[key].username}
//   })
// }
// return <span>Attending:{usernames}</span>
// }


// <div style={style.Attending}>
//   <p style={style.Help}>Check to attend</p>
//   <IconButton tooltip="attending?" tooltipPosition="top-center">
//     <Checkbox
//       onCheck={this.attendEvent.bind(this)}
//       iconStyle={style.CheckBox}
//       labelStyle={style.Label}
//     />
//   </IconButton>
// </div>
