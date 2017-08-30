import text from './textSample';
import color from './colorSample';

import { combineReducers } from 'redux';

//reducer들을 합칩니다.
const reducers = combineReducers({
    text,
    color
});

export default reducers;