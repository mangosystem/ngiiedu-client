import * as types from '../actions/ActionTypes';

const schoolSyncInitialState = {
    editColumn: []
    // open: false
};

const schoolsSync = (state = schoolSyncInitialState, action) => {
    switch (action.type) {
        case types.SCHOOLS_SYNC_EDITCOLUMN:
            return Object.assign({}, state, {
                editColumn: action.editColumn
            });
        default:
            return state;
    }
};

export default schoolsSync;