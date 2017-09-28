import React from 'react';

//material ui
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


//router
import { Link } from 'react-router-dom';

//css
import './Header.css';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {open: false}
    }

    handleToggle(){
        this.setState({open: !this.state.open});    
    }

    handleClose(){
        this.setState({open: false});
    }

    render() {
        return (
            <div>
               <AppBar
                    className="Appbar"
                    title=""
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
               />
               <Drawer 
                    docked={false}
                    open={this.state.open}
                    onRequestChange = {(open) => this.setState({open})}
                    
               >
                    <Link to="/" onClick={this.handleClose.bind(this)}><div className="DrawerMenu">홈</div></Link>
                    <div className="MenuItemContainer" onClick={this.handleClose.bind(this)}>
                            <Link to="/"><MenuItem>메인화면</MenuItem></Link>
                            <Link to="/school"><MenuItem>학교목록</MenuItem></Link>
                            <Link to="/teacher"><MenuItem>교사목록</MenuItem></Link>
                            <Link to="/courses/new"><MenuItem>수업개설</MenuItem></Link>
                            <Link to="/users/manage"><MenuItem>사용자 관리</MenuItem></Link>
                    </div>
                </Drawer>

            </div>
        );
    }
}

export default Header;