import React from 'react';

import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';


import CreateMaps from './CreateMaps';
import ModifyMaps from './ModifyMaps';
import DeleteMaps from './DeleteMaps';

import '../../workStyle.css';

//testdata
//"안양시 동안구 소음지도"
// d=AnyangDong
// "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))"
class MainContainer extends React.Component {

    constructor(){
        super();

        this.state={
            step:'main',
            maps: [],
            idx: 0,
            deleteMapOpen: false,
            map: {}
        }

        this.createMaps = this.createMaps.bind(this);

    }

    componentDidMount(){

        const courseId = this.props.match.params.COURSEID;
        const workId = this.props.match.params.WORKID;
        const sortingField = "id";
    
        ajaxJson(
          ['GET', apiSvr + '/courses/' + workId + '/workSubData.json'],
          null,
          function (data) {
            
            let workSubData = JSON.parse(JSON.stringify(data)).response.data;
            let maps = [];
            let idx = 0;

            try {
                maps = workSubData.filter(val => (val.outputType == 'maps'))[0].workOutputList;
                idx = workSubData.filter(val => (val.outputType == 'maps'))[0].idx;                
            } catch (error) {
                maps = [{
                    "idx": 62,
                    "courseWorkSubId": 26,
                    "outputTeamId": 0,
                    "outputUserid": 40,
                    "outputDivision": "1",
                    "pinogioOutputId": "m=ai3FFsE4",
                    "outputType": "maps",
                    "pngoData": {
                        "id": 1,
                        "projectId": "p=pppppppp",
                        "mapsId": "m=ai3FFsE4",
                        "ownerId": 1,
                        "title": "맵스1",
                        "description": null,
                        "metadata": null,
                        "mapsType": "STORY",
                        "typeKind": "TAB",
                        "privacy": "PUBLIC",
                        "createdDate": 1512005385765,
                        "updatedDate": 1512005385765,
                        "ownerUsername": "admin",
                        "commentCount": 0,
                        "viewCount": 0,
                        "likeCount": 0,
                        "ratingScore": 0,
                        "items": [{
                            "id": 1,
                            "mapsId": 1,
                            "title": "아이템1",
                            "description": "아이템설명1",
                            "metadata": null,
                            "createdDate": 1512023809373,
                            "updatedDate": 1512023809373
                        }]
                    },
                    "outputName": "맵스1"
                }];
                idx = 0;
            }
            
            this.setState({
                maps: maps,
                idx: idx
            });
    
          }.bind(this),
          function (xhr, status, err) {
            alert('Error');
          }.bind(this)
        );

    }

    //삭제 함수
    deleteMaps(row){

        //MainContainer에서 실행 시
        if (!this.state.deleteMapOpen) {
            this.setState({
                map: row,
                deleteMapOpen: true
            });
        } else {
            let maps = this.state.maps;

            for (let i in maps) {                
                if (maps[i].idx == row.idx) {
                    let temp = maps;
                    temp.splice(i,1);
                    this.setState({
                        maps: temp
                    });
                }
            }
        }

    }

    //데이터 생성
    createMaps(newMaps, newMapItems, newMapItems2){
        let maps = this.state.maps;
        newMaps.pngoData.items = [];
        newMaps.pngoData.items.push(newMapItems);
        if (newMapItems2) {
            newMaps.pngoData.items.push(newMapItems2);            
        }

        maps.push(newMaps);

        this.setState({
            maps
        });

        console.log(this.state.maps);
    }

    //데이터 수정
    modifyMaps(modifyMaps, modifyMapsItem, modifyMapsItem2) {

        let maps = this.state.maps;

        for ( let i in maps ) {
            if (maps[i].idx == modifyMaps.idx) {
                let updateMaps = maps;
                updateMaps[i] = modifyMaps;
                this.setState({
                    maps: updateMaps
                });
            }
        }

    }

    //썸네일 클릭시 들어가기
    thumbnailClick(row){

        const courseId = this.props.match.params.COURSEID;
        const workId = this.props.match.params.WORKID;
        
        this.props.history.push("/ngiiedu/course/" + courseId + "/work2/" + workId + "/" + row.pinogioOutputId);

    }

    changeWorkType(type){
        this.props.handleWorkType(type);
    }

    //메인화면 돌아오기
    viewMain() {
        this.setState({
            step: 'main'
        });
    }

    deleteMapHandle() {
        this.setState({ deleteMapOpen: !this.state.deleteMapOpen });
    }

    render() {
   
        return (
            <main>
                    <div className='workMainSubHeader'>
                        <div className='iconButtonContainer'>
                            <Paper className='iconButtonUnSelected'
                                onClick={()=>this.changeWorkType('layer')}
                            >
                                <img 
                                    src="/ngiiedu/assets/images/TAB.png" 
                                    className="buttonImg"
                                />
                                <div className="buttonText" >
                                    주제지도만들기
                                </div>
                            </Paper>
                            <Paper className='iconButtonSelected'
                                onClick={()=>this.changeWorkType('maps')}
                            >
                                <img 
                                    src="/ngiiedu/assets/images/TAB.png" 
                                    className="buttonImg"
                                />
                                <div className="buttonText" >
                                    스토리맵만들기
                                </div>
                            </Paper>
                        </div>
                        <div>
                            <h1 className='subHeaderTitle'>소음지도 - 스토리맵 만들기</h1>
                        </div>
                    </div>
                    {/* 메인 container */}
                    {this.state.step=='main'? 
                    //main 화면일때
                    <div className='workMainMainContainer'>
                        <div className='thumbnailsContainer'>
                        {/* 새로만들기 버튼 */}
                            <div className='createButton'  >
                                <FloatingActionButton onClick={() => this.setState({ step: 'createMaps' })}>
                                    <ContentAdd />
                                </FloatingActionButton>
                            </div>

                        {/* 컨텐츠 내용 map */}
                    
                            {this.state.maps.map((row,index)=>(
                                <div className='thumbnailContainer'  key={index} >
                                    <Paper zDepth={1} className='thumbnailContainer2'>
                                        <div className='thumbnail' onClick={()=>this.thumbnailClick(row)}>
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
                                                    <MenuItem primaryText="설정변경" onClick={(index)=> this.setState({ step: 'modifyMaps', map: row})}/>
                                                    <MenuItem primaryText="삭제하기" onClick={()=>this.deleteMaps(row)}/>
                                                </IconMenu>
                                            </div>
                                        </div>
                                        <div className="thumbnailDescription">
                                            <span>{row.pngoData.privacy}&nbsp;&nbsp;|</span><span>&nbsp;&nbsp;{row.pngoData.mapsType}</span>
                                        </div>
                                    </Paper>
                                </div>

                            ))}
                            
                        </div>
                    </div>
                    :
                    //데이터 새로만들기 메뉴선택화면
                    this.state.step=='createMaps'? 
                        <div className='workMainMainContainer'>
                            <CreateMaps 
                                viewMain={this.viewMain.bind(this)}
                                idx={this.state.idx}
                                createMaps={this.createMaps.bind(this)}
                            />
                        </div>
                    :
                    this.state.step == 'modifyMaps'?
                        <div className='workMainMainContainer'>
                            <ModifyMaps 
                                viewMain={this.viewMain.bind(this)}
                                map={this.state.map}
                                modifyMaps={this.modifyMaps.bind(this)}
                            />
                        </div>
                    :
                    //에러에러
                        <div className='workMainMainContainer'>
                            에러에러에러 component
                        </div>
                    }
                    <DeleteMaps
                        open={this.state.deleteMapOpen}
                        deleteMapHandle={this.deleteMapHandle.bind(this)}
                        map={this.state.map}
                        deleteMap={this.deleteMaps.bind(this)}
                    />
            </main>
        );
    }
};

export default withRouter(MainContainer);
