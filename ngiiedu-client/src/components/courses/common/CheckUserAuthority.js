import react from 'react';



const CheckUserAuthority = (courseId,Idx) => {
  
    let isMember = false;
    let isOwner = false;
    let userIdx = '';
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
                  for(var i=0;i<data.length;i++){
                    if(data[i].userId==Idx && data[i].joinStatus == 'CJS02'){
                      isMember=true;
                    }
                  }
    }.bind(this)
    });
 
    //owner여부 체크
    // var userIdx = this.props.loginStatus.userIdx
    $.ajax({
      method:'GET',
      url: apiSvr+'/courses/'+courseId+'.json',
      dataType: 'json',
      async: false,
      success:  
        function(res){
          if(res.response.data.courseCreateId == Idx){
              isOwner=true
          }else{
              isOwner=false
          } 
        }.bind(this)
    });
  
    if(isMember==false && isOwner==false){
      alert("수업참여자가 아닙니다.");
      window.location.href=contextPath
    }

    return (
        {
          isOwner : isOwner,
          isMember : isMember,
          userIdx : userId
        }
    );
};


export default CheckUserAuthority;