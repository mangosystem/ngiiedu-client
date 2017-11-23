import React from 'react';

import { withRouter } from "react-router-dom";

import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';




//component
import MapEditorPanel from './MapEditorPanel.js';

//testdata
//"안양시 동안구 소음지도"
// d=AnyangDong
// "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))"
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
            interactions:{

            },
            layers:{

            },
            valueSingle:1


        }

        this.handleChangeSingle = this.handleChangeSingle.bind(this);
    }

    componentDidMount(){
        //templayerName
        let layerName = 'd=AnyangDong';
        layerName = this.props.match.params.DATASETID;
        // "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))"

        //bounds    
        ajaxJson(
            ['GET', apiSvr + '/coursesWork/dataset/' + layerName + '.json'],
            {},
            function(res){
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
            }.bind(this),
            function(e){
            alert(e);
            }
        );
    
        // this.setState({
        //     layerName:layerName
        // })
        let raster = new ol.layer.Image({
            source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://1.234.82.19:8083/geoserver/pinogio/wms',
            params: {
                'FORMAT': 'image/png',
                'VERSION': '1.3.0',
                'STYLES': '',
                'LAYERS': 'pinogio:'+layerName,
            }
            })
        });
    
        let vector = new ol.layer.Vector({
            visible: false,
            style: new ol.style.Style({
            fill: new ol.style.Fill({ color: '#333' }),
            stroke: new ol.style.Stroke({ color: 'rgba(255, 122, 74, 1)', width: 5 }),
            image: new ol.style.Circle({
                fill: new ol.style.Fill({ color: '#888' }),
                stroke: new ol.style.Stroke({ color: '#555', width: 5 }),
                radius: 10
            })
            }),
            source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            loader: function(extent, resolution, projection) {
    
                let url = 'http://1.234.82.19:8083/geoserver/pinogio/wfs?request=GetFeature' +
                '&version=1.0.0' +
                // '&typeName=pinogio:d=KjCXc4dmy9' +
                '&typeName=pinogio:' +layerName+
                '&srsName=EPSG:3857' +
                '&bbox=' + extent.join(',') + ',' + 'urn:ogc:def:crs:EPSG:3857' +
                '&outputFormat=text/javascript' +
                '&format_options=callback:loadFeatures';
    
                $.ajax({
                url: url,
                method: 'GET',
                jsonpCallback: 'loadFeatures',
                dataType: 'jsonp',
                success: function(response) {
                    let feature = new ol.format.GeoJSON().readFeatures(response);
                    vector.getSource().addFeatures(feature);
                }
                });
            }.bind(this),
            strategy: ol.loadingstrategy.bbox
            })
        });
    
        let select = new ol.interaction.Select({
            layers: [ vector ],
            toggleCondition: ol.events.condition.never
        });
    
        let modify = new ol.interaction.Modify({
            features: select.getFeatures()
        });
    
        let draw = new ol.interaction.Draw({
            source: vector.getSource(),
            // snapTolerance: 20,
            type: 'MultiPoint'
        });
    
        let snap = new ol.interaction.Snap({
            source: vector.getSource(),
            pixelTolerance: 10
        });
    
        this.setState({
            layers: {
                raster: raster,
                vector: vector
            },
            interactions: {
                select: select, draw: draw, modify: modify, snap: snap
            }
        },function(){
            //초기 map 지정 
            let { map } = this.state;
            
            map.setTarget('mapView');
            map.addLayer(this.state.layers.raster);
            map.addLayer(this.state.layers.vector);
        });


    }

    handleChangeSingle (event, value) {
        this.setState({
            valueSingle: value
        })
    };

    render() {
   
        return (
       
            <main>
                <div style={{ position: 'absolute', top: 80, bottom:0, left: 0, right: 0 }}>
                    <div id="mapView" style={{height:'100%'}}>

                        
                    </div>
                       
                </div>
                <div style={{position: 'absolute', top:40, right:0,left:0, height:40 ,zIndex:2,border:'2px solid black', display:'flex'}}                >   
                    <div style={{position: 'absolute',right:20,display:'flex'}}>
                        <h2> 안양시 동안구 소음지도</h2>
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <MenuItem primaryText="Refresh" />
                            <MenuItem primaryText="Send feedback" />
                            <MenuItem primaryText="Settings" />
                            <MenuItem primaryText="Help" />
                            <MenuItem primaryText="Sign out" />
                        </IconMenu>
                    </div>
                </div>
            </main>
        );
    }
};

export default withRouter(MainContainer);
