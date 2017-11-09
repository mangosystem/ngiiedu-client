import React from 'react';
import { withRouter, Link } from "react-router-dom";

import Paper from 'material-ui/Paper';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import IconInfoOutline from 'material-ui/svg-icons/action/info-outline';
import IconPerson from 'material-ui/svg-icons/social/person';
import IconGroup from 'material-ui/svg-icons/social/group';
import IconFileDownload from 'material-ui/svg-icons/file/file-download';
import IconImportantDevices from 'material-ui/svg-icons/action/important-devices';
import IconWeb from 'material-ui/svg-icons/av/web';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import EditorFormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered';


class MenuPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            courseId:'',
            workList:[]
            
        }
    }

    componentDidMount() {
        let courseId = this.props.match.params.COURSEID;
        ajaxJson(
          ['GET',apiSvr+'/courses/'+courseId+'/work.json'],
          null,
          function(res){
            this.setState({
              workList:res.response.data
            });
        }.bind(this)
        );
    };

    componentWillMount() {
        // alert('생성자, 참여자 구분하여 UI 구성');
        this.setState({
            courseId:this.props.match.params.COURSEID
        });
    }

    render() {
        const {props} = this;
        return (
            <aside>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                        <Subheader>수업</Subheader>
                        <Link to={contextPath + "/course/" + this.state.courseId}>
                            <MenuItem
                                primaryText="수업 정보"
                                leftIcon={<IconInfoOutline />}
                                className={this.props.activeMenu == 'INFO' ? 'aml' : 'uml'}
                            />
                        </Link>
                        <Link to={contextPath + "/course/" + this.state.courseId + "/data"}>
                            <MenuItem
                                primaryText="관련 데이터"
                                leftIcon={<IconFileDownload />}
                                className={this.props.activeMenu == 'DATA' ? 'aml' : 'uml'}
                            />
                        </Link>
                        <Link to={contextPath + "/course/" + this.state.courseId + "/work"}>
                            <MenuItem
                                primaryText="수업 과정"
                                leftIcon={<IconWeb />}
                                className={this.props.activeMenu == 'WORK' ? 'aml' : 'uml'}
                            />
                        </Link>
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                        <Subheader>참여자</Subheader>
                        <Link to={contextPath + "/course/" + this.state.courseId + "/member"}>
                            <MenuItem
                                primaryText="멤버"
                                leftIcon={<IconPerson />}
                                className={this.props.activeMenu == 'MEMBER' ? 'aml' : 'uml'}
                            />
                        </Link>
                        <Link to={contextPath + "/course/" + this.state.courseId + "/team"}>
                            <MenuItem
                                primaryText="팀"
                                leftIcon={<IconGroup />}
                                className={this.props.activeMenu == 'TEAM' ? 'aml' : 'uml'}
                            />
                        </Link>
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                    <Menu desktop className="aside-menu">
                        <Link to={contextPath + "/course/" + this.state.courseId + "/setting"}>
                            <MenuItem
                                primaryText="수업 설정"
                                leftIcon={<IconSettings />}
                                className={this.props.activeMenu == 'SETTING' ? 'aml' : 'uml'}
                            />
                        </Link>
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                <Menu desktop className="aside-menu">
                    <Subheader>활동</Subheader>
                    {this.state.workList.map((row,index)=>(
                        <Link key={index} to={contextPath + "/course/" + this.state.courseId + "/activity/"+row.moduleWorkId}>
                            <MenuItem
                                primaryText={row.moduleWorkCourseType}
                                leftIcon={<EditorFormatListNumbered />}
                                className={this.props.activeMenu == 'ACTIVITY' && this.props.match.params.ACTIVITYID ==row.moduleWorkId ? 'aml' : 'uml'}
                            />
                        </Link>
                    ))}
                    
                </Menu>
            </Paper>
            </aside>
        );
    }
};

MenuPanel.propTypes = {
    isAccessor: React.PropTypes.bool,
    isOwner: React.PropTypes.bool,
    isMember: React.PropTypes.bool,
    activeMenu: React.PropTypes.string
};

MenuPanel.defaultProps = {
    isAccessor: false,
    isOwner: false,
    isMember: false,
    activeMenu: 'INFO'
};

export default withRouter(MenuPanel);