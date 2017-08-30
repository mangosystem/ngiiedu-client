import React from 'react';
import ReactDOM from 'react-dom';
import App from './components';

//Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

// material ui thema
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = createStore(reducers);
const appElement = document.getElementById('app-start');

ReactDOM.render(
    <Provider store = {store}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
     </Provider>  
    ,appElement
);
