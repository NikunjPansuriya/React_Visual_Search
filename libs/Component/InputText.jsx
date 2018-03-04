import React, {Component} from 'react';

import ValueComponent from './ValueComponent';

export default class InputText extends Component {

  constructor(props){
    super(props);
    this.state = {
      showInput: true
    }
    this.setData(this.props);
  }

  setData = (props) => {
    this.state.data = props.data;
    if (props.data.hasOwnProperty("value")) {
      this.state.showInput = false;
    }
  }

  componentDidMount(){
    if(this.state.showInput){
      this.inputTextRef.focus();
    }
  }

  componentWillReceiveProps(nextProps){
    this.setData(nextProps);
  }

  onValueChange = (e) => {
    let value = e.target.value;
    let data = this.state.data;
    data.value = value;
    this.setState({
      data: data
    })
  }

  onKeyPress = (e) => {
    if(e.which === 13){
      this.setState({
        showInput: false
      },()=>{
        this.props.onUpdateFilter();
      })
    }
  }

  onBlur = () => {
    this.setState({
      showInput: false
    },()=>{
      this.props.onUpdateFilter();
    })
  }

  onValueClick = () => {
    this.setState({
      showInput: true
    },()=>{
      this.inputTextRef.focus();
    })
  }

  renderInput = () => {
    if(this.state.showInput){
      return (
        <input
          ref= {(inputText) => {this.inputTextRef = inputText}}
          className= "input_text_value"
          value= {this.state.data.value || ""}
          onChange= {this.onValueChange}
          onKeyPress= {this.onKeyPress}
          onFocus= {this.onFocus}
          onBlur= {this.onBlur}
        >
        </input>
      )
    } else {
      return (
        <ValueComponent value={this.state.data.value} onValueClick={this.onValueClick} />
      )
    }
  }

  render(){
    return (this.renderInput())
  }
}
