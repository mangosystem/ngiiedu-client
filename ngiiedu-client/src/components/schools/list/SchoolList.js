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
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

class SchoolList extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            search:'',
            searchCategory: 'schoolName',
            tableData:[],
            selectTableData:{},
            selected: [],
            selectedData:[],
            deleteDataList:[],
            selectSchoolId:[],
            deleteModal:false,
            deleteButtonShow:'none',
            deleteArrModal:false,
            editModal:false,
            infoModal:false,
            addModal:false,
            fixedHeader: true,
            selectable: false,
            showCheckboxes: false,
            allLevelButton:'#9E9E9E',
            elementaryLevelButton:'#00BCD4',
            middleLevelButton:'#00BCD4',
            highLevelButton:'#00BCD4',
            searchSchoolLevel:'',
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
            }
        };
        //TableRow 선택
        this.isSelected = this.isSelected.bind(this);
        this.tableRowSelection = this.tableRowSelection.bind(this);
        
        //상단바(학교구분, 검색 카테고리, 검색창)
        this.categoryChange = this.categoryChange.bind(this);
        this.search = this.search.bind(this);
        this.schoolLevelArr = this.schoolLevelArr.bind(this);

        //학교 상세정보
        this.infoModalOpen = this.infoModalOpen.bind(this);
        this.infoModalClose = this.infoModalClose.bind(this);

        //학교 추가
        this.addModalOpen = this.addModalOpen.bind(this);
        this.addModalClose = this.addModalClose.bind(this);
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

        //학교정보 수정
        this.editModalOpen = this.editModalOpen.bind(this);
        this.editModalClose = this.editModalClose.bind(this);
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

        //학교 단일 삭제
        this.deleteData = this.deleteData.bind(this);
        this.deleteModalOpen = this.deleteModalOpen.bind(this);
        this.deleteModalClose = this.deleteModalClose.bind(this);

        //학교 선택 삭제
        this.deleteArrReady = this.deleteArrReady.bind(this);
        this.deleteArrCancle = this.deleteArrCancle.bind(this);
        this.deleteArrModalOpen = this.deleteArrModalOpen.bind(this);
        this.deleteArrModalClose = this.deleteArrModalClose.bind(this);
        this.deleteSelectData = this.deleteSelectData.bind(this);
    };

    //처음 학교목록 불러오기
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
    };

    //학교구분 버튼
    schoolLevelArr(value){
        if(value =='all'){
            this.setState({
                allLevelButton:'#9E9E9E',
                elementaryLevelButton:'#00BCD4',
                middleLevelButton:'#00BCD4',
                highLevelButton:'#00BCD4',
                searchSchoolLevel:'',
            });
            ajaxJson(
                ['GET',apiSvr+'/schools.json'],
                null,
                function(res){
                    this.setState({
                        tableData:JSON.parse(JSON.stringify(res)).response.data
                    })
                }.bind(this)
            );
        }else{
            this.setState({
                searchSchoolLevel:value
            });
            let schoolLevel = value;
            ajaxJson(
                ['GET',apiSvr+'/schools.json'],
                {'schoolLevel':schoolLevel},
                function(res){
                    this.setState({
                        tableData:JSON.parse(JSON.stringify(res)).response.data
                    })
                }.bind(this)
            );
            if(value =='초등학교'){
                this.setState({
                    allLevelButton:'#00BCD4',
                    elementaryLevelButton:'#9E9E9E',
                    middleLevelButton:'#00BCD4',
                    highLevelButton:'#00BCD4',
                });
            }else if(value =='중학교'){
                this.setState({
                    allLevelButton:'#00BCD4',
                    elementaryLevelButton:'#00BCD4',
                    middleLevelButton:'#9E9E9E',
                    highLevelButton:'#00BCD4',
                });
            }else if(value =='고등학교'){
                this.setState({
                    allLevelButton:'#00BCD4',
                    elementaryLevelButton:'#00BCD4',
                    middleLevelButton:'#00BCD4',
                    highLevelButton:'#9E9E9E',
                });
            };
        };
    };

    //학교목록 검색
    search(){
        let keyword = this.state.search;
        let category = this.state.searchCategory;
        let schoolLevel = this.state.searchSchoolLevel;
        ajaxJson(
            ['GET',apiSvr+'/schools.json'],
            {'category':category, 'keyword':keyword, 'schoolLevel':schoolLevel},
            function(res){
                this.setState({
                    tableData:JSON.parse(JSON.stringify(res)).response.data
                })
            }.bind(this)
        );
    };

    //학교 검색 카테고리 변경
    categoryChange(event, index, value){
        this.setState({searchCategory:value});
    };

    //학교 추가
    addModalOpen(){
        this.setState({addModal:true});
    };

    addModalClose(){
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
        this.setState({addModal:false});
    };

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
                })
                   
            }.bind(this),
            function(e){
                alert(e)
            }
        );
        this.setState({addModal:false});
    }

    //학교목록 추가 textfield 정보 변경
    schoolIdChange(evnet, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolId:{$set:value}
                }
            )
        });
    }
    schoolNameChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolName:{$set:value}
                }
            )
        });
    }
    schoolEduOfficeNameChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolEduOfficeName:{$set:value}
                }
            )
        });
    }
    schoolEduOfficeCodeChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolEduOfficeCode:{$set:value}
                }
            )
        });
    }
    schoolSidoOfficeNameChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolSidoOfficeName:{$set:value}
                }
            )
        });
    }
    schoolSidoOfficeCodeChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolSidoOfficeCode:{$set:value}
                }
            )
        });
    }
    schoolAddrChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolAddr:{$set:value}
                }
            )
        });
    }
    schoolEstablishTypeChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolEstablishType:{$set:value}
                }
            )
        });
    }
    schoolLatChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolLat:{$set:value}
                }
            )
        });
    }
    schoolLonChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolLon:{$set:value}
                }
            )
        });
    }
    schoolAddrRoadChange(event, value){
        this.setState({
            addDataObj:update(
                this.state.addDataObj,{
                    schoolAddrRoad:{$set:value}
                }
            )
        });
    }
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


    //테이블(학교) 선택
    isSelected(index){
        return this.state.selected.indexOf(index) !== -1;
    };

    tableRowSelection(selectedRows){
        if(selectedRows.length != 0){
            this.setState({
                selected: selectedRows
            });
        }
    };

    //학교정보 상세정보
    infoModalOpen(row){
        ajaxJson(
            ['GET',apiSvr+'/schools/'+row.idx+'.json'],
            null,
            function(res){
                this.setState({
                    selectTableData:res.response.data
                })
            }.bind(this)
        );
        this.setState({infoModal:true});
    };

    infoModalClose(){
        this.setState({infoModal:false});
    };

    //학교정보 수정
    editModalOpen(row){
        ajaxJson(
            ['GET',apiSvr+'/schools/'+row.idx+'.json'],
            null,
            function(res){
                this.setState({
                    selectTableData:res.response.data
                })
            }.bind(this)
        );
        this.setState({editModal:true});
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
                        })
                    }.bind(this)
                );
            }.bind(this),
            function(e){
                alert(e);
            }
        );
        this.setState({editModal:false});
    }

    editModalClose(){
        this.setState({editModal:false});
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
    }
    editSchoolNameChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolName:{$set:value}
                }
            )
        });
    }
    editSchoolEduOfficeNameChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolEduOfficeName:{$set:value}
                }
            )
        });
    }
    editSchoolEduOfficeCodeChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolEduOfficeCode:{$set:value}
                }
            )
        });
    }
    editSchoolSidoOfficeNameChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolSidoOfficeName:{$set:value}
                }
            )
        });
    }
    editSchoolSidoOfficeCodeChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolSidoOfficeCode:{$set:value}
                }
            )
        });
    }
    editSchoolAddrChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolAddr:{$set:value}
                }
            )
        });
    }
    editSchoolEstablishTypeChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolEstablishType:{$set:value}
                }
            )
        });
    }
    editSchoolLatChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolLat:{$set:value}
                }
            )
        });
    }
    editSchoolLonChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolLon:{$set:value}
                }
            )
        });
    }
    editSchoolAddrRoadChange(event, value){
        this.setState({
            selectTableData:update(
                this.state.selectTableData,{
                    schoolAddrRoad:{$set:value}
                }
            )
        });
    }
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

    //학교 단일 삭제
    deleteModalOpen(row){
        this.setState({selectSchoolId:row});
        this.setState({deleteModal:true});
    };
    deleteModalClose(){
        this.setState({deleteModal:false});
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
        );
        this.setState({deleteModal:false});
    };
    
    //학교 선택 삭제
    deleteArrReady(){
        this.setState({
            selectable:true,
            showCheckboxes:true,
            deleteButtonShow:''
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
        this.setState({
            selected:[],
            selectable:false,
            showCheckboxes:false,
            deleteArrModal:false,
            deleteButtonShow:'none'
        });
    };


    render() {
        //데이터 단일 삭제 확인 및 취소 버튼
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
        ];

        //데이터 선택 삭제 확인 및 취소 버튼
        const deleteArrButton = [
            <FlatButton
            label="확인"
            primary={true}
            onClick={this.deleteSelectData}
            />,
            <FlatButton
            label="취소"
            primary={true}
            onClick={this.deleteArrModalClose}
            />
        ];

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
            onClick={this.editModalClose}
            />
        ];

        //데이터 상세정보 확인 버튼
        const infoButton = [
            <FlatButton
            label="확인"
            primary={true}
            onClick={this.infoModalClose}
            />
        ];

        //데이터 추가 확인 및 취소 버튼
        const addButton = [
            <FlatButton
            label="확인"
            primary={true}
            onClick={this.addData}
            />,
            <FlatButton
            label="취소"
            primary={true}
            onClick={this.addModalClose}
            />
        ];

        return (
            <div>
                <div>
                    <RaisedButton label="전체선택" backgroundColor={this.state.allLevelButton} style={{width:'25%'}} onClick={()=>this.schoolLevelArr('all')}/>
                    <RaisedButton label="초등학교" backgroundColor={this.state.elementaryLevelButton} style={{width:'25%'}} onClick={()=>this.schoolLevelArr('초등학교')}/>
                    <RaisedButton label="중학교" backgroundColor={this.state.middleLevelButton} style={{width:'25%'}} onClick={()=>this.schoolLevelArr('중학교')} />
                    <RaisedButton label="고등학교" backgroundColor={this.state.highLevelButton} style={{width:'25%'}} onClick={()=>this.schoolLevelArr('고등학교')} />
                </div>
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
                
                {/* 학교목록 테이블 */}
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
                                
                                <FlatButton label="취소" onClick={this.deleteArrCancle} style={{display:this.state.deleteButtonShow}}/>
                                <FlatButton label="확인" onClick={this.deleteArrModalOpen} style={{display:this.state.deleteButtonShow}}/>
                                <IconButton tooltip="추가" onClick={this.addModalOpen}>
                                    <Add />
                                </IconButton>
                                <IconButton tooltip="삭제" onClick={this.deleteArrReady}>
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
                            <TableRow selected={this.isSelected(i)} key={row.idx} onClick={(i) => this.infoModalOpen(row)}>
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

                {/* 학교 상세정보 모달 */}
                <Dialog
                    title="학교상세정보"
                    actions={infoButton}
                    modal={false}
                    open={this.state.infoModal}
                    onRequestClose={this.infoModalClose}
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
                
                {/* 학교 추가 모달 */}
                <Dialog
                    title="학교 추가"
                    actions={addButton}
                    modal={false}
                    open={this.state.addModal}
                    onRequestClose={this.addModalClose}
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
                                    <TextField hintText="학교아이디" value={this.state.addDataObj.schoolId} onChange={this.schoolIdChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    학교이름
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="학교이름" value={this.state.addDataObj.schoolName} onChange={this.schoolNameChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    학교구분
                                </TableRowColumn>
                                <TableRowColumn>
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
                            <TableRow>
                                <TableRowColumn>
                                    운영상태
                                </TableRowColumn>
                                <TableRowColumn>
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
                            <TableRow>
                                <TableRowColumn>
                                    교육지원청명
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="교육지원청명" value={this.state.addDataObj.schoolEduOfficeName} onChange={this.schoolEduOfficeNameChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    교육지원청코드
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField 
                                        hintText="교육지원청코드" 
                                        value={this.state.addDataObj.schoolEduOfficeCode} 
                                        onChange={this.schoolEduOfficeCodeChange}
                                        type="number"
                                    />
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    시도교육청명
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="시도교육청명" value={this.state.addDataObj.schoolSidoOfficeName}  onChange={this.schoolSidoOfficeNameChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    시도교육청코드
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField 
                                        hintText="시도교육청코드" 
                                        value={this.state.addDataObj.schoolSidoOfficeCode} 
                                        onChange={this.schoolSidoOfficeCodeChange}
                                        type="number"
                                    />
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                   소재지지번주소
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="소재지지번주소" value={this.state.addDataObj.schoolAddr} onChange={this.schoolAddrChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                   설립일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="설립일자" value={this.state.addDataObj.schoolBuildDate} onChange={this.schoolBuildDateChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    설립형태
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="설립형태"  value={this.state.addDataObj.schoolEstablishType} onChange={this.schoolEstablishTypeChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    위도
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="위도" value={this.state.addDataObj.schoolLat} onChange={this.schoolLatChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    경도
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="경도" value={this.state.addDataObj.schoolLon} onChange={this.schoolLonChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    본교분교구분
                                </TableRowColumn>
                                <TableRowColumn>
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
                            <TableRow>
                                <TableRowColumn>
                                    소재지도로명주소
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="소재지도로명주소" value={this.state.addDataObj.schoolAddrRoad} onChange={this.schoolAddrRoadChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    데이터기준일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="데이터기준일자" value={this.state.addDataObj.schoolRefDate} onChange={this.schoolRefDateChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    생성일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="생성일자" value={this.state.addDataObj.schoolCreateDate} onChange={this.schoolCreateDateChange}/>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>
                                    변경일자
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField hintText="변경일자" value={this.state.addDataObj.schoolEditDate} onChange={this.schoolEditDateChange}/>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Dialog>

                {/* 학교정보 수정 모달 */}
                <Dialog
                    title="학교정보 수정"
                    actions={editButton}
                    modal={false}
                    open={this.state.editModal}
                    onRequestClose={this.editModalClose}
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

                {/* 데이터 단일 삭제 모달 */}
                <Dialog
                    title="학교정보 삭제"
                    actions={deleteButton}
                    modal={false}
                    open={this.state.deleteModal}
                    onRequestClose={this.deleteModalClose}
                >
                    데이터를 삭제하시겠습니까?
                </Dialog>

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
                
            </div>
        );
    }
}

export default SchoolList;