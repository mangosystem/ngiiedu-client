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
        // viewStyle:'ACCORDION', //TAP,ACCORDION 
        // viewStyle:'TAP', //TAP,ACCORDION 
        // viewStyle:null, //TAP,ACCORDION 
        storyMapData:null,
        selectedMenuIndex : 0,
        raster:null,
        data:null,
    }

    this.handleChangeTap = this.handleChangeTap.bind(this);
    this.handleChangeAccordion = this.handleChangeAccordion.bind(this);
    this.layerLoad = this.layerLoad.bind(this);
  }

    handleChangeTap(layerName,index){
        
        if(index==this.state.selectedMenuIndex){
            // index=-1;
        }else{
            this.layerLoad(layerName);
            this.setState({
                selectedLayerName:layerName
            })
        }
        this.setState({
            selectedMenuIndex:index
        })
    }

  handleChangeAccordion(layerName,index){
    if(index==this.state.selectedMenuIndex){
        // index=-1;
    }else{
        this.layerLoad(layerName);
        this.setState({
            selectedLayerName:layerName
        })
    }
    this.setState({
        selectedMenuIndex:index
    })
}

  componentWillMount() {
      if(this.state.storyMapData!=null){
          if(this.state.storyMapData.step.length !=0){
              this.layerLoad(this.state.storyMapData.step[0].layerName);
          }
      }
  }

  componentDidMount() {
    let mapsId = this.props.match.params.LAYERID


    // ajax 처리 및 props 전달 필요
    ajaxJson(
        ['GET',apiSvr+'/coursesWork/maps/'+mapsId+'.json'],
        null,
        function(res){
            let data = res.response.data.data;
            
            this.setState({
                storyMapData : data,
                viewStyle:JSON.parse( data.metadata).type, //accordion , tab
                
            },function(){
                if(this.state.storyMapData!=null){
                    let firstItemLayerName = JSON.parse(this.state.storyMapData.items[0].metadata).type;
                    this.setState({
                        selectedLayerName: firstItemLayerName,
                    })
                    this.layerLoad(firstItemLayerName)
                }
            })
        }.bind(this),
        function(e){
            alert(e);
        }
    );
  }

  layerLoad(layerName){
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

      this.setState({
          raster: raster,
      });
  }

  render() {
   
    return (
      <div>
       
        <main>
            <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0, right: 0 }}>
            {this.state.storyMapData !=null ?
            (this.state.viewStyle=='tab'?
                <Tabs 
                    tabItemContainerStyle={{height:50}}
                    initialSelectedIndex={this.state.selectedMenuIndex}
                >

                {this.state.storyMapData.items.map((row,index) => (
                    <Tab label={row.title}
                        key={index}
                        onActive={()=>this.handleChangeTap(JSON.parse(row.metadata).type,index)}
                    >
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 250 ,padding:10}}>
                        <div
                            style={{wordWrap: 'BREAK-WORD'}}
                            dangerouslySetInnerHTML={ {__html: row.description} }></div>
                    </div>
                    </Tab>
                   
                ))}
                </Tabs> 
                : 
                <div style={{ position: 'absolute', top:0, bottom: 0, left: 0, width: 300 ,overflowY:'auto',overflowX:'hidden'}}>
                {this.state.storyMapData.items.map((row,index) => (
                    <Card 
                    key={index}
                    expanded={this.state.selectedMenuIndex==index}
                    onExpandChange={()=>this.handleChangeAccordion(JSON.parse(row.metadata).type,index)}
                >
                    <CardHeader
                    title={row.title}
                    actAsExpander={true}
                    showExpandableButton={true}
                    textStyle={{fontWeight:'bold'}}
                    />
                    <CardText expandable={true}>
                        <div 
                            style={{wordWrap: 'BREAK-WORD'}}
                            dangerouslySetInnerHTML={ {__html: row.description} }
                        >
                        </div>
                    </CardText>
                </Card>
                ))}
                
                </div>
            )
            :
            null
            }
                <div style={{ position: 'absolute', top:this.state.storyMapData!=null?(this.state.viewStyle=='tab' ? 50 : 0) : 0, bottom: 0, left: 300,right:0 }}>
                    <MapsPreviewPanel 
                        layerId={this.state.selectedLayerName}
                        raster={this.state.raster}
                    />
                </div>
            </div>
        </main>
      </div>
    );
  }
};

export default withRouter(MainContainer);
