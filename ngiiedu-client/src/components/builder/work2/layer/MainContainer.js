import React from 'react';

import CreateLayer from './CreateLayer.js'

import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import '../workStyle.css';

//testdata
//"안양시 동안구 소음지도"
// d=AnyangDong
// "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))"
class MainContainer extends React.Component {

    constructor(props){
        super(props);

        this.state={
            step:'main',
            selectRow:{},
            type:'',
            deleteModal:false,
            datasetList:[],
            courseWorkSubId:null
        }

        this.createLayer = this.createLayer.bind(this);
        this.editLayer = this.editLayer.bind(this);
        this.getDatasetList = this.getDatasetList.bind(this);
        this.thumbnailClick = this.thumbnailClick.bind(this);
        this.changeView = this.changeView.bind(this);
        this.deleteModalOpen = this.deleteModalOpen.bind(this);
        this.deleteModalClose = this.deleteModalClose.bind(this);
        this.deleteLayer = this.deleteLayer.bind(this);
    }

    componentDidMount(){
        
    }

    //주제지도 생성
    createLayer(){
        for(let i=0;i<this.props.data.length;i++){
            if(this.props.data[i].outputType == 'layer'){
                this.setState({
                    step:'createLayer',
                    courseWorkSubId:this.props.data[i].idx,
                    type:'create'
                });
            }
        }
        this.getDatasetList();
    }

    //주제지도 편집
    editLayer(row){
        for(let i=0;i<this.props.data.length;i++){
            if(this.props.data[i].outputType == 'layer'){
                this.setState({
                    step:'editLayer',
                    selectRow:row,
                    courseWorkSubId:this.props.data[i].idx,
                    type:'edit'
                });
            }
        }
        this.getDatasetList();
    }

    //데이터셋 불러오기
    getDatasetList(){
        ajaxJson(
            ['GET', apiSvr + '/courses/' + this.props.courseId + '/workSubDataByCourseId.json'],
            null,
            function (data) {
                if(data.response.data !=null){
                    for(let i=0; i<data.response.data.length; i++){
                        if(data.response.data[i].outputType =='dataset'){
                            this.setState({
                                datasetList:data.response.data[i].workOutputList
                            });
                        }
                    }
                }
            }.bind(this),
            function (xhr, status, err) {
              alert('Error');
            }.bind(this)
        )
    }

    //썸네일 클릭시 들어가기
    thumbnailClick(row){
        alert(row+' 썸네일 들어가기');
        this.context.router.history.push("/some/Path");
    }

    //화면 변경(리스트, 추가, 변경)
    changeView(type){
        this.props.getDataList();
        this.setState({
            step:type
        });
    }

    //주제지도 삭제 모달 열기/닫기
    deleteModalOpen(row){
        this.setState({
            deleteModal:true,
            selectRow:row
        });
    }
    deleteModalClose(){
        this.setState({
            deleteModal:false,
            selectRow:{}
        });
    }

    //주제지도 삭제
    deleteLayer(){
        let layerId = this.state.selectRow.pinogioOutputId;
        let tempIndex = this.state.selectRow.idx;
        ajaxJson(
            ['DELETE', apiSvr + '/coursesWork/layers/' + layerId + '.json'],
            { worksOutputId: tempIndex },
            function (data) {
                this.props.getDataList();   //목록 다시 불러오기
            }.bind(this),
            function (xhr, status, err) {
                console.log('Error');
            }.bind(this)
        );
        this.setState({
            deleteModal:false,
            selectRow:{}
        });
    }

    render() {
   
        //주제지도 삭제 확인 및 취소 버튼
        const deleteArrButton = [
            <FlatButton
                hoverColor="#FAFAFA"
                label="취소"
                onClick={this.deleteModalClose}
            />,
            <FlatButton
                backgroundColor="#F44336"
                hoverColor="#FFCDD2"
                label="삭제"
                onClick={this.deleteLayer}
            />
        ];

        return (
            <div>
                {/* 메인 container */}
                {this.state.step=='main'? 
                //main 화면일때
                <div className='workMainMainContainer'>
                    <div className='thumbnailsContainer'>
                    {/* 새로만들기 버튼 */}
                        <div className='createButton'  >
                            <FloatingActionButton backgroundColor= '#3e81f6' onClick={this.createLayer}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </div>

                    {/* 컨텐츠 내용 map */}
                    {/* 불러온 데이터 리스트 */}
                        {this.props.data.map((row,index)=>(
                            //데이터 리스트 중 outputType이 layer(주제지도)인 데이터
                            row.outputType =='layer'?
                                row.workOutputList.map((data,i)=>(
                                    <div className='thumbnailContainer' key={i}>
                                        <Paper zDepth={1} className='thumbnailContainer2'>
                                            <div 
                                            className='thumbnail' 
                                            onClick={()=>this.props.history.push('/ngiiedu/course/'+this.props.courseId+'/work2/'+this.props.workId+'/layer/'+data.pngoData.layerId)}>
                                                썸네일
                                            </div>
                                            <div className='thumbnailTitleContainer'>
                                                <div className='thumbnailTitle'>
                                                    {data.outputName}
                                                </div>
                                                <div>
                                                    <IconMenu
                                                        iconButtonElement={<IconButton><MoreVertIcon color='white'/></IconButton>}
                                                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                                    >
                                                        <MenuItem primaryText="미리보기" onClick={() => this.props.history.push('/ngiiedu/map/preview/'+data.pngoData.layerId)}/>
                                                        <MenuItem primaryText="편집하기" onClick={()=>this.editLayer(data)}/>
                                                        <MenuItem primaryText="삭제하기" onClick={()=>this.deleteModalOpen(data)}/>
                                                    </IconMenu>
                                                </div>    
                                            </div>
                                        </Paper>
                                    </div>
                                    ))
                            :null
                        ))}
                    </div>
                </div>
                :
                //주제지도 추가 메뉴선택화면
                this.state.step=='createLayer'? 
                    <div className='workMainMainContainer'>
                        <CreateLayer
                            changeView = {this.changeView}
                            datasetList={this.state.datasetList}
                            type={this.state.type}
                            workId={this.props.workId}
                            courseId={this.props.courseId}
                            courseWorkSubId ={this.state.courseWorkSubId}
                            history={this.props.history}
                        />
                    </div>
                :
                //주제지도 편집 메뉴선택화면
                this.state.step=='editLayer'?
                    <div className='workMainMainContainer'>
                        <CreateLayer
                            changeView = {this.changeView}
                            datasetList={this.state.datasetList}
                            type={this.state.type}
                            workId={this.props.workId}
                            courseId={this.props.courseId}
                            courseWorkSubId ={this.state.courseWorkSubId}
                            selectRow={this.state.selectRow}
                            history={this.props.history}
                        />
                    </div>
                :
                //에러에러
                    <div className='workMainMainContainer'>
                        에러에러에러 component
                    </div>
                }
                {/* 레이어 선택 삭제 모달 */}
                <Dialog
                    title="주제지도 삭제"
                    actions={deleteArrButton}
                    modal={false}
                    open={this.state.deleteModal}
                    onRequestClose={this.deleteModalClose}
                >
                    선택한 주제지도를 삭제하시겠습니까?
                </Dialog>
            </div>
        );
    }
};

export default withRouter(MainContainer);
