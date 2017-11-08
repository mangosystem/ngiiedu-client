import React from 'react';

import MapsPreviewPanel from './MapsPreviewPanel';

import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import './Header.css';


class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state={
        selectedLayerId :'d=KjCXc4dmy9',
        raster : null,
        mapData:{
            title:'피노지오결과물id'
        },
    }

  }

  

  componentWillMount() {
    let raster = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        ratio: 1,
        url: 'http://1.234.82.19:8083/geoserver/pinogio/wms',
        params: {
          'FORMAT': 'image/png',
          'VERSION': '1.3.0',
          'STYLES': '',
          'LAYERS': 'pinogio:'+this.state.selectedLayerId,
          // 'LAYERS': 'pinogio:d=KjCXc4dmy9',
        }
      })
    });

    this.setState({
      raster:raster
    })

  }


  render() {
   
    return (
      <div>
          <header id="prvHeader">
          <div className="inner wide" style={{display: 'flex'}}>
            <div style={{flex: 1, paddingTop: 25, paddingBottom: 18}}>
              <div style={{fontSize: 30, textAlign:'center'}}>
                    {this.state.mapData.title}
              </div>
            </div>
          </div>
        </header>
        <main>
            <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0,right:0 }}>
                <MapsPreviewPanel 
                    layerName={this.state.selectedLayerId}
                    raster={this.state.raster}
                />
            </div>
        </main>
      </div>
    );
  }
};

export default MainContainer;
