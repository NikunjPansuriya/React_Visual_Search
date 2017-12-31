import React, {Component} from 'react';
import PropTypes from 'prop-types';

import InputText from './InputText.jsx';
import InputList from './InputList.jsx';

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
      default:
        return (
          <span>Please Enter Type</span>
        )
    }
  }

  render(){
    return(
      <span className="search_value_wrapper">
        <span>{this.props.data.label + ":"}</span>
        {
          this.renderType(this.props.data)
        }
        <span className="value_close" onClick={this.onCancelClick}><i className="fa fa-close"></i></span>
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
