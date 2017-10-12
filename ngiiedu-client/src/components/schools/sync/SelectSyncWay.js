import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './SelectSyncWay.css';

//router
import { Link } from 'react-router-dom';

const styles = {
    button:{
        width:'40%'
    }
}


const SelectSyncWay = () => {
    return (
        <div className="SelectSyncWay">
            <Link to="/schools/sync/file">
                <RaisedButton 
                    label="파일 동기화" 
                    primary={true} 
                    style={styles.button}
                />
            </Link>
            <br/>
            <br/>
            <br/>
            <Link to="/schools/sync/api">
                <RaisedButton 
                    label="API 동기화" 
                    primary={true} 
                    style={styles.button}

                />
            </Link>
        </div>
    );
};

export default SelectSyncWay;