import React from 'react';
// import { Grid, Segment, List } from 'semantic-ui-react'

import Column from '../material/Column.js';
import Classification from '../material/Classification.js';
import ClassesNum from '../material/ClassesNum.js';
import RangeSize from '../material/RangeSize.js';
import Marker from '../material/Marker.js';
import MarkerSize from '../material/MarkerSize.js';
import FillColor from '../material/FillColor.js';
import FillPalette from '../material/FillPalette.js';
import StrokeWidth from '../material/StrokeWidth.js';
import StrokeColor from '../material/StrokeColor.js';
import Reverse from '../material/Reverse.js';
import RowColor from '../material/RowColor.js';
import ColorMapType from '../material/ColorMapType.js';
import ColorMapPalette from '../material/ColorMapPalette.js';
import KernelType from '../material/KernelType.js';
import CellSize from '../material/CellSize.js';
import RadiusType from '../material/RadiusType.js';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { cyan500 } from 'material-ui/styles/colors';
import {Tabs, Tab} from 'material-ui/Tabs';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


class ColorMapSymbolizer extends React.Component {

	constructor() {
		super();
		this.state = {
			classesNumber: null,
            colorMapType:null,
            colorMapPalette:null,
            colorMapOpacity:null,
        }
        
        this.editStyle = this.editStyle.bind(this);
        this.handleChangeClassesNum = this.handleChangeClassesNum.bind(this);
        this.handleChangeColorMapPalette=this.handleChangeColorMapPalette.bind(this);
        this.handleChangeColorMapOpacity = this.handleChangeColorMapOpacity.bind(this);
        this.handleChangeColorMapType = this.handleChangeColorMapType.bind(this);
	}


	componentDidMount(nextProps) {
        if (this.props.styles != null) {
            this.setState({
                symbolizerType: this.props.styles.symbolizerType != undefined ? this.props.styles.symbolizerType : 'COLORMAP',
            })
			let options = this.props.styles.options;
			if (options != undefined) {

				this.setState({
                    columnName: options.columnName != undefined ? options.columnName : Column.defaultProps.value,

                    colorMapType: options.colorMapType!=undefined? options.colorMapType:ColorMapType.defaultProps.value,
                    colorMapPalette: options.colorMapPalette!=undefined? options.colorMapPalette:ColorMapPalette.defaultProps.colorMapPalette,
                    colorMapOpacity: options.colorMapOpacity!=undefined? options.colorMapOpacity:1,

					//column: nextProps.column
				});
            }

		} else {
			// this.setState({
            //     column: this.props.column,
            //     columnName:this.props.column[0].name
			// });
        }
		
	}

	componentWillMount() {
        //defaultRandomColor
        // var letters = '0123456789ABCDEF';
        // var defaultFillColor = '#';
        // var defaultStrokeColor = '#';
        // for (var i = 0; i < 6; i++) {
        //     defaultFillColor += letters[Math.floor(Math.random() * 16)];
        //     defaultStrokeColor += letters[Math.floor(Math.random() * 16)];
        // }        

        // this.setState({
        //     randomFillColor: defaultFillColor,
        //     randomStrokeColor: defaultStrokeColor
        // })
	}
    //ClassesNum
    handleChangeClassesNum(event, index, value){
        this.setState({
            classesNumber:value
        })
    }

    //ColorMapType
    handleChangeColorMapType(event, index, value){
        this.setState({
            colorMapType:value
        })
    }

    //ColorMapPalette
    handleChangeColorMapPalette(event, index, value){
        this.setState({
            colorMapPalette:value
        },function(){
        })
    }

    //ColorMapPalette
    handleChangeColorMapOpacity(event, index, value){
        this.setState({
            colorMapOpacity:value
        },function(){
        })
    }

    //editStyle
    editStyle(){
        let style={
            symbolizerType:'COLORMAP',
            options:null,
            isClassified:false,
            symbolType:'RASTER'
        }
        let option = {
            colorMapType: this.state.colorMapType == null? ColorMapType.defaultProps.value : this.state.colorMapType,
            classesNumber: this.state.classesNumber==null ? ClassesNum.defaultProps.value : this.state.classesNumber,
            colorMapPalette:this.state.colorMapPalette == null? ColorMapPalette.defaultProps.colorMapPalette : this.state.colorMapPalette,
            colorMapOpacity:this.state.colorMapOpacity == null? 1:this.state.colorMapOpacity
        }
        style.options = option;
        var layerId = this.props.layerId;
        ajaxJson(
            ['PUT',apiSvr+'/coursesWork/layers/'+layerId+'/styling.json'],
            {
                styling: JSON.stringify(style)
            },
            function(res){
                this.setState({
                    workList:res.response.data
                });
                this.props.raster.getSource().updateParams({_:Date.now()});
            }.bind(this)
        );
    }

	render() {
        let styleStyle={
            selected:{
                boxSizing: 'content-box',
                height:100,
                minWidth:70,
                backgroundColor:'#F6EFEF',
                border: '3px solid',
                borderColor: cyan500,
                marginRight:20
            }
        }

		return (
            <div style={{paddingTop:10,paddingLeft:10,paddingRight:10}}>
                <Paper zDepth={0} style={{paddingBottom: 10, fontSize: 13, borderBottom: '1px solid #eee', marginBottom:10}}>
                    <h2>스타일 도구</h2>
                </Paper>

                <Paper zDepth={0} style={{padding:3,paddingBottom: 10,display:'flex',widht:100,overflowX:'auto',fontSize:12}}>
                    <Paper style={styleStyle.selected}>
                        <img src='/ngiiedu/assets/images/bubble.png' style={{width:70,height:70}} alt="COLORMAP"></img>
                        <div style={{width:70,height:30,textAlign:'center'}}>맵스타일링</div>
                    </Paper>
                </Paper>
                <Paper zDepth={0} style={{fontSize:13}}>
                    <ColorMapType
                        value={this.state.colorMapType}
                        handleChange={this.handleChangeColorMapType}
                    />

                    <Divider style={{marginTop:1}}/>

                    <ClassesNum
                        value={this.state.classesNumber}
                        handleChange={this.handleChangeClassesNum}
                    />

                    <Divider style={{marginTop:1}}/>

                    <ColorMapPalette
                        colorMapPalette={this.state.colorMapPalette}
                        colorMapOpacity={this.state.colorMapOpacity}
                        handleChange={this.handleChangeColorMapPalette}
                        handleChangeColorMapOpacity={this.handleChangeColorMapOpacity}
                    />
                </Paper>
                <RaisedButton 
                    label="적 용" 
                    style={{
                        marginTop:'10%',
                        marginLeft:'10%',
                        width:'30%'
                    }}
                    onClick={this.editStyle}
                />

            </div>

		)
    }

};

ColorMapSymbolizer.defaultProps = {
    symbolizerType :'COLORMAP',
    layerId : null
}

export default ColorMapSymbolizer;
