import React, { Component } from 'react';

//material ui
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

let SelectableList = makeSelectable(List);

class CreateLayer extends Component {

  constructor(props){
    super(props);

    this.state={
      selectedIndex: null,
      title : '',
      selectRow : null,
      datasetList:[],
      selDataset:{}
    }

    this.handleRequestChange = this.handleRequestChange.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.createLayer = this.createLayer.bind(this);
    this.editLayer = this.editLayer.bind(this);
  }

  componentDidMount(){
    if(this.props.type=='edit'){
      this.setState({
        title:this.props.selectRow.outputName
      });
    }
  }

  //주제지도 추가 버튼
  createLayer(){
    if(this.state.title==''){
      alert('주제지도의 제목을 입력해주세요.');
    }else if(Object.keys(this.state.selDataset).length ==0){
      alert('추가할 데이터셋을 선택해주세요.');
    }else{
      ajaxJson(
        ['POST', apiSvr + '/coursesWork/layers.json'],
        {
          courseWorkSubId : this.props.courseWorkSubId,
          title:this.state.title,
          sources: JSON.stringify({"inputDataset":{"filter":[],"datasetId":this.state.selDataset.pinogioOutputId,"type":this.state.selDataset.outputType}})
        },
        function (data) {
          this.props.changeView('main');
        }.bind(this),
        function (xhr, status, err) {
          alert('Error');
        }.bind(this)
      );
    }
  }

  //주제지도 변경 버튼
  editLayer(){
    ajaxJson(
      ['PUT', apiSvr + '/coursesWork/layers/' + this.props.selectRow.pinogioOutputId + '/metadata.json'],
      {
        title:this.state.title
      },
      function (data) {
        this.props.changeView('main');
      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );
  }

  //제목입력
  changeTitle(e, v){
    this.setState({
      title: v
    });
  }

  //데이터셋 선택
  handleRequestChange (row) {
    this.setState({
      selDataset: row
    });
  }

  render() {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };

    return (
      <div style={{width:'100%',textAlign:'center'}}>
        {this.props.type=='create'?
          <h1>주제지도 만들기</h1>
        :this.props.type=='edit'?
          <h1>주제지도 편집</h1>
        :null}

        <Subheader>Title</Subheader>
        <TextField 
          hintText="제목을 입력하세요" 
          value={this.state.title}
          onChange={this.changeTitle}
          type='text'
        />

        <Subheader>Dataset</Subheader>
        <Paper style={{width:500, height:300, overflowY:'scroll'}}>
          {this.props.datasetList.map((row,index)=>(
            <SelectableList value={this.state.selDataset.idx} onChange={(i)=>this.handleRequestChange(row)} key={index}>
              <ListItem primaryText={row.outputName} value={row.idx}/>
            </SelectableList>
          ))}
        </Paper><br/>

        <FlatButton
          hoverColor="#FAFAFA"
          label="취소"
          onClick={()=>this.props.changeView('main')}
        />

        {this.props.type=='create'? 
          <FlatButton
            backgroundColor="#00BCD4"
            hoverColor="#B2EBF2"
            label="추가"
            onClick={this.createLayer}
          />:this.props.type=='edit'?
          <FlatButton
            backgroundColor="#00BCD4"
            hoverColor="#B2EBF2"
            label="편집"
            onClick={this.editLayer}
          />
        :null}
        
      </div>
    );
  }
}

export default CreateLayer;