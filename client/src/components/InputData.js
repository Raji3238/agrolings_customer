import React from "react";
import Datepicker from "react-datepicker";

require('react-datepicker/dist/react-datepicker.min.css');

var moment = require('moment')

export default class InputData extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { startDate: moment(this.props.row.date, "DD/MM/YYYY")}
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleSubmit () {
    console.log('Connect to server...Done')
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Datepicker
            selected={this.state.startDate}
            onChange={this.handleChange} />
          <input type="text" name="animal" />
          <input type="text" name="name" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }


}