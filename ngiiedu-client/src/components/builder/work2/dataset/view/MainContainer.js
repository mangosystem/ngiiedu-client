import React from 'react';

import MapsPreviewPanel from './MapsPreviewPanel';
import { withRouter } from "react-router-dom";
import IconButton from 'material-ui/IconButton';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

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

    this.setState({
      raster:raster
    })

  }

  componentDidMount(){
    // 제목 받아오기 //bounds
    let layerName = this.props.match.params.DATASETID;
    
    

    ajaxJson(
      ['GET', apiSvr + '/coursesWork/dataset/' + layerName + '.json'],
      {},
      function (res) {
          let data = res.response.data.data;
          if(data.bounds){
            console.log('bounds :' +  data.bounds )
            this.setState({
                title:data.title,
                bounds:data.bounds
            });
          }
          
      }.bind(this),
      function (e) {
          alert(e);
      }
    )
  }


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
                </div>
            </div>
        </header>
        <main>
            <div style={{ position: 'absolute', top: 60, bottom: 0, left: 0,right:0 }}>
                <MapsPreviewPanel 
                    layerName={this.props.match.params.DATASETID}
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
