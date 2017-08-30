import * as types from '../actions/ActionTypes';

//초기 상태 정의(필수), type을 제외한 값
const colorInitialState = {
    color : 'blue',
    value : 1
}


//리듀서 함수 정의
function color(state = colorInitialState, action){
        switch(action.type) {
        // case type.ACTION_SAMPLE:
        //     return Object.assign({}, state, {
        //         value: state.value + 1
        //     });
        case types.ACTION_SAMPLE2:
            return Object.assign({}, state, {
                color : action.color,
                value : state.value+1
            });
        default:
            return state;
    }
}

export default color;