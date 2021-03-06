import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import { cyan500 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';


import MapsView from './MapsView';
import EditorPanel from './EditorPanel';

class BasicTop extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editorMode: true,
            layerID: '',
            maps: {}
        };
    }

    addContent() {
        const div = document.createElement('div');
    
        div.innerHTML = '컨텐츠추가됨';
        $('#content').append(div);
    }

    componentWillMount() {
        this.setState({
            maps: this.props.maps
        });
    }

    render() {
        return (
            <div style={{ position: 'absolute', top: 60, bottom: 0, left: 0, right: 0 }}>
                <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: 300 }}>
                    <div style={{marginTop: '10px', display: 'flex'}}>
                        <div>
                            <FlatButton
                                label="컨텐츠 추가"
                                backgroundColor={cyan500}
                                style={{color: 'white'}}
                                onClick={this.addContent.bind(this)}
                            />
                            <br />
                            <FlatButton
                                label="그래프 추가"
                                backgroundColor={cyan500}
                                style={{color: 'white'}}
                            />
                        </div>
                        <div id="content" style={{margin: '15px 0', textAlign: 'center'}}>
                            여기에 컨텐츠가 추가
                            <EditorPanel
                                editorMode={this.state.editorMode}
                            />
                        </div>                        
                    </div>
                </div>
                <div style={{ position: 'absolute', top: 300, bottom: 0, left: 0, right: 0 }}>
                    <MapsView
                        onChangeEditMode={this.onChangeEditMode}
                        maps={this.state.maps}
                    />
                </div>
            </div>
        );
    }
}

export default BasicTop;