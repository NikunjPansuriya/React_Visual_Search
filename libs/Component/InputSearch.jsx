import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Overlay, Popover} from 'react-bootstrap';
import _ from 'lodash';

export default class InputSearch extends Component {

  constructor(props){
    super(props);
    this.state = {
      showOptions: false,
      inputSearchValue: "",
      selectedOptions: []
    }
  }

  hideOptions = () => {
    if (this.state.showOptions) {
      this.setState({showOptions: false})
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleOutsideClick = (e) => {
    if (this.state.showOptions) {
      let flag = true;
      let element = e.target.parentElement;
      while (flag) {
        if (element === null) {
          flag = false;
          if (e.target.nodeName === "HTML") {
            this.hideOptions();
          }
          return;
        }
        if (element.classList.contains("visual_search")) {
          flag = false;
        } else if (element.nodeName === "BODY") {
          flag = false;
          this.hideOptions();
        }
        element = element.parentElement;
      }
    }
  }

  onInputFocus = () => {
    this.setState({
      showOptions: true
    })
  }

  onInputKeyDown = (e) => {
    if(e.which === 8 && e.target.value === "" && this.context.visualSearch.state.selectedValue.length > 0){
      this.props.onBackspaceRemove();
    }
  }

  onValueSearch = (e) => {
    if (this.context.visualSearch.props.filterOptions) {
      let value = e.target.value;
      this.setState({
        inputSearchValue: value
      })
    }
  }

  onInputKeyPress = (e) => {
    if (e.which === 13 && this.state.inputSearchValue !== "") {
      let selectedOptions = this.getSelectedOptions();
      if (selectedOptions.length > 0) {
        this.onOptionClick(selectedOptions[0]);
      }
    }
  }

  getSelectedOptions = () => {
    let options = this.context.visualSearch.props.category;
    let selectedOptions = options;
    if (this.context.visualSearch.props.removeOnSelect && this.context.visualSearch.state.selectedValue.length > 0) {
      selectedOptions = _.filter(selectedOptions, (option) => {
        let obj = _.find(this.context.visualSearch.state.selectedValue, {name: option.name});
        return obj === undefined;
      })
    }
    if (this.context.visualSearch.props.filterOptions) {
      if (this.state.inputSearchValue !== "") {
        selectedOptions = _.filter(selectedOptions, (option) => {
          return option.label.toLowerCase().indexOf(this.state.inputSearchValue.toLowerCase()) >= 0;
        })
      }
    }
    return selectedOptions;
  }

  renderOptions = () => {
    let selectedOptions = this.getSelectedOptions();
    if (selectedOptions.length > 0) {
      return selectedOptions.map((option, i) => {
        let optionClass = "option";
        if (this.context.visualSearch.props.removeOnSelect === false) {
          let opt = _.find(this.context.visualSearch.state.selectedValue, {name: option.name});
          if (opt !== undefined) {
            optionClass += " selected";
          }
        }
        return (
          <span key={i} className={optionClass} onClick={()=>{this.onOptionClick(option)}}>{option.label}</span>
        )
      })
    } else {
      return (<span className="option">No Record's Found !!!</span>)
    }
  }

  onOptionClick = (option) => {
    this.props.onOptionClick(option);
    this.setState({
      showOptions: false,
      inputSearchValue: ""
    })
  }

  render(){
    return([
      <input className="search_input" key="search_input" onFocus={this.onInputFocus} value={this.state.inputSearchValue} onChange={this.onValueSearch} onKeyDown={this.onInputKeyDown} onKeyPress={this.onInputKeyPress}/>,
        this.state.showOptions ?
        <Overlay
          key="overlay"
          show={this.state.showOptions}
          target={() => ReactDOM.findDOMNode(this.context.visualSearch.searchTarget)}
          placement="bottom"
          container={this.context.visualSearch}
          >
          <Popover id="visual_search_option_list">
            <div className="options_wrapper">
              {
                this.renderOptions()
              }
            </div>
          </Popover>
        </Overlay>
        :null
      ]
    )
  }
}


InputSearch.contextTypes = {
  visualSearch: PropTypes.object
}
