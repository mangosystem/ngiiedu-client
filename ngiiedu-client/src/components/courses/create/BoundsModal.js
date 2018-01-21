import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class BoundsModal extends React.Component {

  constructor(){
    super();

    this.state={
      open:true,
      map: new ol.Map({
        view: new ol.View({
          center: [14240524.117641, 4329393.282072],
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
        })
      }),
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount(){
    let { map } = this.state;
    map.setTarget('mapView');

    var w = this.props.wgs84Bounds;
    var extent = [w.minX,w.minY,w.maxX,w.maxY];
    var extent3857 = ol.proj.getTransform( 'EPSG:4326','EPSG:3857')(extent);
    
    map.getView().fit(
      extent3857,
      map.getSize()
    );

  }

  handleOpen(){
    this.setState({open:true})
  }
  
  handleClose(){
    this.setState({open:false})
  }
  
  save(){
    let { map } = this.state;
    var extent = map.getView().calculateExtent(map.getSize());
    var extent4326 = ol.proj.getTransform('EPSG:3857', 'EPSG:4326')(extent);
    this.props.saveWGS(extent4326);
    
    
  }


  render() {
    const actions = [
      <FlatButton
        label="취소"
        primary={true}
        onClick={this.props.handleModal}
      />,
      <FlatButton
        label="확인"
        primary={true}
        onClick={this.save}
      />
    ];


    return (
      <Dialog
          title="데이터를 수집할 위치로 이동하세요"
          actions={actions}
          modal={true}
          contentStyle={{width:700,height:500}}
          open={this.props.open}
        >
        <div id="mapView" style={{height:400}}></div>
      </Dialog>
    );
  }
}

export default BoundsModal;