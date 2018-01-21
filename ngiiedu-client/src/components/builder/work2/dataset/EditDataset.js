import React, { Component } from 'react';

//material ui
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
//component

class EditDataset extends Component {
    constructor(){
        super();
        this.state={
          title:'',
          idx:''
        }

        this.editDataset = this.editDataset.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
    }

    componentDidMount(){
      this.setState({
        title :this.props.data.outputName,
        // idx : nextProps.data.pinogioOutputId
      });
    }

    changeTitle(e, v){
      this.setState({
        title: v
      });
    }

    //편집한데이터셋 저장
    editDataset(){
      var idx = this.props.data.pinogioOutputId;

      if(this.state.title==''){
        alter('제목을 입력하세요');
        return;
      }

      ajaxJson(
        ['PUT', apiSvr + '/coursesWork/dataset/'+idx+'.json'],
        {
          title:this.state.title
        },
        function (data) {
          this.props.cancleEdit('save');
        }.bind(this),
        function (xhr, status, err) {
          alert('Error');
        }.bind(this)
      );
    }


    render() {

        return (
            <div style={{width:'90%',textAlign:'center',display:'flex',justifyContent:'center'}}>
                <div>
                  <Subheader>제목</Subheader>
                  <TextField 
                    hintText="제목을 입력하세요" 
                    // defaultValue={this.props.data.pinogioOutputId}
                    value={this.state.title}
                    onChange={this.changeTitle}
                    type='text'
                  />
                  <br/>
                  <FlatButton
                    hoverColor="#FAFAFA"
                    label="취소"
                    onClick={()=>this.props.cancleEdit('main')}
                  />
                  <FlatButton
                    backgroundColor="#00BCD4"
                    hoverColor="#B2EBF2"
                    label="편집"
                    onClick={this.editDataset}
                  />
                </div>
            </div>
        );
    }
}

export default EditDataset;