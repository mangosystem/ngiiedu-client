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
import DatasetMain from './dataset/MainContainer';
import LayerMain from './layer/MainContainer';
import MapsMain from './maps/MainContainer';


//testdata
//"안양시 동안구 소음지도"
// d=AnyangDong
// "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))"
class MainContainer extends React.Component {

    constructor(){
        super();

        this.state={
            workType:'maps' //dataset , layer, maps
        }

        this.handleWorkType=this.handleWorkType.bind(this);

    }

    componentDidMount(){
        //현재 수행과정번호로 데이터셋인지 (레이어,맵스) 과정인지 조회하여 화면 전환
        this.setState({
            workType:'maps'
        })
    }

    handleWorkType(type){
        alert(type)
        this.setState({
            workType:type
        })
    }

   


    render() {
   
        return (
               this.state.workType=='dataset' ? 
                <DatasetMain/>
                :
                this.state.workType=='layer'?
                <LayerMain handleWorkType={this.handleWorkType}/>
                :
                this.state.workType=='maps'?
                <MapsMain handleWorkType={this.handleWorkType}/>
                :
                null
               
        );
    }
};

export default withRouter(MainContainer);
