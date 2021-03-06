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
import { withRouter } from "react-router-dom";

import BoundsModal from './BoundsModal.js';
import NewWarnModal from '../../../courses/create/NewWarnModal.js'

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
                    name:'column1',
                    alias:'',
                    value_type:'STRING',
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
            categoryValue:'',//카테고리 추가 값 입력 state
            selectedColumn:'', //현재 선택된 컬럼
            selectedCategory:'', //현재 선택된 카테고리
            modalOpen:false, // 모달창 오픈
            result:'', //결과물
            warnModalOpen:false //모달창

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
        this.handleModal = this.handleModal.bind(this) //모달온오프 헨들러.
        this.saveWGS = this.saveWGS.bind(this) //모달 바운더리 save

        //전달
        this.onChangedDataset = this.onChangedDataset.bind(this);
        //생성
        this.createDataset = this.createDataset.bind(this);

        //title
        this.changeTitle = this.changeTitle.bind(this);

        //모달 핸들러
        this.warnModalHandler = this.warnModalHandler.bind(this);// 열기 닫기
        this.agreeModalHandle = this.agreeModalHandle.bind(this);// 동의 시
    }
    //모달
    warnModalHandler(){
        this.setState({
            warnModalOpen:!this.state.warnModalOpen
        })
    }
    agreeModalHandle(){
        this.setState({
            warnModalOpen:!this.state.warnModalOpen
        })
        this.createDataset();

    }

    //데이터셋 생성
    createDataset(){
        let {state} = this;
        
        var columns = state.result.columns;
		for(var i =0;i<columns.length;i++){
			if(columns[i].value_type=='STRING'||columns[i].value_type=='INTEGER'){
				columns[i].value_type='ANY_VALUE';
			}
        }
        
        var emptyTemplate;
		// if(result){
        emptyTemplate = state.result;
        emptyTemplate.columns = columns;
        emptyTemplate = JSON.stringify(emptyTemplate);
		// } else{
			// emptyTemplate = null;
		// }
        

        ajaxJson(
			['POST', apiSvr+'/courses/addDataset.json'],
			{
				courseId: this.props.match.params.COURSEID,
				courseWorkId: this.props.courseWorkSubId,
				emptyTemplate:emptyTemplate
			},
			function(res) {
				const courseData = JSON.parse(JSON.stringify(res)).response.data;
				if(courseData==null){
					alert('데이터셋 생성에 실패하였습니다. 현장실습 데이터 생성을 확인하세요.')
					return;
                }
                alert('데이터셋이 추가되었습니다.');
				this.setState({
                    warnModalOpen:!this.state.warnModalOpen
                })
                this.props.handleStep('addDataset')


			}.bind(this),
			function(xhr, status, err) {
				alert('Error');
			}.bind(this)
		);
    }

    //모달온오프 헨들러.
    handleModal(){
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    //모달 바운더리 저장
    saveWGS(extent){
        this.setState({
            wgs84Bounds:{
                minX:extent[0],
                minY:extent[1],
                maxX:extent[2],
                maxY:extent[3],
            },
            modalOpen:false
        },function(){
            this.onChangedDataset();

        })

    }

    //geometry type 변경
    changeGeometryType(v){
        this.setState({
            geometry_type:v
        })
    }

    componentDidMount(){}

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
            if(value==''){return;};
            let textArray, value_base;

            if(selectedColumn.value_base!=''){
                textArray = selectedColumn.value_base.split('|');
                if(textArray.indexOf(value)>=0){return;}
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
        this.setState({
            selectedColumn:column,
            selectedCategory:''    
        })
        
    }

    //컬럼명 변경
    changeColumnName(v, column){
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
        if(v==this.state.selectedColumn.value_type){
            return;
        }
        
        let arrayIdx = this.findColumnIdx(column.idx);
        let value_base ='';
        let value_type =v;
        let type = 'STRING';
        if(v=='RANGE_VALUES'){
            value_base = '1|10|1'
            type = 'INTEGER'
        }else if(v=='INTEGER' ||v=='STRING'){
            value_type = v;
            type = v;
        }
        this.setState({
            columns:update(
                this.state.columns,
                {
                    [arrayIdx] : {
                        value_type : { $set : value_type},
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
        let columns = this.state.columns;
        let newColumnIdx=0
        
        if(columns.length !=0 ){newColumnIdx = columns[columns.length-1].idx+1;}
        
        let column ={
            idx: newColumnIdx,
            name: 'column'+(newColumnIdx+1),
            alias:'',
            value_type:'STRING',
            type:'STRING',
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
        this.setState({
            result:result
        })

        // this.props.onChangedDataset(result)
    }

    //title변경
    changeTitle(v){
        this.setState({
            title:v
        },function(){
            this.onChangedDataset();
        })
    }

    render() {

        return (
            <div style={{margin:'30px 0',textAlign:'left'}}>
                <h2>현장실습 데이터 생성</h2>
                <TextField
                    floatingLabelText="제목"
                    floatingLabelFixed={true}
                    hintText="제목을 입력하세요"
                    value={this.state.title}
                    onChange={(e,v)=>this.changeTitle(v)}
                />
                <div style={{display:'grid',gridTemplateColumns:'73% 27%',height:400, marginTop:20,marginBottom:10}}>
                    <Paper style={{gridColumn:'1',gridRow:'1'}}>
                        <div style={{display:'grid',gridTemplateColumns:'7% 30% 25% 15%',height:50}}>
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
                             <div key={idx} style={{display:'grid',gridTemplateColumns:'7% 30% 25% 15%',height:50,backgroundColor:this.state.selectedColumn.idx==row.idx?'#f9f9f9':''}}
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
                                    <MenuItem value={'STRING'} primaryText="문자형" />
                                    <MenuItem value={'INTEGER'} primaryText="숫자형" />
                                    <MenuItem value={'ALLOWED_VALUES'} primaryText="범주형" />
                                    <MenuItem value={'RANGE_VALUES'} primaryText="범위형" />
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
                        <Paper style={{ height:120,marginBottom:10,paddingLeft:10}}>
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
                                    onClick={this.handleModal}
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

                        :this.state.selectedColumn.value_type == 'RANGE_VALUES'? // RANGE_VALUES 일때
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

                <Divider style={{marginTop:20,marginBottom:20}}/>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <FlatButton
                        label="취소"
                        style={{color: 'white',backgroundColor:'#3e81f6'}}
                        onClick={()=>this.props.handleStep('main')}
                    />
                    {this.state.result=='' ?
                    //비활성화
                        <FlatButton
                            label="생성"
                            disabled={true}
                            style={{color: 'white',backgroundColor:'#19c9b7'}}
                            
                            
                        />
                    :
                        <FlatButton
                            label="생성"
                            style={{color: 'white',backgroundColor:'#3e81f6'}}
                            onClick={this.warnModalHandler}
                        />
                    }
                </div>

                {this.state.modalOpen?
                    <BoundsModal
                        open={this.state.modalOpen}
                        wgs84Bounds={this.state.wgs84Bounds}
                        handleModal={this.handleModal}
                        saveWGS ={this.saveWGS}
                    />
                :
                    null
                }

                <NewWarnModal
                    open={this.state.warnModalOpen}
                    cancle={this.warnModalHandler}
                    agree={this.agreeModalHandle}
				/>

            </div>
        );
    }
}

export default withRouter(NewDataset);