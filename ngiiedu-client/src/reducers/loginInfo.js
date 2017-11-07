import * as types from '../actions/ActionTypes';

const loginInfoInitialState = {
    loginStatus: '',
};
const loginInfo = (state = loginInfoInitialState, action) => {
    switch (action.type) {
        case types.LOGIN_INFO:
            return Object.assign({}, state, {
                loginStatus: action.loginStatus,
            });
       
        default:
            return state;
    }
};

export default loginInfo;