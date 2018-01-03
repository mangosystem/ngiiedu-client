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
        map: new ol.Map({
            view: new ol.View({
              center: [14143701.095047, 4477593.930960],
              zoom: 7,
              minZoom: 1,	maxZoom: 18
            }),
            layers: [
              new ol.layer.Tile({
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
                mouseWheelZoom: true, shiftDragZoom: true
            })
        }),
        selectedLayerId :'',
        layers:{
            vector:null,raster:null
        },
        title:'',
        bounds:'',
        data:'',
        toggleVisible:false, // 토글 온오프 pino_photo에 따라...
        toggleValue:false
    }

    this.setTitle = this.setTitle.bind(this);
    this.toggleHandler = this.toggleHandler.bind(this); // 토글 핸들러
  }

  

  componentWillMount() {
      console.log('componentWillMount')
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



    // function getMeta(url){   
    //     var img = new Image();
    //     img.onload = function(){
    //         alert( this.width+' '+ this.height );
    //     };
    //     img.src = url;
    // }



    var cache = {};
    var w ;
    var map = this.state.map;
    let vector = new ol.layer.Vector({
        visible: false,
        style: function(feature,resolution){
            var pino_photo = feature.get('pino_photo');
            var url ="http://1.234.82.19:8083/pinogio-web/data/photo/"+pino_photo;
            if(!cache[url]){
                cache[url] = new ol.style.Style({
                    image:new ol.style.Icon({
                        // scale:0.5,
                        // size:[500,500],
                        // anchor: [0.5, 46],
                        // anchorXUnits: 'fraction',
                        // anchorYUnits: 'pixels',
                        src:url
                    })
                });
                if(pino_photo!=null){
                    var img = new Image();
                    // img.src = url;
                    img.onload = function(){
                        w= this.width;
                        console.log( this.width+' '+ this.height );
                        cache[url].getImage().setScale(128/w);
                    };
                    img.src = url;
                }
            }
            return[cache[url]];
        },
        // function (feature, resolution) {
        //     var pino_photo = feature.get('pino_photo');
        //     var originalImageURL =" http://1.234.82.19:8083/pinogio-web/data/photo/"+pino_photo;
        //     var resizedImageURL = '';
        
        //     if (!iconCache[originalImageURL]) {
        //         var sourceImage = new Image();
        //         var width = 48; // these two can be parameterized
        //         var height = 48;
        
        //         sourceImage.onload = function() {
        //             var canvas = document.createElement('canvas');
        //             canvas.width = width;
        //             canvas.height = height;
        //             canvas.getContext('2d').drawImage(sourceImage, 0, 0, width, height);
        
        //             resizedImageURL = canvas.toDataURL(); // this can be changed to a callback to prevent execution blocking
        
        //             iconCache[originalImageURL] = resizedImageURL; // store the resized URL in the cache
        //         }
        
        //     } else { // already resized and cached the image, so used the saved version
        //         resizedImageURL = iconCache[originalImageURL];
        //     }
        
        //     // Now build up your Openlayers style
        //     var currentStyle = new ol.style.Style({
        //         image: new ol.style.Icon({
        //             anchor: [0.5, 0.5],
        //             anchorXUnits: 'fraction',
        //             anchorYUnits: 'fraction',
        //             opacity: 0.75,
        //             scale: 1.0,
        //             src: resizedImageURL // Put the resized image url in here
        //         })
        //     });
        
        //     return currentStyle;
        // },
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            loader: function (extent, resolution, projection) {

                let url = 'http://1.234.82.19:8083/geoserver/pinogio/wfs?request=GetFeature' +
                    '&version=1.0.0' +
                    // '&typeName=pinogio:d=KjCXc4dmy9' +
                    '&typeName=pinogio:' + layerId+
                    '&srsName=EPSG:3857' +
                    '&bbox=' + extent.join(',') + ',' + 'urn:ogc:def:crs:EPSG:3857' +
                    '&outputFormat=text/javascript' +
                    '&format_options=callback:loadFeatures';

                $.ajax({
                    url: url,
                    method: 'GET',
                    jsonpCallback: 'loadFeatures',
                    dataType: 'jsonp',
                    success: function (response) {
                        let feature = new ol.format.GeoJSON().readFeatures(response);
                        vector.getSource().addFeatures(feature);
                    }
                });
            }.bind(this),
            strategy: ol.loadingstrategy.bbox
        })
    });

    this.setState({
        layers: {
            raster:raster,
            vector:vector
        }
    })


  }

  setTitle(value){
    this.setState({title:value})
  }

  componentDidMount(){

    let layerName = this.props.match.params.DATASETID;
    //pino_photo가 있는지 없는지 확인.
    ajaxJson(
        // http://1.234.82.19:8083/pinogio-web/api/v1/datasets/d%3DAnyangDong/column
        // 
        ['GET', apiSvr + '/coursesWork/dataset/column/list.json'],
        {
            datasetId:layerName
        },
        function (data) {
          let columns =data.response.data.data
          let toggleVisible = false;
          for(var i =0; i<columns.length ; i++){
              if(columns[i].name=='pino_photo'){
                toggleVisible=true;
                
              }
          }

          this.setState({
            // layerColumns:columns,
            toggleVisible:toggleVisible
        })
          console.log('toggleVisible : '+toggleVisible);

        }.bind(this),
        function (xhr, status, err) {
          alert('Error');
        }.bind(this)
      );
  }

  toggleHandler(v){
    if(v==true){
        let layer = this.state.layer;
        this.state.layers.raster.setVisible(false);
        this.state.layers.vector.setVisible(true)

    }else{
        this.state.layers.raster.setVisible(true);
        this.state.layers.vector.setVisible(false);
    }  
    
    this.setState({
        toggleValue:v
    })
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
        <header id="header" >
          <div className="inner wide" style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#43444c', color: 'white',height:60}}>
              <div style={{display: 'flex', marginLeft: 10, alignItems: 'center'}}>
              <IconMenu
                  iconButtonElement={<IconButton><IconNavigationMenu color='white'/></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
              >
                  <MenuItem primaryText="수업 홈" onClick={()=>this.props.history.push("/ngiiedu/course")}/>
                  <MenuItem primaryText="이전 목록" onClick={()=>this.props.history.goBack()}/>
              </IconMenu>
              <div 
                  style={{fontSize: 20, textAlign:'left'}}>
                  {this.state.title}
              </div>
              </div>

              <div style={{display: 'flex', justifyContent: 'flex-end',  alignItems: 'center', marginRight: 10}}>
                {this.state.toggleVisible ?
                    <Toggle
                        label="이미지 지도"
                        labelStyle={{ color: 'white' }}
                        defaultToggled={false}
                        thumbStyle={styles.thumbOff}
                        trackStyle={styles.trackOff}
                        thumbSwitchedStyle={styles.thumbSwitched}
                        trackSwitchedStyle={styles.trackSwitched}
                        onToggle={(e, v) => this.toggleHandler(v)}
                    />
                :
                    null
                }
              </div>
          </div>
        </header>
        <main>
            <div style={{ position: 'absolute', top: 60, bottom: 0, left: 0,right:0 }}>
                <MapPreviewPanel 
                    layerName={this.props.match.params.DATASETID}
                    // raster={this.state.raster}
                    // vector={this.state.vector}
                    map={this.state.map}
                    layers={this.state.layers}
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
