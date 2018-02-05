import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actionSchoolId, actionSchoolInfoOpen, actionEditSchoolOpen, actionAddSchoolOpen, actionUpdateSchool, actionDelSchoolOpen } from '../../../../actions/index';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add-box';
import SelectField from 'material-ui/SelectField';
import SearchBar from 'material-ui-search-bar';
import TextField from 'material-ui/TextField';
import update from 'react-addons-update';

import { red500, cyan500 } from 'material-ui/styles/colors';

import Search from './Search';

class SchoolList extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            tableData:[], //전체 학교 목록
            selected: [],
            deleteButtonShow:'none',
            deleteArrModal:false,
            authkeyModal:false,
            authkeyData:'',
            selectable: false,
            showCheckboxes: false,
            offset:0,
            count:0,
            schoolLevel:null,
            keyword:null
        };
        //TableRow 선택
        this.isSelected = this.isSelected.bind(this);
        this.tableRowSelection = this.tableRowSelection.bind(this);

        //학교정보 모달
        this.infoModal = this.infoModal.bind(this);

        //학교 추가 모달
        this.addModalOpen = this.addModalOpen.bind(this);

        //학교정보 수정 모달
        this.editModalOpen = this.editModalOpen.bind(this);

        //학교 단일 삭제 모달
        this.deleteModalOpen = this.deleteModalOpen.bind(this);

        //학교 선택 삭제
        this.deleteArrReady = this.deleteArrReady.bind(this);
        this.deleteArrCancle = this.deleteArrCancle.bind(this);
        this.deleteArrModalOpen = this.deleteArrModalOpen.bind(this);
        this.deleteArrModalClose = this.deleteArrModalClose.bind(this);
        this.deleteSelectData = this.deleteSelectData.bind(this);
        this.authkeyModalOpen = this.authkeyModalOpen.bind(this);
        this.authkeyModalClose = this.authkeyModalClose.bind(this);
        this.updateAuthkey = this.updateAuthkey.bind(this);
        this.movePage = this.movePage.bind(this);
    };

    //첫 학교목록 불러오기
    componentWillMount(){
        ajaxJson(
            ['GET',apiSvr+'/schools.json'],
            null,
            function(res){
                this.setState({
                    tableData:JSON.parse(JSON.stringify(res)).response.data.list,
                    offset:res.response.data.offset,
                    count:res.response.data.count
                });
            }.bind(this)
        );
    };

    //Search
    componentWillReceiveProps(nextProps) {
        let offset = 0;
        let schoolLevel;
        if(nextProps.schoolLevel==null||this.props.schoolLevel==null){
            schoolLevel = this.state.schoolLevel;
        }else{
            schoolLevel = nextProps.schoolLevel;
        }
        let keyword = '%'+nextProps.keyword+'%';
        this.setState({
            schoolLevel:schoolLevel,
            keyword:keyword
        })

        ajaxJson(
            ['GET',apiSvr+'/schools.json'],
            {'offset':offset,'keyword':keyword, 'schoolLevel':schoolLevel},
            function(res){
                this.setState({
                    tableData:JSON.parse(JSON.stringify(res)).response.data.list,
                    offset:0,
                    count:res.response.data.count
                });
            }.bind(this)
        );

    }

    movePage(value){
        let offset;
        if(value=="prop"){
            offset = this.state.offset-20;

        }else if(value=="next"){
            offset = this.state.offset+20;
        }
        let schoolLevel = this.state.schoolLevel
        let keyword = '%'+this.state.keyword+'%';
        ajaxJson(
            ['GET',apiSvr+'/schools.json'],
            {'offset':offset, 'keyword':keyword, 'schoolLevel':schoolLevel},
            function(res){
                this.setState({
                    tableData:JSON.parse(JSON.stringify(res)).response.data.list,
                    offset:res.response.data.offset,
                });
            }.bind(this)
        );
    }

    //테이블(학교) 선택
    isSelected(index){
        return this.state.selected.indexOf(index) !== -1;
    };
    tableRowSelection(selectedRows){
        if(selectedRows.length != 0){
            this.setState({
                selected: selectedRows
            });
        };
    };

    //학교 상세정보
    infoModal(row){
        this.props.updateSchoolId(row.idx);
        this.props.controlInfoPopup(true);
    };

    //학교 추가
    addModalOpen(){
        this.props.controlAddPopup(true);
    };

    //학교정보 수정
    editModalOpen(row){
        this.props.updateSchoolId(row.idx);
        this.props.controlEditPopup(true);
    };

    //학교 단일 삭제
    deleteModalOpen(row){
        this.props.updateSchoolId(row.idx);
        this.props.controlDelPopup(true);
    };

    //학교 선택 삭제
    deleteArrReady(){
        this.setState({
            selectable:true,
            showCheckboxes:true,
            deleteButtonShow:''
        }, function() {
            // body
            let headerCheckbox = $('.admin-tr th:eq(0)');
            headerCheckbox.addClass('admin-th');

            // let bodyCheckbox = $('.admin-tr td');
            // bodyCheckbox.addClass('admin-td');

            $('.admin-tr td').each(function(index) {
                if ($(this).hasClass("admin-td") === false) {
                    $(this).addClass('admin-td');
                }
            });
        });

    };

    deleteArrCancle(){
        this.setState({
            selected:[],
            selectable:false,
            showCheckboxes:false,
            deleteButtonShow:'none'
        });
    };

    deleteArrModalOpen(){
        this.setState({deleteArrModal:true});
    };

    deleteArrModalClose(){
        this.setState({deleteArrModal:false});
    };

    deleteSelectData(selectedRows){
        if(this.state.selected =='all'){
            for(let i of this.state.tableData){
                ajaxJson(
                    ['DELETE',apiSvr+'/schools/'+i.idx+'.json'],
                    null,
                    function(res){
                        ajaxJson(
                            ['GET',apiSvr+'/schools.json'],
                            null,
                            function(res){
                                this.setState({
                                    tableData:res.response.data
                                });
                            }.bind(this)
                        );
                    }.bind(this),
                    function(e){
                        console.log(e);
                    }
                );
            }
        }else{
            for(let i of this.state.selected){
                ajaxJson(
                    ['DELETE',apiSvr+'/schools/'+this.state.tableData[i].idx+'.json'],
                    null,
                    function(res){
                        ajaxJson(
                            ['GET',apiSvr+'/schools.json'],
                            null,
                            function(res){
                                this.setState({
                                    tableData:res.response.data
                                })
                            }.bind(this)
                        )
                    }.bind(this),
                    function(e){
                        console.log(e);
                    }
                );
            }
        }
        this.setState({
            selected:[],
            selectable:false,
            showCheckboxes:false,
            deleteArrModal:false,
            deleteButtonShow:'none'
        });
    };

    authkeyModalOpen(row){
        ajaxJson(
            ['GET',apiSvr+'/schools/'+row.idx+'/authkey.json'],
            null,
            function(res){
                this.setState({
                    authkeyData:res.response.data,
                    authkeyModal:true,
                });
            }.bind(this)
        );
    };

    authkeyModalClose(){
        this.setState({
            authkeyModal:false,
            authkeyData:''
        });
    };

    updateAuthkey(){
        let id = this.state.authkeyData.idx;
        ajaxJson(
            ['GET',apiSvr+'/schools/'+id+'/authkey/modify.json'],
            null,
            function(res){
                this.setState({
                    authkeyData:res.response.data,
                });
            }.bind(this)
        );
    }


    render() {

        //데이터 선택 삭제 확인 및 취소 버튼
        const deleteArrButton = [
            <FlatButton
                label="취소"
                onClick={this.deleteArrModalClose}
            />,
            <FlatButton
                label="삭제"
                backgroundColor={red500}
                style={{color: 'white'}}
                onClick={this.deleteSelectData}
            />
        ];

        const authkeyButton = [
            <FlatButton
                label="닫기"
                onClick={this.authkeyModalClose}
            />
        ];

        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <IconButton tooltip="추가" onClick={this.addModalOpen}>
                            <Add />
                        </IconButton>
                        <IconButton tooltip="삭제" onClick={this.deleteArrReady}>
                            <Delete />
                        </IconButton>
                        <FlatButton label="취소" onClick={this.deleteArrCancle} style={{display:this.state.deleteButtonShow}}/>
                        <FlatButton label="확인" onClick={this.deleteArrModalOpen} style={{display:this.state.deleteButtonShow}}/>
                    </div>
                    <div style={{ width: '50%'}}>
                        <Search />
                    </div>
                </div>
                {/* 전체 학교목록 */}
                <Table
                    onRowSelection={this.tableRowSelection}
                    multiSelectable={true}
                    selectable={this.state.selectable}
                    height={'500px'}
                    className="admin-table"
                >
                    <TableHeader 
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        className="admin-thead"
                    >
                        <TableRow className="admin-tr">
                            <TableHeaderColumn className="admin-th">ID</TableHeaderColumn>
                            <TableHeaderColumn className="admin-th">학교이름</TableHeaderColumn>
                            <TableHeaderColumn className="admin-th">교육지원청명</TableHeaderColumn>
                            <TableHeaderColumn className="admin-th"></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckboxes} className="admin-tbody">
                        {this.state.tableData.map((row,i) => (
                            <TableRow selected={this.isSelected(i)} key={row.idx} className="admin-tr">
                                <TableRowColumn className="admin-td">
                                    {row.schoolId}
                                </TableRowColumn>
                                <TableRowColumn className="admin-td">
                                    {row.schoolName}
                                </TableRowColumn>
                                <TableRowColumn className="admin-td">
                                    {row.schoolEduOfficeName}
                                </TableRowColumn>
                                <TableRowColumn className="admin-td">
                                    {/* 행 안의 메뉴 버튼 */}
                                    <IconMenu
                                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                        style={{ float:'right'}}
                                    >
                                        <MenuItem primaryText="상세정보" onClick={(i) => this.infoModal(row)}/>
                                        <MenuItem primaryText="수정" onClick={(i) => this.editModalOpen(row)}/>
                                        <MenuItem primaryText="삭제" onClick={(i) => this.deleteModalOpen(row)}/>
                                        <MenuItem primaryText="인증키 관리" onClick={(i) => this.authkeyModalOpen(row)}/>
                                    </IconMenu>
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <br/>
                <div style={{textAlign: 'center', maxWidth: '30%', margin: 'auto', height:40}}>
                    <FlatButton
                        label="이전"
                        backgroundColor={this.state.offset ==0?'#f9f9f9':'#43444c'}
                        style={this.state.offset ==0?{color: '#43444c', float:'left'}:{color: '#f9f9f9', float:'left'}}
                        disabled={this.state.offset ==0?true:false}
                        onClick={()=>this.movePage('prop')}
                    />
                    <FlatButton
                        label="다음"
                        backgroundColor={this.state.offset+20>this.state.count?'#f9f9f9':'#43444c'}
                        style={this.state.offset+20>this.state.count?{color: '#43444c', float:'right'}:{color: '#f9f9f9', float:'right'}}
                        disabled={this.state.offset+20>this.state.count?true:false}
                        onClick={()=>this.movePage('next')}
                    />
                </div>

                {/* 데이터 선택 삭제 모달 */}
                <Dialog
                    title="학교정보 삭제"
                    actions={deleteArrButton}
                    modal={false}
                    open={this.state.deleteArrModal}
                    onRequestClose={this.deleteArrModalClose}
                >
                    선택한 데이터를 삭제하시겠습니까?
                </Dialog>
                {/* 인증번호 모달 */}
                <Dialog
                    title="인증번호"
                    actions={authkeyButton}
                    modal={false}
                    open={this.state.authkeyModal}
                    onRequestClose={this.authkeyModalClose}
                >
                    <h2 style={{float:'left'}}>{this.state.authkeyData.schoolName}</h2>
                    <RaisedButton
                        label="재발급"
                        primary={true}
                        style={{width:'25%', float:'right'}}
                        onClick={this.updateAuthkey}
                    />
                    <br/><br/>
                    <h1 style={{textAlign:'center'}}>{this.state.authkeyData.schoolAuthkey}</h1>
                </Dialog>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    schoolLevel: state.schoolList.schoolLevel,
    keyword: state.schoolList.keyword,
    tableData: state.schoolList.tableData
});

let mapDispatchToProps = (dispatch) => {
    return {
        updateSchoolId: (schoolId) => dispatch(actionSchoolId(schoolId)),
        controlInfoPopup: (infoOpen) => dispatch(actionSchoolInfoOpen(infoOpen)),
        controlEditPopup: (editOpen) => dispatch(actionEditSchoolOpen(editOpen)),
        controlAddPopup: (addOpen) => dispatch(actionAddSchoolOpen(addOpen)),
        controlDelPopup: (deleteOpen) => dispatch(actionDelSchoolOpen(deleteOpen))
    };
}

SchoolList = connect(mapStateToProps, mapDispatchToProps)(SchoolList);

export default SchoolList;
