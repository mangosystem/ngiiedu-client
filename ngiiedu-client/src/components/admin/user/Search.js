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
                    maxWidth: '100%'
                }}
            >
                <Paper
                    style={{
                        maxWidth: '70%',
                        margin: 'auto'
                    }}
                >
                    <TextField
                        id="keyword"
                        hintText="Search"
                        style={{
                            marginLeft: 20,
                            maxWidth: '90%'
                        }}
                        fullWidth={true}
                        underlineShow={false}
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
        searchList: (keyword) => dispatch(actionSearch(keyword))
    };
}

Search = connect(undefined, mapDispatchToProps)(Search);

export default Search;
