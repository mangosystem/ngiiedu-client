import React from 'react';

import { withRouter } from "react-router-dom";

import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import PointSymbolizer from './PointSymbolizer.js'

class MainContainer extends React.Component {

    constructor(){
        super();

        this.state = {
            map: new ol.Map({
                view: new ol.View({
                  center: [14162252.600956, 4353853.130726],
                  zoom: 7,
                  minZoom: 1,	maxZoom: 18
                }),
                layers: [
                  new ol.layer.Tile({
                    // source: new ol.source.OSM()
                    // source:new ol.source.Stamen({layer:"toner"})
                    // source:new ol.source.Stamen({layer:"watercolor"})
                    source: new ol.source.XYZ({
                      url: 'http://mango.iptime.org:8995/v.1.0.0/{z}/{x}/{y}.png?gray=false'
                    })
                  })
                ],
                controls: ol.control.defaults({
                  zoom: true, rotate: false, attribution: true
                }),
                interactions: ol.interaction.defaults({
                  altShiftDragRotate: false, doubleClickZoom: true,
                  dragPan: true, pinchRotate: false,
                  pinchZoom: false, keyboard: false,
                  mouseWheelZoom: false, shiftDragZoom: true
                })
            }),
            layers:{

            },
            valueSingle:1,
            stylePanelColumn:[],
            stylePanelOptions:{},
            layerId:null,
            title:null,
            type:null

        }

        this.handleChangeSingle = this.handleChangeSingle.bind(this);
    }

    componentDidMount(){
        let layerId=this.props.match.params.LAYERID;
        ajaxJson(
            ['GET', apiSvr + '/coursesWork/layers/' + layerId + '.json'],
            {},
            function(res){
                console.log(res);
            let wkt = res.response.data.data.bounds;
            let format = new ol.format.WKT();
            let feature = format.readFeature(wkt, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });
            this.state.map.getView().fit(
                feature.getGeometry().getExtent(),
                this.state.map.getSize()
            );
            this.setState({
                layerId:this.props.match.params.LAYERID,
                stylePanelOptions:JSON.parse(res.response.data.data.styling),
                title:res.response.data.data.title,
                type:res.response.data.data.geometryType
            },function(){
                console.log(this.state.type)
            });
            }.bind(this),
            function(e){
            alert(e);
            }
        );

        let raster = new ol.layer.Image({
            source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://1.234.82.19:8083/geoserver/pinogio/wms',
            params: {
                'FORMAT': 'image/png',
                'VERSION': '1.3.0',
                'STYLES': '',
                'LAYERS': 'pinogio:'+layerId,
            }
            })
        });

        this.setState({
            layers: {
                raster: raster
            }
        },function(){
            //초기 map 지정 
            let { map } = this.state;
            
            map.setTarget('mapView');
            map.addLayer(this.state.layers.raster);
        });

        ajaxJson(
            // ['GET', apiSvr + '/pngo/dataset/column/list.json?pinogioOutputId='+layerId],
            ['GET', apiSvr + '/coursesWork/layers/'+layerId+'/column.json'],
            null,
            function (data) {
              let column =data.response.data.data
              console.log(column);
              this.setState({
                stylePanelColumn:column
              })
              
              // console.log('ajaxcolumn')
              // console.dir(data.response.data.data);
            }.bind(this),
            function (xhr, status, err) {
              alert('Error');
            }.bind(this)
          );
    }

    handleChangeSingle (event, value) {
        this.setState({
            valueSingle: value
        })
    };

    render() {
   
        return (
            <div>
                <header id="header">
                    <div className="inner wide" style={{display: 'flex', justifyContent: 'space-between', backgroundColor:'#424242'}}>

                        <div style={{display: 'flex', marginLeft: 10, alignItems: 'center'}}>
                            {/* 뒤로가기 */}
                            <IconButton style={{width: 50, height: 50}}>
                                <IconArrowBack 
                                    color='white'
                                    onClick={()=>this.props.history.goBack()}
                                />
                            </IconButton>
                            {/* 활동 제목 */}
                            <div style={{fontSize: 20, textAlign:'left',color:'white'}}>
                                {this.state.title}
                            </div>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'flex-end',  alignItems: 'center', marginRight: 10}}>
                            <FlatButton
                                label="미리보기"
                                style={{color:'white'}}
                                onClick={() => this.props.history.push('/ngiiedu/map/preview/'+this.props.match.params.LAYERID)}
                            />
                        </div>
                    </div>
                </header>
       
            <main>
                <div style={{ position: 'absolute', top: 60, bottom:0, left: 0, right: 0 }}>
                    <div style={{width:'20%', height:'100%', float:'left', backgroundColor:'white'}}>
                   {/* {this.state.type.indexOf('POINT')!=-1? */}
                        <PointSymbolizer 
                            column={this.state.stylePanelColumn}
                            styles={this.state.stylePanelOptions}
                            layerId={this.state.layerId}
                            raster={this.state.layers.raster}
                        />
                    {/* :null} */}
                    </div>
                    <div id="mapView" style={{height:'100%',width:'80%', float:'left'}}>

                        
                    </div>
                       
                </div>
            </main>
            </div>
        );
    }
};

export default withRouter(MainContainer);
