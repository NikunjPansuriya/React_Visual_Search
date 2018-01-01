# React_Visual_Search
 React Basic Visual Search Library.


## Quick Overview
react_visual_search allows to search data by attribute name.
Multiple filters can be applied to take broad range of data.

# Features:
* Support Search both text and list mode.




 ## Getting started

```sh
npm install react_visual_search
Or
git clone https://github.com/NikunjPansuriya/React_Visual_Search.git
cd visual_search/

npm install
npm start
```

Then open [http://localhost:8080/](http://localhost:8080/) to see demo examples.


## Quick Usage :
```sh
import VisualSearch from 'react_visual_search';
..
...
onFilter(filters){
 console.log(filters);
}

render(){
  return (
    <VisualSearch
      className= "react_visual_search"
      category= {[
        {label: "Name",name:"name",type: "text"},
        {label: "First Name",name:"firstName",type: "text"},
        {label: "Gender", name:"gender",type:"list",options:[{label:"Male",value:"M"},{label:"Female",value:"F"}]}
      ]}
      onFilter= {this.onFilter}
    />
  );
}
....
...

```

## Support Types :
* type: "text"
* type: "list"

## License
MIT.
