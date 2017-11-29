import React, { Component } from 'react';

import { cyan500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import BasicMaps from './BasicMaps';
import StoryMaps from './StoryMaps';
import ContinuousMaps from './ContinuousMaps';
import SplitMaps from './SplitMaps';
import SwiffMaps from './SwiffMaps';

class CreateMaps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            template: 'default',
            stepIndex: 0
        }
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


    getStepContent(stepIndex) {
        console.log("CreateMaps : " + stepIndex);

        const { template } = this.state;

        switch (stepIndex) {
          case 1:
            return(
                <div>
                    {(() => {
                        if (template == 'basic') return <BasicMaps stepIndex={this.state.stepIndex}/>
                        else if (template == 'story') return <StoryMaps stepIndex={this.state.stepIndex}/>
                        else if (template == 'cData') return <ContinuousMaps stepIndex={this.state.stepIndex}/>
                        else if (template == 'split') return <SplitMaps stepIndex={this.state.stepIndex}/>
                        else if (template == 'swiff') return <SwiffMaps stepIndex={this.state.stepIndex}/>
                    })()}
                </div>
            );
          case 2:
            return(
                <div>
                    {(() => {
                        if (template == 'basic') return <BasicMaps stepIndex={this.state.stepIndex}/>
                        else if (template == 'story') return <StoryMaps stepIndex={this.state.stepIndex}/>
                        else if (template == 'cData') return <ContinuousMaps stepIndex={this.state.stepIndex}/>
                        else if (template == 'split') return <SplitMaps stepIndex={this.state.stepIndex}/>
                        else if (template == 'swiff') return <SwiffMaps stepIndex={this.state.stepIndex}/>
                    })()}
                </div>
            );
          default:
            return (
                <div style={{textAlign: 'center'}}>
                    <p>
                        <i className="fa fa-map" style={{fontSize: '200px'}}></i>
                    </p>
                    <p>
                        <br />
                        위와 같은 내용으로 새로운 스토리맵을 만들겠습니다. <br />
                        아래 버튼을 클릭하면 설정 페이지로 이동합니다.
                    </p>
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
                {this.state.stepIndex == '0'? 
            
                <div style={{ textAlign: 'center' }}>
                    <h1>스토리맵 만들기</h1>
                    <br />
                    <div style={{display: 'flex'}}>
                        <img 
                            className="img"
                            src="/ngiiedu/assets/images/basic.png" 
                            alt="basic" 
                            onClick={() => this.setState({ template: 'basic' })}
                            style={this.state.template == "basic"? style.selected : style.unselected} 
                        />
                        &nbsp;&nbsp;&nbsp;
                        <img 
                            className="img"
                            src="/ngiiedu/assets/images/story.png" 
                            alt="story" 
                            onClick={() => this.setState({ template: 'story' })}
                            style={this.state.template == "story" ? style.selected : style.unselected} 
                        />
                        &nbsp;&nbsp;&nbsp;
                        <img 
                            className="img"
                            src="/ngiiedu/assets/images/cData.png" 
                            alt="cData" 
                            onClick={() => this.setState({ template: 'cData' })}
                            style={this.state.template == "cData" ? style.selected : style.unselected} 
                        />
                    </div>
                    <br />
                    <div style={{display: 'flex'}}>
                        <img 
                            className="img"
                            src="/ngiiedu/assets/images/split.png" 
                            alt="split" 
                            onClick={() => this.setState({ template: 'split' })}
                            style={this.state.template == "split" ? style.selected : style.unselected} 
                        />
                        &nbsp;&nbsp;&nbsp;
                        <img
                            className="img"
                            src="/ngiiedu/assets/images/swiff.png" 
                            alt="swiff" 
                            onClick={() => this.setState({ template: 'swiff' })}
                            style={this.state.template == "swiff" ? style.selected : style.unselected} 
                        />
                    </div>
                </div>
                :
                <div 
                    style={{ textAlign: 'center' }}
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
                                disabled={this.state.template == 'default'? true : false}
                                backgroundColor={this.state.template == 'default'? 'grey' : cyan500}
                                onClick={this.handleNext.bind(this)}
                                style={{color: 'white'}}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default CreateMaps;