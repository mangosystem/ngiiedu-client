import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { cyan500, pink500, pink400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';


import '../main/Maps.css';
  

class SeriesSetting extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: [
                {}
            ]
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.maps) {
            this.setState({ 
                typeKind: nextProps.maps.typeKind,
                mapsTitle: nextProps.mapsTitle
            });
        }
    }

    componentDidMount() {    
        
        const workId = this.props.match.params.WORKID;

        ajaxJson(
            ['GET', apiSvr + '/courses/' + workId + '/workSubData.json'],
            null,
            function (data) {
                
                let workSubData = JSON.parse(JSON.stringify(data)).response.data;
                let items = workSubData.filter(val => (val.outputType == 'layer'))[0].workOutputList;

                this.setState({
                    items: items
                });

        
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );
    }

    changeTypeKind(typeKind) {
        this.setState({
            typeKind
        });typeKind
    }

    updateMapsSetting() {

        const { typeKind, mapsTitle } = this.state;
        const mapsId = this.props.maps.mapsId;

        //maps수정
        ajaxJson(
            ['PUT', apiSvr + '/coursesWork/maps/' + mapsId + '.json'],
            {
                typeKind,
                title: mapsTitle
            },
            function (data) {
                let maps = JSON.parse(JSON.stringify(data)).response.data.result;                
                this.props.updateMapsSetting(maps);
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

        this.props.settingHandle();

    }

    render() {

        const actions = [
            <FlatButton
              label="취소"
              onClick={this.props.settingHandle}
            />,
            <FlatButton
              label="변경"
              backgroundColor={cyan500}
              style={{color: 'white'}}
              onClick={this.updateMapsSetting.bind(this)}
            />
        ];

        const { typeKind, items, mapsTitle } = this.state;
        
        const style = {
            selected: {
                border: '3px solid',
                borderRadius: '15px',
                borderColor: cyan500,
                width: '264px',
                height: '164px'
            },

            unselected: {
                padding: '3px',
                width: '264px',
                height: '164px'
            },

            itemSelected: {
                color: pink400,
                backgroundColor: 'rgba(128, 128, 128, 0.2)'
            },

            itemUnselected: {

            },
            text: {
                textAlign: 'center'
            }
        };

        return (
            <Dialog
                title="설정 변경"
                actions={actions}
                open={this.props.open}
                autoScrollBodyContent={false}
                contentStyle={{width: '50%'}}
            >
                <div>
                    <Subheader>제목</Subheader>
                    <TextField
                        fullWidth={true}
                        hintText="*스토리맵 제목"
                        onChange={(e, value) => this.setState({ mapsTitle: value })}
                        value={this.state.mapsTitle}
                        style={{ marginBottom: '8px' }}
                    />
                    <Subheader>템플릿 변경</Subheader>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        {/*<figure>
                            <img 
                                src="/ngiiedu/assets/images/c1.png" 
                                // src="/assets/images/tab.png" 
                                alt="c1" 
                                style={typeKind == "CAROUSEL"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('CAROUSEL')}/>
                            <figcaption style={style.text}>화면전환형</figcaption>
                        </figure>
                        &nbsp;&nbsp;&nbsp;*/}
                        <figure>
                            <img 
                                src="/ngiiedu/assets/images/SLIDE.png" 
                                // src="/assets/images/accordion.png" 
                                alt="c2" 
                                style={typeKind == "SLIDE"? style.selected : style.unselected}
                                onClick={() => this.changeTypeKind('SLIDE')}/>
                            <figcaption style={style.text}>슬라이더형</figcaption>
                        </figure>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default withRouter(SeriesSetting);