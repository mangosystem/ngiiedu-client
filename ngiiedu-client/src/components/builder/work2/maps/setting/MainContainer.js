import React from 'react';

import { withRouter } from "react-router-dom";

import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconNavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconSwapVert from 'material-ui/svg-icons/action/swap-vert';
import IconPageView from 'material-ui/svg-icons/action/pageview';

import Avatar from 'material-ui/Avatar';

import BasicLeft from './BasicLeft';
import BasicRight from './BasicRight';
import BasicTop from './BasicTop';
import StoryTab from './StoryTab';
import Swipe from './Swipe';
import SeriesSlide from './SeriesSlide';

import BasicSetting from './BasicSetting';
import StorySetting from './StorySetting';
import SwipeSetting from './SwipeSetting';
import SeriesSetting from './SeriesSetting';

class MainContainer extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      maps: {},
      open: false,
      sortingOpen: false,
      mapsTitle: ''
    };
  }


  componentDidMount() {
    
    const mapsId = this.props.match.params.MAPSID;

    ajaxJson(
      ['GET', apiSvr + '/coursesWork/maps/' + mapsId + '.json'],
      null,
      function (data) {      
        let maps = JSON.parse(JSON.stringify(data)).response.data.data;


        this.setState({
          maps: maps.pngoData,
          mapsType: maps.pngoData.mapsType,
          typeKind: maps.pngoData.typeKind,
          layerId: maps.pngoData.items[0].pinoLayer,
          mapsTitle: maps.outputName
        });

        if (maps.pngoData.mapsType == "SWIPE") {
          this.setState({
            layerId2: maps.pngoData.items[1].pinoLayer
          });
        }

      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );

  }

  changeLayerId(layerId) {
    this.setState({
        layerId
    });
  }

  changeLayerId2(layerId2) {
    this.setState({
      layerId2
    });
  }

  settingHandle() {
    this.setState({
      open: !this.state.open
    });
  }

  sortingHandle() {
    this.setState({
      sortingOpen: !this.state.sortingOpen
    });
  }

  updateMapsSetting(maps) {
    this.setState({
      maps: maps.pngoData,
      typeKind: maps.pngoData.typeKind,
      mapsTitle: maps.outputName
    });
  }

  updateItemSetting(items) {
    this.setState({
      layerId: items.pinoLayer
    });
  }

  updateItemSetting2(items) {
    this.setState({
      layerId2: items.pinoLayer
    });
  }

  previewMaps() {
    const mapsId = this.props.match.params.MAPSID;
    
    this.props.history.push(contextPath+"/maps/preview/" + mapsId);
  }

  goCourseHome() {
    const courseId = this.props.match.params.COURSEID;
    this.props.history.push(contextPath+"/course/" + courseId);
  }

  goBack() {
    const mapsId = this.props.match.params.MAPSID;
    let backUrl = this.props.history.location.pathname.split("/" + mapsId)[0];
    this.props.history.push(backUrl, "maps");
  }


  render() {
    return (
      <div>
        <header id="header">
          <div className="inner wide" style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#43444c', color: 'white', height: 60}}>

            <div style={{display: 'flex', marginLeft: 10, alignItems: 'center'}}>
              <IconMenu
                iconButtonElement={<IconButton><IconNavigationMenu color='white'/></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
              >
                <MenuItem primaryText="수업 홈" onClick={this.goCourseHome.bind(this)}/>
                <MenuItem primaryText="이전 목록" onClick={this.goBack.bind(this)}/>
              </IconMenu>
              <div 
                style={{fontSize: 20, textAlign:'left'}}>
                {this.state.mapsTitle}
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end',  alignItems: 'center', marginRight: 10}}>
                {this.state.mapsType == 'STORY' || this.state.mapsType == 'SERIES' ?
                <IconButton 
                  style={{width: 50, height: 50}}
                  onClick={this.sortingHandle.bind(this)}
                  tooltip="순서변경"
                >
                  <IconSwapVert
                    color='white'                    
                  />
                </IconButton>
                :
                null
                }
                <IconButton 
                  style={{width: 50, height: 50}}
                  onClick={this.settingHandle.bind(this)}
                  tooltip="설정"
                >
                  <IconSettings 
                    color='white'                    
                  />
                </IconButton>
                <IconButton 
                  style={{width: 50, height: 50}}
                  tooltip="미리보기"
                  onClick={this.previewMaps.bind(this)}
                >
                  <IconPageView
                    color='white'                    
                  />
                </IconButton>
            </div>
          </div>
        </header>
        <main>
          {(() => {
            if (this.state.mapsType == 'BASIC') {
              if (this.state.typeKind == 'LEFT') {
                return (
                  <BasicLeft 
                    maps={this.state.maps}
                  />
                );
              } else if (this.state.typeKind == 'RIGHT') {
                return (
                  <BasicRight
                    maps={this.state.maps}
                  />
                );
              } else if (this.state.typeKind == 'TOP') {
                return (
                  <BasicTop
                    maps={this.state.maps}
                  />
                );
              }
            } else if (this.state.mapsType == 'STORY') {
              if (this.state.typeKind == 'TAB') {
                return (
                  <StoryTab 
                    maps={this.state.maps}
                    open={this.state.sortingOpen}
                    sortingHandle={this.sortingHandle.bind(this)}
                  />
                );
              }
            } else if (this.state.mapsType == 'SWIPE') {
              return (
                <Swipe
                  maps={this.state.maps}
                />
              );
            } else if (this.state.mapsType == 'SERIES') {
              if (this.state.typeKind == 'SLIDE') {
                return (
                  <SeriesSlide
                    maps={this.state.maps}
                    open={this.state.sortingOpen}
                    sortingHandle={this.sortingHandle.bind(this)}
                  />
                );
              }
            }
          })()}
          {(() => {
            if (this.state.mapsType == 'BASIC') {
              return (
                <BasicSetting
                  open={this.state.open}
                  settingHandle={this.settingHandle.bind(this)}
                  maps={this.state.maps}
                  updateMapsSetting={this.updateMapsSetting.bind(this)}
                  updateItemSetting={this.updateItemSetting.bind(this)}
                  layerId={this.state.layerId}
                  changeLayerId={this.changeLayerId.bind(this)}
                  mapsTitle={this.state.mapsTitle}
                />
              );
            } else if (this.state.mapsType == 'STORY') {
              return (
                <StorySetting
                  open={this.state.open}
                  settingHandle={this.settingHandle.bind(this)}
                  maps={this.state.maps}
                  updateMapsSetting={this.updateMapsSetting.bind(this)}
                  updateItemSetting={this.updateItemSetting.bind(this)}
                  mapsTitle={this.state.mapsTitle}
                />
              );
            } else if (this.state.mapsType == 'SERIES') {
              return (
                <SeriesSetting
                  open={this.state.open}
                  settingHandle={this.settingHandle.bind(this)}
                  maps={this.state.maps}
                  updateMapsSetting={this.updateMapsSetting.bind(this)}
                  updateItemSetting={this.updateItemSetting.bind(this)}
                  mapsTitle={this.state.mapsTitle}
                />
              );
            } else if (this.state.mapsType == 'SWIPE') {
              return (
                <SwipeSetting
                  open={this.state.open}
                  settingHandle={this.settingHandle.bind(this)}
                  maps={this.state.maps}
                  updateMapsSetting={this.updateMapsSetting.bind(this)}
                  updateItemSetting={this.updateItemSetting.bind(this)}
                  updateItemSetting2={this.updateItemSetting2.bind(this)}
                  layerId={this.state.layerId}
                  layerId2={this.state.layerId2}
                  changeLayerId={this.changeLayerId.bind(this)}
                  changeLayerId2={this.changeLayerId2.bind(this)}
                  mapsTitle={this.state.mapsTitle}
                />
              );
            } else if (this.state.mapsType == 'SPLIT') {
              return null;
            }
          })()}
        </main>
      </div>
    );
  }
};

export default withRouter(MainContainer);
