import React from 'react';
import { connect } from 'react-redux';

import { actionSearch } from '../../../actions/index';

//검색창
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            category: 'userid',
            value: ''
        };
    }

    search() {
        
        let category = this.state.category;
        let keyword = this.state.value;

        this.props.searchList(category, keyword);
        
    }

    enterKey(e) {
        if (e.keyCode == 13) this.search();
    }

    handleChange(event, index, value) {
        this.setState({
            category: value
        })
    }

    render() {
        return (
            <div 
                style={{
                    margin: '20px auto',
                    maxWidth: '100%'
                }}
            >
                <SelectField
                    floatingLabelText="카테고리"
                    value={this.state.category}
                    onChange={this.handleChange.bind(this)}
                    style={{
                        maxWidth: '15%',
                        marginLeft: 20
                    }}
                >
                    <MenuItem value="userid" primaryText="아이디" />
                    <MenuItem value="userName" primaryText="이름" />
                    <MenuItem value="userEmail" primaryText="이메일" />
                </SelectField>
            
                <Paper
                    style={{
                        maxWidth: '70%',
                        marginLeft: 15
                    }}
                >            
                    <TextField 
                        hintText="Search" 
                        style={{
                            marginLeft: 20,
                            maxWidth: '90%'
                        }}
                        fullWidth={true}
                        underlineShow={false}
                        onChange={(event, value) => this.setState({value: value})}
                        onKeyDown={(event) => this.enterKey(event)}
                    />
                    <i 
                        className="fa fa-search" 
                        aria-hidden="true" 
                        style={{
                            marginLeft: 10,
                            color: 'grey',
                            cursor: 'pointer'
                        }}
                        onMouseUp={this.search.bind(this)}
                    >
                    </i>
                    <Divider />
                </Paper>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        searchList: (category, keyword) => dispatch(actionSearch(category, keyword))
    };
}

Search = connect(undefined, mapDispatchToProps)(Search);

export default Search;