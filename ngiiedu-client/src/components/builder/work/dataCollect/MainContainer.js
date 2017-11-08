import React from 'react';

import { withRouter } from "react-router-dom";
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/FontIcon';


import IconNotifications from 'material-ui/svg-icons/social/notifications';
import IconChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconHelpOutline from 'material-ui/svg-icons/action/help-outline';
import IconAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import IconCropSquare from 'material-ui/svg-icons/image/crop-square';
import IconPlace from 'material-ui/svg-icons/maps/place';

import Avatar from 'material-ui/Avatar';

import MapsEditorPanel from './MapsEditorPanel';
import PropertiesPanel from './PropertiesPanel';
import NewMap from './NewMap';
import DeleteMap from './DeleteMap';
import EditorPanel from './EditorPanel';
import SelectTemplate from './SelectTemplate';
import SelectMap from './SelectMap';
import PointSymbolizer from './PointSymbolizer';


class MainContainer extends React.Component {

  constructor(props){
    super(props);


    // tabIndex : 설정변경위해 임시로 넣어줌. 서버에서 데이터받으면 수정해야할것 (삭제)
    this.state = {
      editMode: '',
      mode: '',
      editorMode: false,
      openNewMap: false,
      openTemplate: false,
      openSelectMap: false,
      openDeleteMap: false,
      workSubData: [],
      subjectMap: [],
      template: 'tab',
      isSubjectMode: true,
      isStoryTabMode: false,
      tempTitle: '',
      tempIndex: 0,
      tabIndex: 20,
      tempTabIndex: 0,
      tempIdx: 1,
      tempDescription: '',
      stylePanel:false,
      stylePanelColumn:[],
      stylePanelOptions:{},
      selectedLayerId:null
    }

    this.onChangeEditMode = this.onChangeEditMode.bind(this);
    this.onChangeEditorMode = this.onChangeEditorMode.bind(this);
    this.handleChangeStylePanel = this.handleChangeStylePanel.bind(this);
    this.openStylePanel = this.openStylePanel.bind(this);
    
  }

  componentWillMount() {
    console.log(this.props)
  }

  componentDidMount() {

    ajaxJson(
      ['GET', apiSvr + '/courses/' + 12 + '/workSubData.json'],
      null,
      function (data) {

        const workSubData = JSON.parse(JSON.stringify(data)).response.data;
      
        //tab : 서버에서 데이터작업 되기전까지 임시데이터
        for (let i in workSubData) {
          
          if (workSubData[i].moduleWorkSubName == "스토리맵 만들기") {
            
            for (let j in workSubData[i].courseWorkSubOutputInfoList) {              
              
              // 템플릿 종류
              workSubData[i].courseWorkSubOutputInfoList[j].template = "tab"
              
              //탭              
              workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items.unshift({ title: "임시데이터" });
                           
              //workSubData[i].courseWorkSubOutputInfoList[j].tab = [];
              //workSubData[i].courseWorkSubOutputInfoList[j].tab.push({title: "임시데이터", index: this.state.tabIndex++});
            }
          } 
        }

        for (let i in workSubData) {
          workSubData[i].courseWorkSubOutputInfoList.unshift({title: "임시데이터"}); 
        }
        
        console.log(workSubData);

        let subjectMap = workSubData.filter(val => (val.moduleWorkSubName == '주제지도 만들기'))[0].courseWorkSubOutputInfoList;
        
        this.setState({
          workSubData: workSubData,
          subjectMap: subjectMap
        });      

      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );

  }

  onChangeEditMode(value) {
    this.setState({
      editMode: value
    });
  }

  onChangeEditorMode() {
    this.setState({
      editorMode: !this.state.editorMode
    });
  }

  addMapTitle(title, template) {


    let { workSubData } = this.state;

    if (this.state.isSubjectMode) {      
      
      for (let i in workSubData) {
        if (workSubData[i].moduleWorkSubName == "주제지도 만들기") {          
          
          const newObj = {
            outputName: title,
            idx: workSubData[i].courseWorkSubOutputInfoList.length
          };

          workSubData[i].courseWorkSubOutputInfoList.push(newObj);
        }
      }

      this.setState({
        workSubData: workSubData
      });

    } else {

      for (let i in workSubData) {
        if (workSubData[i].moduleWorkSubName == "스토리맵 만들기") {          
          
          const newObj = {
            outputName: title,
            idx: workSubData[i].courseWorkSubOutputInfoList.length,
            tab: [{title: "임시데이터"}], 
            template: template
          };

          workSubData[i].courseWorkSubOutputInfoList.push(newObj);
        }
      }

      this.setState({
        workSubData: workSubData
      });

    }
  }

  //주제지도
  editMapTitle(title) {

    let { workSubData } = this.state;

    for (let i in workSubData) {
      if (workSubData[i].moduleWorkSubName == "주제지도 만들기" ) {          
        for (let j in workSubData[i].courseWorkSubOutputInfoList) {
          if (workSubData[i].courseWorkSubOutputInfoList[j].idx == this.state.tempIndex) {
            let temp = workSubData;
            temp[i].courseWorkSubOutputInfoList[j].outputName = title;
            this.setState({
              workSubData: temp, 
              tempIdx: 1
            });
          }
        }
      }
    }      
    
  }

  editMapSetting(title, template) {

    let { workSubData, tempIndex, tempTabIndex } = this.state;
    
    for (let i in workSubData) {
      if (workSubData[i].moduleWorkSubName == "스토리맵 만들기" ) {          
        for (let j in workSubData[i].courseWorkSubOutputInfoList) {
          if (workSubData[i].courseWorkSubOutputInfoList[j].idx == this.state.tempIndex) {
            let temp = workSubData;
            temp[i].courseWorkSubOutputInfoList[j].outputName = title;
            temp[i].courseWorkSubOutputInfoList[j].template = template;
            this.setState({
              workSubData: temp
            });
          }
        }
      }
    }

  }

  deleteMap() {

    let { workSubData, tempIndex, tempTabIndex } = this.state;

    //스토리맵의 탭 삭제
    if (this.state.isStoryTabMode) {

      for (let i in workSubData) {
        if (workSubData[i].moduleWorkSubName == "스토리맵 만들기") {
          for (let j in workSubData[i].courseWorkSubOutputInfoList) {
            if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {
              for (let k in workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items) {
                if (workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items[k].id == tempTabIndex) {
  
                  let temp = workSubData;
                  temp[i].courseWorkSubOutputInfoList[j].pngoData.items.splice(k, 1);
  
                  this.setState({
                    workSubData: temp
                  });
  
                }
              }
            }
          }
        }
      }

      this.setState({
        isStoryTabMode: false
      });

      return;
    }

    //주제지도
    if (this.state.isSubjectMode) {

      for (let i in workSubData) {
        if (workSubData[i].moduleWorkSubName == "주제지도 만들기" ) {          
          for (let j in workSubData[i].courseWorkSubOutputInfoList) {
            if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {
              let temp = workSubData;
              temp[i].courseWorkSubOutputInfoList.splice(j,1);
              this.setState({
                workSubData: temp
              });
            }
          }
        }
      }
      

    // 스토리지도
    } else {

      for (let i in workSubData) {
        if (workSubData[i].moduleWorkSubName == "스토리맵 만들기" ) {          
          for (let j in workSubData[i].courseWorkSubOutputInfoList) {
            if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {
              let temp = workSubData;
              temp[i].courseWorkSubOutputInfoList.splice(j,1);
              this.setState({
                workSubData: temp
              });
            }
          }
        }
      }

    }
  }

  newMap(title) {

    if (title == "주제지도 만들기") 
      this.setState({ 
        isSubjectMode: true,
        openNewMap: true,
        tempTitle: '',
        mode: 'add'
      });
    
    else 
      this.setState({ 
        isSubjectMode: false,
        openTemplate: true,
        tempTitle: '',
        mode: 'add'
      });    

  }

  addStoryTab(title, type) {

    let { workSubData, tempIndex } = this.state;

    for (let i in workSubData) {
      if (workSubData[i].moduleWorkSubName == "스토리맵 만들기") {
        for (let j in workSubData[i].courseWorkSubOutputInfoList) {
          if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {

            let temp = { title: title, id: this.state.tabIndex++, type: type, description: "" };
            let newData = workSubData;
            newData[i].courseWorkSubOutputInfoList[j].pngoData.items.push(temp);
            this.setState({
              workSubData: newData,
              tempTabIndex: temp.id
            });
          }
        }
      }
    }

    this.setState({
      editorMode: true,
      tempDescription: ""
    });

      
  }

  editStoryTab(title, type) {

    let { workSubData, tempIndex, tempTabIndex } = this.state;

    for (let i in workSubData) {
      if (workSubData[i].moduleWorkSubName == "스토리맵 만들기") {
        for (let j in workSubData[i].courseWorkSubOutputInfoList) {
          if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {
            for (let k in workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items) {
              if (workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items[k].id == tempTabIndex) {

                let temp = workSubData;
                temp[i].courseWorkSubOutputInfoList[j].pngoData.items[k].title = title;
                temp[i].courseWorkSubOutputInfoList[j].pngoData.items[k].type = type;

                this.setState({
                  workSubData: temp
                });

              }
            }
          }
        }
      }
    }
    

  }

  modifyDescription(contents) {

    let { workSubData, tempIndex, tempTabIndex } = this.state;

    this.setState({ tempDescription: contents });
    
    for (let i in workSubData) {
      if (workSubData[i].moduleWorkSubName == "스토리맵 만들기") {
        for (let j in workSubData[i].courseWorkSubOutputInfoList) {
          if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {
            for (let k in workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items) {
              if (workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items[k].id == tempTabIndex) {

                let temp = workSubData;
                temp[i].courseWorkSubOutputInfoList[j].pngoData.items[k].description = contents;

                this.setState({
                  workSubData: temp
                });

              }
            }
          }
        }
      }
    }

  }

  newMapHandle() {

    if (!this.state.openNewMap) {
      this.setState({
        openNewMap: !this.state.openNewMap
      });

    } else {
      this.setState({
        openNewMap: !this.state.openNewMap
      });
    }

  }

  deleteHandle() {
    this.setState({
      openDeleteMap: !this.state.openDeleteMap
    });
  }

  templateHandle() {
    if (this.state.template != 'tab') {
      this.setState({ template: 'tab' });
    }

    this.setState({
      openTemplate: !this.state.openTemplate
    });
  }

  selectMapHandle(index) {

    
    if (!this.state.openSelectMap) {

      this.setState({
        openSelectMap: !this.state.openSelectMap,
        tempIndex: index,
        tempTitle: '',
        tempIdx: 1,
        mode: 'add'
      });


    } else {
      this.setState({
        openSelectMap: !this.state.openSelectMap,
      });
    }
  }

  //템플릿 설정 변경
  changeTemplate(template) {
    this.setState({ 
      template: template
    });
  }

  //스토리맵 탭 지도선택
  changeTempIdx(idx) {
    this.setState({
      tempIdx: idx
    });
  }

  //style창 열기
  openStylePanel(layerId){
    console.log('layerId'+layerId)
    //임시
    layerId='d=r7oFXBrCYl'
    ajaxJson(
      ['GET', apiSvr + '/pngo/dataset/column/list.json?pinogioOutputId='+layerId],
      null,
      function (data) {
        console.dir(data)
        let column =data.response.data.data
      
        this.setState({
          stylePanelColumn:column
        })

        console.dir(data.response.data.data);
      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );

    var styleData ={
      "styleType":"GRADUATED",
      "options":{
          "columnName":"pino_id",
          "classification":"EQ",
          "classesNumber":3,
          "fillPalette":"Blues",
          "fillOpacity":0.5,
          "strokeWidth":2,
          "strokeColor":"#CB178C",
          "strokeOpacity":0.5,
          "reverse":false
      },
      "isClassified":false,
      "geometryType":"MULTIPOLYGON"
  }

    

    this.setState({
      stylePanel:true,
      stylePanelOptions:styleData,
      selectedLayerId : layerId
    })  
  }

  //style창 닫기
  handleChangeStylePanel(){
    this.setState({
      stylePanel:false
    })
  }

  render() {

    return (
      <div>
        <header id="header">
          <div className="inner wide" style={{display: 'flex'}}>

            <div style={{flex: 1, marginLeft: 10}}>
              <IconButton style={{width: 50, height: 50, marginTop: 5, marginBottom: 5}}>
                <IconArrowBack />
              </IconButton>
            </div>

            <div style={{flex: 1, paddingTop: 18, paddingBottom: 18}}>
              <div style={{fontSize: 20, textAlign:'center'}}>
                모바일 기기를 활용한 우리 지역 소음원 현장 조사
              </div>
            </div>

            <div style={{flex: 1, marginRight: 10}}>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Badge
                  badgeContent={10}
                  secondary={true}
                  badgeStyle={{top: 15, right: 12}}
                  style={{padding: '12px 12px 0 0', margin: 'auto 10px'}}
                >
                  <IconButton style={{paddingTop: '10px'}}>
                    <IconNotifications  />
                  </IconButton>
                </Badge>

                {/* stevie, veronika, jenny */}
                <Avatar
                  src="https://semantic-ui.com/images/avatar/large/stevie.jpg"
                  size={30}
                  style={{margin: '15px 10px', cursor: 'pointer'}}
                />
                <IconMenu
                    iconButtonElement={
                        <IconButton style={{width: 50, height: 50, marginTop: 5, marginBottom: 5}}>
                          <IconMoreVert />
                        </IconButton>
                    }
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText="회원정보" />
                    <MenuItem primaryText="수업목록" href={contextPath + "/course"}/>
                </IconMenu>
                <IconButton style={{width: 50, height: 50, marginTop: 5, marginBottom: 5}}>
                  <IconHelpOutline />
                </IconButton>

              </div>
            </div>

          </div>
        </header>
        <main id="main">
          <div style={{ position: 'absolute', top: 60, bottom: 0, left: 0, right: 0 }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 300 }}>
              <List>
                { this.state.workSubData.map((row, i) => (
                  <ListItem
                    key={row.idx}
                    primaryText={row.moduleWorkSubName}
                    initiallyOpen={true}
                    primaryTogglesNestedList={true}
                    nestedItems={
                      row.courseWorkSubOutputInfoList.map((data, index) => {

                        if (index == 0) {
                          return (
                              <ListItem
                                key={0}
                                primaryText="새로 만들기"
                                leftIcon={<IconAddCircleOutline />}
                                onClick={(i) => this.newMap(row.moduleWorkSubName)}
                              />
                          );
                        }

                        if (row.moduleWorkSubName == "주제지도 만들기") {
                          return (
                            <ListItem
                              key={data.idx}
                              primaryText={data.outputName}
                              initiallyOpen={true}
                              primaryTogglesNestedList={true}
                              onClick={(value)=>this.openStylePanel(data.pinogioOutputId)}
                              rightIcon={
                                <IconMenu
                                  iconButtonElement={<IconButton><IconMoreVert /></IconButton>}
                                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                  style={{display: 'flex', alignItems: 'center'}}
                                >
                                  <MenuItem primaryText="이름변경" onClick={(index) => this.setState({openNewMap: true, tempTitle: data.outputName, tempIndex: data.idx, mode: 'edit' })}/>
                                  <MenuItem primaryText="삭제하기" onClick={() => this.setState({openDeleteMap: true, tempTitle: data.outputName, tempIndex: data.idx, isSubjectMode: true})}/>
                                  <MenuItem primaryText="미리보기" onClick={() => (window.location.href='/ngiiedu/map/preview/'+data.idx)}/>

                                </IconMenu>
                              }
                            />
                          );
                        }



                        return (
                          <ListItem
                            key={data.idx}
                            primaryText={data.outputName}
                            open={true}
                            primaryTogglesNestedList={true}
                            rightIcon={
                              <IconMenu
                                iconButtonElement={<IconButton><IconMoreVert /></IconButton>}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                style={{display: 'flex', alignItems: 'center'}}
                              >
                                <MenuItem primaryText="설정변경" onClick={(i) => this.setState({openTemplate: true, tempTitle: data.outputName, tempIndex: data.idx, template: data.template, mode: 'edit' })}/>
                                <MenuItem primaryText="삭제하기" onClick={(i) => this.setState({openDeleteMap: true, tempTitle: data.outputName, tempIndex: data.idx, isSubjectMode: false})}/>
                                <MenuItem primaryText="미리보기" onClick={() => (window.location.href='/ngiiedu/storymap/preview/'+data.idx)}/>
                                </IconMenu>
                            }
                            nestedItems={
                              data.pngoData.items.map((r, j) => {

                                if (j == 0) {
                                  return (
                                    <ListItem
                                      key={1000-i}
                                      primaryText="탭 추가하기"
                                      leftIcon={<IconAddCircleOutline />}
                                      onClick={(index) => this.selectMapHandle(data.idx)}
                                    />
                                  );
                                }

                                return (
                                  <ListItem
                                    key={j}
                                    primaryText={r.title}
                                    initiallyOpen={true}
                                    primaryTogglesNestedList={true}
                                    rightIcon={
                                      <IconMenu
                                        iconButtonElement={<IconButton><IconMoreVert /></IconButton>}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        style={{display: 'flex', alignItems: 'center'}}
                                      >
                                        <MenuItem primaryText="설정변경" onClick={(index, j) => this.setState({openSelectMap: true, tempTitle: r.title, tempIndex: data.idx, tempTabIndex: r.id, tempIdx: r.type, mode: 'edit' })}/>
                                        <MenuItem primaryText="컨텐츠 입력" onClick={(index, j) => this.setState({editorMode: true, tempDescription: r.description, tempIndex: data.idx, tempTabIndex: r.id })}/>
                                        <MenuItem primaryText="삭제하기" onClick={(index, j) => this.setState({openDeleteMap: true, tempTitle: r.title, tempIndex: data.idx, tempTabIndex: r.id, isStoryTabMode: true})}/>
                                      </IconMenu>
                                    }
                                  />
                                );
                              })
                            }
                          />
                        );
                    })
                    }
                  />
                ))}
              </List>
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 300, right: 300 }}>
              <MapsEditorPanel
                onChangeEditMode={this.onChangeEditMode}
              />
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 300, backgroundColor: '#fff', display:this.state.editorMode ? 'none' :'block' }}>
              {this.state.stylePanel == false ?
                <PropertiesPanel
                  propertiesMode={this.state.editMode}
                />
                :
                <PointSymbolizer 
                  closePanel={this.handleChangeStylePanel}
                  column={this.state.stylePanelColumn}
                  styles={this.state.stylePanelOptions}
                  layerId={this.state.selectedLayerId}
                />
              }
            
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 300, backgroundColor: '#fff', overflow: 'auto', display:this.state.editorMode ? 'block' :'none' }}>
              <EditorPanel
                editorMode={this.state.editorMode}
                onChangeEditorMode={this.onChangeEditorMode}
                description={this.state.tempDescription}
                modifyDescription={this.modifyDescription.bind(this)}
              />
            </div>
            <NewMap
              open={this.state.openNewMap}
              title={this.state.tempTitle}
              newMapHandle={this.newMapHandle.bind(this)}
              addMap={this.addMapTitle.bind(this)}
              editTitle={this.editMapTitle.bind(this)}
              mode={this.state.mode}
            />
            <SelectTemplate
              open={this.state.openTemplate}
              templateHandle={this.templateHandle.bind(this)}
              addMap={this.addMapTitle.bind(this)}
              title={this.state.tempTitle}
              editMapSetting={this.editMapSetting.bind(this)}
              template={this.state.template}
              changeTemplate={this.changeTemplate.bind(this)}
              mode={this.state.mode}
            />
            <SelectMap
              open={this.state.openSelectMap}
              title={this.state.tempTitle}
              selectMapHandle={this.selectMapHandle.bind(this)}
              addStoryTab={this.addStoryTab.bind(this)}
              editStoryTab={this.editStoryTab.bind(this)}
              subjectMap={this.state.subjectMap}
              value={this.state.tempIdx}
              changeTempIdx={this.changeTempIdx.bind(this)}
              mode={this.state.mode}
            />
            <DeleteMap
              open={this.state.openDeleteMap}
              title={this.state.tempTitle}
              deleteMapHandle={this.deleteHandle.bind(this)}
              deleteMap={this.deleteMap.bind(this)}
            />
          </div>
        </main>
      </div>
    );
  }
};

export default withRouter(MainContainer);
