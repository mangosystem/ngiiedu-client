import text from './textSample';
import color from './colorSample';
import user from './user';
import schoolsSync from './schoolsSync.js';
import schoolList from './schoolList.js';
import courseList from './courseList.js';
import loginInfo from './loginInfo.js';

import { combineReducers } from 'redux';

//reducer들을 합칩니다.
const reducers = combineReducers({
    text,
    color,
    user,
    schoolsSync,
    schoolList,
    courseList,
    loginInfo
});

export default reducers;