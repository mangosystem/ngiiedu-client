import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import DeleteButton from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import AddButton from 'material-ui/svg-icons/content/add-box';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import update from 'react-addons-update';
 

class NewDataset extends Component {
    constructor(){
        super();

        this.state={
            options:{
                photo:true,
                date:true
            },
            columns:[
                {
                    idx:0,
                    alias:'sample',
                    type:'ANY_VALUE',
                    text:'',
                    required:true
                }
            ],
            categoryValue:'',//카테고리 추가 값 입력 state
            selectedColumn:'',
            selectedCategory:'',
        }

        this.handleCategoryValue = this.handleCategoryValue.bind(this);//에러나서 추가... 기본value 문제인듯

        this.findColumnIdx = this.findColumnIdx.bind(this); //저장된 idx로 배열의 몇번째인지 찾아줌
        this.selectColumnRow = this.selectColumnRow.bind(this); //컬럼선택
        this.changeColumnName = this.changeColumnName.bind(this); // 컬럼명 변경
        this.changeColumnType = this.changeColumnType.bind(this); // 타입 변경
        this.changeColumnRequired = this.changeColumnRequired.bind(this); //필수여부 변경
        this.deleteColumn = this.deleteColumn.bind(this); //컬럼삭제
        this.addColumn = this.addColumn.bind(this); //컬럼 추가
        
        //옵션 관련
        this.changeOptions = this.changeOptions.bind(this);
        
        //범주관련
        this.onKeyPress = this.onKeyPress.bind(this); //범주 추가시 (엔터키)
        this.selectCategoryRow = this.selectCategoryRow.bind(this); // 카테고리 row 선택
        this.deleteCategory = this.deleteCategory.bind(this); // 카테고리 삭제

        //범위 관령
        this.changeRangedValues = this.changeRangedValues.bind(this); //범주값 변경시 text 생성
    }

    componentDidMount(){
        let moduleId = this.props.moduleId;
        
        
        if(moduleId =='1'){
            //우리지역 소음지도
            this.setState({
                columns:[
                    {
                        idx:0,
                        alias:'소음측정값',
                        type:'ANY_VALUE',
                        text:'',
                        required:true
                    },
                    {
                        idx:1,
                        alias:'주요소음원',
                        type:'ALLOWED_VALUES',
                        text:'도로교통소음|공사장소음|생활소음|철도소음|기타소음',
                        required:true
                    },
                    {
                        idx:2,
                        alias:'체감소음도',
                        type:'ALLOWED_VALUES',
                        text:'아주조용함|조용함|보통|시끄러움|아주시끄러움',
                        required:true
                    },
                    {
                        idx:3,
                        alias:'기타',
                        type:'ANY_VALUE',
                        text:'',
                        required:true
                    }
                ]
            })
        }else if(moduleId =='2'){
            //GPS 활용 위치학습
            this.setState({
                columns:[
                    {
                        idx:0,
                        alias:'장소명',
                        type:'ANY_VALUE',
                        text:'',
                        required:true
                    }
                ]
            })
        }else if(moduleId =='4'){
            //통합적영토교육 -> 소음측정
            this.setState({
                columns:[
                    {
                        idx:0,
                        alias:'불편내용',
                        type:'ANY_VALUE',
                        text:'',
                        required:true
                    }
                    
                ]
            })
        }else if(moduleId =='5'){
            //우리학교 운동장 생태지도
            this.setState({
                columns:[
                    {
                        idx:0,
                        alias:'나무종류',
                        type:'ALLOWED_VALUES',
                        text:'소나무|잣나무|낙엽송|리기다소나무|편백나무|상수리나무|신갈나무|침엽수|활엽수|기타',
                        required:true
                    }
                ]
            })
        }
    }

    //옵션체크박스 선택시
    changeOptions(v,key){
        let options = this.state.options;
        options[key]=v;
        this.setState({
            options:options
        })
    }

    handleCategoryValue(e,v){
        this.setState({
            categoryValue:v
        })
    }


    //범주 추가시 (엔터키)
    onKeyPress(event){
        if(event.charCode == 13){
            let selectedColumn = this.state.selectedColumn
            let value = $('#category').val();
            if(value==''){return console.log('값 없음')};
            let textArray, text;

            if(selectedColumn.text!=''){
                textArray = selectedColumn.text.split('|');
                if(textArray.indexOf(value)>=0){return console.log('중복된값')}
                textArray.push(value);
                text = textArray.join('|');
            }else{
                text = value
            }

            let arrayIdx = this.findColumnIdx(selectedColumn.idx);
            this.setState({
                columns:update(
                    this.state.columns,
                    {
                        [arrayIdx] : {
                            text : { $set : text}
                        }
                    }
                ),
                categoryValue:''
            },function(){
                this.setState({
                    selectedColumn:this.state.columns[arrayIdx]
                })
            });
            
            console.log(text)
        }
    }

    //저장된 idx를 가지고 배열의 몇번째 값인지 찾음
    findColumnIdx(columnIndex){
        for( const [idx, row] of this.state.columns.entries()){
            if(row.idx == columnIndex){
                return idx
            } 
        }
    }

    //컬럼선택
    selectColumnRow(column){
        console.log('selectedColumnRow')
        this.setState({
            selectedColumn:column,
            selectedCategory:''    
        })
        
    }

    //컬럼명 변경
    changeColumnName(v, column){
        console.log('changeColumnName')
        let arrayIdx = this.findColumnIdx(column.idx);
        this.setState({
            columns:update(
                this.state.columns,
                {
                    [arrayIdx] : {
                        alias : { $set : v}
                    }
                }
            )
        },function(){
            this.setState({
                selectedColumn:this.state.columns[arrayIdx]
            })
        });
    }

    //컬럼 타입변경
    changeColumnType(v, column){
        console.log('changeColumnType')
        
        let arrayIdx = this.findColumnIdx(column.idx);
        let text ='';
        if(v=='RANGE_VALUE'){
            text = '1|10|1'
        }
        this.setState({
            columns:update(
                this.state.columns,
                {
                    [arrayIdx] : {
                        type : { $set : v},
                        text : { $set : text}
                    }
                }
            ),
            selectedCategory:''
        },function(){
            this.setState({
                selectedColumn:this.state.columns[arrayIdx]
            })
        });
    }

    //컬럼 필수여부 변경
    changeColumnRequired(v, column){
        console.log('changeColumnRequired')
        
        let arrayIdx = this.findColumnIdx(column.idx);
        this.setState({
            columns:update(
                this.state.columns,
                {
                    [arrayIdx] : {
                        required : { $set : v}
                    }
                }
            )
        },function(){
            this.setState({
                selectedColumn:this.state.columns[arrayIdx]
            })
        });
    }

    //컬럼삭제
    deleteColumn(column){
        console.log('deleteColumn');
        let arrayIdx = this.findColumnIdx(column.idx);
        this.setState({
            columns: update(
                this.state.columns, 
                {
                    $splice: [[arrayIdx, 1]]
                }
            ),
            selectedCategory:''
        },function(){
            this.setState({
                selectedColumn:''
            })
        });
    }

    //컬럼 추가 
    addColumn(){
        console.log('addColumn');
        let columns = this.state.columns;
        let newColumnIdx=0
        
        if(columns.length !=0 ){newColumnIdx = columns[columns.length-1].idx+1;}
        
        let column ={
            idx: newColumnIdx,
            alias:'',
            type:'ANY_VALUE',
            text:'',
            required:true
        }

        this.setState({
            columns: update(
                this.state.columns, 
                {
                    $push: [column]
                }
            ),
            selectedCategory:''
        });
    }

    //카테고리 삭제
    deleteCategory(){
        let selectedCategory = this.state.selectedCategory;

        let selectedColumn = this.state.selectedColumn;
        let textArray = selectedColumn.text.split('|');
        let idx = textArray.indexOf(selectedCategory);
        textArray.splice(idx,1)
        let text = textArray.join('|');

        let arrayIdx = this.findColumnIdx(selectedColumn.idx);
        this.setState({
            columns:update(
                this.state.columns,
                {
                    [arrayIdx] : {
                        text : { $set : text}
                    }
                }
            ),
            selectedCategory:''
        },function(){
            this.setState({
                selectedColumn:this.state.columns[arrayIdx]
            })
        });
    }

    //카테고리 선택
    selectCategoryRow(item){
        this.setState({
            selectedCategory:item
        })
    }

    //범주값 변경시 text 생성 및 저장
    changeRangedValues(){
        let selectedColumn = this.state.selectedColumn;
        let min = $('#minValue').val();
        let max = $('#maxValue').val();
        let range = $('#rangeValue').val();

        let text = min+'|'+max+'|'+range;

        let arrayIdx = this.findColumnIdx(selectedColumn.idx);
        this.setState({
            columns:update(
                this.state.columns,
                {
                    [arrayIdx] : {
                        text : { $set : text}
                    }
                }
            )
        },function(){
            this.setState({
                selectedColumn:this.state.columns[arrayIdx]
            })
        });

    }

    render() {

        return (
            <div style={{margin:30,textAlign:'left'}}>
                {/* <div onClick={()=>console.log(this.state)}>state확인</div> */}
                <h2>현장실습 데이터셋 생성</h2>
                <div style={{display:'grid',gridTemplateColumns:'75% 25%',height:400, marginTop:20}}>
                    <Paper style={{gridColumn:'1',gridRow:'1'}}>
                        <div style={{display:'grid',gridTemplateColumns:'7% 35% 20% 15%',height:50}}>
                                <h3 style={{gridColumn:'2',margin:'auto 0'}}> 컬럼명 </h3>
                                <h3 style={{gridColumn:'3',margin:'auto 0'}}> 타입 </h3>
                                <h3 style={{gridColumn:'4',margin:'auto auto'}}> 필수여부</h3>
                                <div style={{gridColumn:'5',margin:'auto auto'}}>
                                    <FlatButton
                                        label="컬럼추가"
                                        backgroundColor={'#3e81f6'}
                                        style={{color: '#fff'}}
                                        onClick={this.addColumn}
                                    />
                                </div>
                        </div>
                        <Divider style={{marginBottom:20}}/>
                        <div style={{height:330,overflow:'auto'}}>
                        {/* 추가할 컬럼들.. */}
                        {this.state.columns.map((row,idx)=>(
                             <div key={idx} style={{display:'grid',gridTemplateColumns:'7% 35% 20% 15%',height:50,backgroundColor:this.state.selectedColumn.idx==row.idx?'#f9f9f9':''}}
                                onClick={()=>this.selectColumnRow(row)}
                             >
                                <div style={{gridColumn:'1',margin:'auto 0'}}>
                                    <IconButton>
                                        <DeleteButton color={'#ddd'} onClick={()=>this.deleteColumn(row)}/>
                                    </IconButton>
                                </div>
                                <div style={{gridColumn:'2',margin:'auto 0'}}>
                                    <TextField
                                        style={{width:'80%'}}
                                        hintText="컬럼명 입력"
                                        value={row.alias}
                                        onChange={(e,v)=>this.changeColumnName(v,row)}
                                    />
                                </div>
                                <div style={{gridColumn:'3',margin:'auto 0'}}>
                                <SelectField
                                    style={{width:'80%'}}
                                    value={row.type}
                                    onChange={(e,i,v)=>this.changeColumnType(v,row)}
                                >
                                    <MenuItem value={'ANY_VALUE'} primaryText="모든 값" />
                                    <MenuItem value={'ALLOWED_VALUES'} primaryText="범주형" />
                                    <MenuItem value={'RANGE_VALUE'} primaryText="범위형" />
                                </SelectField>
                                </div>
                                <div style={{gridColumn:'4',margin:'auto auto'}}>
                                <Checkbox
                                    label=""
                                    onCheck={(e,c)=>this.changeColumnRequired(c,row)}
                                    checked={row.required}
                                />
                                </div>
                                <div style={{gridColumn:'5',margin:'auto 0'}}></div>
                            </div>   
                        ))}
                        </div>
                    </Paper>
                    <div style={{gridColumn:'2',gridRow:'1',padding:'0 10px'}}>
                        <Paper style={{width:220, height:90,marginBottom:10,paddingLeft:20}}>
                            <h3 style={{padding:'10px 0 10px 0'}}>옵션</h3>
                            <Checkbox
                                label="사진첨부"
                                onCheck={(e,c)=>this.changeOptions(c,'photo')}
                                checked={this.state.options.photo}
                            />
                            <Checkbox
                                label="날짜첨부"
                                onCheck={(e,c)=>this.changeOptions(c,'date')}
                                checked={this.state.options.date}
                            />
                        </Paper>
                        {this.state.selectedColumn==''|| this.state.selectedColumn.type=='ANY_VALUE' ? //선택되지않거나 ANY_VALUE일 때
                            null

                        :this.state.selectedColumn.type == 'ALLOWED_VALUES'? // ALLOWED_VALUES 일때
                            <Paper style={{height:300}}>
                                <div style={{height:50,display:'flex',alignItems:'center',paddingLeft:20}}>
                                    <h3 > 범주 설정 </h3>
                                </div>
                                <Divider style={{marginBottom:20}}/>
                                <Subheader style={{lineHeight:'',color:'#3e81f6',fontSize:13}}>범주 추가</Subheader>
                                <TextField
                                    style={{width:'60%',margin:'0 10% 0 10%',height:40}}
                                    hintText="값을 입력하세요"
                                    value={this.state.categoryValue}
                                    onKeyPress={this.onKeyPress}
                                    onChange={this.handleCategoryValue}
                                    id='category'
                                />
                                <div style={{width:'80%',margin:'10px 10% 10px 10%',display:'flex'}}>
                                    <Paper
                                        style={{width:'80%',height:150,overflow:'auto',paddingTop:10}}
                                    >
                                    {this.state.selectedColumn.text.split("|").map((row,idx)=>(
                                        <p 
                                            key={idx} 
                                            onClick={()=>this.selectCategoryRow(row)}
                                            style={{backgroundColor:this.state.selectedCategory==row?'#f9f9f9':'',paddingLeft:5}}
                                        >
                                            {row}
                                        </p>
                                    ))}
                                    </Paper>
                                    <div>
                                        <IconButton onClick={this.deleteCategory}>
                                            <DeleteButton color={'#ddd'} />
                                        </IconButton>
                                    </div>
                                </div>
                            </Paper>  

                        :this.state.selectedColumn.type == 'RANGE_VALUE'? // RANGE_VALUE 일때
                            <Paper style={{height:300}}>
                                <div style={{height:50,display:'flex',alignItems:'center',paddingLeft:20}}>
                                    <h3> 범위 설정 </h3>
                                </div>
                                <Divider style={{marginBottom:20}}/>
                                <Subheader style={{lineHeight:'',color:'#3e81f6',fontSize:13}}>시작값</Subheader>
                                <TextField
                                    style={{width:'80%',margin:'0 10% 0 10%',height:40}}
                                    hintText="값입력"
                                    value={this.state.selectedColumn.text.split('|')[0]}
                                    id="minValue"
                                    onChange={this.changeRangedValues}
                                />
                                <Subheader style={{lineHeight:'',color:'#3e81f6',fontSize:13,marginTop:10}}>끝값</Subheader>
                                <TextField
                                    style={{width:'80%',margin:'0 10% 0 10%',height:40}}
                                    hintText="값입력"
                                    value={this.state.selectedColumn.text.split('|')[1]}
                                    id="maxValue"
                                    onChange={this.changeRangedValues}
                                />
                                <Subheader style={{lineHeight:'',color:'#3e81f6',fontSize:13,marginTop:10}}>간격</Subheader>
                                <TextField
                                    style={{width:'80%',margin:'0 10% 0 10%',height:40}}
                                    hintText="값입력"
                                    value ={this.state.selectedColumn.text.split('|')[2]}
                                    id="rangeValue"
                                    onChange={this.changeRangedValues}
                                />
                            </Paper>
                        :null
                        }
                    </div>

                </div>


            </div>
        );
    }
}

export default NewDataset;