import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import { cyan500 } from 'material-ui/styles/colors';


class EditorPanel extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      oEditors: []
    };

  }

  componentWillReceiveProps(nextProps){

    const { oEditors } = this.state;

    if (oEditors.getById) {
      oEditors.getById["smarteditor"].exec("SET_IR", [""]); //내용초기화 
      oEditors.getById["smarteditor"].exec("PASTE_HTML", [nextProps.description]);
    }

  }
  
  componentDidMount() {
    
    var oEditors = this.state.oEditors;
    
    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "smarteditor",
        sSkinURI: "/ngiiedu/assets/cdn/editor/SmartEditor2Skin.html",
        // sSkinURI: "/assets/cdn/editor/SmartEditor2Skin.html",
        fCreator: "createSEditor2"
    });
    
  }

  submit() {

    var oEditors = this.state.oEditors;

    oEditors.getById["smarteditor"].exec("UPDATE_CONTENTS_FIELD", []);

    this.validation();
    //this.props.modifyDescription(contents);
    
    
  }
  
  
  validation() {
    
    var oEditors = this.state.oEditors;
    
    var contents = $.trim(oEditors[0].getContents()); 
    
    console.log("validation() : ");
    console.log(contents);
    
    this.props.modifyDescription(contents);
    this.props.onChangeEditorMode();

  }

  render() {

    const style = {
      editStyle: {
        padding: 20
      },
      none: {
        display: 'none'
      }
    };


    return (
      <div style={ this.props.editorMode ? style.editStyle : style.none }>
        <Paper zDepth={0} style={{paddingBottom: 10, fontSize: 15, borderBottom: '1px solid #eee'}}>
          <h2>컨텐츠 입력</h2>
        </Paper>
        <Paper zDepth={0} style={{ width: '270px', height: '90%' }}>
          <textarea 
            name="smarteditor" 
            id="smarteditor" 
            rows="50" 
            cols="35" 
            defaultValue={this.props.description}
            style={{ minWidth: '260px', height: '600px', MaxHeight: '600px' }}
          ></textarea>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <FlatButton
              label="취소"
              onClick={this.props.onChangeEditorMode}
            />
            <FlatButton
              label="적용"
              backgroundColor={cyan500}
              style={{color: 'white'}}
              onClick={this.validation.bind(this)}
            />
          </div>
        </Paper>
      </div>
    );
  }
};

EditorPanel.propTypes = {
	editorMode: React.PropTypes.bool
};

EditorPanel.defaultProps = {
	editorMode: false
};

export default EditorPanel;
