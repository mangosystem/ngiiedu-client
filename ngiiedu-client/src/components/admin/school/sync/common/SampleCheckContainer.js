import React, { Component } from 'react';

import SampleCheckList from './SampleCheckList';
import SampleCheckEdit from './SampleCheckEdit';
import './SampleCheckContainer.css';
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress';


class SampleCheckContainer extends Component {

    constructor(){
        super();
        this.state={
            tableData : [],
            apiColumns :[],
            complete:false,
        }
    }

    componentDidMount(){
        
           ajaxJson(
                ['GET',apiSvr+'/schools/sync/api.json'],
                null,
                function(res){
                    this.setState({
                        tableData : res.response.data,
                        apiColumns : Object.keys(res.response.data[0])
                    },function(){
                        this.setState({
                            complete:true
                        })
                    })
                }.bind(this)
            )
    }

    render() {
        return (
            <div >
                <h1 style={{padding:20}}>학교 목록 확인</h1>
                    <Divider style={{marginTop: '20px', marginBottom: '20px'}} />
                    <div className="SampleCheckEdit">
                        <SampleCheckEdit apiColumn={this.state.apiColumns}
                        /> 
                    </div>
                {this.state.complete ? 
                <div>
                    <Divider style={{marginTop: '20px', marginBottom: '20px'}} />
                    <div className="SampleCheckList">
                        <SampleCheckList tableData={this.state.tableData}
                        apiColumn={this.state.apiColumns}
                        />
                    </div>
                </div>
                : 
                <div className="SampleCheckList">
                    <CircularProgress size={80} thickness={5} />
                </div>
                }
            </div>
        );
    }
}

export default SampleCheckContainer;