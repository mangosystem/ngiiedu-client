import * as types from '../actions/ActionTypes';

const courseListInitialState = {
    keyword: '',
    courseId: '',
    subTitle: ''
};

const courseList = (state = courseListInitialState, action) => {
    switch (action.type) {
        case types.SEARCH_COURSE:
            return Object.assign({}, state, {
                keyword: action.keyword
            });
        case types.COURSE_ID:
            return Object.assign({}, state, {
                courseId: action.courseId
            });
        case types.COURSE_TITLE:
            return Object.assign({}, state, {
                subTitle: action.subTitle
            });
        default:
            return state;
    }
};

export default courseList;