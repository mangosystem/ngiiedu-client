import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const SelectSyncWay = () => {
    return (
        <div>
            <RaisedButton label="파일 동기화" primary={true} />
            <RaisedButton label="API 동기화" primary={true} />
        </div>
    );
};

export default SelectSyncWay;