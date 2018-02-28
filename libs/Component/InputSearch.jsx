import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Overlay, Popover} from 'react-bootstrap';

export default class InputSearch extends Component {

  constructor(props){
    super(props);
    this.state = {
      showOptions: false
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
    if(e.which === 8 && e.target.value === ""){
      this.props.onBackspaceRemove();
    }
  }

  onOptionClick = (option) => {
    this.props.onOptionClick(option);
    this.setState({
      showOptions: false
    })
  }

  render(){
    return([
      <input className="search_input" key="search_input" onFocus={this.onInputFocus} onKeyDown={this.onInputKeyDown}/>,
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
                this.context.visualSearch.props.category.length > 0 ?
                  this.context.visualSearch.props.category.map((option,i)=>{
                    return (
                      <span key={i} className="option" onClick={()=>{this.onOptionClick(option)}}>{option.label}</span>
                    )
                  })
                :
                  <span className="option">No Record's Found !!!</span>
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
