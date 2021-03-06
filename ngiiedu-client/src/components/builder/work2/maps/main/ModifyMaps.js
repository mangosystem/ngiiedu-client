import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import { cyan500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import BasicMaps from './BasicMaps';
import StoryMaps from './StoryMaps';
import SeriesMaps from './SeriesMaps';
import SplitMaps from './SplitMaps';
import SwipeMaps from './SwipeMaps';

class ModifyMaps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mapsType: 'default',
            stepIndex: 1,
            typeKind: '',
            title: '',
            layerId: '',
            layerId2: '',
            radioType: 'layer',
            items: [{}]
        };
    }

    componentDidMount() {

        let { map } = this.props;


        this.setState({
            mapsType: map.pngoData.mapsType,
            typeKind: map.pngoData.typeKind
        });

        const workId = this.props.match.params.WORKID;

        ajaxJson(
            ['GET', apiSvr + '/courses/' + workId + '/workSubData.json'],
            null,
            function (data) {
                
                let workSubData = JSON.parse(JSON.stringify(data)).response.data;
                let items = workSubData.filter(val => (val.outputType == 'layer'||val.outputType=='layerPopulation'))[0].workOutputList;

                this.setState({
                    items: items
                });

            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );
        
    }

    changeRadioType(radioType) {
        this.setState({
            radioType
        });
    }

    handleNext() {
        const {stepIndex} = this.state;
        this.setState({
          stepIndex: stepIndex + 1
        });
    }

    handlePrev() {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
          this.setState({stepIndex: stepIndex - 1});
        }
    };

    changeTitle(title) {
        this.setState({
            title
        });
    }

    modifyMaps() {

        let { title, typeKind, layerId, radioType, mapsType } = this.state;
        const mapsId = this.props.map.pinogioOutputId;
        let maps = {};

        //maps수정
        ajaxJson(
            ['PUT', apiSvr + '/coursesWork/maps/' + mapsId + '.json'],
            {
                title,
                typeKind,
            },
            function (data) {
                maps = JSON.parse(JSON.stringify(data)).response.data.result;
                this.props.modifyMaps(maps);

            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );


        const itemId = this.props.map.pngoData.items[0].id;
        let itemTitle = "";

        if (this.state.itemTitle) {
            itemTitle = this.state.itemTitle;
        }

        //maps_item수정

        if (radioType == 'text' && mapsType == 'STORY') {
            layerId = "";
        }


        ajaxJson(
            ['POST', apiSvr + '/coursesWork/maps/' + mapsId + '/item/' + itemId + '.json'],
            {
                title: itemTitle,
                pinoLayer: layerId
            },
            function (data) {
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

        if (mapsType == 'SWIPE') {
            const itemId2 = this.props.map.pngoData.items[1].id;
            const layerId2 = this.state.layerId2;

            //maps_item수정
            ajaxJson(
                ['POST', apiSvr + '/coursesWork/maps/' + mapsId + '/item/' + itemId2 + '.json'],
                {
                    title: itemTitle,
                    pinoLayer: layerId2
                },
                function (data) {
                }.bind(this),
                function (xhr, status, err) {
                    alert('Error');
                }.bind(this)
            );
        }

        this.props.viewMain();
        
    }

    changeTypeKind(typeKind) {
        this.setState({
            typeKind
        });
    }

    changeItemTitle(itemTitle) {
        this.setState({
            itemTitle
        });
    }

    changeLayerId(layerId) {
        this.setState({
            layerId
        });
    }

    changeLayerId2(layerId2) {
        this.setState({
            layerId2
        });
    }

    getStepContent(stepIndex) {

        const { mapsType } = this.state;

        switch (stepIndex) {
          case 1:
            return(
                <div>
                    {(() => {
                        if (mapsType == 'BASIC') {
                            return <BasicMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        changeLayerId={this.changeLayerId.bind(this)}
                                        map={this.props.map}
                                        items={this.state.items}
                                    />;                            
                        } else if (mapsType == 'STORY') {
                            return <StoryMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        title={this.state.title}
                                        changeItemTitle={this.changeItemTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        changeLayerId={this.changeLayerId.bind(this)}
                                        map={this.props.map}
                                        radioType={this.state.radioType}
                                        changeRadioType={this.changeRadioType.bind(this)}
                                        items={this.state.items}
                                    />;
                        } else if (mapsType == 'SERIES') { 
                            return <SeriesMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        title={this.state.title}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        changeLayerId={this.changeLayerId.bind(this)}
                                        changeItemTitle={this.changeItemTitle.bind(this)}
                                        map={this.props.map}
                                        items={this.state.items}
                                    />;
                        } else if (mapsType == 'SPLIT') { 
                            return <SplitMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        map={this.props.map}
                                        items={this.state.items}
                                    />;
                        } else if (mapsType == 'SWIPE') {
                            return <SwipeMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        changeLayerId={this.changeLayerId.bind(this)}
                                        changeLayerId2={this.changeLayerId2.bind(this)}
                                        map={this.props.map}
                                        items={this.state.items}
                                    />;
                        }
                    })()}
                </div>
            );
          case 2:
            return(
                <div>
                    {(() => {
                        if (mapsType == 'BASIC') {
                            return <BasicMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        changeLayerId={this.changeLayerId.bind(this)}
                                        layerId={this.state.layerId}
                                        map={this.props.map}
                                        items={this.state.items}
                                    />;                            
                        } else if (mapsType == 'STORY') {
                            return <StoryMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeItemTitle={this.changeItemTitle.bind(this)}
                                        itemTitle={this.state.itemTitle}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        layerId={this.state.layerId}
                                        changeLayerId={this.changeLayerId.bind(this)}
                                        map={this.props.map}
                                        radioType={this.state.radioType}
                                        changeRadioType={this.changeRadioType.bind(this)}
                                        items={this.state.items}
                                    />
                        } else if (mapsType == 'SERIES') { 
                            return <SeriesMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        changeLayerId={this.changeLayerId.bind(this)}
                                        changeItemTitle={this.changeItemTitle.bind(this)}
                                        itemTitle={this.state.itemTitle}
                                        layerId={this.state.layerId}
                                        map={this.props.map}
                                        items={this.state.items}
                                    /> 
                        } else if (mapsType == 'SPLIT') { 
                            return <SplitMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        map={this.props.map}
                                        items={this.state.items}
                                    />
                        } else if (mapsType == 'SWIPE') {
                            return <SwipeMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        changeLayerId={this.changeLayerId.bind(this)}
                                        layerId={this.state.layerId}
                                        changeLayerId2={this.changeLayerId2.bind(this)}
                                        layerId2={this.state.layerId2}
                                        map={this.props.map}
                                        items={this.state.items}
                                    />
                        }
                    })()}
                </div>
            );
          default:
            return (
                <div style={{textAlign: 'center'}}>
                    설정변경화면
                </div>
            );
        }
      }

    render() {

        const { stepIndex } = this.state;

        const style = {
            selected: {
                border: '3px solid',
                borderColor: cyan500,
                width: '300px',
                height: '206px'
            },

            unselected: {
                padding: '3px',
                width: '300px',
                height: '206px'
            }
        };

        return (
            <div>
                <div 
                    style={{ textAlign: 'center', width: 600 }}
                >
                    {this.getStepContent(stepIndex)}
                    <br />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <br />
                        <div>
                            <FlatButton
                                label="이전"
                                onClick={stepIndex == 1? this.props.viewMain : this.handlePrev.bind(this)}
                            />
                            <FlatButton
                                label={stepIndex == '2'? "변경" : "다음"}
                                disabled={this.state.mapsType == 'default'? true : false}
                                backgroundColor={this.state.mapsType == 'default'? 'grey' : cyan500}
                                onClick={stepIndex == '2'? this.modifyMaps.bind(this) : this.handleNext.bind(this)}
                                style={{color: 'white'}}
                            />
                        </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ModifyMaps);