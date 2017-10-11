import * as types from '../actions/ActionTypes';

const userInitialState = {
    userid: 'user1',
    open: false,
    category: 'userid',
    keyword: ''
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
        case types.ACTION_SEARCH:
            return Object.assign({}, state, {
                category: action.category,
                keyword: action.keyword
            });
        default:
            return state;
    }
};

export default user;