import * as types from '../actions/ActionTypes';

//초기 상태 정의(필수), type을 제외한 값
const textinItialState = {
    text : 'Basic Framework'
}


//리듀서 함수 정의
function text(state = textinItialState, action){
        switch(action.type) {
        case types.ACTION_SAMPLE:
            return Object.assign({}, state, {
                text: state.text
            });
        default:
            return state;
    }
}

export default text;