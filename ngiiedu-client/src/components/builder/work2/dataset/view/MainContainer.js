import React from 'react';

import MapPreviewPanel from './MapPreviewPanel';

import { withRouter } from "react-router-dom";

import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconNavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Toggle from 'material-ui/Toggle';


class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state={
        selectedLayerId :'',
        raster : null,
        title:'',
        bounds:'',
        data:''
        
    }

    this.setTitle = this.setTitle.bind(this);
  }

  

  componentWillMount() {
    let layerId = this.props.match.params.DATASETID;
    let raster = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://1.234.82.19:8083/geoserver/pinogio/wms',
        params: {
          'FORMAT': 'image/png',
          'VERSION': '1.3.0',
          'STYLES': '',
          'LAYERS': 'pinogio:'+layerId,
          // 'LAYERS': 'pinogio:d=KjCXc4dmy9',
        }
      })
    });

    this.setState({
      raster:raster
    })


  }

  setTitle(value){
    this.setState({title:value})
  }

  componentDidMount(){
    // 제목 받아오기 //bounds
 
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
                  <MenuItem primaryText="수업 홈" onClick={()=>this.props.history.push("/ngiiedu/course/" +this.props.match.params.COURSEID)}/>
                  <MenuItem primaryText="이전 목록" onClick={()=>this.props.history.goBack()}/>
              </IconMenu>
              <div 
                  style={{fontSize: 20, textAlign:'left'}}>
                  {this.state.title}
              </div>
              </div>

              <div style={{display: 'flex', justifyContent: 'flex-end',  alignItems: 'center', marginRight: 10}}>
                <Toggle
                      label="이미지 지도"
                      labelStyle={{ color: 'white' }}
                      defaultToggled={true}
                      thumbStyle={styles.thumbOff}
                      trackStyle={styles.trackOff}
                      thumbSwitchedStyle={styles.thumbSwitched}
                      trackSwitchedStyle={styles.trackSwitched}
                      // onToggle={(e, v) => this.setState({ isInputChecked : v })}
                  />
              </div>
          </div>
        </header>
        <main>
            <div style={{ position: 'absolute', top: 60, bottom: 0, left: 0,right:0 }}>
                <MapPreviewPanel 
                    layerName={this.props.match.params.DATASETID}
                    raster={this.state.raster}
                    bounds={this.state.bounds}
                    data={this.state.data}
                    setTitle={this.setTitle}
                />
            </div>
        </main>
      </div>
    );
  }
};

export default withRouter(MainContainer);
