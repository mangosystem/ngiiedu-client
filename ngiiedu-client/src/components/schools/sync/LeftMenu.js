import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const style={
    // display: 'inline-block',
    // margin: '16px 32px 16px 0',
};


const LeftMenu = () => {
    return (
        <div>
            <Paper style={style}>
            <Menu >
                <MenuItem primaryText="학교관리" />
                <MenuItem primaryText="목록관리" />
                <MenuItem primaryText="  동기화" />
                <Divider />
                <MenuItem primaryText="사용자관리" />
                <Divider />
                <MenuItem primaryText="수업관리" />
            </Menu>
            </Paper>
        </div>
    );
};

export default LeftMenu;