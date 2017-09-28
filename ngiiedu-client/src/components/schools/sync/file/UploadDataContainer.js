import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';



 const style={
        width:250,
        height:150
}

class Step1DataUpload extends Component {
   constructor(){
        super();

        this.state={
            upload:false
        }

       this.uploadCheck = this.uploadCheck.bind(this);
       
   }

   uploadCheck(){
        
        this.setState({
            upload: true
        });
        
        alert("test중");
        if(this.state.upload==true){
            
        }
   }

    render() {
        return (
            <div >
                <RaisedButton 
                    label="파일선택" 
                    primary={true} 
                    style={style} 
                    onClick={this.uploadCheck}
                />
                <br/>
                <TextField
                   disabled={true}
                   hintText="파일이름"
                />
            </div>
        );
    }
}

export default Step1DataUpload;