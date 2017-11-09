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
        bounds:null
    }

    this.handleChangeTap = this.handleChangeTap.bind(this);
    this.handleChangeAccordion = this.handleChangeAccordion.bind(this);
    this.layerLoad = this.layerLoad.bind(this);
  }

    handleChangeTap(layerName,bounds,index){
        console.log('handleChangeTap')
        
        if(index==this.state.selectedMenuIndex){
            // index=-1;
        }else{
            this.layerLoad(layerName);
            
    
            this.setState({
                bounds:bounds,
                selectedLayerName:layerName
            })
        }
        
        this.setState({
            bounds:bounds,
            selectedMenuIndex:index
        })

    }

  handleChangeAccordion(layerName,bounds,index){
      console.log('handleChangeAccordion')
    if(index==this.state.selectedMenuIndex){
        // index=-1;
    }else{
        this.layerLoad(layerName);
        

        this.setState({
            bounds:bounds,
            selectedLayerName:layerName
        })
    }
    
    this.setState({
        bounds:bounds,
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
    console.log('componentDidMount')
    let mapsId = this.props.match.params.LAYERID
    console.log(mapsId)




    //ajax 처리 및 props 전달 필요
    // ajaxJson(
    //     ['GET',apiSvr+'/coursesWork/maps/'+mapsId+'.json'],
    //     null,
    //     function(res){
         
    //     }.bind(this),
    //     function(e){
    //         alert(e);
    //     }
    // );


    this.setState({
    viewStyle:JSON.parse( "{\"type\":\"tab\"}").type, //accordion , tab
    storyMapData:{
        "id": 44,
        "projectId": "p=pppppppp",
        "mapsId": "m=pFBKpqE71P",
        "ownerId": 1,
        "title": "우리동네 소음지도",
        "description": "",
        "metadata": "{\"type\":\"accordion\"}",
        "mapsType": "SERIES",
        "privacy": "PUBLIC",
        "createdDate": 1510249114104,
        "updatedDate": null,
        "ownerUsername": "admin",
        "commentCount": 0,
        "viewCount": 0,
        "likeCount": 0,
        "ratingScore": 0,
        "items": [
            {
                "layerId": "l=fjCfofgwxD",
                "title": "밤 소음지도",
                "description": '밤에 차 소음이 더 시끄럽다고 느낄 때가 많지? 같은 소리가 밤에는 왜 더 크게 들리는지 아니? 그 이유는 공기의 온도와 밀도 차이 때문이야. 밤에는 지표면이 빨리 식지만 대기는 서서히 식어서 지표면 근처의 온도가 더 낮아. 따라서 지표면 근처의 공기 밀도가 크고 위로 올라갈수록 감소하게 되지.',
                "bounds": "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))",
            },
            {
                "layerId": "l=wJeW9h6H82",
                "title": "낮 소음지도",
                "description": '밤에는 기차 소리가 먼 곳까지 들리지만 낮에는 작게 들린다. 같은 소음이라도 낮과 밤에 따라 다른 크기로 들린다. 그 이유는 공기의 온도와 밀도의 차이 때문이다. 소리는 공기 온도가 높은 곳일수록 밀도가 낮은 곳일수록 더 빠른 속도로 퍼져나간다. 낮에는 지표면 근처의 공기가 온도는 가장 높고 밀도는 가장 낮다. 따라서 소리는 밀한 쪽으로 굴절하므로 위로 휘어지며 퍼져 나간다. 이와 반대로, 밤에는 지표면 근처의 공기가 온도는 가장 낮고 밀도는 가장 높다. 따라서 밤에는 소음이 지표면 방향으로 퍼져 나간다.',
                "bounds": "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))",
            },
            {
                "layerId": "l=CX6vl0QmKq",
                "title": "버블지도",
                "description": '데이터를 일련의 버블로 표시합니다. 각 버블은 영역 중심에 있거나 위치의 좌표에 있습니다. 버블 지도 스타일의 경우, 버블 크기를 결정하는 측도를 지정합니다.색상',
                
                "bounds": "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))",
            },
            {
                "layerId": "l=zx7ZEajkKW",
                "title": "단계구분지도",
                "description": '단계 구분도는 통계치를 여러 단계로 구분하여 나누고, 나누어진 각각의 통계치에 색이나 패턴을 부여하여 나타낸다. 일반적으로 통계 값이 클수록 짙은 색을 사용하며, 각 지역의 수치에 맞게 다른 색으로 표현할 수도 있다. 또한 색으로 구분하는 대신 패턴의 모양을 달리하여 그릴 수도 있다.대표적인 사례로는 인구 밀도, 인구 증가율, 농경지 비율, 아파트 거주 인구 비율 등을 나타낸 지도가 있다.',
                "bounds": "POLYGON((126.956689249013 37.3794283769578,126.956689249013 37.3966047439905,126.982533779737 37.3966047439905,126.982533779737 37.3794283769578,126.956689249013 37.3794283769578))",
            }
        ]
    }
    },function(){
        if(this.state.storyMapData!=null){
            let firstItem = this.state.storyMapData.items[0]
            if(this.state.viewStyle=='tab'){
                // console.log('viewStyle :'+this.state.viewStyle)
                // this.handleChangeTap(this.state.storyMapData.items[0].layerId,this.state.storyMapData.items[0].bounds,0)
            }else if(this.state.viewStyle=='accordion'){
                // console.log('viewStyle : '+this.state.viewStyle)
                // this.handleChangeAccordion(this.state.storyMapData.items[0].layerId,this.state.storyMapData.items[0].bounds,0)
            }
            this.setState({
                selectedLayerName: firstItem.layerId,
                bounds: firstItem.bounds
            })
            this.layerLoad(this.state.storyMapData.items[0].layerId)
              console.log('layerId'+this.state.storyMapData.items[0].layerId)
        }
    })
      
  }

  layerLoad(layerName){
    //   console.log(layerName);
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
                    {this.state.storyMapData!=null ? this.state.storyMapData.title : null}
              </div>
            </div>
          </div>
        </header>
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
                        onActive={()=>this.handleChangeTap(row.layerId,row.bounds,index)}
                    >
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 250 ,padding:10}}>
                        {row.description}
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
                    onExpandChange={()=>this.handleChangeAccordion(row.layerId,row.bounds,index)}
                >
                    <CardHeader
                    title={row.title}
                    actAsExpander={true}
                    showExpandableButton={true}
                    textStyle={{fontWeight:'bold'}}
                    />
                    <CardText expandable={true}>
                        {row.description}
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
                    bounds={this.state.bounds}
                />
            </div>
            
            </div>

            

        </main>
      </div>
    );
  }
};

export default withRouter(MainContainer);
