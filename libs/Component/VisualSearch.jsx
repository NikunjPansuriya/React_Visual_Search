import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Button, Overlay, Popover} from 'react-bootstrap';

import InputSearch from './InputSearch.jsx';
import SearchComponent from './SearchComponent.jsx';

export default class VisualSearch extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedValue: []
    }
  }

  getChildContext = () => {
    return {
      visualSearch: this
    }
  }

  onOptionClick = (option) => {
    let selectedValue = this.state.selectedValue;
    let value = _.clone(option);
    selectedValue.push(value);
    this.setState({
      selectedValue: selectedValue
    })
  }

  onCancelClick = (index) => {
    let selectedValue = this.state.selectedValue;
    selectedValue.splice(index,1);
    this.setState({
      selectedValue: selectedValue
    },()=>{
      this.onUpdateFilter();
    })
  }

  onUpdateFilter = () => {
    let selectedValue = this.state.selectedValue;
    let values = selectedValue.map((value)=>{
      return {
        name: value.name,
        value: value.value
      }
    })
    this.props.onFilter(values);
  }

   render() {
      return (
         <div className="visual_search">
            <div className="visual_search_wrapper" ref="target">
              {
                this.state.selectedValue.map((value,i)=>{
                  return (
                    <SearchComponent data={value} index={i} key={i} onCancelClick={this.onCancelClick}/>
                  )
                })
              }
              <InputSearch
                onOptionClick= {this.onOptionClick}
              />
            </div>
         </div>
      );
   }
}

VisualSearch.childContextTypes = {
  visualSearch: PropTypes.object
}

VisualSearch.propTypes = {
  category: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired
}
