import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import './UploadDataContainer.css'

 const style={
        width:250,
        height:150
}

class UploadDataContainer extends Component {
   constructor(){
        super();

        this.state={
            upload:false,
            file:undefined
        }
   }

    componentWillMount(){
        this.setState({
            file: undefined
        });
    }



   handleSubmit(event){
    // alert("테스트 중 ");


  }
  handleChange(event){
    let file = event.target.files[0];
    this.setState({file: file});
  }
  
  render(){
    return(
      <div>
         <h1 style={{padding:20}}>파일 선택</h1>
          <Divider style={{marginTop: '20px', marginBottom: '20px'}} />
          <div style={{marginLeft:150,marginTop:50}}>
        <div className="filebox bs3-primary">
                            <input className="upload-name" value="파일선택" disabled="disabled"/>

                            <label for="ex_filename">업로드</label> 
                          <input type="file" id="ex_filename" className="upload-hidden"/> 
                </div>
                </div>
        {/* <form onSubmit={this.handleSubmit.bind(this)} > */}

          {/* <input type="file" className="upload-name" name="file" onChange={this.handleChange.bind(this)}/> */}
          {/* <button type="submit">Submit</button> */}
        {/* </form> */}
      </div>
    );
  }
}



export default UploadDataContainer;