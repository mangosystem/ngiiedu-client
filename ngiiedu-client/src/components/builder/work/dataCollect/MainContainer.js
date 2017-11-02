import React from 'react';

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
import NewMapAlert from './NewMapAlert';
import EditMapTitle from './EditMapTitle';
import DeleteMap from './DeleteMap';
import EditorPanel from './EditorPanel';
import SelectTemplate from './SelectTemplate';
import SelectMap from './SelectMap';
import PointSymbolizer from './PointSymbolizer';

class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      editMode: '',
      editorMode: false,
      openNewMap: false,
      openEditTitle: false,
      openTemplate: false,
      openSelectMap: false,
      subjectMap: [{title: "주제지도1", index: 0}],
      storyMap: [],
      isSubjectMode: true,
      editMapMode: true,
      tempTitle: '',
      tempIndex: 0,
      storyMapIndex: 0,
      storyTabIndex: 0,
      subjectCount: 1,
      storyCount: 4,
      openDeleteMap: false,
      stylePanel: false
    }
    this.onChangeEditMode = this.onChangeEditMode.bind(this);
    this.onChangeEditorMode = this.onChangeEditorMode.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {

    ajaxJson(
      ['GET', apiSvr + '/modules/' + 20 + '/moduleWork/3/subWork.json'],
      null,
      function (data) {

        const storyMap = JSON.parse(JSON.stringify(data)).response.data;
        console.log(storyMap);


        this.setState({
          storyMap: storyMap
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

  addMapTitle(title) {

    if (this.state.isSubjectMode) {
      const newObj = {
        title: title,
        index: this.state.subjectCount++
      };

      this.setState({
        subjectMap: this.state.subjectMap.concat(newObj)
      });

    } else {
      const newObj = {
        moduleWorkSubName: title,
        moduleWorkSubSeq: this.state.storyCount++
      };
      this.setState({
        storyMap: this.state.storyMap.concat(newObj)
      });
    }
  }

  editMapTitle(title) {

    //주제지도
    if (this.state.editMapMode) {

      for (let i in this.state.subjectMap) {
        if (i == this.state.tempIndex) {
          let newMap = this.state.subjectMap;
          newMap[i].title = title;
          this.setState({
            subjectMap: newMap
          });
        }
      }

    // 스토리지도
    } else {

      for (let i in this.state.storyMap) {
        if (i == this.state.tempIndex) {
          let newMap = this.state.storyMap;
          newMap[i].moduleWorkSubName = title;
          this.setState({
            storyMap: newMap
          });
        }
      }
    }

  }

  deleteMap() {

    //주제지도
    if (this.state.editMapMode) {
      
      for (let i in this.state.subjectMap) {
        if (i == this.state.tempIndex) {
          let newMap = this.state.subjectMap;
          newMap.splice(i, 1);
          this.setState({
            subjectMap: newMap
          });
        }
      }

    // 스토리지도
    } else {

      for (let i in this.state.storyMap) {
        if (i == this.state.tempIndex) {
          let newMap = this.state.storyMap;
          newMap.splice(i, 1);
          this.setState({
            storyMap: newMap
          });
        }
      }
    }
  }

  newMap(title) {
    if (title == "주제지도") 
      this.setState({ 
        isSubjectMode: true,
        openNewMap: true
      });
    
    else 
      this.setState({ 
        isSubjectMode: false,
        openTemplate: true
      });
    

  }

  addStoryTab(title) {


      
  }  

  newMapHandle() {
    this.setState({
      openNewMap: !this.state.openNewMap
    });
  }

  editTitleHandle() {
    this.setState({
      openEditTitle: !this.state.openEditTitle
    });
  }

  deleteHandle() {
    this.setState({
      openDeleteMap: !this.state.openDeleteMap
    });
  }

  templateHandle() {
    this.setState({
      openTemplate: !this.state.openTemplate
    });
  }

  selectMapHandle() {

    console.log(this);

    this.setState({
      openSelectMap: !this.state.openSelectMap
    });
  }

  render() {

    let subject = () => {
      let array = [];

      let newItem = <ListItem
                      key={0}
                      primaryText="새로 만들기"
                      leftIcon={<IconAddCircleOutline />}
                      onClick={() => this.newMap("주제지도")}
                    />;

      array.push(newItem);

      if (this.state.subjectMap.length != 0) {
        this.state.subjectMap.map((row, index) => (
          array.push(
            <ListItem
              key={index+1}
              primaryText={row.title}
              leftIcon={<IconPlace />}
              onClick={()=>this.setState({stylePanel:!this.state.stylePanel})}//임시용
              rightIcon={
                <IconMenu
                  iconButtonElement={<IconButton><IconMoreVert /></IconButton>}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                  style={{display: 'flex', alignItems: 'center'}}
                >
                  <MenuItem primaryText="이름변경" onClick={(index) => this.setState({openEditTitle: true, tempTitle: row.title, editMapMode: true, tempIndex: row.index})}/>
                  <MenuItem primaryText="삭제" onClick={() => this.setState({openDeleteMap: true, tempTitle: row.title, editMapMode: true, tempIndex: row.index})}/>
                </IconMenu>
              }
            />
          )
        ));
      }

      return array;
    }

    let story = () => {
      let array = [];

      let newItem = <ListItem
                      key={0}
                      primaryText="새로 만들기"
                      leftIcon={<IconAddCircleOutline />}
                      onClick={() => this.newMap("스토리지도")}
                    />;

      array.push(newItem);

      if (this.state.storyMap.length != 0) {
        this.state.storyMap.map((row, index) => (
          array.push(
            <ListItem
              key={row.moduleWorkSubSeq}
              primaryText={row.moduleWorkSubName}
              rightIcon={
                <IconMenu
                  iconButtonElement={<IconButton><IconMoreVert /></IconButton>}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                  style={{display: 'flex', alignItems: 'center'}}
                >
                  <MenuItem primaryText="컨텐츠 입력" onClick={() => this.setState({editorMode: true})}/>
                  <MenuItem primaryText="이름변경" onClick={(index) => this.setState({openEditTitle: true, tempTitle: row.moduleWorkSubName, editMapMode: false, tempIndex: row.moduleWorkSubSeq-1})}/>
                  <MenuItem primaryText="삭제" onClick={(index) => this.setState({openDeleteMap: true, tempTitle: row.moduleWorkSubName, editMapMode: false, tempIndex: row.moduleWorkSubSeq-1})}/>
                </IconMenu>
              }
            />
          )
        ));
      }

      return array;
    }


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
                    <MenuItem primaryText="수업목록" />
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
                <ListItem
                  primaryText="주제지도 만들기"
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  nestedItems={subject()}
                />
                <ListItem
                  primaryText="스토리맵 만들기"
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  nestedItems={story()}
                />
              </List>
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 300, right: 300 }}>
              <MapsEditorPanel
                onChangeEditMode={this.onChangeEditMode}
              />
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 300, backgroundColor: '#fff' ,zIndex:1 }}>
              {this.state.stylePanel==false?
                <PropertiesPanel
                  propertiesMode={this.state.editMode}
                />
                :
                <PointSymbolizer styles={null} />
              }
        
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 300 }}>
              <EditorPanel
                editorMode={this.state.editorMode}
                onChangeEditorMode={this.onChangeEditorMode}
              />
            </div>
            <NewMapAlert 
              open={this.state.openNewMap}
              newMapHandle={this.newMapHandle.bind(this)}
              addMap={this.addMapTitle.bind(this)}
            />
            <SelectTemplate
              open={this.state.openTemplate}
              templateHandle={this.templateHandle.bind(this)}
              addMap={this.addMapTitle.bind(this)}
            />
            <SelectMap
              open={this.state.openSelectMap}
              selectMapHandle={this.selectMapHandle.bind(this)}
              subjectMap={this.state.subjectMap}
              addStoryTab={this.addStoryTab.bind(this)}
            />
            <EditMapTitle
              open={this.state.openEditTitle}
              editMapHandle={this.editTitleHandle.bind(this)}
              editTitle={this.editMapTitle.bind(this)}
              title={this.state.tempTitle}
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

export default MainContainer;
