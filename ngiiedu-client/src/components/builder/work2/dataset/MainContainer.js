import React from 'react';

import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import '../workStyle.css';
import CreateDataset from './CreateDataset'
//testdata
//"안양시 동안구 소음지도"
// d=AnyangDong
// "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))"
class MainContainer extends React.Component {

    constructor(){
        super();

        this.state={
            step:'main',
            dataSetData:[{
                moduleWorkSubName:'',
                workOutputList:[]
            }]
        }

        this.changeName = this.changeName.bind(this);
        this.deleteDataset = this.deleteDataset.bind(this);
        this.createDataset = this.createDataset.bind(this);
        this.thumbnailClick = this.thumbnailClick.bind(this);
    }

    componentDidMount(){
        // var response={"code":200,"data":[{"idx":24,"courseWorkId":27,"moduleWorkSubId":1,"moduleWorkSubName":"소음데이터 수집","moduleWorkSubSeq":1,"createDate":1510251778947,"modifyDate":1510249561075,"outputType":"dataset","workOutputList":[{"idx":49,"courseWorkSubId":24,"outputTeamId":0,"outputUserid":40,"outputDivision":"1","pinogioOutputId":"d=AnyangDong","outputType":"dataset","pngoData":{"id":10,"projectId":"p=pppppppp","datasetId":"d=AnyangDong","ownerId":1,"title":"안양시 동안구 소음지도","description":"안양시 동안구 지역의 소음도를 측정한 데이터 입니다.","metadata":null,"privacy":"PUBLIC","createdDate":1510199356715,"updatedDate":1510199356715,"ownerUsername":"admin","geometryType":"MULTIPOINT","geometryColumn":"the_geom","srid":3857,"bounds":"POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))","rowsCount":501,"totalSize":163840,"commentCount":0,"viewCount":0,"likeCount":0,"ratingScore":0},"outputName":"안양시 동안구 소음지도"}]}]}

        // this.setState({
        //     dataSetData:response.data
        // })
        const workId = this.props.match.params.WORKID;
        ajaxJson(
            ['GET', apiSvr + '/courses/' + workId + '/workSubData.json'],
            null,
            function (response) {
                this.setState({
                    dataSetData : response.response.data
                })
            }.bind(this),
            function (xhr, status, err) {
              alert('Error');
            }.bind(this)
          );

    }

    //이름변경 함수
    changeName(row){
        alert(row+' 데이터셋 이름변경')
    }

    //삭제 함수
    deleteDataset(row){
        alert(row+' 데이터셋 삭제')
    }

    //데이터 생성
    createDataset(){
        this.setState({
            step:'createDataset'
        })
    }

    //썸네일 클릭시 들어가기
    thumbnailClick(value){
        // alert(value+' 썸네일 들어가기');
        const workId = this.props.match.params.WORKID;
        // /course/:COURSEID/work2/dataset/edit/:DATASETID
        this.props.history.push("/ngiiedu/course/" + workId+"/work2/dataset/edit/"+value);
    }


    render() {
   
        return (
       
            <main>
                {/* 메인 container */}
                {this.state.step=='main'? 
                //main 화면일때
                <div className='workMainMainContainer'>
                    <div className='thumbnailsContainer'>
                    {/* 새로만들기 버튼 */}
                        <div className='createButton'  >
                            <FloatingActionButton onClick={this.createDataset}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </div>

                    {/* 컨텐츠 내용 map */}
                
                        {this.state.dataSetData[0].workOutputList.map((row,index)=>(
                            <div className='thumbnailContainer'  key={index} >
                                <Paper zDepth={1} className='thumbnailContainer2'>
                                    <div className='thumbnail' onClick={()=>this.thumbnailClick(row.pinogioOutputId)}>
                                        썸네일 {index}
                                    </div>
                                    <div className='thumbnailTitleContainer'>
                                        <div className='thumbnailTitle'>
                                            {row.outputName}
                                        </div>
                                        <div>
                                            <IconMenu
                                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                            >
                                                <MenuItem primaryText="이름바꾸기" onClick={()=>this.changeName(row.pinogioOutputId)}/>
                                                <MenuItem primaryText="삭제하기" onClick={()=>this.deleteDataset(row.pinogioOutputId)}/>
                                            </IconMenu>
                                        </div>    
                                    </div>
                                </Paper>
                            </div>

                        ))}
                        
                    </div>
                </div>
                :
                //데이터 새로만들기 메뉴선택화면
                this.state.step=='createDataset'? 
                    <div className='workMainMainContainer'>
                        <CreateDataset/>
                    </div>
                :
                    <div className='workMainMainContainer'>
                        에러에러에러 component
                    </div>
                }
            </main>
        );
    }
};

export default withRouter(MainContainer);
