import React from 'react';
import { withRouter } from "react-router-dom";

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/FontIcon';


import IconNotifications from 'material-ui/svg-icons/social/notifications';
import IconChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconHelpOutline from 'material-ui/svg-icons/action/help-outline';
import IconAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import IconCropSquare from 'material-ui/svg-icons/image/crop-square';
import IconPlace from 'material-ui/svg-icons/maps/place';

import Avatar from 'material-ui/Avatar';

import MapsEditorPanel from './MapsEditorPanel';
import PropertiesPanel from './PropertiesPanel';
import NewMap from './NewMap';
import DeleteMap from './DeleteMap';
import EditorPanel from './EditorPanel';
import SelectTemplate from './SelectTemplate';
import SelectMap from './SelectMap';
import PointSymbolizer from './PointSymbolizer';


class MainContainer extends React.Component {

  constructor(props){
    super(props);


    // tabIndex : 설정변경위해 임시로 넣어줌. 서버에서 데이터받으면 수정해야할것 (삭제)
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

      editMode: '',
      mode: '',
      editorMode: false,
      openNewMap: false,
      openTemplate: false,
      openSelectMap: false,
      openDeleteMap: false,
      workSubData: [],
      subjectMap: [],
      template: 'tab',
      isSubjectMode: true,
      isStoryTabMode: false,
      tempTitle: '',
      tempIndex: 0,
      tabIndex: 20,
      tempTabIndex: 0,
      tempIdx: 2,
      tempDescription: '',
      tempMapsId: "",
      tempOutputTypeIdx: 0,
      stylePanel:false,
      stylePanelColumn:[],
      stylePanelOptions:{},
      selectedLayerId:null,
      layers:{
        raster: null,
        vector: null
      },
      interactions:{

      },

      selecteProperites:{},
      rowId:'',
      datasetId:'',
      geometry:null,
      editingFeature:false,
      addButton:false,
      delButton:true,
      layerName:''
    }

    this.onChangeEditMode = this.onChangeEditMode.bind(this);
    this.onChangeEditorMode = this.onChangeEditorMode.bind(this);
    this.handleChangeStylePanel = this.handleChangeStylePanel.bind(this);
    this.openStylePanel = this.openStylePanel.bind(this);
    this.layerLoad = this.layerLoad.bind(this);
    
    this.getFeatureInfo = this.getFeatureInfo.bind(this);
    this.onChangeButton = this.onChangeButton.bind(this);
    this.editCancle = this.editCancle.bind(this);
    
  }

  componentWillMount() {
  }

  componentDidMount() {

    const courseId = this.props.match.params.COURSEID;
    const workId = this.props.match.params.workId;
    const sortingField = "id";

    ajaxJson(
      ['GET', apiSvr + '/courses/' + workId + '/workSubData.json'],
      null,
      function (data) {

        const workSubData = JSON.parse(JSON.stringify(data)).response.data;
        let tempIdx = 0;
      
        //tab : 서버에서 데이터작업 되기전까지 임시데이터
        for (let i in workSubData) {
          
          if (workSubData[i].outputType == "maps") {
            
            for (let j in workSubData[i].courseWorkSubOutputInfoList) {              

              let metadata = JSON.parse(workSubData[i].courseWorkSubOutputInfoList[j].pngoData.metadata);
              workSubData[i].courseWorkSubOutputInfoList[j].pngoData.metadata = metadata;
              workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items.sort((a, b) => {
                return a[sortingField] - b[sortingField];
              });
              
              //탭
              workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items.unshift({ title: "임시데이터" });
                           
            }
          } 
        }
        
        for (let i in workSubData) {
          workSubData[i].courseWorkSubOutputInfoList.unshift({title: "임시데이터"}); 
        }
        
        console.log(workSubData);

        try {
          let subjectMap = workSubData.filter(val => (val.outputType == 'layer'))[0].courseWorkSubOutputInfoList;
          
          this.setState({
            subjectMap: subjectMap
          });
        } catch (error) {
          
        }

        this.setState({
          workSubData: workSubData
        });

      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );

  }

  onChangeEditMode(value, properties) {
    this.setState({
      editMode: value,
      selecteProperites: properties
    });
  }

  onChangeEditorMode() {
    this.setState({
      editorMode: !this.state.editorMode
    });
  }

  addMapTitle(title, template) {


    let { workSubData, tempOutputTypeIdx } = this.state;

    //주제지도 만들기
    if (this.state.isSubjectMode) {

      let idx = 0;
      
      ajaxJson(
        ['POST', apiSvr + '/coursesWork/layers.json'],
        {
          courseWorkSubId : tempOutputTypeIdx,
          title,
          sources: JSON.stringify({"inputDataset":{"filter":[],"datasetId":"d=AnyangDong","type":"dataset"}})
        },
        function (data) {

          console.log(data);

          const result = JSON.parse(JSON.stringify(data)).response.data.data;
          const pinogioOutputId = result.layerId;
          idx = JSON.parse(JSON.stringify(data)).response.data.worksOutputId;

          for (let i in workSubData) {
            if (workSubData[i].outputType == "layer") {
                        
              const newObj = {
                outputName: title,
                idx: idx,
                pngoData: result,
                pinogioOutputId
              };
    
              workSubData[i].courseWorkSubOutputInfoList.push(newObj);
            }
          }

          this.setState({
            workSubData: workSubData
          });

        }.bind(this),
        function (xhr, status, err) {
          alert('Error');
        }.bind(this)
      );
      



    //스토리맵 만들기
    } else {

      let courseWorkSubId = tempOutputTypeIdx;
      let maps_type = "SERIES";
      let privacy = "PUBLIC";
      let metadata = JSON.stringify({ "type": template });
      let idx = 0;

      ajaxJson(
        ['POST', apiSvr + '/coursesWork/maps.json'],
        {
          courseWorkSubId,
          title,
          maps_type,
          privacy,
          metadata
        },
        function (data) {

          const result = JSON.parse(JSON.stringify(data)).response.data.data;
          result.metadata = { type : template };
          const pinogioOutputId = result.mapsId;
          result.items = [{title: "임시데이터"}];

          idx = JSON.parse(JSON.stringify(data)).response.data.worksOutputId;

          for (let i in workSubData) {
            if (workSubData[i].outputType == "maps") {          
              
              const newObj = {
                outputName: title,
                idx: idx,
                pngoData: result,
                pinogioOutputId
              };
    
              workSubData[i].courseWorkSubOutputInfoList.push(newObj);
            }
          }

          console.log(workSubData);

          this.setState({
            workSubData: workSubData
          });

        }.bind(this),
        function (xhr, status, err) {
          alert('Error');
        }.bind(this)
      );




    }
  }

  //주제지도
  editMapTitle(title) {

    let { workSubData, tempIndex } = this.state;
    let layersId = "";

    for (let i in workSubData) {
      if (workSubData[i].outputType == "layer" ) {          
        for (let j in workSubData[i].courseWorkSubOutputInfoList) {
          if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {
            let temp = workSubData;
            layersId = temp[i].courseWorkSubOutputInfoList[j].pinogioOutputId;
            temp[i].courseWorkSubOutputInfoList[j].outputName = title;
            this.setState({
              workSubData: temp, 
              tempIdx: 1
            });
          }
        }
      }
    }

    ajaxJson(
      ['PUT', apiSvr + '/coursesWork/layers/' + layersId + '/metadata.json'],
      {
        title
      },
      function (data) {
        console.log(data);
      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );
    
  }

  editMapSetting(title, template) {

    let { workSubData, tempIndex, tempTabIndex } = this.state;
    let layersId = "";
    
    for (let i in workSubData) {
      if (workSubData[i].outputType == "maps" ) {          
        for (let j in workSubData[i].courseWorkSubOutputInfoList) {
          if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {
            let temp = workSubData;
            layersId = temp[i].courseWorkSubOutputInfoList[j].pinogioOutputId;
            temp[i].courseWorkSubOutputInfoList[j].outputName = title;
            temp[i].courseWorkSubOutputInfoList[j].pngoData.metadata.type = template ;
            this.setState({
              workSubData: temp
            });
          }
        }
      }
    }

    let maps_type = "SERIES";
    let privacy = "PUBLIC";
    let metadata = JSON.stringify({ "type": template });

    ajaxJson(
      ['PUT', apiSvr + '/coursesWork/maps/' + layersId + '.json'],
      {
        title,
        maps_type,
        privacy,
        metadata
      },
      function (data) {
        console.log(data);
      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );



  }

  deleteMap() {

    let { workSubData, tempIndex, tempTabIndex } = this.state;

    //스토리맵의 탭 삭제
    if (this.state.isStoryTabMode) {

      let mapsId = "";

      for (let i in workSubData) {
        if (workSubData[i].outputType == "maps") {
          for (let j in workSubData[i].courseWorkSubOutputInfoList) {
            if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {

              mapsId = workSubData[i].courseWorkSubOutputInfoList[j].pinogioOutputId;

              for (let k in workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items) {
                if (workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items[k].id == tempTabIndex) {
  
                  let temp = workSubData;
                  temp[i].courseWorkSubOutputInfoList[j].pngoData.items.splice(k, 1);
  
                  this.setState({
                    workSubData: temp
                  });
  
                }
              }
            }
          }
        }
      }


      ajaxJson(
        ['DELETE', apiSvr + '/coursesWork/maps/' + mapsId + "/item/" + tempTabIndex + '.json'],
        null,
        function (data) {

        }.bind(this),
        function (xhr, status, err) {
          alert('Error');
        }.bind(this)
      );




      this.setState({
        isStoryTabMode: false
      });

      return;
    }

    //주제지도
    if (this.state.isSubjectMode) {

      let mapsId = "";

      for (let i in workSubData) {
        if (workSubData[i].outputType == "layer" ) {          
          for (let j in workSubData[i].courseWorkSubOutputInfoList) {
            if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {
              let temp = workSubData;
              mapsId = temp[i].courseWorkSubOutputInfoList[j].pinogioOutputId;
              temp[i].courseWorkSubOutputInfoList.splice(j,1);
              this.setState({
                workSubData: temp
              });
            }
          }
        }
      }


      // DB 데이터에서 삭제
      ajaxJson(
        ['DELETE', apiSvr + '/coursesWork/layers/' + mapsId + '.json'],
        { works_output_id: tempIndex },
        function (data) {
        }.bind(this),
        function (xhr, status, err) {
          alert('Error');
        }.bind(this)
      );
      

    // 스토리지도
    } else {

      let mapsId = "";

      // state에서 삭제
      for (let i in workSubData) {
        if (workSubData[i].outputType == "maps" ) {          
          for (let j in workSubData[i].courseWorkSubOutputInfoList) {
            if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {
              let temp = workSubData;
              mapsId = temp[i].courseWorkSubOutputInfoList[j].pinogioOutputId;
              temp[i].courseWorkSubOutputInfoList.splice(j,1);
              this.setState({
                workSubData: temp
              });
            }
          }
        }
      }

      //console.log(mapsId);

      // DB 데이터에서 삭제
      ajaxJson(
        ['DELETE', apiSvr + '/coursesWork/maps/' + mapsId + '.json'],
        { works_output_id: tempIndex },
        function (data) {
        }.bind(this),
        function (xhr, status, err) {
          alert('Error');
        }.bind(this)
      );


    }
  }

  newMap(outputType, idx) {

    if (outputType == "layer") 
      this.setState({ 
        isSubjectMode: true,
        openNewMap: true,
        tempTitle: '',
        tempOutputTypeIdx: idx,
        mode: 'add'
      });
    
    else if (outputType == "maps")
      this.setState({ 
        isSubjectMode: false,
        openTemplate: true,
        tempTitle: '',
        tempOutputTypeIdx: idx,
        mode: 'add'
      });    

  }

  addStoryTab(title, type) {

    let { workSubData, tempIndex, tempMapsId } = this.state;

    let id = 0;

    // DB 데이터에 추가
    ajaxJson(
      ['POST', apiSvr + '/coursesWork/maps/' + tempMapsId + "/item" + '.json'],
      { title: title },
      function (data) {
        const result = JSON.parse(JSON.stringify(data)).response.data.data;
        
        id = result.id;

      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );

    for (let i in workSubData) {
      if (workSubData[i].outputType == "maps") {
        for (let j in workSubData[i].courseWorkSubOutputInfoList) {
          if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {

            let temp = { title: title, id: id, type: type, description: "" };
            let newData = workSubData;
            newData[i].courseWorkSubOutputInfoList[j].pngoData.items.push(temp);
            this.setState({
              workSubData: newData,
              tempTabIndex: temp.id
            });
          }
        }
      }
    }

    this.setState({
      editorMode: true,
      tempDescription: ""
    });

      
  }

  editStoryTab(title, type) {

    let { workSubData, tempIndex, tempTabIndex } = this.state;
    let mapsId = "";
    let description = "";

    for (let i in workSubData) {
      if (workSubData[i].outputType == "maps") {
        for (let j in workSubData[i].courseWorkSubOutputInfoList) {
          if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {

            mapsId = workSubData[i].courseWorkSubOutputInfoList[j].pinogioOutputId;

            for (let k in workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items) {
              if (workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items[k].id == tempTabIndex) {

                let temp = workSubData;
                description = temp[i].courseWorkSubOutputInfoList[j].pngoData.items[k].description;
                temp[i].courseWorkSubOutputInfoList[j].pngoData.items[k].title = title;
                temp[i].courseWorkSubOutputInfoList[j].pngoData.items[k].type = type;

                this.setState({
                  workSubData: temp
                });

              }
            }
          }
        }
      }
    }


    // DB 데이터 수정
    ajaxJson(
      ['PUT', apiSvr + '/coursesWork/maps/' + mapsId + "/item/" + tempTabIndex + '.json'],
      { title: title, description: description },
      function (data) {
        const result = JSON.parse(JSON.stringify(data)).response.data;
        console.log(result);
      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );

    

  }

  modifyDescription(contents) {

    let { workSubData, tempIndex, tempTabIndex } = this.state;
    let mapsId = "";
    let title = "";

    this.setState({ tempDescription: contents });
    
    for (let i in workSubData) {
      if (workSubData[i].outputType == "maps") {
        for (let j in workSubData[i].courseWorkSubOutputInfoList) {
          if (workSubData[i].courseWorkSubOutputInfoList[j].idx == tempIndex) {

            mapsId = workSubData[i].courseWorkSubOutputInfoList[j].pinogioOutputId;

            for (let k in workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items) {
              if (workSubData[i].courseWorkSubOutputInfoList[j].pngoData.items[k].id == tempTabIndex) {

                let temp = workSubData;
                title = temp[i].courseWorkSubOutputInfoList[j].pngoData.items[k].title;
                temp[i].courseWorkSubOutputInfoList[j].pngoData.items[k].description = contents;

                this.setState({
                  workSubData: temp
                });

              }
            }
          }
        }
      }
    }

    // DB 데이터 수정
    ajaxJson(
      ['PUT', apiSvr + '/coursesWork/maps/' + mapsId + "/item/" + tempTabIndex + '.json'],
      { title: title, description: contents },
      function (data) {

      }.bind(this),
      function (xhr, status, err) {
        alert('Error');
      }.bind(this)
    );

  }

  newMapHandle() {

    if (!this.state.openNewMap) {
      this.setState({
        openNewMap: !this.state.openNewMap
      });

    } else {
      this.setState({
        openNewMap: !this.state.openNewMap
      });
    }

  }

  deleteHandle() {
    this.setState({
      openDeleteMap: !this.state.openDeleteMap
    });
  }

  templateHandle() {
    if (this.state.template != 'tab') {
      this.setState({ template: 'tab' });
    }

    this.setState({
      openTemplate: !this.state.openTemplate
    });
  }

  selectMapHandle(index, mapsId) {

    
    if (!this.state.openSelectMap) {

      let subjectMap = this.state.subjectMap;

      this.setState({
        openSelectMap: !this.state.openSelectMap,
        tempIndex: index,
        tempTitle: '',
        tempIdx: subjectMap[1].idx,
        mode: 'add',
        tempMapsId: mapsId
      });


    } else {
      this.setState({
        openSelectMap: !this.state.openSelectMap,
      });
    }
  }

  //템플릿 설정 변경
  changeTemplate(template) {
    this.setState({ 
      template: template
    });
  }

  //스토리맵 탭 지도선택
  changeTempIdx(idx) {
    this.setState({
      tempIdx: idx
    });
  }

  //style창 열기
  openStylePanel(layerId, styling){
    console.log('layerId'+layerId)
    //임시
    // layerId='d=KjCXc4dmy9'
    // layerId='l=AnyangDong'

    ajaxJson(
      // ['GET', apiSvr + '/pngo/dataset/column/list.json?pinogioOutputId='+layerId],
      ['GET', apiSvr + '/coursesWork/layers/'+layerId+'/column.json'],
      null,
      function (data) {
        let column =data.response.data.data
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

    // var styling ={
      // "styleType":"GRADUATED",
      // "options":{
      //     "columnName":"noise_value",
      //     "classification":"EQ",
      //     "classesNumber":3,
      //     "fillPalette":"Blues",
      //     "fillOpacity":0.5,
      //     "strokeWidth":2,
      //     "strokeColor":"#CB178C",
      //     "strokeOpacity":0.5,
      //     "reverse":false
      // },
      // "isClassified":false,
      // "geometryType":"MULTIPOLYGON"
  // }


    this.setState({
      stylePanel:true,
      stylePanelOptions:JSON.parse(styling),
      selectedLayerId : layerId
    })  

    this.layerLoad(layerId);
  }

  //style창 닫기
  handleChangeStylePanel(){
    this.setState({
      stylePanel:false
    })
  }

  //레이어 불러오기 
  layerLoad(layerName){
    
    ajaxJson(
      ['GET', apiSvr + '/coursesWork/layers/' + layerName + '.json'],
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



    this.setState({
      layerName:layerName
    })
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
    });



    
  }

  getFeatureInfo(rowId, datasetId, geometry){
    this.setState({
      rowId:rowId,
      datasetId:datasetId,
      geometry:geometry
    });
  }

  editCancle(value){
    this.setState({
      editingFeature:value
    });
  }

  onChangeButton(add, del){
    this.setState({
      addButton:add,
      delButton:del
    });
  }

  render() {

    return (
      <div>
        <header id="header">
          <div className="inner wide" style={{display: 'flex'}}>

            <div style={{flex: 1, marginLeft: 10}}>
              <IconButton style={{width: 50, height: 50, marginTop: 5, marginBottom: 5}}>
                <IconArrowBack />
              </IconButton>
            </div>

            <div style={{flex: 1, paddingTop: 18, paddingBottom: 18}}>
              <div style={{fontSize: 20, textAlign:'center'}}>
                모바일 기기를 활용한 우리 지역 소음원 현장 조사
              </div>
            </div>

            <div style={{flex: 1, marginRight: 10}}>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Badge
                  badgeContent={10}
                  secondary={true}
                  badgeStyle={{top: 15, right: 12}}
                  style={{padding: '12px 12px 0 0', margin: 'auto 10px'}}
                >
                  <IconButton style={{paddingTop: '10px'}}>
                    <IconNotifications  />
                  </IconButton>
                </Badge>

                {/* stevie, veronika, jenny */}
                <Avatar
                  src="https://semantic-ui.com/images/avatar/large/stevie.jpg"
                  size={30}
                  style={{margin: '15px 10px', cursor: 'pointer'}}
                />
                <IconMenu
                    iconButtonElement={
                        <IconButton style={{width: 50, height: 50, marginTop: 5, marginBottom: 5}}>
                          <IconMoreVert />
                        </IconButton>
                    }
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText="회원정보" />
                    <MenuItem primaryText="수업목록" href={contextPath + "/course"}/>
                </IconMenu>
                <IconButton style={{width: 50, height: 50, marginTop: 5, marginBottom: 5}}>
                  <IconHelpOutline />
                </IconButton>

              </div>
            </div>

          </div>
        </header>
        <main id="main">
          <div style={{ position: 'absolute', top: 60, bottom: 0, left: 0, right: 0 }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 300 }}>
              <List>
                { this.state.workSubData.map((row, i) => (
                  <ListItem
                    key={row.idx}
                    primaryText={row.moduleWorkSubName}
                    initiallyOpen={true}
                    primaryTogglesNestedList={true}
                    nestedItems={
                      row.courseWorkSubOutputInfoList.map((data, index) => {

                        if (index == 0) {
                          return (
                              <ListItem
                                key={0}
                                primaryText="새로 만들기"
                                leftIcon={<IconAddCircleOutline />}
                                onClick={(i) => this.newMap(row.outputType, row.idx)}
                              />
                          );
                        }

                        if (row.outputType == "layer") {
                          return (
                            <ListItem
                              key={data.idx}
                              primaryText={data.outputName}
                              initiallyOpen={true}
                              primaryTogglesNestedList={true}
                              onClick={(value)=>this.openStylePanel(data.pinogioOutputId,data.pngoData.styling)}
                              rightIcon={
                                <IconMenu
                                  iconButtonElement={<IconButton><IconMoreVert /></IconButton>}
                                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                  style={{display: 'flex', alignItems: 'center'}}
                                >
                                  <MenuItem primaryText="이름변경" onClick={(index) => this.setState({openNewMap: true, tempTitle: data.outputName, tempIndex: data.idx, mode: 'edit' })}/>
                                  <MenuItem primaryText="삭제하기" onClick={() => this.setState({openDeleteMap: true, tempTitle: data.outputName, tempIndex: data.idx, isSubjectMode: true})}/>
                                  <MenuItem primaryText="미리보기" onClick={() => this.props.history.push('/ngiiedu/map/preview/'+data.pngoData.layerId)}/>
                                  
                                </IconMenu>
                              }
                            />
                          );
                        }



                        return (
                          <ListItem
                            key={data.idx}
                            primaryText={data.outputName}
                            open={true}
                            primaryTogglesNestedList={true}
                            rightIcon={
                              <IconMenu
                                iconButtonElement={<IconButton><IconMoreVert /></IconButton>}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                style={{display: 'flex', alignItems: 'center'}}
                              >
                                <MenuItem primaryText="설정변경" onClick={(i) => this.setState({openTemplate: true, tempTitle: data.outputName, tempIndex: data.idx, template: data.pngoData.metadata.type, mode: 'edit' })}/>
                                <MenuItem primaryText="삭제하기" onClick={(i) => this.setState({openDeleteMap: true, tempTitle: data.outputName, tempIndex: data.idx, isSubjectMode: false})}/>
                                <MenuItem primaryText="미리보기" onClick={() => this.props.history.push('/ngiiedu/storymap/preview/'+data.idx)}/>
                                </IconMenu>
                            }
                            nestedItems={
                              data.pngoData.items.map((r, j) => {

                                if (j == 0) {
                                  return (
                                    <ListItem
                                      key={1000-i}
                                      primaryText="탭 추가하기"
                                      leftIcon={<IconAddCircleOutline />}
                                      onClick={(index) => this.selectMapHandle(data.idx, data.pinogioOutputId)}
                                    />
                                  );
                                }

                                return (
                                  <ListItem
                                    key={j}
                                    primaryText={r.title}
                                    initiallyOpen={true}
                                    primaryTogglesNestedList={true}
                                    rightIcon={
                                      <IconMenu
                                        iconButtonElement={<IconButton><IconMoreVert /></IconButton>}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        style={{display: 'flex', alignItems: 'center'}}
                                      >
                                        <MenuItem primaryText="설정변경" onClick={(index, j) => this.setState({openSelectMap: true, tempTitle: r.title, tempIndex: data.idx, tempTabIndex: r.id, tempIdx: r.type, mode: 'edit' })}/>
                                        <MenuItem primaryText="컨텐츠 입력" onClick={(index, j) => this.setState({editorMode: true, tempDescription: r.description, tempIndex: data.idx, tempTabIndex: r.id })}/>
                                        <MenuItem primaryText="삭제하기" onClick={(index, j) => this.setState({openDeleteMap: true, tempTitle: r.title, tempIndex: data.idx, tempTabIndex: r.id, isStoryTabMode: true})}/>
                                      </IconMenu>
                                    }
                                  />
                                );
                              })
                            }
                          />
                        );
                    })
                    }
                  />
                ))}
              </List>
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 300, right: 300 }}>
              <MapsEditorPanel
                layerId={this.state.selectedLayerId}
                layers={this.state.layers}
                interactions={this.state.interactions}
                map={this.state.map}
                onChangeEditMode={this.onChangeEditMode}
                getFeatureInfo = {this.getFeatureInfo}
                onChangeButton = {this.onChangeButton}
                addButton = {this.state.addButton}
                delButton = {this.state.delButton}
                editingFeature = {this.state.editingFeature}
                editCancle = {this.editCancle}
              />
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 300, backgroundColor: '#fff', display:this.state.editorMode ? 'none' :'block' }}>
              {this.state.stylePanel == false ?
                <PropertiesPanel
                  map={this.state.map}
                  onChangeEditMode={this.onChangeEditMode}
                  propertiesMode={this.state.editMode}
                  properties={this.state.selecteProperites}
                  rowId = {this.state.rowId}
                  datasetId = {this.state.datasetId}
                  geometry= {this.state.geometry}
                  onChangeButton = {this.onChangeButton}
                  addButton = {this.state.addButton}
                  delButton = {this.state.delButton}
                  editCancle = {this.editCancle}
                  layerName = {this.state.layerName}
                />
                :
                <PointSymbolizer 
                  closePanel={this.handleChangeStylePanel}
                  column={this.state.stylePanelColumn}
                  styles={this.state.stylePanelOptions}
                  layerId={this.state.selectedLayerId}
                  raster={this.state.layers.raster}
                />
              }
            
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 300, backgroundColor: '#fff', overflow: 'auto', display:this.state.editorMode ? 'block' :'none' }}>
              <EditorPanel
                editorMode={this.state.editorMode}
                onChangeEditorMode={this.onChangeEditorMode}
                description={this.state.tempDescription}
                modifyDescription={this.modifyDescription.bind(this)}
              />
            </div>
            <NewMap
              open={this.state.openNewMap}
              title={this.state.tempTitle}
              newMapHandle={this.newMapHandle.bind(this)}
              addMap={this.addMapTitle.bind(this)}
              editTitle={this.editMapTitle.bind(this)}
              mode={this.state.mode}
            />
            <SelectTemplate
              open={this.state.openTemplate}
              templateHandle={this.templateHandle.bind(this)}
              addMap={this.addMapTitle.bind(this)}
              title={this.state.tempTitle}
              editMapSetting={this.editMapSetting.bind(this)}
              template={this.state.template}
              changeTemplate={this.changeTemplate.bind(this)}
              mode={this.state.mode}
            />
            <SelectMap
              open={this.state.openSelectMap}
              title={this.state.tempTitle}
              selectMapHandle={this.selectMapHandle.bind(this)}
              addStoryTab={this.addStoryTab.bind(this)}
              editStoryTab={this.editStoryTab.bind(this)}
              subjectMap={this.state.subjectMap}
              value={this.state.tempIdx}
              changeTempIdx={this.changeTempIdx.bind(this)}
              mode={this.state.mode}
            />
            <DeleteMap
              open={this.state.openDeleteMap}
              title={this.state.tempTitle}
              deleteMapHandle={this.deleteHandle.bind(this)}
              deleteMap={this.deleteMap.bind(this)}
            />
          </div>
        </main>
      </div>
    );
  }
};

export default withRouter(MainContainer);
