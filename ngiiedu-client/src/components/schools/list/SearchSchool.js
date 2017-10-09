import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SearchBar from 'material-ui-search-bar'

class SearchSchool extends React.Component {
  constructor(){
      super();
      this.state = {
          value: 1
      };
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value){
      this.setState({value});
  }

  render() {
    return (
      <div>
          <SelectField
            value={this.state.value}
            onChange={this.handleChange}
            style={{
              marginLeft: '0 auto'
            }}
          >
            <MenuItem value={1} primaryText="학교명" />
            <MenuItem value={2} primaryText="교육지원청명" />
          </SelectField>
          <SearchBar
            onChange={(value) => console.log(value)}
            onRequestSearch={() => console.log('onRequestSearch')}
            style={{
              marginLeft: '0 auto'
            }}
          />
      </div>
    );
  }
}

export default SearchSchool;