import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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

class SchoolList extends React.Component {
    constructor(){
        super();
        this.state ={
            search:'',
            searchCategory: 'schoolName',
            tableData:[],
            selectTableData:{},
            selected: [],
            selectedData:[],
            deleteDataList:[],
            selectSchoolId:[],
            schoolLevel:'elementary',
            schoolStatus:'manage',
            schoolBranchType:'thisSchool',
            deleteModal:false,
            editModal:false,
            infoModal:false,
            addModal:false,
            fixedHeader: true,
            selectable: false,
            enableSelectAll: false,
            showCheckboxes: false,
            test:{
                aa:'',
                bb:''
            }
        };
        this.isSelected = this.isSelected.bind(this);
        this.tableRowSelection = this.tableRowSelection.bind(this);
        this.deleteSelectData = this.deleteSelectData.bind(this);
        this.deleteModalOpen = this.deleteModalOpen.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.deleteModalClose = this.deleteModalClose.bind(this);
        this.deleteReady = this.deleteReady.bind(this);
        this.editModalOpen = this.editModalOpen.bind(this);
        this.editModalClose = this.editModalClose.bind(this);
        this.infoModalOpen = this.infoModalOpen.bind(this);
        this.infoModalClose = this.infoModalClose.bind(this);
        this.addModalOpen = this.addModalOpen.bind(this);
        this.addModalClose = this.addModalClose.bind(this);
        this.schoolLevelChange = this.schoolLevelChange.bind(this);
        this.schoolStatusChange = this.schoolStatusChange.bind(this);
        this.schoolBranchTypeChange = this.schoolBranchTypeChange.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
        this.search = this.search.bind(this);
    }

    componentWillMount(){
        ajaxJson(
            ['GET',apiSvr+'/schools.json'],
            null,
            function(res){
                this.setState({
                    tableData:JSON.parse(JSON.stringify(res)).response.data
                })
            }.bind(this)
        );
    }

    search(){
        let keyword = this.state.search;
        let category = this.state.searchCategory;
        ajaxJson(
            ['GET',apiSvr+'/schools.json'],
            {'category':category, 'keyword':keyword},
            function(res){
                this.setState({
                    tableData:JSON.parse(JSON.stringify(res)).response.data
                })
                   
            }.bind(this)
        );
    }

    categoryChange(event, index, value){
        this.setState({searchCategory:value});
    }

    schoolBranchTypeChange(event, index, value){
        this.setState({schoolBranchType:value});
    }

    schoolStatusChange(event, index, value){
        this.setState({schoolStatus:value});
    }

    schoolLevelChange(event, index, value){
        this.setState({schoolLevel:value});
    }

    addModalOpen(){
        this.setState({addModal:true});
    }

    addModalClose(){
        this.setState({addModal:false});
    }

    deleteSelectData(selectedRows){
        this.setState({selectable:false});
        this.setState({showCheckboxes:false});
    }

    deleteReady(){
        this.setState({selectable:true});
        this.setState({showCheckboxes:true});
    }

    isSelected(index){
        return this.state.selected.indexOf(index) !== -1;
    };

    tableRowSelection(selectedRows){
        this.setState({
        selected: selectedRows
        });
        console.log(selectedRows);
    };

    //데이터 상세정보
    infoModalOpen(row){
        ajaxJson(
            ['GET',apiSvr+'/schools/'+row.idx+'.json'],
            null,
            function(res){
                this.setState({
                    selectTableData:res.response.data
                })
            }.bind(this)
        )
        this.setState({infoModal:true});
    }
    infoModalClose(){
        this.setState({infoModal:false});
    };

    //데이터 수정
    editModalOpen(row){
        ajaxJson(
            ['GET',apiSvr+'/schools/'+row.idx+'.json'],
            null,
            function(res){
                this.setState({
                    selectTableData:res.response.data
                })
            }.bind(this)
        )
        this.setState({editModal:true});
    };

    editModalClose(){
        this.setState({editModal:false});
    };

    //데이터 단일 삭제
    deleteModalOpen(row){
        this.setState({selectSchoolId:row});
        this.setState({deleteModal:true});
    };

    deleteData(){
        ajaxJson(
            ['DELETE',apiSvr+'/schools/'+this.state.selectSchoolId.idx+'.json'],
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
        )
        this.setState({deleteModal:false});
    }

    deleteModalClose(){
        this.setState({deleteModal:false});
    };

    render() {
        //데이터 수정 확인 및 취소 버튼
        const deleteButton = [
            <FlatButton
            label="확인"
            primary={true}
            onClick={this.deleteData}
            />,
            <FlatButton
            label="취소"
            primary={true}
            onClick={this.deleteModalClose}
            />
        ]

        //데이터 수정 확인 및 취소 버튼
        const editButton = [
            <FlatButton
            label="확인"
            primary={true}
            onClick={this.editModalClose}
            />,
            <FlatButton
            label="취소"
            primary={true}
            onClick={this.editModalClose}
            />
        ]

        //데이터 상세정보 확인 버튼
        const infoButton = [
            <FlatButton
            label="확인"
            primary={true}
            onClick={this.infoModalClose}
            />
        ]
        //데이터 추가 확인 및 취소 버튼
        const addButton = [
            <FlatButton
            label="확인"
            primary={true}
            onClick={this.addModalClose}
            />,
            <FlatButton
            label="취소"
            primary={true}
            onClick={this.addModalClose}
            />
        ]

        return (
            <div>

                <div>
                    <SelectField
                        value={this.state.searchCategory}
                        onChange={this.categoryChange}
                        style={{
                        marginLeft: '0 auto'
                        }}
                    >
                        <MenuItem value='schoolName' primaryText="학교명" />
                        <MenuItem value='schoolEduOfficeName' primaryText="교육지원청명" />
                    </SelectField>
                    <SearchBar
                        onChange={(search) => this.setState({search : search})}
                        onRequestSearch={this.search}
                        style={{
                        marginLeft: '0 auto'
                        }}
                    />
                </div><br/>

                {/* 기본 테이블 */}
                <Table 
                    onRowSelection={this.tableRowSelection}
                    fixedHeader={this.state.fixedHeader}
                    multiSelectable={true}
                    selectable={this.state.selectable}
                    height={'500px'}
                >
                    <TableHeader displaySelectAll={this.state.showCheckboxes}>
                        <TableRow>
                            <TableHeaderColumn colSpan="4" style={{textAlign: 'right'}}>
                                <FlatButton label="취소" onClick={this.deleteSelectData}/>
                                <FlatButton label="확인" onClick={this.deleteSelectData}/>

                                <IconButton tooltip="추가" onClick={this.addModalOpen}>
                                    <Add />
                                </IconButton>
                                <IconButton tooltip="삭제" onClick={this.deleteReady}>
                                    <Delete />
                                </IconButton>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>학교이름</TableHeaderColumn>
                            <TableHeaderColumn>교육지원청명</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                        {this.state.tableData.map((row,i) => (
                            <TableRow selected={this.isSelected(i)} key={i}>
                                <TableRowColumn>
                                    {row.schoolId}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {row.schoolName}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {row.schoolEduOfficeName}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {/* 행 안의 메뉴 버튼 */}
                                    <IconMenu
                                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                        style={{ float:'right'}}
                                    >
                                        <MenuItem primaryText="상세정보" onClick={(i) => this.infoModalOpen(row)}/>
                                        <MenuItem primaryText="수정" onClick={(i) => this.editModalOpen(row)}/>
                                        <MenuItem primaryText="삭제" onClick={(i) => this.deleteModalOpen(row)}/>
                                        <MenuItem primaryText="인증키 관리" />
                                    </IconMenu>
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* 데이터 상세정보 모달 */}
                <Dialog
                    title="학교상세정보"
                    actions={infoButton}
                    modal={false}
                    open={this.state.infoModal}
                    onRequestClose={this.infoModalClose}
                >
                    <Table 
                        onRowSelection={this.tableRowSelection}
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
                
                {/* 데이터 추가 모달 */}
                <Dialog
                    title="학교 추가"
                    actions={addButton}
                    modal={false}
                    open={this.state.addModal}
                    onRequestClose={this.addModalClose}
                >
                    <Table 
                        onRowSelection={this.tableRowSelection}
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
                                    <TextField hintText="학교아이디"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    학교이름
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="학교이름"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    학교구분
                                </TableRowColumn>
                                <TableRowColumn>
                                    <SelectField
                                        value={this.state.schoolLevel}
                                        onChange={this.schoolLevelChange}
                                        style={{
                                        marginLeft: '0 auto'
                                        }}
                                    >
                                        <MenuItem value='elementary' primaryText="초등학교" />
                                        <MenuItem value='middle' primaryText="중학교" />
                                        <MenuItem value='high' primaryText="고등학교" />
                                    </SelectField>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    운영상태
                                </TableRowColumn>
                                <TableRowColumn>
                                    <SelectField
                                        value={this.state.schoolStatus}
                                        onChange={this.schoolStatusChange}
                                        style={{
                                        marginLeft: '0 auto'
                                        }}
                                    >
                                        <MenuItem value='manage' primaryText="운영" />
                                        <MenuItem value='close' primaryText="운영 안함" />
                                    </SelectField>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    교육지원청명
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="교육지원청명"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    교육지원청코드
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="교육지원청코드"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    시도교육청명
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="시도교육청명"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    시도교육청코드
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="시도교육청코드"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                   소재지지번주소
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="소재지지번주소"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                   설립일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="설립일자"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    설립형태
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="설립형태"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    위도
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="위도"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    경도
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="경도"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    본교분교구분
                                </TableRowColumn>
                                <TableRowColumn>
                                    <SelectField
                                        value={this.state.schoolBranchType}
                                        onChange={this.schoolBranchTypeChange}
                                        style={{
                                        marginLeft: '0 auto'
                                        }}
                                    >
                                        <MenuItem value='thisSchool' primaryText="본교" />
                                        <MenuItem value='branchSchool' primaryText="분교" />
                                    </SelectField>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    소재지도로명주소
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="소재지도로명주소"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    데이터기준일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="데이터기준일자"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    생성일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="생성일자"/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    변경일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="변경일자"/>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Dialog>

                {/* 데이터 수정 모달 */}
                <Dialog
                    title="학교정보 수정"
                    actions={editButton}
                    modal={false}
                    open={this.state.editModal}
                    onRequestClose={this.editModalClose}
                >
                    <Table 
                        onRowSelection={this.tableRowSelection}
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

                {/* 데이터 삭제 모달 */}
                <Dialog
                    title="학교정보 삭제"
                    actions={deleteButton}
                    modal={false}
                    open={this.state.deleteModal}
                    onRequestClose={this.deleteModalClose}
                >
                    데이터를 삭제하시겠습니까?
                </Dialog>
                
            </div>
        );
    }
}

export default SchoolList;