import React, {Component} from 'react';

export default class ValueComponent extends Component {

  render(){
    return (
      <span className="search-value" onClick={this.props.onValueClick}>{this.props.value || ""}</span>
    )
  }
}
