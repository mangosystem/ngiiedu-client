import React from 'react';

import MapsPreviewPanel from './MapsPreviewPanel';
import { withRouter } from "react-router-dom";


import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import './Header.css';


class MainContainer extends React.Component {

  constructor(props){
    super(props);
    this.state={
        selectedLayerId :'',
        raster : null,
        title:'',
        bounds:''
        
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
          console.log('bounds :' +  res.response.data.data.bounds )
            this.setState({
                title:res.response.data.data.title,
                bounds:res.response.data.data.bounds
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
          <header id="prvHeader">
          <div className="inner wide" style={{display: 'flex'}}>
            <div style={{flex: 1, paddingTop: 25, paddingBottom: 18}}>
              <div style={{fontSize: 30, textAlign:'center'}}>
                    {this.state.title}
              </div>
            </div>
          </div>
        </header>
        <main>
            <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0,right:0 }}>
                <MapsPreviewPanel 
                    layerName={this.props.match.params.LAYERID}
                    raster={this.state.raster}
                    bounds={this.state.bounds}
                />
            </div>
        </main>
      </div>
    );
  }
};

export default withRouter(MainContainer);
