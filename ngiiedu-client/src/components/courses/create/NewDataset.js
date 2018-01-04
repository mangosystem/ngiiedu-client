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
 
import BoundsModal from './BoundsModal.js';

class NewDataset extends Component {
    constructor(){
        super();

        this.state={
            title:'',
            is_photo :true,
            geometry_type:'POINT',
            columns:[
                {
                    idx:0,
                    name:'column0',
                    alias:'sample',
                    value_type:'ANY_VALUE',
                    type:'STRING',
                    value_base:'',
                    required:true
                }
            ],
            wgs84Bounds:{
                minY:34.44521717164801,
                minX:124.14518712529437,
                maxY:37.98947165211126,
                maxX:131.29728673466937,
            },
            // wgs84Bounds:{
            //     minY:124.14518712529437,
            //     minX:34.44521717164801,
            //     maxY:131.29728673466937,
            //     maxX:37.98947165211126
            // },//4326 wkt형식 bounds
            categoryValue:'',//카테고리 추가 값 입력 state
            selectedColumn:'', //현재 선택된 컬럼
            selectedCategory:'', //현재 선택된 카테고리
            boundModalOpen:false, // 모달창 오픈
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
        this.changeOptions = this.changeOptions.bind(this); //사진옵션
        this.changeGeometryType = this.changeGeometryType.bind(this); //geomety type 변경
        
        //범주관련
        this.onKeyPress = this.onKeyPress.bind(this); //범주 추가시 (엔터키)
        this.selectCategoryRow = this.selectCategoryRow.bind(this); // 카테고리 row 선택
        this.deleteCategory = this.deleteCategory.bind(this); // 카테고리 삭제

        //범위 관련
        this.changeRangedValues = this.changeRangedValues.bind(this); //범주값 변경시 value_base 생성

        //지도관련 bound
        this.boundHandleModal = this.boundHandleModal.bind(this) //모달온오프 헨들러.
        this.saveWGS = this.saveWGS.bind(this) //모달 바운더리 save

        //전달
        this.onChangedDataset = this.onChangedDataset.bind(this);

    }

    //모달온오프 헨들러.
    boundHandleModal(){
        this.setState({
            boundModalOpen: !this.state.boundModalOpen
        })
    }

    //모달 바운더리 저장
    saveWGS(extent){
        console.log(extent)
        this.setState({
            wgs84Bounds:{
                minX:extent[0],
                minY:extent[1],
                maxX:extent[2],
                maxY:extent[3],
            },
            boundModalOpen:false
        })

        this.onChangedDataset();
    }



    //geometry type 변경
    changeGeometryType(v){
        this.setState({
            geometry_type:v
        })
    }
    /////---------------------------

    componentDidMount(){
        let moduleId = this.props.moduleId;
        let d = this.props.datasetData;
        if(d != ''){
            this.setState({
                title:d.title,
                is_photo :d.is_photo,
                geometry_type:d.geometry_type,
                columns:d.columns,
                wgs84Bounds:d.metadata.wgs84Bounds,
            })
        }else if(moduleId =='1'){
            //우리지역 소음지도
            this.setState({
                columns:[
                    {
                        idx:0,
                        name:'column1',
                        alias:'소음측정값',
                        value_type:'ANY_VALUE',
                        type:'STRING',
                        value_base:'',
                        required:true
                    },
                    {
                        idx:1,
                        name:'column2',
                        alias:'주요소음원',
                        value_type:'ALLOWED_VALUES',
                        type:'STRING',
                        value_base:'도로교통소음|공사장소음|생활소음|철도소음|기타소음',
                        required:true
                    },
                    {
                        idx:2,
                        name:'column3',
                        alias:'체감소음도',
                        value_type:'ALLOWED_VALUES',
                        type:'STRING',
                        value_base:'아주조용함|조용함|보통|시끄러움|아주시끄러움',
                        required:true
                    },
                    {
                        idx:3,
                        name:'column4',
                        alias:'기타',
                        value_type:'ANY_VALUE',
                        type:'STRING',
                        value_base:'',
                        required:true
                    }
                ],
                title:'소음원 현장조사'
            },function(){
                this.onChangedDataset();
            })
        }else if(moduleId =='2'){
            //GPS 활용 위치학습
            this.setState({
                columns:[
                    {
                        idx:0,
                        name:'column1',
                        alias:'장소명',
                        value_type:'ANY_VALUE',
                        type:'STRING',
                        value_base:'',
                        required:true
                    }
                ],
                title:'위치학습 현장조사'
            },function(){
                this.onChangedDataset();
            })
        }else if(moduleId =='4'){
            //통합적영토교육 -> 소음측정
            this.setState({
                columns:[
                    {
                        idx:0,
                        name:'column1',
                        alias:'불편내용',
                        value_type:'ANY_VALUE',
                        type:'STRING',
                        value_base:'',
                        required:true
                    }
                    
                ],
                title:'불편지역 현장조사'
            },function(){
                this.onChangedDataset();
            })
        }else if(moduleId =='5'){
            //우리학교 운동장 생태지도
            this.setState({
                columns:[
                    {
                        idx:0,
                        name:'column1',
                        alias:'나무종류',
                        value_type:'ALLOWED_VALUES',
                        type:'STRING',
                        value_base:'소나무|잣나무|낙엽송|리기다소나무|편백나무|상수리나무|신갈나무|침엽수|활엽수|기타',
                        required:true
                    }
                ],
                title:'생태지도 현장조사'
            },function(){
                this.onChangedDataset();
            })
        }
    }

    //옵션체크박스 선택시
    changeOptions(v){
        this.setState({
            is_photo:v
        },function(){
            this.onChangedDataset();
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
            let textArray, value_base;

            if(selectedColumn.value_base!=''){
                textArray = selectedColumn.value_base.split('|');
                if(textArray.indexOf(value)>=0){return console.log('중복된값')}
                textArray.push(value);
                value_base = textArray.join('|');
            }else{
                value_base = value
            }

            let arrayIdx = this.findColumnIdx(selectedColumn.idx);
            this.setState({
                columns:update(
                    this.state.columns,
                    {
                        [arrayIdx] : {
                            value_base : { $set : value_base}
                        }
                    }
                ),
                categoryValue:''
            },function(){
                this.setState({
                    selectedColumn:this.state.columns[arrayIdx]
                })
                this.onChangedDataset();
            });
            
            // console.log(text)
            
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
            this.onChangedDataset();
        });

        
    }

    //컬럼 타입변경
    changeColumnType(v, column){
        console.log('changeColumnType')
        if(v==this.state.selectedColumn.value_type){
            return;
        }
        
        let arrayIdx = this.findColumnIdx(column.idx);
        let value_base ='';
        let type = 'STRING';
        if(v=='RANGE_VALUE'){
            value_base = '1|10|1'
            type = 'INTEGER'
        }
        this.setState({
            columns:update(
                this.state.columns,
                {
                    [arrayIdx] : {
                        value_type : { $set : v},
                        value_base : { $set : value_base},
                        type : { $set : type}
                    }
                }
            ),
            selectedCategory:''
        },function(){
            this.setState({
                selectedColumn:this.state.columns[arrayIdx]
            })
            this.onChangedDataset();
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
            this.onChangedDataset();
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
            this.onChangedDataset();
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
            name: 'column'+(newColumnIdx+1),
            alias:'',
            value_type:'ANY_VALUE',
            value_base:'',
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
        },function(){
            this.onChangedDataset();
        });

        
    }

    //카테고리 삭제
    deleteCategory(){
        let selectedCategory = this.state.selectedCategory;

        let selectedColumn = this.state.selectedColumn;
        let textArray = selectedColumn.value_base.split('|');
        let idx = textArray.indexOf(selectedCategory);
        textArray.splice(idx,1)
        let value_base = textArray.join('|');

        let arrayIdx = this.findColumnIdx(selectedColumn.idx);
        this.setState({
            columns:update(
                this.state.columns,
                {
                    [arrayIdx] : {
                        value_base : { $set : value_base}
                    }
                }
            ),
            selectedCategory:''
        },function(){
            this.setState({
                selectedColumn:this.state.columns[arrayIdx]
            })
            this.onChangedDataset();
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

        let value_base = min+'|'+max+'|'+range;

        let arrayIdx = this.findColumnIdx(selectedColumn.idx);
        this.setState({
            columns:update(
                this.state.columns,
                {
                    [arrayIdx] : {
                        value_base : { $set : value_base}
                    }
                }
            )
        },function(){
            this.setState({
                selectedColumn:this.state.columns[arrayIdx]
            })
            this.onChangedDataset();
        });

        

    }

    onChangedDataset(){
        let result ={
            title:this.state.title,
            // privacy :'TEAM',
            geometry_type :this.state.geometry_type,
            columns:this.state.columns,
            is_photo:this.state.is_photo,
            metadata:{
                spatialType:'VECTOR',
                geometryType:this.state.geometry_type,
                wgs84Bounds:this.state.wgs84Bounds
            }
        }
        this.props.onChangedDataset(result)
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
                                <h3 style={{gridColumn:'3',margin:'auto 0'}}> 자료형식 </h3>
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
                                    value={row.value_type}
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
                        <Paper style={{width:220, height:120,marginBottom:10,paddingLeft:10}}>
                            <div style={{height:30,display:'flex',alignItems:'center'}}>
                                <h3 >옵션 </h3>
                            </div>
                            <div style={{display:'flex'}}>
                                <Checkbox
                                    iconStyle={{marginRight:10}}
                                    style={{width:'40%'}}
                                    labelStyle={{width:52}}
                                    label="사진첨부"
                                    onCheck={(e,c)=>this.changeOptions(c)}
                                    checked={this.state.is_photo}
                                />
                                <SelectField
                                    floatingLabelText="데이터 타입"
                                    style={{width:'50%',marginLeft:17,marginTop:-37}}
                                    value={this.state.geometry_type}
                                    onChange={(e,i,v)=>this.changeGeometryType(v)}
                                >
                                    <MenuItem value={'POINT'} primaryText="포인트" />
                                    <MenuItem value={'LINESTRING'} primaryText="라인" />
                                    <MenuItem value={'POLYGON'} primaryText="폴리곤" />
                                </SelectField>
                            </div>
                            <div style={{marginTop:10,textAlign:'center'}}>
                                <FlatButton
                                    label="지도 범위 설정"
                                    backgroundColor={'#3e81f6'}
                                    style={{color: '#fff',width:'80%'}}
                                    onClick={this.boundHandleModal}
                                />
                            </div>
                            
                        </Paper>
                        {this.state.selectedColumn==''|| this.state.selectedColumn.value_type=='ANY_VALUE' ? //선택되지않거나 ANY_VALUE일 때
                            null

                        :this.state.selectedColumn.value_type == 'ALLOWED_VALUES'? // ALLOWED_VALUES 일때
                            <Paper style={{height:270}}>
                                <div style={{height:30,display:'flex',alignItems:'center',paddingLeft:10}}>
                                    <h3 > 범주 설정 </h3>
                                </div>
                                <Divider style={{marginBottom:10}}/>
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
                                    {this.state.selectedColumn.value_base.split("|").map((row,idx)=>(
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

                        :this.state.selectedColumn.value_type == 'RANGE_VALUE'? // RANGE_VALUE 일때
                            <Paper style={{height:270}}>
                                <div style={{height:30,display:'flex',alignItems:'center',paddingLeft:10}}>
                                    <h3> 범위 설정 </h3>
                                </div>
                                <Divider style={{marginBottom:10}}/>
                                <Subheader style={{lineHeight:'',color:'#3e81f6',fontSize:13}}>시작값</Subheader>
                                <TextField
                                    style={{width:'80%',margin:'0 10% 0 10%',height:40}}
                                    hintText="값입력"
                                    value={this.state.selectedColumn.value_base.split('|')[0]}
                                    id="minValue"
                                    onChange={this.changeRangedValues}
                                />
                                <Subheader style={{lineHeight:'',color:'#3e81f6',fontSize:13,marginTop:10}}>끝값</Subheader>
                                <TextField
                                    style={{width:'80%',margin:'0 10% 0 10%',height:40}}
                                    hintText="값입력"
                                    value={this.state.selectedColumn.value_base.split('|')[1]}
                                    id="maxValue"
                                    onChange={this.changeRangedValues}
                                />
                                <Subheader style={{lineHeight:'',color:'#3e81f6',fontSize:13,marginTop:10}}>간격</Subheader>
                                <TextField
                                    style={{width:'80%',margin:'0 10% 0 10%',height:40}}
                                    hintText="값입력"
                                    value ={this.state.selectedColumn.value_base.split('|')[2]}
                                    id="rangeValue"
                                    onChange={this.changeRangedValues}
                                />
                            </Paper>
                        :null
                        }
                    </div>

                </div>

                

                {this.state.boundModalOpen?
                    <BoundsModal
                        open={this.state.boundModalOpen}
                        wgs84Bounds={this.state.wgs84Bounds}
                        handleModal={this.boundHandleModal}
                        saveWGS ={this.saveWGS}
                    />
                :
                    null
                }
                
            </div>
        );
    }
}

export default NewDataset;