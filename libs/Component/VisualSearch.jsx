import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Button, Overlay, Popover} from 'react-bootstrap';

import InputSearch from './InputSearch';
import SearchComponent from './SearchComponent';

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
    this.inputSearch.setState({showOptions: false});
    this.setState({
      selectedValue: selectedValue
    },()=>{
      this.onUpdateFilter();
    })
  }

  onBackspaceRemove = () => {
    if(this.props.hasOwnProperty("removeOnBackspace") && this.props.removeOnBackspace === true && this.state.selectedValue.length > 0){
      let selectedValue = this.state.selectedValue;
      selectedValue.splice(selectedValue.length - 1,1);
      this.inputSearch.setState({showOptions: false});
      this.setState({
        selectedValue: selectedValue
      },()=>{
        if(this.state.selectedValue.length === 0){
          this.inputSearch.setState({showOptions: true});
        }
        this.onUpdateFilter();
      })
    }
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
         <div className={"visual_search " + (this.props.className ? this.props.className : "")}>
            <div className="visual_search_wrapper clearfix" ref={(searchTarget)=>{this.searchTarget = searchTarget}}>
              {
                this.state.selectedValue.map((value,i)=>{
                  return (
                    <SearchComponent data={value} index={i} key={i} onCancelClick={this.onCancelClick}/>
                  )
                })
              }
              <div className="visual_input_wrapper">
                <InputSearch
                  ref={(inputSearch)=>{this.inputSearch = inputSearch}}
                  onOptionClick= {this.onOptionClick}
                  onBackspaceRemove= {this.onBackspaceRemove}
                />
              </div>
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
