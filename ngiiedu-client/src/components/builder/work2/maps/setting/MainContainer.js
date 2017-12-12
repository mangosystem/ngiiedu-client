import React from 'react';

import { withRouter } from "react-router-dom";

import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

import IconNotifications from 'material-ui/svg-icons/social/notifications';
import IconChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconHelpOutline from 'material-ui/svg-icons/action/help-outline';

import Avatar from 'material-ui/Avatar';

import BasicLeft from './BasicLeft';
import BasicRight from './BasicRight';
import BasicTop from './BasicTop';

import StoryTab from './StoryTab';

import BasicSetting from './BasicSetting';
import StorySetting from './StorySetting';

class MainContainer extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      maps: {},
      open: false,
      mapsTitleEdit: false
    };
  }


  componentWillMount() {
    
    const mapsId = this.props.match.params.MAPSID;

    ajaxJson(
      ['GET', apiSvr + '/coursesWork/maps/' + mapsId + '.json'],
      null,
      function (data) {      
        let maps = JSON.parse(JSON.stringify(data)).response.data.data;

        console.log(maps);

        this.setState({
          maps: maps.pngoData,
          mapsType: maps.pngoData.mapsType,
          typeKind: maps.pngoData.typeKind,
          layerId: maps.pngoData.items[0].pinoLayer,
          mapsTitle: maps.outputName
        });

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

  settingHandle() {
    this.setState({
      open: !this.state.open
    });
  }

  updateMapsSetting(maps) {
    this.setState({
      maps: maps.pngoData,
      typeKind: maps.pngoData.typeKind,
    });
  }

  updateItemSetting(items) {
    this.setState({
      layerId: items.pinoLayer
    });
  }

  submit() {

    const { maps, mapsTitle } = this.state;
    const mapsId = maps.mapsId;

    //maps수정
    ajaxJson(
      ['PUT', apiSvr + '/coursesWork/maps/' + mapsId + '.json'],
      {
        title: mapsTitle,
      },
      function (data) {
        
      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <header id="header">
          <div className="inner wide" style={{display: 'flex', justifyContent: 'space-between'}}>

            <div style={{display: 'flex', marginLeft: 10, alignItems: 'center'}}>
              <IconButton style={{width: 50, height: 50}}>
                <IconArrowBack />
              </IconButton>
              {!this.state.mapsTitleEdit ? 
              <div 
                style={{fontSize: 20, textAlign:'left'}}
                onDoubleClick={() => this.setState({ mapsTitleEdit: true })}>
                {this.state.mapsTitle}
              </div>
              :
              <TextField
                fullWidth={true}
                hintText="*스토리맵 제목"
                onChange={(e, value) => this.setState({ mapsTitle: value })}
                onBlur={() => this.setState({ mapsTitleEdit: false })}
                value={this.state.mapsTitle}
              />
              }
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end',  alignItems: 'center', marginRight: 10}}>
                <FlatButton
                  label="설정"
                  onClick={this.settingHandle.bind(this)}
                />
                <FlatButton
                  label="미리보기"
                />
                <FlatButton
                  label="저장"
                  onClick={this.submit.bind(this)}
                />
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
                />
              );
            } else if (this.state.mapsType == 'SERIES') {
              return null;
            } else if (this.state.mapsType == 'SWIPE') {
              return null;
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
