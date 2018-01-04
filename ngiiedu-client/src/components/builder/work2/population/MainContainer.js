import React from 'react';

import { withRouter } from "react-router-dom";
import Pyramid from './Pyramid';

class MainContainer extends React.Component {

    constructor(){
        super();

    }


    render() {
   
        return (
            <main style={{position: 'absolute', top: 80, bottom: 0, left: 0, right: 0}}>
                <div>
                    <Pyramid 
                        src='/ngiiedu/assets/cdn/pyramid/pyramid.html' 
                        style={{ overflowY: 'hidden', height: '100%' }}
                    />
                </div>
            </main>
        );
    }
};

export default withRouter(MainContainer);
