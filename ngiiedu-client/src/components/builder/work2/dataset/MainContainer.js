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

//testdata
//"안양시 동안구 소음지도"
// d=AnyangDong
// "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))"
class MainContainer extends React.Component {

    constructor(){
        super();

        this.state={
            step:'main'
        }

        this.changeName = this.changeName.bind(this);
        this.deleteDataset = this.deleteDataset.bind(this);
        this.createDataset = this.createDataset.bind(this);
        this.thumbnailClick = this.thumbnailClick.bind(this);
    }

    componentDidMount(){
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
        alert('데이터셋 생성화면으로 전환')
    }

    //썸네일 클릭시 들어가기
    thumbnailClick(row){
        alert(row+' 썸네일 들어가기');
    }


    render() {
   
        return (
       
            <main>
                {/* sub header */}
                <div className='workMainSubHeader'>
                    <div className='iconButtonContainer'>
                        
                    </div>
                    <div>
                       <h1 className='subHeaderTitle'>소음지도 데이터 수집하기</h1>
                    </div>
                </div>

                {/* 메인 container */}
                {this.state.step=='main'? 
                //main 화면일때
                <div className='workMainMainContainer'>
                {/* 새로만들기 버튼 */}
                    <div className='createButton'  >
                        <FloatingActionButton onClick={this.createDataset}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>

                {/* 컨텐츠 내용 map */}
              
                    {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map((row,index)=>(
                        <div className='thumbnailContainer'  key={index} >
                            <Paper zDepth={1} className='thumbnailContainer2'>
                                <div className='thumbnail' onClick={()=>this.thumbnailClick(row)}>
                                    썸네일 {index}
                                </div>
                                <div className='thumbnailTitleContainer'>
                                    <div className='thumbnailTitle'>
                                        제목 {index}
                                    </div>
                                    <div>
                                        <IconMenu
                                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                        >
                                            <MenuItem primaryText="이름바꾸기" onClick={()=>this.changeName(row)}/>
                                            <MenuItem primaryText="삭제하기" onClick={()=>this.deleteDataset(row)}/>
                                        </IconMenu>
                                    </div>    
                                </div>
                            </Paper>
                        </div>

                    ))}
                    
                </div>
                :
                //데이터 새로만들기 메뉴선택화면
                this.state.step=='createDataset'? 
                    <div className='workMainMainContainer'>
                        새로만들기 엑셀만들기 구글시트 경계결합.... component
                    </div>
                :
                //데이터셋 생성 화면
                this.state.step=='newDataset'?
                    <div className='workMainMainContainer'>
                        새로만들기 상세 화면 component
                    </div>
                :
                this.state.step=='excelImport'?
                //엑셀 세로만들기 화면
                    <div className='workMainMainContainer'>
                        엑셀 세로만들기 component
                    </div>
                :
                //에러에러
                    <div className='workMainMainContainer'>
                        에러에러에러 component
                    </div>
                }
            </main>
        );
    }
};

export default withRouter(MainContainer);
