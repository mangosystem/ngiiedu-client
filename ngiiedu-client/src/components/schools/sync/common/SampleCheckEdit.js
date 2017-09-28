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
            columnIndex: []

        };

        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount(){
        for(var i = 0;i<this.props.apiColumn.length;i++){
            console.log(i);
        }
        this.props.apiColumn.indexOf(this.props.dbColumn[0])
        
    }

    handleChange(event, key, value, idx){
        console.log(event);
        
    }

    componentWillReceiveProps(nextProps){
        let dbColumn = nextProps.dbColumn;
        let apiColumn = nextProps.apiColumn;
        let tempArray =[];

        for(var i=0;i<dbColumn.length;i++){
            tempArray.push(apiColumn.indexOf(dbColumn[i]));
        }

        this.setState({
            columnIndex:tempArray
        })
        // console.log("배열" + tempArray.toString());

        // console.log("componentWillReceiveProps: " + JSON.stringify(nextProps));
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
                        value={this.state.columnIndex[idx]}
                        onChange={(event, key, value) => this.handleChange(event, key, value, idx)}
                    >
                    {this.state.columnIndex.map((row, idx) => (
                        <MenuItem key={idx} value={this.state.columnIndex[idx]} primaryText={this.props.apiColumn[this.state.columnIndex[idx]]} />
                    ))}

                    {/* <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[0])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[0])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[1])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[1])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[2])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[2])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[3])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[3])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[4])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[4])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[5])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[5])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[6])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[6])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[7])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[7])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[8])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[8])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[9])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[9])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[10])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[10])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[11])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[11])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[12])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[12])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[13])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[13])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[14])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[14])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[15])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[15])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[16])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[16])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[17])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[17])]} />
                    <MenuItem value={this.props.apiColumn.indexOf(this.props.dbColumn[18])} primaryText={this.props.apiColumn[this.props.apiColumn.indexOf(this.props.dbColumn[18])]} />
                     */}

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