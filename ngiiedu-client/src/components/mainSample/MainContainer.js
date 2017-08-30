import React from 'react';

//childComponent
import TextSample from './TextSample';
import Header from '../common/Header';
import { getRandomColor } from '../utils/RandomColorSample'

//redux 
//store에 연결
import { connect } from 'react-redux';
//action 객체사용
import * as actions from '../../actions';


// router test
import { Link } from 'react-router-dom';

//material ui

//css
import './MainContainer.css';

class MainContainer extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
                <div
                    className ="MainCenter"
                    style={{backgroundColor:this.props.color}}
                    onClick={this.props.onChangeColor}
                >
                    <br/>
                    :::::Redux Sample:::::<br/>
                    클릭시 1씩 증가 : {this.props.value}<br/>
                    색 : {this.props.color}<br/>
                        
                    <TextSample/> 
                </div>
            </div>
        );
    }

    // onClicktest (test){
    //     alert('test :' + test);    
    // }
};

const mapStateToProps = (state) => ({
    color: state.color.color,
    value: state.color.value
});

const mapDispatchToProps = (dispatch) => ({
    onChangeColor: () => {
        const color = getRandomColor();
        dispatch(actions.actionSample2(color));
    }
});

MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer);


export default MainContainer;