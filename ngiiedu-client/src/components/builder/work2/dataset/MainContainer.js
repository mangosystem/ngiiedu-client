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
import CreateDataset from './CreateDataset'; //데이터셋 생성
import EditDataset from './EditDataset';  //데이터셋 편집
import DeleteDataset from './DeleteDataset'; //데이터셋 삭제 모달

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
            }],
            selectedDatasetData:{},//선택된 데이터셋 편집시 사용
            deleteDatasetOpen:false , //삭제 데이터셋 다얄로그

        }

        this.changeName = this.changeName.bind(this);
        // this.deleteDataset = this.deleteDataset.bind(this);
        // this.createDataset = this.createDataset.bind(this);
        this.thumbnailClick = this.thumbnailClick.bind(this);
        this.handleStep = this.handleStep.bind(this);
        this.deleteDatasetHandle = this.deleteDatasetHandle.bind(this);
        this.downloadFile = this.downloadFile.bind(this);

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
        this.handleStep('changeName');

        this.setState({
            selectedDatasetData: row
        })
    }

    //삭제 함수
    deleteDataset(row){
        alert(row+' 데이터셋 삭제')
    }

    // //데이터 생성
    // createDataset(){
    //     this.setState({
    //         step:'createDataset'
    //     })
    // }

    //스텝 변경
    handleStep(value){
        if(value=='save'){
            value='main';
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
        this.setState({
            step: value
        })
    }

    //썸네일 클릭시 들어가기
    thumbnailClick(value){
        // alert(value+' 썸네일 들어가기');
        const courseId = this.props.match.params.COURSEID;
        const workId = this.props.match.params.WORKID;
        // /course/:COURSEID/work2/dataset/edit/:DATASETID
        this.props.history.push("/ngiiedu/course/" + courseId+"/work2/" +workId + "/dataset/"+value);
    }

    //데이터셋 다얄로그
    deleteDatasetHandle(data) {
        if(data==''){
            this.setState({ 
                deleteDatasetOpen: !this.state.deleteDatasetOpen 
            });
        }else{
            this.setState({ 
                selectedDatasetData: data,
                deleteDatasetOpen: !this.state.deleteDatasetOpen 
            });
        }
    }

    //파일 다운로드
    downloadFile(value,datasetId){
        console.log(datasetId+'('+value+') 파일 다운로드') ;       
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
                            <FloatingActionButton onClick={()=>this.handleStep('createDataset')}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </div>

                    {/* 컨텐츠 내용 map */}
                    {/* backgroundImage: this.props.selectedItem == item.idx ? 'url(/ngiiedu/assets/images/' + item.moduleMetadata + '_on.png)' : 'url(/ngiiedu/assets/images/' + item.moduleMetadata + '.png)', */}

                        {this.state.dataSetData[0].workOutputList.map((row,index)=>(
                            <div className='thumbnailContainer'  key={index} >
                                <Paper zDepth={1} className='thumbnailContainer2'>
                                    <div className='thumbnail' onClick={()=>this.thumbnailClick(row.pinogioOutputId)} 
                                        style={{
                                            // backgroundImage:'url(/ngiiedu/api/v1/coursesWork/dataset/thumbNail/'+row.pinogioOutputId+'?width=300&height=300)',
                                            backgroundImage:'url(http://www.ddaily.co.kr/data/photos/20160624/art_1465834335.jpg)',
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            // backgroundPosition: 'center center',
                                            }}>
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
                                                <MenuItem primaryText="편집하기" onClick={()=>this.changeName(row)}/>
                                                <MenuItem primaryText="삭제하기" onClick={()=>this.deleteDatasetHandle(row)}/>
                                                {row.pngoData.spatialType=="VECTOR" ?
                                                    <MenuItem primaryText="다운로드" 
                                                        menuItems={
                                                            [
                                                                <MenuItem primaryText="KML" onClick={()=>this.downloadFile('KML',row.pinogioOutputId)}/>,
                                                                <MenuItem primaryText="GML3" onClick={()=>this.downloadFile('GML3',row.pinogioOutputId)}/>,
                                                                <MenuItem primaryText="GEOSJON" onClick={()=>this.downloadFile('GEOSJON',row.pinogioOutputId)}/>,
                                                                <MenuItem primaryText="SHAPE" onClick={()=>this.downloadFile('SHAPE',row.pinogioOutputId)}/>
                                                            ]
                                                        }
                                                    />
                                                :row.pngoData.spatialType=="RASTER" ?
                                                    <MenuItem primaryText="다운로드" 
                                                        menuItems={
                                                            [
                                                                <MenuItem primaryText="TIFF" onClick={()=>this.downloadFile('TIFF',row.pinogioOutputId)}/>
                                                            ]
                                                        }
                                                    />    
                                                :null
                                                }                                                
                                                
                                                
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
                        <CreateDataset
                            handleStep = {this.handleStep}
                        />
                    </div>
                :
                //데이터 이름바꾸기 화면
                this.state.step=='changeName'?
                    <div className='workMainMainContainer'>
                        <EditDataset
                            cancleEdit={this.handleStep}
                            data ={this.state.selectedDatasetData}
                        />
                    </div>
                :
                    <div className='workMainMainContainer'>
                        에러에러에러 component
                    </div>
                }


                    <DeleteDataset
                        open={this.state.deleteDatasetOpen}
                        deleteDatasetHandle={this.deleteDatasetHandle}
                        data={this.state.selectedDatasetData}
                        deleteDataset={this.deleteDataset.bind(this)}
                    />
            </main>
        );
    }
};

export default withRouter(MainContainer);
