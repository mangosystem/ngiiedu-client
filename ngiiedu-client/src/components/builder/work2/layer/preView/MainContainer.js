import React from 'react';

import MapsPreviewPanel from './MapsPreviewPanel';
import { withRouter } from "react-router-dom";


import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconNavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


import './Header.css';


class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state={
        selectedLayerId :'',
        raster : null,
        title:'',
        bounds:null,
        extent:null,
        wgs84Bounds:null
        
    }
  }

  

  componentWillMount() {
    let layerId = this.props.match.params.LAYERID;
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

  componentDidMount(){
      // 제목 받아오기 //bounds
      let layerId = this.props.match.params.LAYERID;
      ajaxJson(
        ['GET',apiSvr+'/coursesWork/layers/'+layerId+'.json'],
        null,
        function(res){
          let bounds = res.response.data.data.bounds;
          let extent = res.response.data.data.metadata;
          let wgs84Bounds = JSON.parse(res.response.data.metadata).wgs84Bounds;
          
          this.setState({
            title:res.response.data.data.title,
            bounds:bounds!=null?bounds:null,
            extent:extent!=""&&extent!=null?JSON.parse(extent):null,
            wgs84Bounds: wgs84Bounds
          });
        }.bind(this),
        function(e){
            alert(e);
        }
    );
  }


  render() {
   
    return (
      <div>
        <header id="header">
          <div className="inner wide" style={{display: 'flex', justifyContent: 'space-between', backgroundColor:'#43444c',height:60}}>
            <div style={{display: 'flex', marginLeft: 10, alignItems: 'center'}}>
              {/* 뒤로가기 */}
              <IconMenu
                iconButtonElement={<IconButton><IconNavigationMenu color='white' /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
              >
                <MenuItem primaryText="뒤로 가기" onClick={()=>this.props.history.goBack()}/>
              </IconMenu>
              {/* 활동 제목 */}
              <div style={{fontSize: 20, textAlign:'left',color:'white'}}>
                  {this.state.title}
              </div>
            </div>
            {/* <div style={{flex: 1, paddingTop: 25, paddingBottom: 18}}>
              <div style={{fontSize: 30, textAlign:'center', color:'white'}}>
                {this.state.title}
              </div>
            </div> */}
          </div>
        </header>
        <main>
            <div style={{ position: 'absolute', top: 60, bottom: 0, left: 0,right:0 }}>
                <MapsPreviewPanel 
                    layerName={this.props.match.params.LAYERID}
                    raster={this.state.raster}
                    bounds={this.state.bounds}
                    extent={this.state.extent}
                    wgs84Bounds={this.state.wgs84Bounds}
                />
            </div>
        </main>
      </div>
    );
  }
};

export default withRouter(MainContainer);
