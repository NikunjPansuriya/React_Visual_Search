import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import Year from './Year';
import Month from './Month';
import Days from './Days';

export default class DatePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.setData(props);
  }

  getChildContext(){
    return {
      DatePicker: this
    }
  }

  setData = (props) => {
    this.state.mode = props.mode;
    this.state.date = moment();
    if (props.data.hasOwnProperty("value")) {
      this.state.date = moment(props.data.value, props.format);
    }
  }

  setMode = (mode) => {
    this.setState({mode: mode})
  }

  setDate = (date) => {
    this.setState({date: date});
  }

  setValue = (date) => {
    let value = date.format(this.props.format);
    this.props.setValue(value);
  }

  setCurrentDate = () => {
    let date = moment();
    this.setValue(date);
  }

  renderDate = () => {
    if (this.state.mode.toLowerCase() === "year") {
      return (<Year date={this.state.date} setDate={this.setDate}/>)
    } else if (this.state.mode.toLowerCase() === "month") {
      return (<Month date={this.state.date} setMode={this.setMode} setDate={this.setDate}/>)
    } else {
      return (<Days date={this.state.date} setMode={this.setMode} setDate={this.setDate}/>)
    }
  }

  render() {
    return (<div className="">
      {this.renderDate()}
    </div>)
  }
}

DatePicker.defaultProps = {
  format: "DD/MM/YYYY",
  mode: "days"
}

DatePicker.childContextTypes = {
  DatePicker: PropTypes.object
}

DatePicker.contextTypes = {
  InputDate: PropTypes.object
}
