import React from 'react';

import { withRouter } from "react-router-dom";

import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

//component
import SubHeader from './SubHeader';
import DatasetMain from './dataset/MainContainer';
import LayerMain from './layer/MainContainer';
import MapsMain from './maps/main/MainContainer';


//testdata
//"안양시 동안구 소음지도"
// d=AnyangDong
// "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))"
class MainContainer extends React.Component {

    constructor(){
        super();

        this.state={
            workType:'', //dataset , layer, maps
			data:[]
        }

		this.getDataList = this.getDataList.bind(this);
        this.handleWorkType=this.handleWorkType.bind(this);

    }

    componentDidMount(){
        this.getDataList();
    }
	
    //데이터 불러오기
	getDataList(){
		const workId = this.props.match.params.WORKID;
        ajaxJson(
            ['GET', apiSvr + '/courses/' + workId + '/workSubData.json'],
            null,
            function (data) {
                if(data.response.data.length!=0 && data.response.data!=null){
                    this.setState({
                        data:data.response.data,
                        //현재 수행과정번호로 데이터셋인지 (레이어,맵스) 과정인지 조회하여 화면 전환, 2개 이상일 때는 첫번째 활동이 첫 페이지
                        workType:data.response.data[0].outputType 
                    },function(){
                        console.log(this.state.data)
                    })
                }
            }.bind(this),
            function (xhr, status, err) {
              alert('Error');
            }.bind(this)
        )
	}

    //활동 변경(2개 이상일 때)
    handleWorkType(type){
        this.setState({
            workType:type
        });
    }

    render() {
   
        return (
            <main>
                {/* sub header */}
                <SubHeader
                    handleWorkType={this.handleWorkType} //Type(dataset, layer, maps) change
                    workId={this.props.match.params.WORKID}
                    workType={this.state.workType} //dataset, layer,maps
                    data={this.state.data}
                />

                {/* 메인 container */}
                {this.state.workType=='dataset' ? 
                <DatasetMain/>
                :
                this.state.workType=='layer'?
                <LayerMain
                    courseId={this.props.match.params.COURSEID}
                    workId={this.props.match.params.WORKID} 
                    data={this.state.data}
                    getDataList={this.getDataList}
                />
                :
                this.state.workType=='maps'?
                <MapsMain handleWorkType={this.handleWorkType}/>
                :
                null}
            </main>
        );
    }
};

export default withRouter(MainContainer);
