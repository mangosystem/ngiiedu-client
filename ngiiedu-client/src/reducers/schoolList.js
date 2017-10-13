import * as types from '../actions/ActionTypes';

const schoolListInitialState = {
    schoolId: '',
    infoOpen: false,
    editOpen: false,
    addOpen: false,
    deleteOpen: false,
    schoolLevel: '',
    tableData:[],
    category: 'schoolName',
    keyword: ''
};

const schoolList = (state = schoolListInitialState, action) => {
    switch (action.type) {
        case types.SCHOOL_ID:
            return Object.assign({}, state, {
                schoolId: action.schoolId
            });
        case types.SCHOOL_INFO_OPEN:
            return Object.assign({}, state, {
                infoOpen: action.infoOpen
            });
        case types.EDIT_SCHOOL_OPEN:
            return Object.assign({}, state, {
                editOpen: action.editOpen
            });
        case types.ADD_SCHOOL_OPEN:
            return Object.assign({}, state, {
                addOpen: action.addOpen
                
            });
        case types.DEL_SCHOOL_OPEN:
            return Object.assign({}, state, {
                deleteOpen: action.deleteOpen
                
            });
        case types.SEARCH_SCHOOL:
            return Object.assign({}, state, {
                schoolLevel: action.schoolLevel,
                category: action.category,
                keyword: action.keyword
            });
        case types.UPDATE_SCHOOL:
            return Object.assign({}, state, {
                tableData: action.tableData
            });
        default:
            return state;
    }
};

export default schoolList;