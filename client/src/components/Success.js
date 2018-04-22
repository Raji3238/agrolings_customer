import React from "react";
import Datepicker from "react-datepicker";

require('react-datepicker/dist/react-datepicker.min.css');

var moment = require('moment')

export default class Success extends React.Component {
  constructor(props) {
    super(props);
    console.log('succc')
   
  }

  render() {
    return (
      <div>
        Order details saved successfully
      </div>
    )
  }


}