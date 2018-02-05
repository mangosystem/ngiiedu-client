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
            value: '',
            allLevelButton:'#3e81f6',
            elementaryLevelButton:'#f9f9f9',
            middleLevelButton:'#f9f9f9',
            highLevelButton:'#f9f9f9',
        };
        this.schoolLevelChange = this.schoolLevelChange.bind(this);
    };

    search() {

        let schoolLevel = this.state.schoolLevel;
        $('#keyword').val('');
        this.props.searchList(schoolLevel, '');

    };

    enterKey(e) {
        if (e.keyCode == 13) this.search();
    };

    //학교구분 버튼
    schoolLevelChange(value){
        if(value =='all'){
            this.setState({
                allLevelButton:'#3e81f6',
                elementaryLevelButton:'#f9f9f9',
                middleLevelButton:'#f9f9f9',
                highLevelButton:'#f9f9f9',
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
                    allLevelButton:'#f9f9f9',
                    elementaryLevelButton:'#3e81f6',
                    middleLevelButton:'#f9f9f9',
                    highLevelButton:'#f9f9f9',
                });
            }else if(value =='중학교'){
                this.setState({
                    allLevelButton:'#f9f9f9',
                    elementaryLevelButton:'#f9f9f9',
                    middleLevelButton:'#3e81f6',
                    highLevelButton:'#f9f9f9',
                });
            }else if(value =='고등학교'){
                this.setState({
                    allLevelButton:'#f9f9f9',
                    elementaryLevelButton:'#f9f9f9',
                    middleLevelButton:'#f9f9f9',
                    highLevelButton:'#3e81f6',
                });
            };
        };
    };

    render() {

        const style = {
            selected: {
                color: 'white'
            },
            unselected: {

            }
        };

        return (
            <div
                style={{
                    maxWidth: '100%'
                }}
            >

                <div>
                    <RaisedButton
                        label="전체선택"
                        labelStyle={this.state.schoolLevel == '' ? style.selected : style.unselected}
                        backgroundColor={this.state.allLevelButton}
                        style={{width:'25%'}}
                        onClick={()=>this.schoolLevelChange('all')}
                    />
                    <RaisedButton
                        label="초등학교"
                        labelStyle={this.state.schoolLevel == '초등학교' ? style.selected : style.unselected}
                        backgroundColor={this.state.elementaryLevelButton}
                        style={{width:'25%'}}
                        onClick={()=>this.schoolLevelChange('초등학교')}
                    />
                    <RaisedButton
                        label="중학교"
                        labelStyle={this.state.schoolLevel == '중학교' ? style.selected : style.unselected}
                        backgroundColor={this.state.middleLevelButton}
                        style={{width:'25%'}}
                        onClick={()=>this.schoolLevelChange('중학교')}
                    />
                    <RaisedButton
                        label="고등학교"
                        labelStyle={this.state.schoolLevel == '고등학교' ? style.selected : style.unselected}
                        backgroundColor={this.state.highLevelButton}
                        style={{width:'25%'}}
                        onClick={()=>this.schoolLevelChange('고등학교')}
                    />
                </div>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        searchList: (schoolLevel, keyword) => dispatch(actionSearchSchool(schoolLevel, keyword))
    };
};

Search = connect(undefined, mapDispatchToProps)(Search);

export default Search;
