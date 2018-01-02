import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import './CompleteContainer.css';
import CircularProgress from 'material-ui/CircularProgress';

class CompleteContainer extends Component {

    constructor(){
        super();

        this.state={
            complete:false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            complete:true
        })
    }

    render() {
        return (
            <div style={{padding:'20px'}}>
                <h3 className="edge">동기화</h3>

                <Divider style={{marginTop: '20px', marginBottom: '20px'}} />
                {this.state.complete ? 
                <div className="CompleteContainer">
                        신규 데이터 :
                        {this.props.newRow}
                        <br/>
                        <br/>
                        중복 데이터 : 
                        {this.props.overlapRow}
                </div>
                :
                <div className="CompleteContainer">
                    <CircularProgress size={80} thickness={5} />
                </div>
                }

            </div>
        );
    }
}

export default CompleteContainer;