import React from 'react';
import { connect } from 'react-redux';

import { actionSchoolInfoOpen } from '../../../../../actions/index';

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class InfoPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectTableData: {}
        };
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

    }

    handleClose() {
        this.props.controlInfoPopup(false);
    }

    render() {

        //데이터 상세정보 확인 버튼
        const infoButton = [
            <FlatButton
                label="확인"
                onClick={this.handleClose.bind(this)}
            />
        ];

        return (
            <div>
                {/* 학교 상세정보 모달 */}
                <Dialog
                    title="학교상세정보"
                    actions={infoButton}
                    modal={false}
                    open={this.props.infoOpen}
                    onRequestClose={this.handleClose.bind(this)}
                >
                    <Table
                        fixedHeader={true}
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
                                    {this.state.selectTableData.schoolId}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    학교이름
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolName}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    학교구분
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolLevel}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    운영상태
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolStatus}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    교육지원청명
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolEduOfficeName}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    교육지원청코드
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolEduOfficeCode}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    시도교육청명
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolSidoOfficeName}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    시도교육청코드
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolSidoOfficeCode}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                소재지지번주소
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolAddr}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                설립일자
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolBuildDate}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    설립형태
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolEstablishType}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    위도
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolLat}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    경도
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolLon}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    본교분교구분
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolBranchType}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    소재지도로명주소
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolAddrRoad}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    데이터기준일자
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolReferenceDate}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    생성일자
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolDataCreateDate}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow className="admin-tr">
                                <TableRowColumn className="admin-td-left">
                                    변경일자
                                </TableRowColumn>
                                <TableRowColumn className="admin-td-left">
                                    {this.state.selectTableData.schoolDateEditDate}
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
        infoOpen: state.schoolList.infoOpen
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        controlInfoPopup: (value) => dispatch(actionSchoolInfoOpen(value))
    };
};

InfoPopup = connect(mapStateToProps, mapDispatchToProps)(InfoPopup);

export default InfoPopup;
