import React, { Component } from 'react';

//material ui
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';


class CreateDataset extends Component {
    render() {
        const styles = {
            headline: {
              fontSize: 24,
              paddingTop: 16,
              marginBottom: 12,
              fontWeight: 400,
            },
          };


        return (
            <div style={{width:'100%',textAlign:'center'}}>
                <Tabs
                    tabItemContainerStyle={{backgroundColor:'rgba(0,0,0,0)',width:500 }}
                >
                    <Tab label="Item One" 
                        buttonStyle={{color:'black'}}
                    >
                        <div>
                           1
                        </div>
                    </Tab>
                    <Tab label="Item Two" 
                        buttonStyle={{color:'black'}}
                    >
                        <div>
                            2
                        </div>
                    </Tab>
                    <Tab label="Item three" 
                        buttonStyle={{color:'black'}}
                    >
                        <div>
                        3
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default CreateDataset;