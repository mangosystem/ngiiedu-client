import * as types from './ActionTypes';

export const actionSample =(text) =>({
    type : types.ACTION_SAMPLE,
    text
});

//위 코드와 동일
// export function testRedux({value, value2}){
//     return {type : REDUX_SAMPLE}
// }

export const actionSample2 =(color) =>({
    type :types.ACTION_SAMPLE2,
    color,
});