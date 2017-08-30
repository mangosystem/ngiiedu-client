import React from 'react';

//redux
// store에 연결
import { connect } from 'react-redux';
// action 객체와 연결
import * as actions from '../../actions';

//css
import './TextSample.css';

class TextSample extends React.Component {
    render() {
        return (
            <div className="mainText">
                 <h1> { this.props.value }</h1> 
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        value: state.text.text
    };
}

const mapDispatchToProps = (dispatch) => ({
    onChangeColor: () => {
        const color = getRandomColor();
        dispatch(actions.actionSample2(color));
    }
});

TextSample = connect(mapStateToProps)(TextSample);

export default TextSample;