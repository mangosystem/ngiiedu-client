import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class NewWarnModal extends React.Component {

  constructor(){
    super();

    

  }


  render() {

    return (
      <Dialog
        title="확인"
        actions={[
                <FlatButton
                  label="취소"
                  style={{backgroundColor:'#43444c',color:'#fff'}}
                  primary={true}
                  onClick={this.props.cancle}
                />,
                <FlatButton
                  label="확인"
                  style={{backgroundColor:'#fff',color:'#43444c',border:'1px solid #43444c'}}
                  primary={true}
                  onClick={this.props.agree}
                />
        ]}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={true}
        modal={true}
        open={this.props.open}
        >
        <div style={{height:150,padding:30}}>
          <p style={{fontSize:30,height:70}}>현장수집 데이터를 생성하시겠습니까? </p>
          <p style={{fontSize:20}}>한번 생성된 데이터는 편집할 수 없습니다. </p>
        </div>
      </Dialog>
    );
  }
}

export default NewWarnModal;