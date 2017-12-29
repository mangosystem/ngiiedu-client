import React from 'react';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class EditToggle extends React.Component {
    constructor(){
      super();

      this.toggleEdit = this.toggleEdit.bind(this);
      this.onClickAdd = this.onClickAdd.bind(this);
      this.onClickDelete = this.onClickDelete.bind(this);
      this.onClickReset = this.onClickReset.bind(this);
      
    }

    toggleEdit(e,checked){
        this.props.toggleEdit(checked);
    }

    onClickAdd() {
      this.props.onClickAdd();
    }
    onClickDelete(){
      this.props.onClickDelete();
    }
    
    onClickReset(){
      this.props.onClickClear();
    }

    render() {
        return (
          <Paper style={{ padding: 10, backgroundColor:'#43444c', textAlign: 'right', zIndex:9, borderRadius: 10,color:'white'}}>
          <div style={{padding: '5px 10px 0px', textAlign:'right'}}>
            <Toggle
              label="편집모드 전환"
              labelStyle={{color:'white'}}
              // toggled={this.state.isEditMode}
              onToggle={this.toggleEdit}
            />
          </div>
            {this.props.toggleOn=='on' ?
              <div style={{paddingTop: 10}}>
                <RaisedButton
                  secondary={true}
                  label="객체 추가"
                  style={{marginRight: 10}}
                  disabled = {!this.props.addButton}
                  onClick={this.onClickAdd}
                />
                <RaisedButton
                  secondary={true}
                  label="객체 삭제"
                  style={{marginRight: 10}}
                  disabled = {!this.props.delButton}
                  onClick={this.onClickDelete}
                />
                <RaisedButton
                  secondary={true}
                  label="작업 초기화"
                  style={{marginRight: 10}}
                  onClick={this.onClickReset}
                />
              </div>  
            :
                null
            }
          </Paper>
        );
    }
}

export default EditToggle;