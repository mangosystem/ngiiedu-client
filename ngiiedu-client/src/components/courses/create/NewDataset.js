import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import DeleteButton from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import AddButton from 'material-ui/svg-icons/content/add-box';
import Paper from 'material-ui/Paper';
import update from 'react-addons-update';
import Divider from 'material-ui/Divider';


class NewDataset extends Component {
    constructor(){
        super();
        this.state={
            //데이터셋 생성
            columns:[{  
                title:'',
                type:'ANY_VALUE',
                category:[],
                columnIndex:0
            }
            ], //데이터셋 생성 : 컬럼정보 (컬럼명, 타입)
            selectedColumn:'', //선택된 컬럼 객체
            selectedCategory:1, //선택된 범주 항목
            // selectedColumnIndex : 0, //선택된 컬럼 index
            columnCount :0, //컬럼 인덱스 생성
        }

        this.addColumn = this.addColumn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeColumn = this.removeColumn.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectColumn = this.selectColumn.bind(this);
    }

    handleChange(columnIndex, type){
        console.log(columnIndex)
        console.log(type)
        let columns = [];
        let index;
        for( const [idx, row] of this.state.columns.entries()){
            if(row.columnIndex == columnIndex){
                index = idx
                break;
            } 
        }
    
        this.setState({
            columns:update(
                this.state.columns,
                {
                    [index] : {
                        type : { $set : type}
                    }
                }
            )
        })
    }

    //컬럼 추가
    addColumn(){
        alert('addcolumn')
        let columnCount = 1+this.state.columnCount;
        let columns = []
        columns = columns.concat(this.state.columns);
        
        columns.push({  
            title:'',
            type:'ANY_VALUE',
            category:[],
            columnIndex : columnCount
        })
        this.setState({
            columns : columns,
            columnCount : columnCount
        })
    }

    //컬럼삭제
    removeColumn(columnIndex){
        alert('removeColumn' + columnIndex);
        let index;
        for( const [idx, row] of this.state.columns.entries()){
            if(row.columnIndex == columnIndex){
                index = idx
                break;
            } 
        }

        

        this.setState({
            columns:update(
                this.state.columns,
                {
                    $splice:[[index,1]]
                }
            ),
            selectedColumn:'',
        })
    }
    
    //범주 추가.
    addCategory(){
        let value = document.getElementById('textField').value;
        let categorys = this.state.selectedColumn.category;
        if(categorys.includes(value)){
            alert('중복된 범주');
            return;
        }
        let selectedCategory = [].concat(categorys);
        selectedCategory.push(value);

        let columns = [].concat(this.state.columns);        
        for( const [index,row] of columns.entries()){
            console.dir(row);
            if(row.columnIndex == this.state.selectedColumn.columnIndex){
                columns[index].category=selectedCategory;
                break;
            }
        }
        console.dir(columns)
        this.setState({
            columns :columns
        })
        
        document.getElementById('textField').value=''
    }

    removeCategory(){
        let categoryIndex;
        let columnIndex;

        //카테고리 번호찾기
        for( const [idx,row] of this.state.selectedColumn.category.entries()){
            if(row.category == this.state.selectedCategory){
                categoryIndex =idx;
            }
        }

        //컬럼번호 찾기
        for( const [idx, row] of this.state.columns.entries()){
            if(row.columnIndex == this.state.selectedColumn.columnIndex){
                columnIndex = idx
                break;
            } 
        }

        this.setState({
            columns:update(
                this.state.columns,
                {
                    [columnIndex]:{
                        category:{
                            $splice:[[categoryIndex,1]]
                        }
                    }
                }
            )
        },function(){
            this.setState({
                selectedColumn:this.state.columns[columnIndex]
            })
        })
    }

    selectCategory(category){
        this.setState({
            selectedCategory:category
        })
    }

    selectColumn(column){
        this.setState({
            selectedColumn:column,
        })
        console.dir(column)
    }

    createDataset(){
        alert('데이터셋 생성화면으로 이동');
    }



    render() {

        return (
            <Paper style={{marginTop:50,display:'grid',gridTemplateColumns:'0% 75% 25% 0%',
                margin:50,textAlign:'left',padding:20
            }}>
                <h3 style={{gridColumn:'2/4',gridRow:'1',paddingBottom:10}}>현장실습 데이터셋 생성</h3>
                {/* <div style={{gridColumn:'2/4',gridRow:'1'}}>
                    <div>
                        <p>제목</p>
                        <TextField
                            style={{marginLeft:'0%'}}
                            hintText="Hint Text"
                        />
                    </div>
                </div> */}

                
                <div style={{gridColumn:'2/3',gridRow:'2' ,borderRight:'2px solid #ddd' ,display:'block',paddingRight:20}}>
                    
                    <div style={{width:'100%',display:'flex',alignItems:'center'}}>
                            <div style={{fontSize:20, width:'50%'}}>
                                컬럼명
                            </div>
                            <div style={{fontSize:20, width:'25%',paddingLeft:24}}>
                                타입
                            </div>
                            <div style={{width:'25%'}}>
                                <FlatButton
                                    label="컬럼추가"
                                    backgroundColor={'#3e81f6'}
                                    style={{color: '#fff'}}
                                    onClick={this.addColumn}
                                />
                            </div>
                    </div>
                    {/* 새로운 추가 항목들 */}
                    {this.state.columns.map((row,index)=>(
                        <div key={index} 
                            style={{width:'100%',display:'flex',alignItems:'center', backgroundColor: row.columnIndex == this.state.selectedColumn.columnIndex ? '#f9f9f9' : ''}}
                               
                        >
                            <div style={{width:'50%'}} onClick={()=>this.selectColumn(row)} >
                                <TextField
                                    style={{marginLeft:'0%',width:'80%'}}
                                    hintText="컬럼명을 입력하세요"
                                    underlineShow	={false}
                                />
                            </div>
                            <div style={{width:'25%'}} onClick={()=>this.selectColumn(row)} >
                            <DropDownMenu value={this.state.columns[index].type} style={{marginLeft:0}} onChange={(event,index,value)=>this.handleChange(row.columnIndex,value)}
                              underlineStyle={{display:'none'}}
                            >
                                <MenuItem value={'ANY_VALUE'} primaryText="모든 값" />
                                <MenuItem value={'ALLOWED_VALUE'} primaryText="범주형" />
                                <MenuItem value={'RANGE_VALUE'} primaryText="범위형" />
                            </DropDownMenu>
                            </div>
                            <div style={{width:'25%'}}>
                            <IconButton>
                                <DeleteButton color={'red'} onClick={()=>this.removeColumn(row.columnIndex)}/>
                            </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{gridColumn:'3/4',gridRow:'2',paddingLeft:20}} >
                    <div style={{display:'flex',alignItems:'center'}}>
                        <Paper style={{marginTop:40,height:30,paddingLeft:10}}>
                        <TextField style={{width:'100%',backgroundColor:'rgba(0,0,0,0)',height:30}} 
                            underlineShow={false}
                            id='textField'
                            disabled={this.state.selectedColumn ==''}
                        />
                        </Paper>
                        <IconButton style={{marginTop:30}}>
                                <AddButton color={cyan500} onClick={this.addCategory}/>
                        </IconButton>
                    </div>
                    <div style={{display:'flex'}}>
                        <Paper style={{marginTop:10,height:200,width:'80%'}} >
                            {this.state.selectedColumn !='' ? 
                                this.state.selectedColumn.category.map((row,index)=>(
                                    <div key={index} 
                                        style={row == this.state.selectedCategory ? {backgroundColor: '#f9f9f9'} : {}}
                                        onClick={()=>this.selectCategory(row)}
                                    >
                                        {row}
                                    </div>
                                )) : null
                            }
                        </Paper>
                        <IconButton style={{marginTop:0}}>
                                <DeleteButton color={'red'} onClick={this.removeCategory}/>
                        </IconButton>
                    </div>
                </div>
              
                 
                {/* <div style={{gridColumn:'1/5',gridRow:'2', textAlign:'right' ,marginTop:20}}>
                <Divider />
                    <FlatButton
                        label="생성"
                        backgroundColor={cyan500}
                        style={{color: 'white',marginTop:20}}
                        onClick={this.createDataset}
                    />
                </div> */}
            </Paper>
        );
    }
}

export default NewDataset;