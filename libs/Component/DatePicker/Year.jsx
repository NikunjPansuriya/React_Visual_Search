import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import moment from 'moment';

export default class Year extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setYear(props);
  }

  setYear = (props) => {
    let year = props.date.year();
    this.state.year = year;
  }

  componentWillReceiveProps(nextProps) {
    this.setYear(nextProps);
  }

  onPrevBtnClick = (e) => {
    e.stopPropagation();
    this.context.DatePicker.context.InputDate.setCurrentDate = false;
    let year = this.state.year - 9;
    this.setState({year: year})
  }

  onNextBtnClick = (e) => {
    e.stopPropagation();
    this.context.DatePicker.context.InputDate.setCurrentDate = false;
    let year = this.state.year + 9;
    this.setState({year: year})
  }

  getYears = (year) => {
    let years = [];
    for (let i = 8; i >= 0; i--) {
      let y = year - i;
      if (y > 1800 && y < 2300) {
        years.push(year - i);
      } else {
        years.push("");
      }
    }
    return years;
  }

  onYearClick = (e) => {
    e.stopPropagation();
    this.context.DatePicker.context.InputDate.setCurrentDate = false;
    let node = null;
    if (e.target.hasAttribute("data-year")) {
      node = e.target;
    } else if (e.target.querySelector('[data-year]') !== null) {
      node = e.target.querySelector('[data-year]');
    }
    if (node !== null && node.hasAttribute("data-year")) {
      let year = parseInt(node.getAttribute("data-year"));
      let selectedDate = moment("01/01/" + year, "DD/MM/YYYY");
      if (this.context.DatePicker.props.mode.toLowerCase() === "year") {
        this.context.DatePicker.setValue(selectedDate);
      } else {
        this.context.DatePicker.setState({date: selectedDate, mode: "month"});
      }
    }
  }

  render() {
    let years = this.getYears(this.state.year);
    return (<div>
      <div className="pickerheader">
        <div className="col-md-2">
          {
            (this.state.year - 9) > 1800
              ? <div className="text-left">
                  <span className="spanbtn" onMouseDown={this.onPrevBtnClick}>{"<"}</span>
                </div>
              : null
          }
        </div>
        <div className="col-md-8">
          <div className="text-center">Years</div>
        </div>
        <div className="col-md-2">
          {
            (this.state.year + 9) < 2300
              ? <div className="text-left">
                  <span className="spanbtn" onMouseDown={this.onNextBtnClick}>{">"}</span>
                </div>
              : null
          }
        </div>
      </div>
      <div className="text-center" onMouseDown={this.onYearClick}>
        {
          years.map((year, i) => {
            return (<div className="col-md-4 pickeryear" key={i}>
              <span data-year={year} className="">{year}</span>
            </div>)
          })
        }
      </div>
    </div>)
  }
}

Year.contextTypes = {
  DatePicker: PropTypes.object
}
