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
import CircleImg from 'material-ui/svg-icons/image/panorama-fish-eye';
import SubDirection from 'material-ui/svg-icons/navigation/subdirectory-arrow-right'; // 서브워크


class MenuPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            courseId:'',
            workList:[],
            workNumber:'', //과정수
            memberNumber:'', //멤버수
            teamNumber:'', //팀수
            workAndSubWork:[],
            
        }
    }

    componentDidMount() {
        let courseId = this.props.match.params.COURSEID;
        
        //멤버 수
        ajaxJson(
          ['GET',apiSvr+'/courses/'+courseId+'/memberInfos.json'],
          null,
          function(res){
            var data = res.response.data;
            // console.dir(data);
            var CJS01=[]; //승인대기
            var CJS02=[]; //참여자
            var CJS03=[]; //??  
            var CJS04=[]; // 차단
            
        
            for(var i = 0 ; i<data.length; i++){
              if(data[i].joinStatus=="CJS01"){
                CJS01.push(data[i]);
              }else if(data[i].joinStatus=="CJS02"){
                CJS02.push(data[i])
              }else if(data[i].joinStatus=="CJS03"){
                CJS03.push(data[i])
              }else if(data[i].joinStatus=="CJS04"){
                CJS04.push(data[i])
              }else{
              }
            }

            this.setState({
                memberNumber: CJS02.length
            })
              
          }.bind(this)
        )

        //팀 수
        ajaxJson(
            ['GET',apiSvr+'/courses/'+courseId+'/team.json'],
            null,
            function(res){
              var data = res.response.data;
              this.setState({
                teamNumber : data.length
              });
            }.bind(this)
        );

        //과정 수
        //과정활동 리스트
        ajaxJson(
            ['GET',apiSvr+'/courses/'+courseId+'/work.json'],
            null,
            function(res){
                var data = res.response.data;
                var count = 0;
                for(let value of data){
                    if(value.status==true){
                        count++;
                    }
                }
              this.setState({
                workNumber:count,
                workList:data
              });
            }.bind(this)
        );


        //활동 목록 , 서브활동 확인
        ajaxJson(
            ['GET',apiSvr+'/courses/'+courseId+'/workAndSubWork.json'],
            null,
            function(res){
                var data = res.response.data;
                this.setState({
                    workAndSubWork:data
                })

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
                                leftIcon={<IconInfoOutline style={{fill: this.props.activeMenu == 'INFO' ?'#fff' : null}}/>}
                                className={this.props.activeMenu == 'INFO' ? 'aml' : 'uml'}
                            />
                        </Link>
                        <Link to={contextPath + "/course/" + this.state.courseId + "/data"}>
                            <MenuItem
                                primaryText="관련 데이터"
                                leftIcon={<IconFileDownload style={{fill: this.props.activeMenu == 'DATA' ?'#fff' : null}}/>}
                                className={this.props.activeMenu == 'DATA' ? 'aml' : 'uml'}
                            />
                        </Link>
                        <Link to={contextPath + "/course/" + this.state.courseId + "/work"}>
                            <MenuItem
                                primaryText="수업 과정"
                                // style={{width:192}}
                                leftIcon={<IconWeb style={{fill: this.props.activeMenu == 'WORK' ?'#fff' : null}}/>}
                                rightIcon={<div style={{margin:0,right:40,fontSize:12}}>{this.state.workNumber}</div>}
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
                                leftIcon={<IconPerson style={{fill: this.props.activeMenu == 'MEMBER' ?'#fff' : null}}/>}
                                rightIcon={<div style={{margin:0,right:40,fontSize:12}}>{this.state.memberNumber}</div>}
                                className={this.props.activeMenu == 'MEMBER' ? 'aml' : 'uml'}
                            />
                        </Link>
                        <Link to={contextPath + "/course/" + this.state.courseId + "/team"}>
                            <MenuItem
                                primaryText="팀"
                                leftIcon={<IconGroup style={{fill: this.props.activeMenu == 'TEAM' ?'#fff' : null}}/>}
                                rightIcon={<div style={{margin:0,right:40,fontSize:12}}>{this.state.teamNumber}</div>}
                                
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
                                leftIcon={<IconSettings style={{fill: this.props.activeMenu == 'SETTING' ?'#fff' : null}}/>}
                                className={this.props.activeMenu == 'SETTING' ? 'aml' : 'uml'}
                            />
                        </Link>
                    </Menu>
                </Paper>
                <Paper className="mui-paper">
                <Menu desktop className="aside-menu">
                    <Subheader>활동</Subheader>

                    {this.state.workAndSubWork.map((row,idx)=>{
                        if(row.status){
                            if(row.courseWorkSubInfos.length>=2){
                                return(
                                    <div key={idx}>
                                    {/* <Link key={idx} to={contextPath + "/course/" + this.state.courseId + "/activity/"+row.moduleWorkId}> */}
                                    <MenuItem
                                        primaryText={row.moduleWorkCourseType}
                                        leftIcon={<CircleImg style={{fill:'black'}}/>}
                                        //leftIcon={<CircleImg style={{fill: this.props.activeMenu == 'ACTIVITY' && this.props.match.params.ACTIVITYID ==row.moduleWorkId ?'#fff' : null}}/>}
                                        className={'uml'}
                                    />
                                    {/* </Link> */}
                                    {row.courseWorkSubInfos.map((row2,idx2)=>(
                                        <Link key={idx2} to={contextPath + "/course/" + this.state.courseId + "/activity/"+row.idx+'/'+row2.idx}>
                                        <MenuItem
                                            primaryText={row2.moduleWorkSubName}
                                            leftIcon={<SubDirection style={{fill: this.props.activeMenu == 'ACTIVITY' && this.props.match.params.ACTIVITYID ==row.idx &&this.props.match.params.SUBWORKID==row2.idx ?'#fff' : null}}/>}
                                            className={this.props.activeMenu == 'ACTIVITY' && this.props.match.params.ACTIVITYID ==row.idx && this.props.match.params.SUBWORKID==row2.idx  ? 'aml' : 'uml'}
                                        />
                                        </Link>
                                    ))}
                                    </div>
                                )
                            }else{
                                return(
                                    <Link key={idx} to={contextPath + "/course/" + this.state.courseId + "/activity/"+row.idx}>
                                    <MenuItem
                                        primaryText={row.moduleWorkCourseType}
                                        leftIcon={<CircleImg style={{fill: this.props.activeMenu == 'ACTIVITY' && this.props.match.params.ACTIVITYID ==row.moduleWorkId ?'#fff' : null}}/>}
                                        className={this.props.activeMenu == 'ACTIVITY' && this.props.match.params.ACTIVITYID ==row.idx ? 'aml' : 'uml'}
                                    />
                                    </Link>
                                )
                                    
                            }
                        }
                    })}


                    {/* {this.state.workList.map((row,index)=>(
                        <Link key={index} to={contextPath + "/course/" + this.state.courseId + "/activity/"+row.moduleWorkId}>
                            <MenuItem
                                primaryText={row.moduleWorkCourseType}
                                leftIcon={<CircleImg style={{fill: this.props.activeMenu == 'ACTIVITY' && this.props.match.params.ACTIVITYID ==row.moduleWorkId ?'#fff' : null}}/>}
                                className={this.props.activeMenu == 'ACTIVITY' && this.props.match.params.ACTIVITYID ==row.moduleWorkId ? 'aml' : 'uml'}
                            />
                        </Link>
                    ))} */}
                    
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