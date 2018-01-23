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

class CreateMaps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mapsType: 'BASIC',
            stepIndex: 0,
            typeKind: '',
            title: '',
            itemTitle: '',
            layerId: '',
            layerId2: '',
            radioType: 'layer',
            items: [{}]
        };
    }

    handleNext() {
        const {stepIndex} = this.state;
        this.setState({
          stepIndex: stepIndex + 1
        });
    }

    changeRadioType(radioType) {
        this.setState({
            radioType
        });
    }

    handlePrev() {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
          this.setState({stepIndex: stepIndex - 1});
        }
    };

    createMaps() {

        let { mapsType, title, typeKind, itemTitle, layerId, items, radioType } = this.state;

        if (mapsType != 'STORY' && !("pinogioOutputId" in items[0])) {
            alert('주제지도를 먼저 만들어주세요.');
            return;
        } else if (mapsType == 'STORY' && !("pinogioOutputId" in items[0]) && radioType == 'layer') {
            alert('주제지도를 먼저 만들어주세요.');
            return;
        }

        let courseWorkSubId = this.props.idx;
        let privacy = "PUBLIC";
        let idx = 0;

        let maps = {};
  
        //maps 추가
        ajaxJson(
            ['POST', apiSvr + '/coursesWork/maps.json'],
            {
                courseWorkSubId,
                title,
                mapsType, // maps_type,
                privacy,
                typeKind
            },
            function (data) {

                maps = JSON.parse(JSON.stringify(data)).response.data.result;
                
                if (mapsType == 'SWIPE') {

                    let layerId2 = this.state.layerId2;
                    this.createMapsItem(maps, itemTitle, layerId, layerId2);

                } else {
                    this.createMapsItem(maps, itemTitle, layerId);
                }

            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );
        
        this.props.viewMain();

    }

    componentWillMount() {
        const workId = this.props.match.params.WORKID;

        ajaxJson(
            ['GET', apiSvr + '/courses/' + workId + '/workSubData.json'],
            null,
            function (data) {
                
                let workSubData = JSON.parse(JSON.stringify(data)).response.data;
                let items = workSubData.filter(val => (val.outputType == 'layer'||val.outputType=='populationLayer'))[0].workOutputList;
                
                if (!items.length) {
                    items = [{}];
                }

                this.setState({
                    items: items
                });

                if ("pinogioOutputId" in items[0]) {
                    this.changeLayerId(items[0].pinogioOutputId);
                    this.changeLayerId2(items[0].pinogioOutputId);
                }

            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );
    }

    createMapsItem(maps, itemTitle, layerId, layerId2) {

        let baseLayer = "";

        if (this.state.radioType == 'text' && this.state.mapsType == 'STORY') {
            layerId = "";
        }

        if (this.state.mapsType == 'SPLIT') {
            layerId = "";
            //baseLayer 설정
        }

        //maps_item 추가
        ajaxJson(
            ['POST', apiSvr + '/coursesWork/maps/' + maps.pinogioOutputId + "/item" + '.json'],
            {
                title: itemTitle,
                pinoLayer: layerId
            },
            function (data) {
                
                let mapsItem = JSON.parse(JSON.stringify(data)).response.data.data;

                if (this.state.mapsType == 'SWIPE') {
                    this.createMapsItem2(maps, mapsItem, layerId2);
                } else {
                    this.props.createMaps(maps, mapsItem);
                }

    
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

    }

    createMapsItem2(maps, item1, layerId2) {
        //maps_item 추가
        ajaxJson(
            ['POST', apiSvr + '/coursesWork/maps/' + maps.pinogioOutputId + "/item" + '.json'],
            {
                pinoLayer: layerId2
            },
            function (data) {
                
                let item2 = JSON.parse(JSON.stringify(data)).response.data.data;
                this.props.createMaps(maps, item1, item2);
    
            }.bind(this),
            function (xhr, status, err) {
                alert('Error');
            }.bind(this)
        );

    }

    changeTitle(title) {
        this.setState({
            title
        });
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
                                        items={this.state.items}
                                    />;                            
                        } else if (mapsType == 'STORY') {
                            return <StoryMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        title={this.state.title}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        changeLayerId={this.changeLayerId.bind(this)}
                                        radioType={this.state.radioType}
                                        items={this.state.items}
                                    />
                        } else if (mapsType == 'SERIES') { 
                            return <SeriesMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        changeLayerId={this.changeLayerId.bind(this)}   
                                        items={this.state.items}                                    
                                    /> 
                        } else if (mapsType == 'SPLIT') { 
                            return <SplitMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        items={this.state.items}
                                    />
                        } else if (mapsType == 'SWIPE') {
                            return <SwipeMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        changeLayerId={this.changeLayerId.bind(this)}
                                        changeLayerId2={this.changeLayerId2.bind(this)}
                                        items={this.state.items}
                                    />
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
                                        layerId={this.state.layerId}
                                        changeLayerId={this.changeLayerId.bind(this)}
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
                                        changeRadioType={this.changeRadioType.bind(this)}
                                        radioType={this.state.radioType}
                                        items={this.state.items}
                                    />
                        } else if (mapsType == 'SERIES') { 
                            return <SeriesMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeItemTitle={this.changeItemTitle.bind(this)}
                                        itemTitle={this.state.itemTitle}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        layerId={this.state.layerId}
                                        changeLayerId={this.changeLayerId.bind(this)}
                                        items={this.state.items}
                                    /> 
                        } else if (mapsType == 'SPLIT') { 
                            return <SplitMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        items={this.state.items}
                                    />
                        } else if (mapsType == 'SWIPE') {
                            return <SwipeMaps 
                                        stepIndex={this.state.stepIndex}
                                        changeTitle={this.changeTitle.bind(this)}
                                        changeTypeKind={this.changeTypeKind.bind(this)}
                                        layerId={this.state.layerId}
                                        changeLayerId={this.changeLayerId.bind(this)}
                                        layerId2={this.state.layerId2}
                                        changeLayerId2={this.changeLayerId2.bind(this)}
                                        items={this.state.items}
                                    />
                        }
                    })()}
                </div>
            );
          default:
            return (
                <div style={{textAlign: 'center'}}>
                    Error
                </div>
            );
        }
      }

    render() {

        const { stepIndex } = this.state;

        const style = {
            selected: {
                border: '3px solid',
                borderRadius: '15px',
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
                {this.state.stepIndex == '0'? 
            
                <div style={{ textAlign: 'center' }}>
                    <h1>스토리맵 만들기</h1>
                    <br /><br />
                    <div style={{display: 'flex'}}>
                        <figure>
                            <img 
                                className="img"
                                src={contextPath+"/assets/images/LEFT.png"} 
                                alt="basic" 
                                onClick={() => this.setState({ mapsType: 'BASIC' })}
                                style={this.state.mapsType == "BASIC"? style.selected : style.unselected} 
                            />
                            <figcaption style={style.text}>기본형</figcaption>
                        </figure>
                        &nbsp;&nbsp;&nbsp;
                        <figure>
                            <img 
                                className="img"
                                src={contextPath+"/assets/images/TAB.png"} 
                                alt="story" 
                                onClick={() => this.setState({ mapsType: 'STORY' })}
                                style={this.state.mapsType == "STORY" ? style.selected : style.unselected} 
                            />
                            <figcaption style={style.text}>스토리형</figcaption>
                        </figure>           
                    </div>
                    <br />
                    <div style={{display: 'flex'}}>
                        <figure>
                            <img 
                                className="img"
                                src={contextPath+"/assets/images/SLIDE.png"} 
                                alt="SERIES" 
                                onClick={() => this.setState({ mapsType: 'SERIES' })}
                                style={this.state.mapsType == "SERIES" ? style.selected : style.unselected} 
                            />
                            <figcaption style={style.text}>연속데이터형</figcaption>
                        </figure>  
                        &nbsp;&nbsp;&nbsp;
                        <figure>
                            <img
                                className="img"
                                src={contextPath+"/assets/images/VERTICAL.png"} 
                                alt="SWIPE" 
                                onClick={() => this.setState({ mapsType: 'SWIPE' })}
                                style={this.state.mapsType == "SWIPE" ? style.selected : style.unselected} 
                            />
                            <figcaption style={style.text}>스와이프형</figcaption>
                        </figure>  
                    </div>
                </div>
                :
                <div 
                    style={{ textAlign: 'center', width: 600 }}
                >
                    {this.getStepContent(stepIndex)}
                    <br />
                </div>
                }
                <div style={{ textAlign: 'center' }}>
                    <br />
                    { stepIndex >= 3 ? 
                        <FlatButton
                            label="페이지 이동"
                            style={{color: 'white'}}
                            backgroundColor={cyan500}
                            onClick={stepIndex == 0? this.props.viewMain : this.handlePrev.bind(this)}
                        />
                        :
                        <div>
                            <FlatButton
                                label="이전"
                                onClick={stepIndex == 0? this.props.viewMain : this.handlePrev.bind(this)}
                            />
                            <FlatButton
                                label={stepIndex == '2'? "추가" : "다음"}
                                disabled={this.state.mapsType == 'default'? true : false}
                                backgroundColor={this.state.mapsType == 'default'? 'grey' : cyan500}
                                onClick={stepIndex == '2'? this.createMaps.bind(this) : this.handleNext.bind(this)}
                                style={{color: 'white'}}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(CreateMaps);