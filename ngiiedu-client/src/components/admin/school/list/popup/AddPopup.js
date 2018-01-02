import React from 'react';
import { connect } from 'react-redux';

import { actionAddSchoolOpen, actionUpdateSchool } from '../../../../../actions/index';

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import update from 'react-addons-update';

import { cyan500 } from 'material-ui/styles/colors';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class AddPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addDataObj:{
                schoolId:'',
                schoolName:'',
                schoolLevel:'초등학교',
                schoolStatus:'운영',
                schoolEduOfficeName:'',
                schoolEduOfficeCode:'',
                schoolSidoOfficeName:'',
                schoolSidoOfficeCode:'',
                schoolAddr:'',
                schoolBuildDate: '',
                schoolEstablishType:'',
                schoolLat:'',
                schoolLon:'',
                schoolBranchType:'본교',
                schoolAddrRoad:'',
                schoolRefDate:'',
                schoolCreateDate:'',
                schoolEditDate:'',
            },
            tableData:[]
        };

        this.schoolIdChange = this.schoolIdChange.bind(this);
        this.schoolNameChange = this.schoolNameChange.bind(this);
        this.schoolEduOfficeNameChange = this.schoolEduOfficeNameChange.bind(this);
        this.schoolEduOfficeCodeChange = this.schoolEduOfficeCodeChange.bind(this);
        this.schoolSidoOfficeNameChange = this.schoolSidoOfficeNameChange.bind(this);
        this.schoolSidoOfficeCodeChange = this.schoolSidoOfficeCodeChange.bind(this);
        this.schoolAddrChange = this.schoolAddrChange.bind(this);
        this.schoolEstablishTypeChange = this.schoolEstablishTypeChange.bind(this);
        this.schoolLatChange = this.schoolLatChange.bind(this);
        this.schoolLonChange = this.schoolLonChange.bind(this);
        this.schoolAddrRoadChange = this.schoolAddrRoadChange.bind(this);
        this.schoolBuildDateChange = this.schoolBuildDateChange.bind(this);
        this.schoolCreateDateChange = this.schoolCreateDateChange.bind(this);
        this.schoolEditDateChange = this.schoolEditDateChange.bind(this);
        this.schoolRefDateChange = this.schoolRefDateChange.bind(this);
        this.schoolLevelChange = this.schoolLevelChange.bind(this);
        this.schoolStatusChange = this.schoolStatusChange.bind(this);
        this.schoolBranchTypeChange = this.schoolBranchTypeChange.bind(this);
        this.addData = this.addData.bind(this);
    }

    addData(){
        ajaxJson(
            ['POST',apiSvr+'/schools.json'],
            this.state.addDataObj,
            function(res){
                this.setState({
                    tableData: update(
                        this.state.tableData,
                        {
                            $push: [JSON.parse(JSON.stringify(res)).response.data]
                        }
                    )
                }, function(){
                    this.props.updateSchool(this.state.tableData);
                });
            }.bind(this),
            function(e){
                alert(e);
            }
        );
        this.handleClose();
    };

    //학교목록 추가 textfield 정보 변경
    schoolIdChange(evnet, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolId:{$set:value}
                }
            )
        });
    };
    schoolNameChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolName:{$set:value}
                }
            )
        });
    };
    schoolEduOfficeNameChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolEduOfficeName:{$set:value}
                }
            )
        });
    };
    schoolEduOfficeCodeChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolEduOfficeCode:{$set:value}
                }
            )
        });
    };
    schoolSidoOfficeNameChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolSidoOfficeName:{$set:value}
                }
            )
        });
    };
    schoolSidoOfficeCodeChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolSidoOfficeCode:{$set:value}
                }
            )
        });
    };
    schoolAddrChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolAddr:{$set:value}
                }
            )
        });
    };
    schoolEstablishTypeChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolEstablishType:{$set:value}
                }
            )
        });
    };
    schoolLatChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolLat:{$set:value}
                }
            )
        });
    };
    schoolLonChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolLon:{$set:value}
                }
            )
        });
    };
    schoolAddrRoadChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolAddrRoad:{$set:value}
                }
            )
        });
    };
    schoolBuildDateChange(event, date){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolBuildDate:{$set:date}
                }
            )
        });
    };
    schoolRefDateChange(event, date){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolRefDate:{$set:date}
                }
            )
        });
    };
    schoolCreateDateChange(event, date){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolCreateDate:{$set:date}
                }
            )
        });
    };
    schoolEditDateChange(event, date){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolEditDate:{$set:date}
                }
            )
        });
    };

    //학교 추가 selectbox 값 변경
    schoolBranchTypeChange(event, index, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolBranchType:{$set:value}
                }
            )
        });
    };

    schoolStatusChange(event, index, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolStatus:{$set:value}
                }
            )
        });
    };

    schoolLevelChange(event, index, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolLevel:{$set:value}
                }
            )
        });
    };

    handleClose() {
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolId:{$set:''},
                    schoolName:{$set:''},
                    schoolLevel:{$set:'초등학교'},
                    schoolStatus:{$set:'운영'},
                    schoolEduOfficeName:{$set:''},
                    schoolEduOfficeCode:{$set:''},
                    schoolSidoOfficeName:{$set:''},
                    schoolSidoOfficeCode:{$set:''},
                    schoolAddr:{$set:''},
                    schoolBuildDate:{$set:''},
                    schoolEstablishType:{$set:''},
                    schoolLat:{$set:''},
                    schoolLon:{$set:''},
                    schoolBranchType:{$set:'본교'},
                    schoolAddrRoad:{$set:''},
                    schoolRefDate:{$set:''},
                    schoolCreateDate:{$set:''},
                    schoolEditDate:{$set:''},
                }
            )
        });
        this.props.controlAddPopup(false);
    };

    render() {
        //데이터 추가 확인 및 취소 버튼
        const addButton = [
            <FlatButton
                label="취소"
                onClick={this.handleClose.bind(this)}
            />,
            <FlatButton
                label="추가"
                backgroundColor={cyan500}
                style={{color: 'white'}}
                onClick={this.addData}
            />
        ];

        return (
            <div>
                {/* 학교 추가 모달 */}
                <Dialog
                    title="학교 추가"
                    actions={addButton}
                    modal={false}
                    open={this.props.addOpen}
                    onRequestClose={this.handleClose.bind(this)}
                >
                    <Table
                        fixedHeader={this.state.fixedHeader}
                        selectable={false}
                        height={'300px'}
                        className="admin-table"
                    >
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} className="admin-thead">
                            <TableRow className="admin-tr">
                                <TableHeaderColumn className="admin-th">컬럼명</TableHeaderColumn>
                                <TableHeaderColumn className="admin-th">속성값</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} className="admin-tbody">
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    학교아이디
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="학교아이디" value={this.state.addDataObj.schoolId} onChange={this.schoolIdChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    학교이름
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="학교이름" value={this.state.addDataObj.schoolName} onChange={this.schoolNameChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    학교구분
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <SelectField
                                        value={this.state.addDataObj.schoolLevel}
                                        onChange={this.schoolLevelChange}
                                        style={{
                                        marginLeft: '0 auto'
                                        }}
                                    >
                                        <MenuItem value='초등학교' primaryText="초등학교" />
                                        <MenuItem value='중학교' primaryText="중학교" />
                                        <MenuItem value='고등학교' primaryText="고등학교" />
                                    </SelectField>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    운영상태
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <SelectField
                                        value={this.state.addDataObj.schoolStatus}
                                        onChange={this.schoolStatusChange}
                                        style={{
                                        marginLeft: '0 auto'
                                        }}
                                    >
                                        <MenuItem value='운영' primaryText="운영" />
                                        <MenuItem value='비운영' primaryText="비운영" />
                                    </SelectField>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    교육지원청명
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="교육지원청명" value={this.state.addDataObj.schoolEduOfficeName} onChange={this.schoolEduOfficeNameChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    교육지원청코드
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField
                                        hintText="교육지원청코드"
                                        value={this.state.addDataObj.schoolEduOfficeCode}
                                        onChange={this.schoolEduOfficeCodeChange}
                                        type="number"
                                    />
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    시도교육청명
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="시도교육청명" value={this.state.addDataObj.schoolSidoOfficeName}  onChange={this.schoolSidoOfficeNameChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    시도교육청코드
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField
                                        hintText="시도교육청코드"
                                        value={this.state.addDataObj.schoolSidoOfficeCode}
                                        onChange={this.schoolSidoOfficeCodeChange}
                                        type="number"
                                    />
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                소재지지번주소
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="소재지지번주소" value={this.state.addDataObj.schoolAddr} onChange={this.schoolAddrChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                설립일자
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="설립일자" value={this.state.addDataObj.schoolBuildDate} onChange={this.schoolBuildDateChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    설립형태
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="설립형태"  value={this.state.addDataObj.schoolEstablishType} onChange={this.schoolEstablishTypeChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    위도
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="위도" value={this.state.addDataObj.schoolLat} onChange={this.schoolLatChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    경도
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="경도" value={this.state.addDataObj.schoolLon} onChange={this.schoolLonChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    본교분교구분
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <SelectField
                                        value={this.state.addDataObj.schoolBranchType}
                                        onChange={this.schoolBranchTypeChange}
                                        style={{
                                        marginLeft: '0 auto'
                                        }}
                                    >
                                        <MenuItem value='본교' primaryText="본교" />
                                        <MenuItem value='분교' primaryText="분교" />
                                    </SelectField>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    소재지도로명주소
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="소재지도로명주소" value={this.state.addDataObj.schoolAddrRoad} onChange={this.schoolAddrRoadChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    데이터기준일자
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="데이터기준일자" value={this.state.addDataObj.schoolRefDate} onChange={this.schoolRefDateChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    생성일자
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="생성일자" value={this.state.addDataObj.schoolCreateDate} onChange={this.schoolCreateDateChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    변경일자
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    <TextField hintText="변경일자" value={this.state.addDataObj.schoolEditDate} onChange={this.schoolEditDateChange}/>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Dialog>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        addOpen: state.schoolList.addOpen
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        controlAddPopup: (value) => dispatch(actionAddSchoolOpen(value)),
        updateSchool: (tableData) => dispatch(actionUpdateSchool(tableData))
    };
};

AddPopup = connect(mapStateToProps, mapDispatchToProps)(AddPopup);

export default AddPopup;
