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

  }
  
  componentDidMount() {

    var oEditors = [];  
    
    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "ir1",
        sSkinURI: "/ngiiedu/assets/cdn/editor/SmartEditor2Skin.html",
        fCreator: "createSEditor2"
    });

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
            name="ir1" 
            id="ir1" 
            rows="50" 
            cols="35" 
            defaultValue="에디터에 기본으로 삽입할 글(수정 모드)이 없다면 이 value 값을 지정하지 않으시면 됩니다."
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
