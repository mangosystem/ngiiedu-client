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
        mapData:{
            title:'피노지오결과물id'
        },
    }

  }

  

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
   
    return (
      <div>
          <header id="prvHeader">
          <div className="inner wide" style={{display: 'flex'}}>
            <div style={{flex: 1, paddingTop: 25, paddingBottom: 18}}>
              <div style={{fontSize: 30, textAlign:'center'}}>
                    {this.state.mapData.title}
              </div>
            </div>
          </div>
        </header>
        <main>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0,right:0 }}>
                <MapsPreviewPanel 
                    LayerName={this.state.selectedLayerName}
                />
            </div>
        </main>
      </div>
    );
  }
};

export default MainContainer;
