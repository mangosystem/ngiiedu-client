import React from 'react';
import { connect } from 'react-redux';

import { actionSearch } from '../../../actions/index';

//검색창
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class SearchCourse extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    };

    search() {
        console.log("search?");
        let keyword = this.state.value;
        this.props.searchList(keyword);
    };

    enterKey(e) {
        if (e.keyCode == 13) this.search();
    };

    handleChange(e, i, v) {
        this.setState({
            value: v
        })
    };

    render() {
        return (
            <div
                style={{
                    margin: '10px auto',
                    maxWidth: '100%'
                }}
            >

                <Paper
                    style={{
                        maxWidth: '100%'
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
        searchList: (keyword) => dispatch(actionSearch(keyword))
    };
}

SearchCourse = connect(undefined, mapDispatchToProps)(SearchCourse);

export default SearchCourse;
