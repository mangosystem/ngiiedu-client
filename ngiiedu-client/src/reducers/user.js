import * as types from '../actions/ActionTypes';

const userInitialState = {
    userid: 'user1',
    open: false
};

const user = (state = userInitialState, action) => {
    switch (action.type) {
        case types.USERID:
            return Object.assign({}, state, {
                userid: action.userid
            });
        case types.ACTION_OPEN:
            return Object.assign({}, state, {
                open: action.open
            });
        default:
            return state;
    }
};

export default user;