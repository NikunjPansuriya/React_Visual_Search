import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Table} from 'react-bootstrap';
import moment from 'moment';

const days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

export default class Days extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.setMonthYear(props);
  }

  setMonthYear = (props) => {
    let year = props.date.year();
    let month = props.date.month();
    this.state.year = year;
    this.state.month = month;
  }

  componentWillReceiveProps(nextProps) {
    this.setMonthYear(nextProps);
  }

  onPrevBtnClick = (e) => {
    e.stopPropagation();
    this.context.DatePicker.context.InputDate.setCurrentDate = false;
    let date = moment().set({date: 1, month: this.state.month, year: this.state.year})
    let preMonth = date.subtract(1, "month");
    this.setState({month: preMonth.get("month"), year: preMonth.get("year")})
  }

  onNextBtnClick = (e) => {
    e.stopPropagation();
    this.context.DatePicker.context.InputDate.setCurrentDate = false;
    let date = moment().set({date: 1, month: this.state.month, year: this.state.year})
    let nextMonth = date.add(1, "month");
    this.setState({month: nextMonth.get("month"), year: nextMonth.get("year")})
  }

  showDays = (date) => {
    let noOfDays = date.daysInMonth();
    let weeks = [];
    let counter = 0;
    weeks[counter] = [];
    for (let i = 1; i <= noOfDays; i++) {
      let curDate = moment().set({date: i, month: this.state.month, year: this.state.year});
      if (i === 1 && curDate.get("days") !== 0) {
        for (let j = 0; j < moment().set({date: 1, month: this.state.month, year: this.state.year}).get("days"); j++) {
          weeks[counter].push((<td key={"beforedate" + j}></td>))
        }
      }
      weeks[counter].push((<td key={"date" + i} className="pickerdate">{i}</td>));
      if (i === noOfDays && curDate.get("days") < days.length) {
        for (let k = (curDate.get("days") + 1); k < days.length; k++) {
          weeks[counter].push((<td key={"afterdate" + k}></td>))
        }
      }
      if (curDate.get("days") === days.length - 1 && (i + 1) <= noOfDays) {
        counter++;
        weeks[counter] = [];
      }
    }
    return weeks;
  }

  onMonthClick = () => {
    this.context.DatePicker.context.InputDate.setCurrentDate = false;
    this.props.setMode("Month");
  }

  onDateClick = (e) => {
    e.stopPropagation();
    this.context.DatePicker.context.InputDate.setCurrentDate = false;
    let text = e.target.innerText;
    if (text !== undefined && text !== "") {
      let date = parseInt(text);
      let selectedDate = moment((text + "/" + (
      this.state.month + 1) + "/" + this.state.year), "DD/MM/YYYY");
      this.context.DatePicker.setValue(selectedDate);
    }
  }

  render() {
    let date = moment().set({date: 1, month: this.state.month, year: this.state.year});
    let weeks = this.showDays(date);
    return (<div>
      <div className="pickerheader">
        <div className="col-md-2">
          {
            (this.state.year - 1) > 1800
              ? <span className="spanbtn" onMouseDown={this.onPrevBtnClick}>{"<"}</span>
              : null
          }
        </div>
        <div className="col-md-8">
          <div className="text-center">
            <span className="spanbtn" onMouseDown={this.onMonthClick}>{date.format("MMM-YYYY")}</span>
          </div>
        </div>
        <div className="col-md-2">
          {
            (this.state.year + 1) < 2300
              ? <span className="spanbtn" onMouseDown={this.onNextBtnClick}>{">"}</span>
              : null
          }
        </div>
      </div>
      <Table className="pickertable text-center">
        <thead>
          <tr>
            {
              days.map((day, i) => {
                return (<th key={day}>{day}</th>)
              })
            }
          </tr>
        </thead>
        <tbody onMouseDown={this.onDateClick}>
          {
            weeks.map((value, i) => {
              return (<tr key={"week" + i}>{value}</tr>)
            })
          }
        </tbody>
      </Table>
    </div>)
  }
}

Days.contextTypes = {
  DatePicker: PropTypes.object
}
