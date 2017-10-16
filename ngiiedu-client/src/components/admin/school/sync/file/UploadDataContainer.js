import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

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
    alert("테스트 중 ");
    // event.preventDefault();
    // let formData = new FormData();
    // formData.append('file', this.state.file);
    // alert("tlwkr");
    // console.dir(formData);

    // ajaxJson(
    //     ['POST',apiSvr+'/schools/sync/file'],
    //     formData,
    //     function(res){
            
    //         console.dir(res);
            
    //     }.bind(this)
    //   )



    // axios.post(apiSvr+'/schools/sync/file', formData)
    // .then((response) => {
    //   console.log(response);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
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
        <form onSubmit={this.handleSubmit.bind(this)} >
          <input type="file" name="file" onChange={this.handleChange.bind(this)}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}



export default UploadDataContainer;