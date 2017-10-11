import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import './CompleteContainer.css';

const style = {
    height: 100,
    width: 200,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };

class Step2Complete extends Component {
    render() {
        return (
            <div className="CompleteContainer">
                    신규 데이터 :
                    {this.props.newRow}
                    <br/>
                    중복 데이터 : 
                    {this.props.overlapRow}
            </div>
        );
    }
}

export default Step2Complete;