import React, {Component} from 'react';
import PropTypes from 'prop-types';

import InputText from './InputText';
import InputList from './InputList';
import InputDate from './InputDate';

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
  }

  onCancelClick = () => {
    this.props.onCancelClick(this.props.index);
  }

  getChildContext = () => {
    return {
      searchComponent: this
    }
  }

  renderType = (data) => {
    let type = data.type;
    let defaultProps = {
      onUpdateFilter: this.context.visualSearch.onUpdateFilter
    }
    switch (type) {
      case "text":
        return (
          <InputText data={data} {...defaultProps} />
        )
        break;
      case "list":
        return (
          <InputList data={data} {...defaultProps} />
        )
      case "date":
        return (
          <InputDate data={data} {...defaultProps} />
        )
      default: throw('Please set valid Type')
    }
  }

  render(){
    return(
      <span className="search_value_wrapper">
        <span className="search-label">{this.props.data.label + " : "}</span>
        {
          this.renderType(this.props.data)
        }
        <span className="value_close" onMouseDown={this.onCancelClick}><i className="fa fa-close"></i></span>
      </span>
    )
  }
}

SearchComponent.contextTypes = {
  visualSearch: PropTypes.object
}

SearchComponent.childContextTypes = {
  searchComponent: PropTypes.object
}
