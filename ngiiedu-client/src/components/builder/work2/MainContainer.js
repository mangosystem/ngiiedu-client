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
import Population from './population/MainContainer';


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
                if(data.response.data!=null && data.response.data.length!=0){
                    this.setState({
                        data:data.response.data
                    });

                    if (this.props.history.action == 'PUSH' && this.props.history.location.state) {
                        this.setState({
                            workType: this.props.history.location.state
                        });
                    } else {
                        this.setState({
                            workType: data.response.data[0].outputType 
                        });
                    }
                }
            }.bind(this),
            function (xhr, status, err) {
              alert('Error');
            }.bind(this)
        );
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
                <DatasetMain
                    courseId={this.props.match.params.COURSEID}
                    workId={this.props.match.params.WORKID} 
                    data={this.state.data}
                    getDataList={this.getDataList}
                />
                :
                this.state.workType=='datasetPopulation'?
                <DatasetMain
                    courseId={this.props.match.params.COURSEID}
                    workId={this.props.match.params.WORKID} 
                    data={this.state.data}
                    getDataList={this.getDataList}
                    option={this.state.workType}
                />
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
                <MapsMain 
                    data={this.state.data}
                    getDataList={this.getDataList}
                />
                :
                this.state.workType=='population'?
                <Population />
                :
                this.state.workType=='populationLayer'?
                <LayerMain
                    courseId={this.props.match.params.COURSEID}
                    workId={this.props.match.params.WORKID} 
                    data={this.state.data}
                    getDataList={this.getDataList}
                    option={this.state.workType}
                />
                :
                null}
            </main>
        );
    }
};

export default withRouter(MainContainer);
