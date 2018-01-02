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

    }

    search() {

        let keyword = $('#keyword').val();

        this.props.searchList(keyword);

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
                    maxWidth: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
            >
                <TextField
                    id="keyword"
                    hintText="검색"
                    errorStyle={{ color: '#444' }}
                    errorText=" "
                    inputStyle={{ paddingLeft: '5px'}}
                    hintStyle={{ paddingLeft: '5px'}}
                    style={{
                        maxWidth: '90%'
                    }}
                    onKeyDown={(event) => this.enterKey(event)}
                />
                <i
                    className="fa fa-search"
                    aria-hidden="true"
                    style={{
                        cursor: 'pointer'
                    }}
                    onMouseUp={this.search.bind(this)}
                >
                </i>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        searchList: (keyword) => dispatch(actionSearch(keyword))
    };
}

Search = connect(undefined, mapDispatchToProps)(Search);

export default Search;
