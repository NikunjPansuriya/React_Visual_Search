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

  onInputFocus = () => {
    this.setState({
      showOptions: true
    })
  }

  onInputBlur = () => {
    this.setState({
      showOptions: false
    })
  }

  render(){
    return([
      <input className="search_input" key="search_input" onFocus={this.onInputFocus} onBlur={this.onInputBlur}/>,
        this.state.showOptions ?
        <Overlay
          key="overlay"
          show={this.state.showOptions}
          target={() => ReactDOM.findDOMNode(this.context.visualSearch.refs.target)}
          placement="bottom"
          container={this.context.visualSearch}
          >
          <Popover id="visual_search_option_list">
            <div className="options_wrapper">
              {
                this.context.visualSearch.props.category.length > 0 ?
                  this.context.visualSearch.props.category.map((obj,i)=>{
                    return (
                      <span key={i} className="option" onMouseDown={(e)=>this.props.onOptionClick(obj)}>{obj.label}</span>
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
