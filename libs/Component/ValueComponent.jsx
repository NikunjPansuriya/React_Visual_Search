import React, {Component} from 'react';

export default class ValueComponent extends Component {

  render(){
    return (
      <span onClick={this.props.onValueClick}>{this.props.value || ""}</span>
    )
  }
}
