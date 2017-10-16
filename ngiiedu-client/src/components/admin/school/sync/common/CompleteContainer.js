import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import './CompleteContainer.css';

class CompleteContainer extends Component {
    render() {
        return (
            <div>
                <h1 style={{padding:20}}>동기화 완료</h1>
                <Divider style={{marginTop: '20px', marginBottom: '20px'}} />
                <div className="CompleteContainer">
                        신규 데이터 :
                        {this.props.newRow}
                        <br/>
                        <br/>
                        중복 데이터 : 
                        {this.props.overlapRow}
                </div>
            </div>
        );
    }
}

export default CompleteContainer;