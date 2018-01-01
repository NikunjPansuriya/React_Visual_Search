import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Overlay, Popover} from 'react-bootstrap';
import _ from 'lodash';

import ValueComponent from './ValueComponent';

export default class InputList extends Component {

  constructor(props){
    super(props);
    this.state = {
      showInput: true,
      showOptions: false,
      inputValue: ""
    }
    this.setData(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.setData(nextProps);
  }

  setData = (props) => {
    this.state.data = props.data;
    if(props.data.hasOwnProperty("value")){
      let obj = _.find(this.state.data.options,{value: props.data.value});
      this.state.inputValue = obj.label;
      this.state.showInput = false;
    }
  }

  onChange = (e) => {
    let value = e.target.value;
    this.setState({
      inputValue: value
    })
  }

  onFocus = () => {
    this.setState({
      showOptions: true
    })
  }

  onBlur = () => {
    this.setDataValue();
  }

  onKeyPress = (e) => {
    if(e.which === 13){
      this.setDataValue();
    }
  }

  getOptions = () => {
    let options = [];
    if(this.state.inputValue !== ""){
      options = _.filter(this.state.data.options,(obj) => {
        return obj.label.toLowerCase().match(this.state.inputValue.toLowerCase())
      })
    } else {
      options = this.state.data.options;
    }
    return options;
  }

  onOptionClick = (obj) => {
    let value = obj.value;
    let data = this.state.data;
    data.value = value;
    this.setState({
      data: data,
      inputValue: obj.label,
      showOptions: false,
      showInput: false
    },()=>{
      this.props.onUpdateFilter();
    })
  }


  setDataValue = () => {
    let options = this.getOptions();
    let inputValue, value;
    if(options.length > 0){
      let obj = options[0];
      inputValue = obj.label;
      value = obj.value;
    } else {
      let obj = this.state.data.options[0];
      inputValue = obj.label;
      value = obj.value;
    }
    let data = this.state.data;
    data.value = value;
    this.setState({
      data: data,
      inputValue: inputValue,
      showOptions: false,
      showInput: false
    },()=>{
      this.props.onUpdateFilter();
    })
  }

  onValueClick = () => {
    this.setState({
      showInput: true,
      showOptions: true
    })
  }

  showOptionList = () => {
    let options = this.getOptions();
    if(options.length > 0){
      return options.map((obj,i)=>{
        return (
          <span key={i} className="option" onMouseDown={(e)=>this.onOptionClick(obj)}>{obj.label}</span>
        )
      })
    } else {
      return (
        <span className="option">No Record's Found !!!</span>
      )
    }
  }

  renderInputList = () => {
    if(this.state.showInput){
      return([
        <input
          key= "input_list"
          ref= "target"
          className= "input_text_value"
          value= {this.state.inputValue}
          onChange= {this.onChange}
          onFocus= {this.onFocus}
          onKeyPress= {this.onKeyPress}
          onBlur= {this.onBlur}
        />,
        this.state.showOptions ?
          <Overlay
            key="overlay"
            show={this.state.showOptions}
            target={() => ReactDOM.findDOMNode(this.refs.target)}
            placement="bottom"
            container={this.context.searchComponent}
            >
            <Popover id="input_list_options">
              <div className="list_wrapper">
                {
                  this.showOptionList()
                }
              </div>
            </Popover>
          </Overlay>
          :
          null
      ])
    } else {
      return(
        <ValueComponent value={this.state.inputValue} onValueClick={this.onValueClick}/>
      )
    }
  }

  render(){
    return (this.renderInputList())
  }

}

InputList.contextTypes = {
  searchComponent: PropTypes.object
}
