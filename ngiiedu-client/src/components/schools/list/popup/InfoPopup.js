import React from 'react';
import { connect } from 'react-redux';

import { actionSchoolInfoOpen } from '../../../../actions/index';

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
                primary={true}
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
                                    {this.state.selectTableData.schoolId}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    학교이름
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolName}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    학교구분
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolLevel}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    운영상태
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolStatus}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    교육지원청명
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolEduOfficeName}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    교육지원청코드
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolEduOfficeCode}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    시도교육청명
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolSidoOfficeName}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    시도교육청코드
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolSidoOfficeCode}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                소재지지번주소
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolAddr}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                설립일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolBuildDate}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    설립형태
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolEstablishType}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    위도
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolLat}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    경도
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolLon}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    본교분교구분
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolBranchType}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    소재지도로명주소
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolAddrRoad}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    데이터기준일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolReferenceDate}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    생성일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    {this.state.selectTableData.schoolDataCreateDate}
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    변경일자
                                </TableRowColumn>
                                <TableRowColumn>
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