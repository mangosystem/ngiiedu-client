import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

//router
import { Link } from 'react-router-dom';

const SelectSyncWay = () => {
    return (
        <div>
            <Link to="/schools/sync/file">
                <RaisedButton 
                    label="파일 동기화" 
                    primary={true} 
                />
            </Link>
            <Link to="/schools/sync/api">
                <RaisedButton 
                    label="API 동기화" 
                    primary={true} 
                />
            </Link>
        </div>
    );
};

export default SelectSyncWay;