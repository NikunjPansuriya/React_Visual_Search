import React, {Component} from 'react';

import VisualSearch from '../libs/Component/VisualSearch';

export default class App extends Component {

  onFilter = (filters) => {
    console.log(filters);
  }

  render(){
    return (
      <div className="row">
        <div className="col-md-12">
          <h2>Visual Search Example</h2>
        </div>
        <div className="col-md-12">
          <VisualSearch
            category= {[
              {label: "Name",name:"name",type: "text"},
              {label: "First Name",name:"firstName",type: "text"},
              {label: "Gender", name:"gender",type: "list", options:[{label:"Male",value: "M"},{label:"Female",value: "F"}]},
              {label: "Date of Birth", name:"birthDate",type: "date", options:{format:"DD-MMM-YYYY",mode:"days"}}
            ]}
            onFilter= {this.onFilter}
          />
        </div>
      </div>
    )
  }
}
