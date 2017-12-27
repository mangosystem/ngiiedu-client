import React from 'react';

import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import { withRouter } from "react-router-dom";


import { connect } from 'react-redux';
import { actionUserid, actionOpen } from '../../../actions/index';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseInfoListOwnData: [],
            courseInfoListJoinData: [],
            fixedHeader: true,
            selectable: true,
            isAccessor: true,
            isOwner: true,
            isMember: false,
            userid: '1',
            selectedCourse:'',//선택된 카드
        };


        this.handleExpandChange = this.handleExpandChange.bind(this)
    }

    componentDidMount() {
        let params = null;
        ajaxJson(
            ['GET', apiSvr + '/courses/list/courseInfoListJoin.json'],
            params,
            function (res) {
                this.setState({
                    courseInfoListJoinData: res.response.data
                });
            }.bind(this),
            function (xhr, status, err) {
                console.log(err);
            }.bind(this)
        );

        ajaxJson(
            ['GET', apiSvr + '/courses/list/courseInfoListOwn.json'],
            params,
            function (res) {
                this.setState({
                    courseInfoListOwnData: res.response.data
                });
            }.bind(this),
            function (xhr, status, err) {
                console.log(err);
            }.bind(this)
        );
    };

    // componentWillReceiveProps(nextProps) {
    //     // 검색
    //     let params = ({ 'keyword': '%' + nextProps.keyword + '%' });
    //     ajaxJson(
    //         ['GET', apiSvr + '/courses/list/courseInfoListJoin.json'],
    //         params,
    //         function (res) {
    //             this.setState({
    //                 courseInfoListJoinData: res.response.data
    //             });
    //         }.bind(this),
    //         function (xhr, status, err) {
    //             console.log(err);
    //         }.bind(this)
    //     );

    //     ajaxJson(
    //         ['GET', apiSvr + '/courses/list/courseInfoListOwn.json'],
    //         params,
    //         function (res) {
    //             this.setState({
    //                 courseInfoListOwnData: res.response.data
    //             });
    //         }.bind(this),
    //         function (xhr, status, err) {
    //             console.log(err);
    //         }.bind(this)
    //     );
    // };

    handleExpandChange(value){
        console.log(value)
        if(value==this.state.selectedCourse){
            this.setState({
                selectedCourse:''
            })
        }else{
            this.setState({
                selectedCourse: value
            })
        }
        console.dir(this.props)

    }

    render() {
        return (
            <div>
            <div id="contentsWrap" style={{margin:'10px auto 0'}}>
                <ul className="location">
                    <li>홈</li>
                    <li>메뉴</li>
                    <li>수업목록</li>
                </ul>
            </div>
            {this.props.loginStatus.userDivision==1? //교사일때
            <div id="contentsWrap">
                <div className="contents">
                    <h3 className="edge">생성한 수업</h3>
                    {this.state.courseInfoListOwnData.map((row, i) => (

                    <Card key={i} expanded={this.state.selectedCourse=="own_"+row.idx}  style={{marginBottom:20,border:this.state.selectedCourse=="own_"+row.idx?'solid 2px #3e81f6': null}} className="mouseOverBlue">
                        <CardHeader
                            actAsExpander={true}
                                
                            textStyle={{display:'none'}}
                        >
                            <div style={{display:'grid',gridTemplateColumns:'15% 75% 10%'}}>
                                <div style={{gridColumn:1,textAlign:'right'}} onClick={()=>this.handleExpandChange("own_"+row.idx)}>
                                    <Avatar src={'/ngiiedu/assets/images/' + row.moduleMetadata + '.png'} />
                                </div>
                                <div style={{gridColumn:2,paddingLeft:20}} onClick={()=>this.handleExpandChange("own_"+row.idx)}>
                                    <div style={{paddingLeft:40,height:22,background:'url(/ngiiedu/assets/images/ico.png) no-repeat left -50px'}}>
                                    </div>
                                    <div style={{fontSize:22,fontWeight:'bold'}}>{row.courseName}</div>
                                </div>
                                <div style={{gridColumn:3,textAlign:'right'}}>
                                    <IconMenu
                                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        style={{ float: 'right' }}
                                    >
                                        <MenuItem
                                            primaryText="이동하기"
                                            onClick={() => this.props.history.push(contextPath + '/course/'+row.idx)}
                                        />
                                    </IconMenu>
                                </div>
                            </div>
                        </CardHeader>
                    
                        <CardText expandable={true}>
                            <div style={{marginLeft:'15%',marginRight:'15%'}}>
                                {JSON.parse(row.courseMetadata).courseDesc}
                            </div>
                        </CardText>
                    </Card>
                    
                    ))}

                    </div>
                </div>
                :
                null
                }



                <div id="contentsWrap">
                    <div className="contents">
                        <h3 className="edge">참여한 수업</h3>

                        {this.state.courseInfoListJoinData.map((row, i) => (

                        <Card key={i} expanded={this.state.selectedCourse=="join_"+row.idx} style={{marginBottom:20,border:this.state.selectedCourse=="join_"+row.idx?'solid 2px #3e81f6': null}} className="mouseOverBlue">
                            <CardHeader
                                actAsExpander={true}
                                    
                                textStyle={{display:'none'}}
                            >
                                <div style={{display:'grid',gridTemplateColumns:'15% 75% 10%'}}>
                                    <div style={{gridColumn:1,textAlign:'right'}} onClick={()=>this.handleExpandChange("join_"+row.idx)}>
                                        <Avatar src={'/ngiiedu/assets/images/' + row.moduleMetadata + '.png'} />
                                    </div>
                                    <div style={{gridColumn:2,paddingLeft:20,display:'flex',alignItems:'center'}} onClick={()=>this.handleExpandChange("join_"+row.idx)}>
                                        <div style={{fontSize:22,fontWeight:'bold'}}>{row.courseName}</div>
                                    </div>
                                    <div style={{gridColumn:3,textAlign:'right'}}>
                                        <IconMenu
                                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            style={{ float: 'right' }}
                                        >
                                            <MenuItem
                                                primaryText="이동하기"
                                                onClick={() => this.props.history.push(contextPath + '/course/'+row.idx)}
                                            />
                                        </IconMenu>
                                    </div>
                                </div>
                            </CardHeader>
                        
                            <CardText expandable={true}>
                                <div style={{marginLeft:'15%',marginRight:'15%'}}>
                                    {JSON.parse(row.courseMetadata).courseDesc}
                                </div>
                            </CardText>
                        </Card>
                        
                        ))}

                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    loginStatus: state.loginInfo.loginStatus
});

CourseList = connect(mapStateToProps)(CourseList);

export default withRouter(CourseList);

