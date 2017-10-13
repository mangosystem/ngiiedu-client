import React from 'react';
import { connect } from 'react-redux';

import { actionEditSchoolOpen, actionUpdateSchool } from '../../../../actions/index';

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import update from 'react-addons-update';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class EditPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectTableData: {},
            tableData:[]
        };
        this.editSchoolIdChange = this.editSchoolIdChange.bind(this);
        this.editSchoolNameChange = this.editSchoolNameChange.bind(this);
        this.editSchoolEduOfficeNameChange = this.editSchoolEduOfficeNameChange.bind(this);
        this.editSchoolEduOfficeCodeChange = this.editSchoolEduOfficeCodeChange.bind(this);
        this.editSchoolSidoOfficeNameChange = this.editSchoolSidoOfficeNameChange.bind(this);
        this.editSchoolSidoOfficeCodeChange = this.editSchoolSidoOfficeCodeChange.bind(this);
        this.editSchoolAddrChange = this.editSchoolAddrChange.bind(this);
        this.editSchoolEstablishTypeChange = this.editSchoolEstablishTypeChange.bind(this);
        this.editSchoolLatChange = this.editSchoolLatChange.bind(this);
        this.editSchoolLonChange = this.editSchoolLonChange.bind(this);
        this.editSchoolAddrRoadChange = this.editSchoolAddrRoadChange.bind(this);
        this.editSchoolBuildDateChange = this.editSchoolBuildDateChange.bind(this);
        this.editSchoolCreateDateChange = this.editSchoolCreateDateChange.bind(this);
        this.editSchoolEditDateChange = this.editSchoolEditDateChange.bind(this);
        this.editSchoolRefDateChange = this.editSchoolRefDateChange.bind(this);
        this.editSchoolLevelChange = this.editSchoolLevelChange.bind(this);
        this.editSchoolStatusChange = this.editSchoolStatusChange.bind(this);
        this.editSchoolBranchTypeChange = this.editSchoolBranchTypeChange.bind(this);
        this.editSchoolLevelChange = this.editSchoolLevelChange.bind(this);
        this.editSchoolStatusChange = this.editSchoolStatusChange.bind(this);
        this.editSchoolBranchTypeChange = this.editSchoolBranchTypeChange.bind(this);
        this.editData = this.editData.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const schoolId = nextProps.schoolId;

        ajaxJson(
            ['GET',apiSvr+'/schools/'+schoolId+'.json'],
            null,
            function(res){
                this.setState({
                    selectTableData:res.response.data
                })
            }.bind(this)
        );

    };

    editData(){
        ajaxJson(
            ['PUT',apiSvr+'/schools/'+this.state.selectTableData.idx+'.json'],
            this.state.selectTableData,
            function(res){
                ajaxJson(
                    ['GET',apiSvr+'/schools.json'],
                    null,
                    function(res){
                        this.setState({
                            tableData:JSON.parse(JSON.stringify(res)).response.data
                        }, function(){
                            this.props.controlEditPopup(false);
                            this.props.updateSchool(this.state.tableData);
                        });
                    }.bind(this)
                );
            }.bind(this),
            function(e){
                alert(e);
            }
        );
    };

    //학교정보 수정 textfield 정보 수정
    editSchoolIdChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolId:{$set:value}
                }
            )
        });
    };

    editSchoolNameChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolName:{$set:value}
                }
            )
        });
    };

    editSchoolEduOfficeNameChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolEduOfficeName:{$set:value}
                }
            )
        });
    };

    editSchoolEduOfficeCodeChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolEduOfficeCode:{$set:value}
                }
            )
        });
    };

    editSchoolSidoOfficeNameChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolSidoOfficeName:{$set:value}
                }
            )
        });
    };

    editSchoolSidoOfficeCodeChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolSidoOfficeCode:{$set:value}
                }
            )
        });
    };

    editSchoolAddrChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolAddr:{$set:value}
                }
            )
        });
    };

    editSchoolEstablishTypeChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolEstablishType:{$set:value}
                }
            )
        });
    };

    editSchoolLatChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolLat:{$set:value}
                }
            )
        });
    };

    editSchoolLonChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolLon:{$set:value}
                }
            )
        });
    };

    editSchoolAddrRoadChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolAddrRoad:{$set:value}
                }
            )
        });
    };

    editSchoolBuildDateChange(event, date){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolBuildDate:{$set:date}
                }
            )
        });
    };

    editSchoolRefDateChange(event, date){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolReferenceDate:{$set:date}
                }
            )
        });
    };

    editSchoolCreateDateChange(event, date){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolDataCreateDate:{$set:date}
                }
            )
        });
    };

    editSchoolEditDateChange(event, date){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolDateEditDate:{$set:date}
                }
            )
        });
    };

    //학교정보 수정 selectbox 값 변경
    editSchoolLevelChange(event, index, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolLevel:{$set:value}
                }
            )
        });
    };

    editSchoolStatusChange(event, index, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolStatus:{$set:value}
                }
            )
        });
    };
    
    editSchoolBranchTypeChange(event, index, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolBranchType:{$set:value}
                }
            )
        });
    };

    handleClose() {
        this.props.controlEditPopup(false);
    };

    render() {

        //데이터 수정 확인 및 취소 버튼
        const editButton = [
            <FlatButton
            label="확인"
            primary={true}
            onClick={this.editData}
            />,
            <FlatButton
            label="취소"
            primary={true}
            onClick={this.handleClose.bind(this)}
            />
        ];

        return (
            <div>
                {/* 학교정보 수정 모달 */}
                <Dialog
                    title="학교정보 수정"
                    actions={editButton}
                    modal={false}
                    open={this.props.editOpen}
                    onRequestClose={this.handleClose.bind(this)}
                >
                    <Table 
                        fixedHeader={this.state.fixedHeader}
                        selectable={false}
                        height={'300px'}
                    >
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>컬럼명</TableHeaderColumn>
                                <TableHeaderColumn>속성값</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>
                                    학교아이디
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="학교아이디" value={this.state.selectTableData.schoolId||''} onChange={this.editSchoolIdChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    학교이름
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="학교이름" value={this.state.selectTableData.schoolName||''} onChange={this.editSchoolNameChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    학교구분
                                </TableRowColumn>
                                <TableRowColumn>
                                    <SelectField
                                        value={this.state.selectTableData.schoolLevel||''}
                                        onChange={this.editSchoolLevelChange}
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
                            <TableRow>
                                <TableRowColumn>
                                    운영상태
                                </TableRowColumn>
                                <TableRowColumn>
                                    <SelectField
                                        value={this.state.selectTableData.schoolStatus||''}
                                        onChange={this.editSchoolStatusChange}
                                        style={{
                                        marginLeft: '0 auto'
                                        }}
                                    >
                                        <MenuItem value='운영' primaryText="운영" />
                                        <MenuItem value='비운영' primaryText="비운영" />
                                    </SelectField>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    교육지원청명
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="교육지원청명" value={this.state.selectTableData.schoolEduOfficeName||''} onChange={this.editSchoolEduOfficeNameChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    교육지원청코드
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField 
                                        hintText="교육지원청코드" 
                                        value={this.state.selectTableData.schoolEduOfficeCode||''} 
                                        onChange={this.editSchoolEduOfficeCodeChange}
                                        type="number"
                                    />
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    시도교육청명
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="시도교육청명" value={this.state.selectTableData.schoolSidoOfficeName||''} onChange={this.editSchoolSidoOfficeNameChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    시도교육청코드
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField 
                                        hintText="시도교육청코드" 
                                        value={this.state.selectTableData.schoolSidoOfficeCode||''} 
                                        onChange={this.editSchoolSidoOfficeCodeChange}
                                        type="number"
                                    />
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                소재지지번주소
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="소재지지번주소" value={this.state.selectTableData.schoolAddr||''} onChange={this.editSchoolAddrChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    설립일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="설립일자" value={this.state.selectTableData.schoolBuildDate||''} onChange={this.editSchoolBuildDateChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    설립형태
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="설립형태" value={this.state.selectTableData.schoolEstablishType||''} onChange={this.editSchoolEstablishTypeChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    위도
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="위도" value={this.state.selectTableData.schoolLat||''} onChange={this.editSchoolLatChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    경도
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="경도" value={this.state.selectTableData.schoolLon||''} onChange={this.editSchoolLonChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    본교분교구분
                                </TableRowColumn>
                                <TableRowColumn>
                                    <SelectField
                                        value={this.state.selectTableData.schoolBranchType||''}
                                        onChange={this.editSchoolBranchTypeChange}
                                        style={{
                                        marginLeft: '0 auto'
                                        }}
                                    >
                                        <MenuItem value='본교' primaryText="본교" />
                                        <MenuItem value='분교' primaryText="분교" />
                                    </SelectField>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    소재지도로명주소
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="소재지도로명주소" value={this.state.selectTableData.schoolAddrRoad||''} onChange={this.editSchoolAddrRoadChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    데이터기준일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="데이터기준일자" value={this.state.selectTableData.schoolReferenceDate||''} onChange={this.editSchoolRefDateChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    생성일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="생성일자" value={this.state.selectTableData.schoolDataCreateDate||''} onChange={this.editSchoolCreateDateChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    변경일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="변경일자" value={this.state.selectTableData.schoolDateEditDate||''} onChange={this.editSchoolEditDateChange}/>
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
        schoolId: state.schoolList.schoolId,
        editOpen: state.schoolList.editOpen
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        controlEditPopup: (value) => dispatch(actionEditSchoolOpen(value)),
        updateSchool: (tableData) => dispatch(actionUpdateSchool(tableData))
    };
};

EditPopup = connect(mapStateToProps, mapDispatchToProps)(EditPopup);

export default EditPopup;