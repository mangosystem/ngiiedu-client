import React from 'react';

import { withRouter } from "react-router-dom";

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconNavigationMenu from 'material-ui/svg-icons/navigation/menu';

import MapsView from './MapsView';

class MainContainer extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            typekind: 'double1'
        };
    }

    componentDidMount() {
        

    }    

    goCourseHome() {
        const courseId = this.props.match.params.COURSEID;
        this.props.history.push("/ngiiedu/course/" + courseId);
    }

    changeTypeKind(typekind) {
        
        this.setState({
            typekind
        });

    }

    render() {
        return (
            <div>
                <header id="header">
                    <div className="inner wide" style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#43444c', color: 'white'}}>

                        <div style={{display: 'flex', marginLeft: 10, alignItems: 'center'}}>
                            <IconMenu
                                iconButtonElement={<IconButton><IconNavigationMenu color='white'/></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            >
                                <MenuItem primaryText="수업 홈" onClick={this.goCourseHome.bind(this)}/>
                                <MenuItem primaryText="뒤로 가기" onClick={()=>this.props.history.goBack()}/>
                            </IconMenu>
                            <div 
                                style={{fontSize: 20, textAlign:'left'}}>
                                분할창 지도보기
                            </div>
                        </div>

                        <div style={{display: 'flex', alignContent: 'center'}}>
                            <RadioButtonGroup 
                                name="typekind" 
                                defaultSelected="double1"
                                style={{ display: 'flex' }}
                                onChange={(e, value) => this.changeTypeKind(value)}
                            >
                                <RadioButton
                                    value="double1"
                                    label="가로 2분할"
                                    labelStyle={{ color: 'white'}}
                                    style={{width: '130px', margin: 'auto 0'}}
                                />
                                <RadioButton
                                    value="double2"
                                    label="세로 2분할"
                                    labelStyle={{ color: 'white'}}
                                    style={{width: '130px', margin: 'auto 0'}}
                                />
                                <RadioButton
                                    value="quadruple"
                                    label="4분할"
                                    labelStyle={{ color: 'white'}}
                                    style={{width: '130px', margin: 'auto 0'}}
                                />
                            </RadioButtonGroup>
                        </div>
                    </div>
                </header>
                <main style={{position: 'absolute', top: 60, bottom: 0, left: 0, right: 0}}>
                    <MapsView typekind={this.state.typekind} />
                </main>
            </div>
        );
    }
};

export default withRouter(MainContainer);
