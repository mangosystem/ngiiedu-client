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


// UserPopup 상세정보
export const actionUserid = (userid) => ({
    type: types.USERID,
    userid
});

// UserPopup
export const actionOpen = (open) => ({
    type: types.ACTION_OPEN,
    open
});