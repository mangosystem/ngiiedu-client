import React from 'react';

import { withRouter } from "react-router-dom";

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconNavigationMenu from 'material-ui/svg-icons/navigation/menu';
import SelectField from 'material-ui/SelectField';

import SwipeMapView from './SwipeMapView';

class MainContainer extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            map1Value: 'ngii',
            map2Value: 'naver',
            typeKind: 'vertical'
        };
    }

    componentDidMount() {
        

    }    

    goCourseList() {
        this.props.history.push(contextPath+"/course/");
    }

    changeTypeKind(typeKind) {
        
        this.setState({
            typeKind
        });

    }

    render() {
        return (
            <div>
                <header id="header">
                    <div className="inner wide" style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#43444c', color: 'white', height: 60}}>

                        <div style={{display: 'flex', marginLeft: 10, alignItems: 'center'}}>
                            <IconMenu
                                iconButtonElement={<IconButton><IconNavigationMenu color='white'/></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            >
                                <MenuItem primaryText="수업 목록" onClick={this.goCourseList.bind(this)}/>
                                <MenuItem primaryText="뒤로 가기" onClick={()=>this.props.history.goBack()}/>
                            </IconMenu>
                            <div 
                                style={{fontSize: 20, textAlign:'left'}}>
                                스와이프 지도
                            </div>
                        </div>

                        <div style={{display: 'flex', alignContent: 'center'}}>
                            <RadioButtonGroup 
                                name="typekind" 
                                defaultSelected="vertical"
                                style={{ display: 'flex' }}
                                onChange={(e, value) => this.changeTypeKind(value)}
                            >
                                <RadioButton
                                    value="vertical"
                                    label="세로형"
                                    labelStyle={{ color: 'white'}}
                                    style={{width: '130px', margin: 'auto 0'}}
                                />
                                <RadioButton
                                    value="horizontal"
                                    label="가로형"
                                    labelStyle={{ color: 'white'}}
                                    style={{width: '130px', margin: 'auto 0'}}
                                />
                            </RadioButtonGroup>
                            <SelectField
                                floatingLabelText="map1"
                                floatingLabelStyle={{ color: 'white', top: '30px' }}
                                menuStyle={{ marginTop: '0', color: 'white' }}
                                labelStyle={{ color: 'white' }}
                                style={{ height: '60px' }}
                                value={this.state.map1Value}
                                onChange={(e, i, v) => this.setState({ map1Value: v })}
                            >
                                <MenuItem value="ngii" primaryText="Ngii Street Map" disabled={this.state.map2Value == 'ngii'? true : false}/>
                                <MenuItem value="naver" primaryText="Naver Street Map" disabled={this.state.map2Value == 'naver'? true : false}/>
                                <MenuItem value="daum" primaryText="Daum Street Map" disabled={this.state.map2Value == 'daum'? true : false}/>
                                <MenuItem value="osm" primaryText="OSM" disabled={this.state.map2Value == 'osm'? true : false}/>
                                <MenuItem value="vworldBase" primaryText="Vworld base" disabled={this.state.map2Value == 'vworldBase'? true : false}/>
                                <MenuItem value="vworldSatelite" primaryText="Vworld satelite" disabled={this.state.map2Value == 'vworldSatelite'? true : false}/>
                                <MenuItem value="vworldHybrid" primaryText="Vworld hybrid" disabled={this.state.map2Value == 'vworldHybrid'? true : false}/>
                            </SelectField>
                            <SelectField
                                floatingLabelText="map2"
                                floatingLabelStyle={{ color: 'white', top: '30px' }}
                                menuStyle={{ marginTop: '0', color: 'white' }}
                                labelStyle={{ color: 'white' }}
                                style={{ height: '60px' }}
                                value={this.state.map2Value}
                                onChange={(e, i, v) => this.setState({ map2Value: v })}
                            >
                            <MenuItem value="ngii" primaryText="Ngii Street Map" disabled={this.state.map1Value == 'ngii'? true : false}/>
                            <MenuItem value="naver" primaryText="Naver Street Map" disabled={this.state.map1Value == 'naver'? true : false}/>
                            <MenuItem value="daum" primaryText="Daum Street Map" disabled={this.state.map1Value == 'daum'? true : false}/>
                            <MenuItem value="osm" primaryText="OSM" disabled={this.state.map1Value == 'osm'? true : false}/>
                            <MenuItem value="vworldBase" primaryText="Vworld base" disabled={this.state.map1Value == 'vworldBase'? true : false}/>
                            <MenuItem value="vworldSatelite" primaryText="Vworld satelite" disabled={this.state.map1Value == 'vworldSatelite'? true : false}/>
                            <MenuItem value="vworldHybrid" primaryText="Vworld hybrid" disabled={this.state.map1Value == 'vworldHybrid'? true : false}/>
                            </SelectField>
                        </div>
                    </div>
                </header>
                <main style={{position: 'absolute', top: 60, bottom: 0, left: 0, right: 0}}>
                    <SwipeMapView 
                        map1Value={this.state.map1Value}
                        map2Value={this.state.map2Value}
                        typeKind={this.state.typeKind}
                    />
                </main>
            </div>
        );
    }
};

export default withRouter(MainContainer);
