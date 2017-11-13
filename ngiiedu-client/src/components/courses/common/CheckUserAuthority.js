import react from 'react';



const CheckUserAuthority = (courseId,Idx) => {
  
    let isMember = false
    let isOwner = false
    // let idx = this.props.loginStatus.userIdx
    //member여부 체크
    $.ajax({
      method:'GET',
      url: apiSvr+'/courses/'+courseId+'/memberInfos.json',
      dataType: 'json',
      async: false,
      success:  
      function(res){
                var data = res.response.data;
                console.dir(data);
                  for(var i=0;i<data.length;i++){
                    if(data[i].userId==Idx){
                      console.log('isMember');
                      isMember=true;
                    }
                  }
    }.bind(this)
    });
 
    //owner여부 체크
    // console.dir(this.props.loginStatus.userIdx)
    // var userIdx = this.props.loginStatus.userIdx
    $.ajax({
      method:'GET',
      url: apiSvr+'/courses/'+courseId+'.json',
      dataType: 'json',
      async: false,
      success:  
        function(res){
          if(res.response.data.courseCreateId == Idx){
            console.log('isOwner');
              isOwner=true
          }else{
              isOwner=false
          } 
        }.bind(this)
    });
  

    return (
        {
          isOwner : isOwner,
          isMember : isMember,
        }
    );
};


export default CheckUserAuthority;