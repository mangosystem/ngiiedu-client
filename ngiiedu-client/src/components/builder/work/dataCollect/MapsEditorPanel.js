import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

class MapsEditorPanel extends React.Component {

  constructor(props){
    super(props);

    this.state = {

      isEditMode: false,

      map: new ol.Map({
        view: new ol.View({
          center: [14143701.095047, 4477593.930960],
          zoom: 15,
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

      layers: {
        raster: null, vector: null
      }
    };

    this.onToggleEdit = this.onToggleEdit.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
  }
  
  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps: ");
    console.dir(this.props.raster)

    //새로받은 레이어를 비교
    if(this.props.raster != null){
      let { map } = this.state;
      //기존 레이어를 삭제
      map.removeLayer(this.props.raster);
      //새로운 레이어를 추가
      map.addLayer(nextProps.raster);
    }
}

  componentWillMount() {

    // let raster = new ol.layer.Image({
    //   source: new ol.source.ImageWMS({
    //     ratio: 1,
    //     url: 'http://1.234.82.19:8083/geoserver/ngiiedu/wms',
    //     params: {
    //       'FORMAT': 'image/png',
    //       'VERSION': '1.3.0',
    //       'STYLES': '',
    //       'LAYERS': 'ngiiedu:dataset_test1',
    //     }
    //   })
    // });

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

					let url = 'http://1.234.82.19:8083/geoserver/ngiiedu/wfs?request=GetFeature' +
						'&version=1.0.0' +
						'&typeName=ngiiedu:dataset_test1' +
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

              console.log(feature);

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
    });

  }

  componentDidMount() {
    let { map } = this.state;
    let { layers } = this.state;
    let { interactions } = this.state;

    map.setTarget('mapView');

    map.addLayer(layers.raster);
    map.addLayer(layers.vector);

    map.addInteraction(interactions.snap);
    interactions.snap.setActive(true);

    map.addInteraction(interactions.select);
    interactions.select.setActive(true);
    interactions.select.getFeatures().on('add', (e) => {
      console.log('add');
      let properties = e.element.getProperties();

      if(!interactions.draw.getActive()) {
        this.props.onChangeEditMode('edit');
      }
    });
    interactions.select.getFeatures().on('remove', (e) => {
      console.log('remove');
    });

    map.addInteraction(interactions.modify);
    interactions.modify.setActive(false);
    interactions.modify.on('modifystart', (e) => {
      console.log('modifystart');
    });
    interactions.modify.on('modifyend', (e) => {
      console.log('modifyend');
    });

    map.addInteraction(interactions.draw);
    interactions.draw.setActive(false);
    interactions.draw.on('drawstart', (e) => {
      console.log('modifystart');
    });
    interactions.draw.on('drawend', (e) => {
      console.log('modifyend');
      interactions.draw.setActive(false);
      interactions.select.setActive(true);

      this.props.onChangeEditMode('new');
    });
  }

  onToggleEdit(e, checked) {

    if (checked) {
      this.state.layers.raster.setVisible(false);
      this.state.layers.vector.setVisible(true);
      this.state.interactions.modify.setActive(true);
      this.state.interactions.draw.setActive(false);
    } else {
      this.state.layers.raster.setVisible(true);
      this.state.layers.vector.setVisible(false);
      this.state.interactions.modify.setActive(false);
      this.state.interactions.draw.setActive(false);

      this.state.interactions.select.getFeatures().clear();
      this.state.layers.vector.getSource().clear();
      this.state.layers.raster.getSource().updateParams({_: Date.now()});
    }

    this.setState({
      isEditMode: checked
    });
  }

  onClickAdd(e) {
    this.state.interactions.draw.setActive(true);
    this.state.interactions.modify.setActive(false);
  }

  onClickReset(e) {
    this.state.interactions.draw.setActive(false);
    this.state.interactions.modify.setActive(false);
  }

  render() {
    return (
      <div id="mapView" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        <div style={{ position: 'absolute', top: 10, right: 10, padding: 10, backgroundColor: '#eee', textAlign: 'right', zIndex:9, borderRadius: 10 }}>
          <div style={{padding: '5px 10px 0px', textAlign:'right'}}>
            <Toggle
              label="편집모드 전환"
              toggled={this.state.isEditMode}
              onToggle={this.onToggleEdit}
            />
          </div>
        {(() => {
          if (this.state.isEditMode) {
            return(
              <div style={{paddingTop: 10}}>
                <RaisedButton
                  secondary={true}
                  label="객체 추가"
                  style={{marginRight: 10}}
                  onClick={this.onClickAdd}
                />
                <RaisedButton
                  secondary={true}
                  label="작업 초기화"
                  style={{marginRight: 10}}
                  onClick={this.onClickReset}
                />
              </div>
            );
          }
        })()}
        </div>
      </div>
    );
  }
};

export default MapsEditorPanel;
