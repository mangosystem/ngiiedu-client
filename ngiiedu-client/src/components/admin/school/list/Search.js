import React from 'react';
import { connect } from 'react-redux';

import { actionSearchSchool } from '../../../../actions/index';

//학교구분 버튼
import RaisedButton from 'material-ui/RaisedButton';

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
            schoolLevel:'',
            category: 'schoolName',
            value: '',
            allLevelButton:'#00838F',
            elementaryLevelButton:'#00BCD4',
            middleLevelButton:'#00BCD4',
            highLevelButton:'#00BCD4',
        };
        this.schoolLevelChange = this.schoolLevelChange.bind(this);
    };

    search() {

        let schoolLevel = this.state.schoolLevel;
        let category = this.state.category;
        let keyword = this.state.value;

        this.props.searchList(schoolLevel, category, keyword);

    };

    enterKey(e) {
        if (e.keyCode == 13) this.search();
    };

    handleChange(event, index, value) {
        this.setState({
            category: value
        });
    };

    //학교구분 버튼
    schoolLevelChange(value){
        if(value =='all'){
            this.setState({
                allLevelButton:'#00838F',
                elementaryLevelButton:'#00BCD4',
                middleLevelButton:'#00BCD4',
                highLevelButton:'#00BCD4',
                schoolLevel:'',
            }, function(){
                this.search();
            });

        }else{
            this.setState({
                schoolLevel:value
            }, function(){
                this.search();
            });
            if(value =='초등학교'){
                this.setState({
                    allLevelButton:'#00BCD4',
                    elementaryLevelButton:'#00838F',
                    middleLevelButton:'#00BCD4',
                    highLevelButton:'#00BCD4',
                });
            }else if(value =='중학교'){
                this.setState({
                    allLevelButton:'#00BCD4',
                    elementaryLevelButton:'#00BCD4',
                    middleLevelButton:'#00838F',
                    highLevelButton:'#00BCD4',
                });
            }else if(value =='고등학교'){
                this.setState({
                    allLevelButton:'#00BCD4',
                    elementaryLevelButton:'#00BCD4',
                    middleLevelButton:'#00BCD4',
                    highLevelButton:'#00838F',
                });
            };
        };
    };

    render() {
        return (
            <div
                style={{
                    maxWidth: '100%'
                }}
            >

                <div>
                    <RaisedButton
                        label="전체선택"
                        backgroundColor={this.state.allLevelButton}
                        style={{width:'25%'}}
                        onClick={()=>this.schoolLevelChange('all')}
                    />
                    <RaisedButton
                        label="초등학교"
                        backgroundColor={this.state.elementaryLevelButton}
                        style={{width:'25%'}}
                        onClick={()=>this.schoolLevelChange('초등학교')}
                    />
                    <RaisedButton
                        label="중학교"
                        backgroundColor={this.state.middleLevelButton}
                        style={{width:'25%'}}
                        onClick={()=>this.schoolLevelChange('중학교')}
                    />
                    <RaisedButton
                        label="고등학교"
                        backgroundColor={this.state.highLevelButton}
                        style={{width:'25%'}}
                        onClick={()=>this.schoolLevelChange('고등학교')}
                    />
                </div>

                <SelectField
                    floatingLabelText="카테고리"
                    value={this.state.category}
                    onChange={this.handleChange.bind(this)}
                    style={{
                        maxWidth: '15%',
                        marginLeft: 20
                    }}
                >
                    <MenuItem value='schoolName' primaryText="학교명" />
                    <MenuItem value='schoolEduOfficeName' primaryText="교육지원청명" />
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
        searchList: (schoolLevel, category, keyword) => dispatch(actionSearchSchool(schoolLevel, category, keyword))
    };
};

Search = connect(undefined, mapDispatchToProps)(Search);

export default Search;
