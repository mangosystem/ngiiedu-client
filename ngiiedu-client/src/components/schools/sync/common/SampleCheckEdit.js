import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './SampleCheckEdit.css';

//redux 
//store에 연결
import { connect } from 'react-redux';
//action 객체사용
import { actionSchoolSyncEditColumn }  from '../../../../actions/index';


const style = {
width:150,
height:50,
};


class SampleCheckEdit extends Component {
    constructor(){
        super();
        this.state = {
            dbColumnIndex:[],//api기준 수정된 컬럼의 인댁스
            menuItemStyle:[]//display 옵션
        };

        this.handleChange = this.handleChange.bind(this);
        // this.handleNextStep = this.handleNextStep.bind(this);
    }

//value menuList의 value , idx : 선택된 SelectField의 index
    handleChange(event, key, value, idx){
        let dbColumnIndex = this.state.dbColumnIndex;
        dbColumnIndex[idx]=value;
        this.setState({
            dbColumnIndex:dbColumnIndex
        });
        console.log("dbColumnIndex"+this.state.dbColumnIndex);
        
        var styleArray=[];
        for(var i =0;i<this.props.apiColumn.length;i++){
            styleArray.push({
                display:"block"
            })
        }

        for(var i =0;i<dbColumnIndex.length;i++){
            styleArray[dbColumnIndex[i]]={
                display:"none"
            }
        }

        this.setState({
            menuItemStyle:styleArray 
        })
        
        this.props.handleNextStep(dbColumnIndex,this.props.apiColumn,this.props.dbColum);
        
    }

    componentWillReceiveProps(nextProps){
        let dbColumn = nextProps.dbColumn;
        let apiColumn = nextProps.apiColumn;
        var tempArray =[];

        var styleArray=[]
        for(var i=0;i<apiColumn.length;i++){
            styleArray.push({
                display:"block"
            })
        }

        for(var i=0;i<dbColumn.length;i++){

            let index = apiColumn.indexOf(dbColumn[i])
            tempArray.push(index);


            styleArray[index]={
                display:"none"
            };
        }

        this.setState({
            dbColumnIndex:tempArray,
            menuItemStyle:styleArray
        })

        this.props.handleNextStep(tempArray,apiColumn,dbColumn);
        
    }



    render() {
    return (
    <div>
        <div >
            
            {this.props.dbColumn.map((row, idx) => (
                <div key={idx}>
                   
                    <p>{row}</p>
                    
                    <SelectField
                        hintText="Select a name"
                        value={this.state.dbColumnIndex[idx]}
                        onChange={(event, key, value) => this.handleChange(event, key, value, idx)}
                    >
                    
                        <MenuItem  style={{display:"block"}} value={-1} primaryText={"선택안함"} />

                    {this.props.apiColumn.map((row, idx) => (
                        <MenuItem key={idx} style={this.state.menuItemStyle[idx]} value={idx} primaryText={this.props.apiColumn[idx]} />
                    ))}

                    </SelectField>

                    
                 
                </div>

            ))}
            
        </div>

    </div>
        );
    }
}

SampleCheckEdit.defaultProps = {
    dbColumn : [
        "학교ID",
        "학교명",
        "학교급구분",
        "운영상태",
        "교육지원청명",
        "교육지원청코드",
        "시도교육청명",
        "시도교육청코드",
        "소재지지번주소",
        "설립일자",
        "설립형태",
        "위도",
        "경도",
        "본교분교구분",
        "소재지도로명주소",
        "데이터기준일자",
        "생성일자",
        "변경일자"
    ],
    apiColumn:[]
};


const mapDispatchToProps = (dispatch) => ({
    
        handleNextStep: (dbColumnIndex,apiColumn,dbColumn) => {
            var editColumn =[];
            console.log("db인덱스요:"+dbColumnIndex.toString());
            for(var i=0;i<dbColumnIndex.length;i++){
    
                if(dbColumnIndex[i]==-1){
                    editColumn.push(null);
                }else{
                    editColumn.push(apiColumn[dbColumnIndex[i]]);
                }
            }
            dispatch(actionSchoolSyncEditColumn(editColumn));
        }
});

SampleCheckEdit = connect(
    null,
    mapDispatchToProps
)(SampleCheckEdit);


export default SampleCheckEdit;