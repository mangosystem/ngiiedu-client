import React, { Component } from 'react';

import SampleCheckList from './SampleCheckList';
import SampleCheckEdit from './SampleCheckEdit';
import './SampleCheckContainer.css';

class SampleCheckContainer extends Component {

    constructor(){
        super();
        this.state={
            tableData : [],
            apiColumns :[]
        }
    }

    componentWillMount(){
        
           ajaxJson(
                ['GET',apiSvr+'/schools/sync/api.json'],
                null,
                function(res){
                    this.setState({
                        tableData : res.response.data,
                        apiColumns : Object.keys(res.response.data[0])
                    })
                    console.log(Object.keys(res.response.data[0]));
                    console.log(this.state.apiColumns[0]);
                    console.log(res);
                }.bind(this)
            )
    }


    render() {
        return (
            <div className="SyncAPIStep1Container">
                <div className="SyncAPIStep1Left">
                    <SampleCheckList tableData={this.state.tableData}
                    apiColumn={this.state.apiColumns}
                    />
                </div>
                <div className="SyncAPIStep1Right">
                    <SampleCheckEdit apiColumn={this.state.apiColumns}/> 
                </div>
            </div>
        );
    }
}

export default SampleCheckContainer;