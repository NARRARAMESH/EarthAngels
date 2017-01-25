import Rebase from 're-base';

var config = {
    apiKey: "AIzaSyBcAubZPj-TOqqJ4QbR61IAz_3E0_46RRo",
    authDomain: "earth-angels.firebaseapp.com",
    databaseURL: "https://earth-angels.firebaseio.com",
    storageBucket: "earth-angels.appspot.com",
    messagingSenderId: "50857230567"
  };

  const base = Rebase.createClass(config)

  export default base
