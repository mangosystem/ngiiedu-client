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
        viewStyle:'ACCORDION', //TAP,ACCORDION 
        // viewStyle:'TAP', //TAP,ACCORDION 
        storyMapData:{ 
            title:'모바일 기기를 활용한 우리 지역 소음원 현장 조사',
            selectedLayerName:'ngiiedu:dataset_test1',
            step:[
                {   
                    layerName:'d=KjCXc4dmy9',
                    tapTitle:'데이터 수집방법',
                    content:'내용1',
                },
                {   
                    layerName:'ngiiedu:dataset_test2',
                    tapTitle:'도로교통소음장소',
                    content:'내용2',
                },
                {   
                    layerName:'ngiiedu:dataset_test3',
                    tapTitle:'공사장소음 장소',
                    content:'내용3',
                },
                {
                    layerName:'ngiiedu:dataset_test4',
                    tapTitle:'생활소음 장소',
                    content:'내용4',
                },
            ],
        },
        selectedMenuIndex : 0,
        raster:null
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

    if(this.state.storyMapData.step.length !=0){
        this.layerLoad(this.state.storyMapData.step[0].layerName);
    }
  }

  componentDidMount() {
  }

  layerLoad(layerName){
      console.log(layerName);
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
          <header id="prvHeader">
          <div className="inner wide" style={{display: 'flex'}}>
            <div style={{flex: 1, paddingTop: 25, paddingBottom: 18}}>
              <div style={{fontSize: 30, textAlign:'center'}}>
                    {this.state.storyMapData.title}
              </div>
            </div>
          </div>
        </header>
        <main>
            <div style={{ position: 'absolute', top: 100, bottom: 0, left: 0, right: 0 }}>
            {this.state.viewStyle=='TAP'?
              
                        
                <Tabs 
                    tabItemContainerStyle={{height:50}}
                    initialSelectedIndex={this.state.selectedMenuIndex}
                >

                {this.state.storyMapData.step.map((row,index) => (
                    <Tab label={row.tapTitle}
                        key={index}
                        onActive={(layerName)=>this.handleChangeTap(row.layerName,index)}
                    >
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 300 }}>
                        {row.content}
                    </div>
                    </Tab>
                   
                ))}
                </Tabs> 
                : 
                <div style={{ position: 'absolute', top:0, bottom: 0, left: 0, width: 300 ,overflowY:'auto',overflowX:'hidden'}}>
                {this.state.storyMapData.step.map((row,index) => (
                    <Card 
                    key={index}
                    expanded={this.state.selectedMenuIndex==index}
                    onExpandChange={(layerName)=>this.handleChangeAccordion(row.layerName,index)}
                >
                    <CardHeader
                    title={row.tapTitle}
                    actAsExpander={true}
                    showExpandableButton={true}
                    textStyle={{fontWeight:'bold'}}
                    />
                    <CardText expandable={true}>
                        {row.content}
                    </CardText>
                </Card>
                ))}
                
                </div>
            }
            <div style={{ position: 'absolute', top:this.state.viewStyle=='TAP'? 50 : 0, bottom: 0, left: 300,right:0 }}>
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

export default MainContainer;
