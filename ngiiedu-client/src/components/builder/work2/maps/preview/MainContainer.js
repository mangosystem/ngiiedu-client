import React from 'react';

import { withRouter } from "react-router-dom";

import { cyan500 } from 'material-ui/styles/colors';
import Toggle from 'material-ui/Toggle';

import IconButton from 'material-ui/IconButton';
import IconNavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import BasicLeft from './BasicLeft';
import BasicRight from './BasicRight';
import StoryTab from './StoryTab';
import Swipe from './Swipe';

class MainContainer extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      maps: {},
      isInputChecked: true
    };
  }


  componentWillMount() {
    
    const mapsId = this.props.match.params.MAPSID;

    ajaxJson(
      ['GET', apiSvr + '/coursesWork/maps/' + mapsId + '.json'],
      null,
      function (data) {      
        let maps = JSON.parse(JSON.stringify(data)).response.data.data;

        for (let i=0; i<maps.pngoData.items.length; i++) {
          let description = maps.pngoData.items[i].description;
          description = decodeURIComponent(description);
          maps.pngoData.items[i].description = description;
        }

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

  goCourseHome() {
    const courseId = this.props.match.params.COURSEID;
    this.props.history.push("/ngiiedu/course/" + courseId);
  }

  render() {

    let styles = {
        thumbOff: {
            backgroundColor: '#EAEAEA'
        },
        trackOff: {
            backgroundColor: '#BDBDBD'
        },
        thumbSwitched: {
            backgroundColor: '#3e81f6'
        },
        trackSwitched: {
            backgroundColor: '#BDBDBD'
        }
    };

    return (
      <div>
        <header id="header">
          <div className="inner wide" style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#43444c', color: 'white'}}>
            <div style={{display: 'flex', marginLeft: 10, alignItems: 'center'}}>
              <IconMenu
                iconButtonElement={<IconButton><IconNavigationMenu color='white'/></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
              >
                <MenuItem primaryText="수업 홈" onClick={this.goCourseHome.bind(this)}/>
                <MenuItem primaryText="뒤로 가기" onClick={()=>this.props.history.goBack()}/>
              </IconMenu>
              <div 
                style={{fontSize: 20, textAlign:'left'}}>
                {this.state.mapsTitle}
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end',  alignItems: 'center', marginRight: 10}}>
                <Toggle
                    label="컨텐츠 보기"
                    labelStyle={{ color: 'white' }}
                    defaultToggled={true}
                    thumbStyle={styles.thumbOff}
                    trackStyle={styles.trackOff}
                    thumbSwitchedStyle={styles.thumbSwitched}
                    trackSwitchedStyle={styles.trackSwitched}
                    onToggle={(e, v) => this.setState({ isInputChecked : v })}
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
                    isInputChecked={this.state.isInputChecked}
                  />
                );
              } else if (this.state.typeKind == 'RIGHT') {
                return (
                  <BasicRight
                    maps={this.state.maps}
                    isInputChecked={this.state.isInputChecked}                    
                  />
                );
              } else if (this.state.typeKind == 'TOP') {

              }
            } else if (this.state.mapsType == 'STORY') {
              if (this.state.typeKind == 'TAB') {
                return (
                  <StoryTab
                    maps={this.state.maps}
                    isInputChecked={this.state.isInputChecked}                    
                  />
                );
              }
            } else if (this.state.mapsType == 'SWIPE') {
              return (
                <Swipe
                  maps={this.state.maps}
                  isInputChecked={this.state.isInputChecked}                    
                />
              );
            }
          })()}
        </main>
      </div>
    );
  }
};

export default withRouter(MainContainer);
