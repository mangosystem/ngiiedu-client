import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import './SampleCheckEdit.css';


const style = {
width:150,
height:50,
};


class SampleCheckEdit extends Component {
    constructor(){
        super();
        this.state = {
            columnIndex: [],
            dbColumnIndex:[],
            menuItemStyle:[]
        };

        this.handleChange = this.handleChange.bind(this);
    }
//value menuList의 value , idx : 선택된 SelectField의 index
    handleChange(event, key, value, idx){
        let dbColumnIndex = this.state.dbColumnIndex;
        dbColumnIndex[idx]=value;
        this.setState({
            dbColumnIndex:dbColumnIndex
        });
        // console.log("columnIndex"+this.state.columnIndex);
        console.log("dbColumnIndex"+this.state.dbColumnIndex);
        
        // apiColumn=this.props.apiColumn;
        // for(var i =0;i<columnIndex.length;i++){
        //     apiColumn[]
        // }
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

        


    }

    componentWillReceiveProps(nextProps){
        let dbColumn = nextProps.dbColumn;
        let apiColumn = nextProps.apiColumn;
        var tempArray =[];
        var tempArray2 =[];

        // for(var i=0;i<dbColumn.length;i++){
        //     tempArray.push(apiColumn.indexOf(dbColumn[i]));
        //     tempArray2.push(apiColumn.indexOf(dbColumn[i]));
        // }
        var styleArray=[]
        for(var i=0;i<apiColumn.length;i++){
            styleArray.push({
                display:"block"
            })
        }

        for(var i=0;i<dbColumn.length;i++){

            let index = apiColumn.indexOf(dbColumn[i])
            tempArray.push(index);

            // this.state.menuItemStyle[index]={
            //     display:"none"
            // };

            styleArray[index]={
                display:"none"
            };
            // tempArray2.push(apiColumn.indexOf(dbColumn[i]));
        }

        

        this.setState({
            // columnIndex:tempArray,
            dbColumnIndex:tempArray,
            menuItemStyle:styleArray
        })

        console.log("tempArray"+tempArray);

    }

    render() {
    return (
    <div>
        <div >
            
            {this.props.dbColumn.map((row, idx) => (
                <div key={idx}>
                    <TextField
                        disabled={true}
                        value={row}
                        hintText="Disabled Hint Text"
                        style = {style}
                    />
                    
                    <SelectField
                        hintText="Select a name"
                        value={this.state.dbColumnIndex[idx]}
                        onChange={(event, key, value) => this.handleChange(event, key, value, idx)}
                    >
                    {/* {this.state.columnIndex.map((row, idx) => (
                        <MenuItem key={idx} style={this.state.menuItemStyle[idx]} value={this.state.columnIndex[idx]} primaryText={this.props.apiColumn[this.state.columnIndex[idx]]} />
                    ))} */}
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
        "소재지도로명주소",
        "설립일자",
        "설립형태",
        "위도",
        "경도",
        "본교분교구분",
        "데이터기준일자",
        "생성일자",
        "변경일자",
    ],
    apiColumn:[]
};


export default SampleCheckEdit;