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
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';


class PointSymbolizer extends React.Component {

	constructor() {
		super();
		this.state = {
            symbolizerType:'SINGLE',

			markType: null,
			markSize: null,

            fillPalette: null,
            defaultFillColor: null,
			fillColor: null,
			fillOpacity: null,

            strokeWidth: null,
            defaultStrokeColor: null,
			strokeColor: null,
			strokeOpacity: null,

			columnName: null,
			classification: null,
			classesNumber: null,

			reverse: null,

            column:[],
            layerId:null,
            
            colorMapType:null,
            colorMapPalette:null,
            colorMapOpacity:null,

            kernelType:null,
            searchRadius:'',
            cellSize:'',

            power:null,
            raidusType:null,
            numberOfPoints:null,
            distance:null,
            slideIndex: 0,
            classes:null,

            changeTypeModal:false

            // randomFillColor:null,
            // randomStrokeColor:null
		}

        this.onChangeColumn = this.onChangeColumn.bind(this);
        
        this.handleChangeMarker = this.handleChangeMarker.bind(this);
        this.handleChangeMarkerSize = this.handleChangeMarkerSize.bind(this);
        this.handleChangeFillColor = this.handleChangeFillColor.bind(this);
        this.handleChangeStrokeColor = this.handleChangeStrokeColor.bind(this);
        this.handleChangeStrokeWidth = this.handleChangeStrokeWidth.bind(this);
        this.handleChangeColumn = this.handleChangeColumn.bind(this);
        this.handleChangeClassification = this.handleChangeClassification.bind(this);
        this.handleChangeClassesNum = this.handleChangeClassesNum.bind(this);
        this.handleChangeReverse = this.handleChangeReverse.bind(this);
        this.handleChangeRangeSizeMin = this.handleChangeRangeSizeMin.bind(this);
        this.handleChangeRangeSizeMax = this.handleChangeRangeSizeMax.bind(this);
        this.handleChangeFillPalette = this.handleChangeFillPalette.bind(this);
        this.handleChangeFillOpacity = this.handleChangeFillOpacity.bind(this);
        this.handleChangeColorMapPalette=this.handleChangeColorMapPalette.bind(this);
        this.handleChangeColorMapOpacity = this.handleChangeColorMapOpacity.bind(this);
        this.handleChangeColorMapType = this.handleChangeColorMapType.bind(this);
        this.handleChangeRowColor = this.handleChangeRowColor.bind(this);

        this.handleChangeKernelType = this.handleChangeKernelType.bind(this);
        this.handleChangeSearchRadius = this.handleChangeSearchRadius.bind(this);
        this.handleChangeCellSize = this.handleChangeCellSize.bind(this);

        this.handleChangeRadiusType = this.handleChangeRadiusType.bind(this);
        this.handleChangePower = this.handleChangePower.bind(this);
        this.handleChangeNumberOfPoints = this.handleChangeNumberOfPoints.bind(this);
        this.handleChangeDistance = this.handleChangeDistance.bind(this);

        this.handleChangeTab = this.handleChangeTab.bind(this);

        this.editStyle = this.editStyle.bind(this);
        this.editRaster = this.editRaster.bind(this);
        this.symbolizerTypeChange = this.symbolizerTypeChange.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);

	}


	componentDidMount(nextProps) {
        if (this.props.styles != null) {
            if(this.props.styles.symbolizerType!='COLORMAP'){
                this.setState({
                    symbolizerType: this.props.styles.symbolizerType != undefined ? this.props.styles.symbolizerType : 'SINGLE',
                })
            }else if(this.props.styles.symbolizerType=='COLORMAP'){
                if(this.props.process.identifier=='kernelDensity'){
                    this.setState({
                        symbolizerType:'DENSITY'
                    })
                }else if(this.props.process.identifier=='inverseDistanceWeighted'){
                    this.setState({
                        symbolizerType:'INTERPOLATION'
                    })
                }
            }
			let options = this.props.styles.options;
			if (options != undefined) {
                if(options.fillColor != undefined &&options.fillOpacity != undefined ){
                    var color = options.fillColor.replace('#','');
                    var r = parseInt(color.substring(0,2), 16);
                    var g = parseInt(color.substring(2,4), 16);
                    var b = parseInt(color.substring(4,6), 16);
                    
                    var result = 'rgba('+r+','+g+','+b+','+options.fillOpacity+')';
        
                    this.setState({
                        defaultFillColor:result
                    })
        
                }

                if(options.strokeColor != undefined &&options.strokeOpacity != undefined ){
                    var color = options.strokeColor.replace('#','');
                    var r = parseInt(color.substring(0,2), 16);
                    var g = parseInt(color.substring(2,4), 16);
                    var b = parseInt(color.substring(4,6), 16);
                    
                    var result = 'rgba('+r+','+g+','+b+','+options.strokeOpacity+')';
        
                    this.setState({
                        defaultStrokeColor:result
                    })
                }


				this.setState({
                    markType: options.markType != undefined ? options.markType : Marker.defaultProps.value,
                    markSize: options.markSize != undefined ? options.markSize : MarkerSize.defaultProps.value,

                    fillPalette: options.fillPalette != undefined ? options.fillPalette : FillPalette.defaultProps.fillPalette ,
                    fillColor: options.fillColor != undefined ? options.fillColor : FillColor.defaultProps.color,
                    fillOpacity: options.fillOpacity != undefined ? Number(options.fillOpacity) : 1,

                    strokeWidth: options.strokeWidth != undefined ? Number(options.strokeWidth) : StrokeWidth.defaultProps.value,
                    strokeColor: options.strokeColor != undefined ? options.strokeColor : StrokeColor.defaultProps.color,
                    strokeOpacity: options.strokeOpacity != undefined ? Number(options.strokeOpacity) : 1,

                    columnName: options.columnName != undefined ? options.columnName : Column.defaultProps.value,
                    classification: options.classification != undefined ? options.classification : Classification.defaultProps.value,
                    classesNumber: options.classesNumber != undefined ? Number(options.classesNumber) : ClassesNum.defaultProps.value,

                    reverse: options.reverse != undefined ? options.reverse : Reverse.defaultProps.value,
                    
                    colorMapType: options.colorMapType!=undefined? options.colorMapType:ColorMapType.defaultProps.value,
                    colorMapPalette: options.colorMapPalette!=undefined? options.colorMapPalette:ColorMapPalette.defaultProps.colorMapPalette,
                    colorMapOpacity: options.colorMapOpacity!=undefined? options.colorMapOpacity:1,

					//column: nextProps.column
				});
            }
            
            if(this.props.process!=null){
                let process = this.props.process.options;
                if(this.props.process.identifier=='kernelDensity'){
                    this.setState({
                        kernelType:process.kernelType!=undefined?process.kernelType:KernelType.defaultProps.value,
                        columnName:process.populationField!=undefined?process.populationField:Column.defaultProps.value,
                        searchRadius:process.searchRadius!=undefined?process.searchRadius:'',
                        cellSize:process.cellSize!=undefined?process.cellSize:''
                    })
                }if(this.props.process.identifier=='inverseDistanceWeighted'){
                    this.setState({
                        columnName:process.inputField!=undefined?process.inputField:Column.defaultProps.value,
                        power:process.power!=undefined?process.power:'',
                        radiusType:process.radiusType!=undefined?process.radiusType:RadiusType.defaultProps.value,
                        numberOfPoints:process.numberOfPoints=!undefined?process.numberOfPoints:'',
                        distance:process.distance=!undefined?process.distance:''
                    })
                }
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

    //Marker
    handleChangeMarker(event, index, value){
        this.setState({
            markType:value
        })

    }

    //MarkerSize
    handleChangeMarkerSize(event, index, value){
        this.setState({
            markSize:value
        })
    }

    //FillColor 
    handleChangeFillColor(color){
        var opacity = 1;

        if(color.length>7){
            // 컬러값과 쉼표만 남기고 삭제. 
            var rgb = color.replace( /[^%,.\d]/g, "" ); 
        
            // 쉼표(,)를 기준으로 분리해서, 배열에 담기. 
            rgb = rgb.split( "," ); 
    
            // 컬러값이 "%"일 경우, 변환하기. 
            for ( var x = 0; x < 4; x++ ) { 
                if ( rgb[ x ].indexOf( "%" ) > -1 ) rgb[ x ] = Math.round( parseFloat( rgb[ x ] ) * 2.55 ); 
            } 
    
            // 16진수 문자로 변환. 
            var toHex = function( string ){ 
                string = parseInt( string, 10 ).toString( 16 ); 
                string = ( string.length === 1 ) ? "0" + string : string; 

                return string; 
            }; 
    
            var r = toHex( rgb[ 0 ] ); 
            var g = toHex( rgb[ 1 ] ); 
            var b = toHex( rgb[ 2 ] ); 
            
            color = "#" + r + g + b; 
            opacity = rgb[ 3 ];
        }

        this.setState({
            fillColor:color,
            fillOpacity:opacity

        });

    }

    //StrokeColor
    handleChangeStrokeColor(color){
        var opacity = 1;
        
        if(color.length>7){
            // 컬러값과 쉼표만 남기고 삭제. 
            var rgb = color.replace( /[^%,.\d]/g, "" ); 
        
            // 쉼표(,)를 기준으로 분리해서, 배열에 담기. 
            rgb = rgb.split( "," ); 
    
            // 컬러값이 "%"일 경우, 변환하기. 
            for ( var x = 0; x < 4; x++ ) { 
                if ( rgb[ x ].indexOf( "%" ) > -1 ) rgb[ x ] = Math.round( parseFloat( rgb[ x ] ) * 2.55 ); 
            } 
    
            // 16진수 문자로 변환. 
            var toHex = function( string ){ 
                string = parseInt( string, 10 ).toString( 16 ); 
                string = ( string.length === 1 ) ? "0" + string : string; 

                return string; 
            }; 
    
            var r = toHex( rgb[ 0 ] ); 
            var g = toHex( rgb[ 1 ] ); 
            var b = toHex( rgb[ 2 ] ); 
            
            color = "#" + r + g + b; 
            opacity = rgb[ 3 ];
        }

        this.setState({
            strokeColor:color,
            strokeOpacity:opacity

        });
        
    }

    //StrokeWidth
    handleChangeStrokeWidth(event, index, value){
        this.setState({
            strokeWidth:value
        })
    }

    //Column
    handleChangeColumn(event, index, value){
        this.setState({
            columnName:value
        });
        if(this.state.symbolizerType == 'CATEGORIES'){
            this.props.getRowUniqueInfo(value);
            this.props.handleChangeCategory('',0,'');
        };
    }

	onChangeColumn(evt, data) {

    }

    //Classification
    handleChangeClassification(event, index, value){
        this.setState({
            classification:value
        })
    }

    //ClassesNum
    handleChangeClassesNum(event, index, value){
        this.setState({
            classesNumber:value
        })
    }

    //Reverse
    handleChangeReverse(event, bool){
        this.setState({
            reverse:bool
        })
    }

    //RangeSize - min
    handleChangeRangeSizeMin(event, index, value){
        this.setState({
            minSize:value
        })
    }

    //RangeSize - max
    handleChangeRangeSizeMax(event, index, value){
        this.setState({
            maxSize:value
        })
    }

    //FillPalette
    handleChangeFillPalette(event, index, value){
        this.setState({
            fillPalette:value
        })
    }

    //FillPalette
    handleChangeFillOpacity(event, index, value){
        this.setState({
            fillOpacity:value
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

    handleChangeRowColor(color, row){
        this.props.handleChangeRowColor(color, row)
    }

    editRaster(){
        let process={
            identifier:null,
            options:null,
            inputDataset:null,
        }
        if(this.state.symbolizerType == 'INTERPOLATION'){
            if(this.state.columnName==null){
                alert('컬럼을 선택해주세요.');
                return;
            }
            let identifierOption={
                inputField:this.state.columnName ==null? Column.defaultProps.value : this.state.columnName,
                power:this.state.power,
                radiusType:this.state.radiusType==null?RadiusType.defaultProps.value:this.state.raidusType,
                numberOfPoints:this.state.numberOfPoints,
                distance:this.state.distance,
                cellSize:this.cellSize
            }
            let inputDataset={
                type:"dataset",
                datasetId:this.props.datasetId,
                filter:[]
            }
            process.identifier='inverseDistanceWeighted';
            process.options=identifierOption;
            process.inputDataset = inputDataset;
        }else if(this.state.symbolizerType == 'DENSITY'){
            let identifierOption={
                kernelType:this.state.kernelType==null?KernelType.defaultProps.value:this.state.kernelType,
                populationField:this.state.columnName ==null? Column.defaultProps.value : this.state.columnName,
                searchRadius:this.state.searchRadius,
                cellSize:this.state.cellSize,
            }
            let inputDataset={
                type:"dataset",
                datasetId:this.props.datasetId,
                filter:[]
            }
            process.identifier='kernelDensity';
            process.options=identifierOption;
            process.inputDataset = inputDataset;
        }
        console.log(process)
        var layerId = this.props.layerId;
        ajaxJson(
            ['PUT',apiSvr+'/coursesWork/layers/'+layerId+'/process.json'],
            {
                process: JSON.stringify(process)
            },
            function(res){
                this.setState({
                    workList:res.response.data
                });
                this.props.raster.getSource().updateParams({_:Date.now()});
                this.props.handleChangeSpatialType('RASTER');
            }.bind(this)
        );
    }

    //editStyle
    editStyle(){
        let style={
            symbolizerType:null,
            options:null,
            isClassified:false,
            symbolType:'POINT'
        }
        if(this.state.symbolizerType == 'SINGLE'){

            let options ={
                markType: this.state.markType==null ? Marker.defaultProps.value : this.state.markType,
                markSize: this.state.markSize==null ? MarkerSize.defaultProps.value : this.state.markSize,
                fillColor: this.state.fillColor==null ? FillColor.defaultProps.color : this.state.fillColor,
                fillOpacity: this.state.fillOpacity==null ? 1 : this.state.fillOpacity,
                strokeWidth: this.state.strokeWidth==null ? StrokeWidth.defaultProps.value : this.state.strokeWidth,
                strokeColor: this.state.strokeColor==null ? StrokeColor.defaultProps.color : this.state.strokeColor,
                strokeOpacity: this.state.strokeOpacity ==null ? 1 : this.state.strokeOpacity,
            }

            style.options = options;
            style.symbolizerType = 'SINGLE'

        }else if(this.state.symbolizerType == 'GRADUATED'){
            let option = {
                columnName: this.state.columnName ==null? Column.defaultProps.value : this.state.columnName,
                // columnName: 'noise_value',
                markSize: this.state.markSize==null ? MarkerSize.defaultProps.value : this.state.markSize,
                classification:this.state.classification==null ? Classification.defaultProps.value : this.state.classification,
                classesNumber: this.state.classesNumber==null ? ClassesNum.defaultProps.value : this.state.classesNumber,
                fillPalette: this.state.fillPalette==null ? FillPalette.defaultProps.fillPalette : this.state.fillPalette,
                fillOpacity: this.state.fillOpacity==null ? 1 : this.state.fillOpacity,
                strokeWidth: this.state.strokeWidth==null ? StrokeWidth.defaultProps.value : this.state.strokeWidth,
                strokeColor: this.state.strokeColor==null ? StrokeColor.defaultProps.color : this.state.strokeColor,
                strokeOpacity: this.state.strokeOpacity ==null ? 1 : this.state.strokeOpacity,
                reverse: this.state.reverse ==null ? Reverse.defaultProps.value : this.state.reverse
            
            }

            style.options = option;
            style.symbolizerType = 'GRADUATED';

        }else if(this.state.symbolizerType == 'CATEGORIES'){
            let option = {
                columnName: this.state.columnName ==null? Column.defaultProps.value : this.state.columnName,
                markType: this.state.markType==null ? Marker.defaultProps.value : this.state.markType,
                markSize: this.state.markSize==null ? MarkerSize.defaultProps.value : this.state.markSize,
                strokeWidth: this.state.strokeWidth==null ? StrokeWidth.defaultProps.value : this.state.strokeWidth,
                strokeColor: this.state.strokeColor==null ? StrokeColor.defaultProps.color : this.state.strokeColor,
                strokeOpacity: this.state.strokeOpacity ==null ? 1 : this.state.strokeOpacity,
                fillColor: this.state.fillColor==null ? FillColor.defaultProps.color : this.state.fillColor,
                fillOpacity: this.state.fillOpacity==null ? 1 : this.state.fillOpacity,
            }
            let classes={}

            style.options = option;
            style.classes = this.props.rowUniqueInfo;
            style.symbolizerType = 'CATEGORIES';

        }else if(this.state.symbolizerType == 'BUBBLE'){
            let option = {
                columnName: this.state.columnName ==null? Column.defaultProps.value : this.state.columnName,
                classification:this.state.classification==null ? Classification.defaultProps.value : this.state.classification,
                classesNumber: this.state.classesNumber==null ? ClassesNum.defaultProps.value : this.state.classesNumber,
                fillPalette: this.state.fillPalette==null ? FillPalette.defaultProps.fillPalette : this.state.fillPalette,
                fillOpacity: this.state.fillOpacity==null ? 1 : this.state.fillOpacity,
                bubbleMinSize : this.state.minSize==null ? RangeSize.defaultProps.minSize : this.state.minSize,
                bubbleMaxSize : this.state.maxSize==null ? RangeSize.defaultProps.maxSize : this.state.maxSize,
            }
            style.options = option;
            style.symbolizerType = 'BUBBLE';
            
        }else if(this.state.symbolizerType == 'INTERPOLATION'){
            let option = {
                colorMapType: this.state.colorMapType == null? ColorMapType.defaultProps.value : this.state.colorMapType,
                classesNumber: this.state.classesNumber==null ? ClassesNum.defaultProps.value : this.state.classesNumber,
                colorMapPalette:this.state.colorMapPalette == null? ColorMapPalette.defaultProps.colorMapPalette : this.state.colorMapPalette,
                colorMapOpacity:this.state.colorMapOpacity == null? 1:this.state.colorMapOpacity
            }
            style.options = option;
            style.symbolizerType = 'COLORMAP';
            style.symbolType = 'RASTER';
        }else if(this.state.symbolizerType == 'DENSITY'){
            let option = {
                colorMapType: this.state.colorMapType == null? ColorMapType.defaultProps.value : this.state.colorMapType,
                classesNumber: this.state.classesNumber==null ? ClassesNum.defaultProps.value : this.state.classesNumber,
                colorMapPalette:this.state.colorMapPalette == null? ColorMapPalette.defaultProps.colorMapPalette : this.state.colorMapPalette,
                colorMapOpacity:this.state.colorMapOpacity == null? 1:this.state.colorMapOpacity
            }
            style.options = option;
            style.symbolizerType = 'COLORMAP';
            style.symbolType = 'RASTER';
        }
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

    symbolizerTypeChange(symbolizerType){
        // var options = this.props.styles.options
        this.setState({
            // fillColor:options.fillColor !=undefined ? options.fillColor: FillColor.defaultProps.color ,
            // fillOpacity:options.fillOpacity !=undefined ? options.fillOpacity: 1 ,
            // strokeColor:options.strokeColor !=undefined ? options.strokeColor:  StrokeColor.defaultProps.color,
            // strokeOpacity:options.strokeOpacity !=undefined ? options.strokeOpacity: 1 ,
            symbolizerType:symbolizerType
        })
        this.setState({
        columnName:null
        })
        if(symbolizerType=='CATEGORIES'){
            this.props.getRowUniqueInfo(null);
        }
        if(symbolizerType=='DENSITY'||symbolizerType=='INTERPOLATION'){
            this.setState({
                slideIndex:0
            })
        }
    }

    //KernelType
    handleChangeKernelType(event, index, value){
        this.setState({
            kernelType:value
        })
    }

    handleChangeSearchRadius(event){
        this.setState({
            searchRadius:event.target.value
        })
    }

    handleChangeCellSize(event){
        this.setState({
            cellSize:event.target.value
        })
    }

    handleChangeRadiusType(event, index, value){
        this.setState({
            raidusType:value
        })
    }

    handleChangePower(event){
        this.setState({
            power:event.target.value
        })
    }

    handleChangeNumberOfPoints(event){
        this.setState({
            numberOfPoints:event.target.value
        })
    }

    handleChangeDistance(event){
        this.setState({
            distance:event.target.value
        })
    }

    handleChangeTab(value){
        this.setState({
            slideIndex:value
        })
    }

    handleChangeCategory(event,index,value){
        this.props.handleChangeCategory(event,index,value)
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
            },
            unSelected:{
                boxSizing: 'content-box',
                height:100,
                minWidth:70,
                backgroundColor:'#F6EFEF',
                marginRight:20
            }

        }

		let style = null;

		if (this.state.symbolizerType == 'SINGLE') {
			// SINGLE
			// markType
			// markSize
			// fillColor
			// fillOpacity
			// outlineColor
			// outlineWidth
			// outlineOpacity

			style = (
                <Paper zDepth={0} style={{fontSize:13}}>
                    <Marker
                        value={this.state.markType}
                        handleChange={this.handleChangeMarker}
                    />
                    <Divider style={{marginTop:1}}/>
                    <MarkerSize
                        value={this.state.markSize}
                        handleChange={this.handleChangeMarkerSize}
                    />
                    <Divider style={{marginTop:1}}/>
                    {
                        this.state.fillColor != null ?
                            <FillColor
                                defaultColor={this.state.fillColor}
                                color={this.state.fillColor}
                                opacity={this.state.fillOpacity}
                                handleChange={this.handleChangeFillColor}
                            />
                            :
                            <FillColor
                                defaultColor={FillColor.defaultProps.color}
                                color={this.state.fillColor}
                                opacity={this.state.fillOpacity}
                                handleChange={this.handleChangeFillColor}
                            />
                    }

                    <Divider style={{marginTop:1}}/>
                    
                    <StrokeWidth
                        value={this.state.strokeWidth}
                        handleChange={this.handleChangeStrokeWidth}
                    />
                    <Divider style={{marginTop:1}}/>
                    {
                        this.state.strokeColor != null?
                        <StrokeColor
                            defaultColor={this.state.strokeColor}
                            color={this.state.strokeColor}
                            opacity={this.state.strokeOpacity}
                            handleChange={this.handleChangeStrokeColor}
                        />
                        :
                        <StrokeColor
                            defaultColor={StrokeColor.defaultProps.color}
                            color={this.state.strokeColor}
                            opacity={this.state.strokeOpacity}
                            handleChange={this.handleChangeStrokeColor}
                        />
                    }
                </Paper>
			);
        } 
        
        else if (this.state.symbolizerType == 'GRADUATED') {
			// GRADUATED 단계
			// inputDataset, propertyName, methodName, numClasses
			// markSize, brewerPaletteName, fillOpacity
			// outlineOpacity, outlineWidth, outlineColor, reverse
			style = (
				<Paper zDepth={0} style={{fontSize:13}}>
                    <Column
                        type={this.state.symbolizerType}
                        column={this.props.column}
                        value={this.state.columnName}
                        onChange={this.onChangeColumn}
                        handleChange={this.handleChangeColumn}
                    />
                    <Divider style={{marginTop:1}}/>

                    <MarkerSize
                        value={this.state.markSize}
                        handleChange={this.handleChangeMarkerSize}
                    />
                    
                    <Divider style={{marginTop:1}}/>

                    <Classification
                        value={this.state.classification}
                        handleChange={this.handleChangeClassification}
                    />
                    <Divider style={{marginTop:1}}/>
                    
                    <ClassesNum
                        value={this.state.classesNumber}
                        handleChange={this.handleChangeClassesNum}

                    />
                    <Divider style={{marginTop:1}}/>
                    
                    <FillPalette
                        fillPalette={this.state.fillPalette}
                        fillOpacity={this.state.fillOpacity}
                        handleChange={this.handleChangeFillPalette}
                        classesNumber={this.state.classesNumber}
                        handleChangeFillOpacity={this.handleChangeFillOpacity}
                    />
                    <Divider style={{marginTop:1}}/>
                    
                    <StrokeWidth
                        value={this.state.strokeWidth}
                        handleChange={this.handleChangeStrokeWidth}
                    />
                    <Divider style={{marginTop:1}}/>
                    
                    {
                        this.state.strokeColor != null?
                        <StrokeColor
                            defaultColor={this.state.strokeColor}
                            color={this.state.strokeColor}
                            opacity={this.state.strokeOpacity}
                            handleChange={this.handleChangeStrokeColor}
                        />
                        :
                        <StrokeColor
                            defaultColor={StrokeColor.defaultProps.color}
                            color={this.state.strokeColor}
                            opacity={this.state.strokeOpacity}
                            handleChange={this.handleChangeStrokeColor}
                        />
                    }
                    <Divider style={{marginTop:1}}/>

                    <Reverse 
                        value={this.state.reverse}
                        handleChange={this.handleChangeReverse}
                    />
                    
                  


                </Paper>
			);
		} else if (this.state.symbolizerType == 'CATEGORIES') {
            // 분류값 사용
            style = (
				<Paper zDepth={0} style={{fontSize:13}}>
                    <Column
                        type={this.state.symbolizerType}
                        column={this.props.column}
                        value={this.state.columnName}
                        onChange={this.onChangeColumn}
                        handleChange={this.handleChangeColumn}
                    />
                    <Divider style={{marginTop:1}}/>

                    <Marker
                        value={this.state.markType}
                        handleChange={this.handleChangeMarker}
                    />

                    <Divider style={{marginTop:1}}/>

                    <MarkerSize
                        value={this.state.markSize}
                        handleChange={this.handleChangeMarkerSize}
                    />

                    <Divider style={{marginTop:1}}/>

                    <StrokeWidth
                        value={this.state.strokeWidth}
                        handleChange={this.handleChangeStrokeWidth}
                    />

                    <Divider style={{marginTop:1}}/>

                    {this.state.strokeColor != null?
                        <StrokeColor
                            defaultColor={this.state.strokeColor}
                            color={this.state.strokeColor}
                            opacity={this.state.strokeOpacity}
                            handleChange={this.handleChangeStrokeColor}
                        />
                        :
                        <StrokeColor
                            defaultColor={StrokeColor.defaultProps.color}
                            color={this.state.strokeColor}
                            opacity={this.state.strokeOpacity}
                            handleChange={this.handleChangeStrokeColor}
                        />
                    }

                    <Divider style={{marginTop:1}}/>

                    <RadioButtonGroup name="selectStyle" valueSelected={this.props.selCategoryType} onChange={this.handleChangeCategory} style={{display:'flex', marginTop:20, marginBottom:20}}>
                        <RadioButton
                            value={0}
                            label="색상"
                            style={{width:'50%', paddingLeft:60}}
                        />
                        <RadioButton
                            value={1}
                            label="아이콘"
                            style={{width:'50%'}}
                        />
                    </RadioButtonGroup>

                    <Divider style={{marginTop:1}}/>

                    <RowColor
                        type='FILL'
                        rowInfo={this.props.rowUniqueInfo}
                        handleChangeFillColor={this.handleChangeFillColor}
                        handleChangeRowColor={this.handleChangeRowColor}
                        categoryType={this.props.selCategoryType}
                    />

                </Paper>
			);
            
		} else if (this.state.symbolizerType == 'BUBBLE') {
			style = (
				<Paper zDepth={0} style={{fontSize:13}}>
                    <Column
                        type={this.state.symbolizerType}
                        column={this.props.column}
                        value={this.state.columnName}
                        onChange={this.onChangeColumn}
                        handleChange={this.handleChangeColumn}
                    />
                    <Divider style={{marginTop:1}}/>

                    <Classification
                        value={this.state.classification}
                        handleChange={this.handleChangeClassification}
                    />
                    <Divider style={{marginTop:1}}/>

                    <ClassesNum
                        value={this.state.classesNumber}
                        handleChange={this.handleChangeClassesNum}

                    />
                    <Divider style={{marginTop:1}}/>

                    <FillPalette
                        fillPalette={this.state.fillPalette}
                        fillOpacity={this.state.fillOpacity}
                        handleChange={this.handleChangeFillPalette}
                        classesNumber={this.state.classesNumber}
                        handleChangeFillOpacity={this.handleChangeFillOpacity}
                    />
                    <Divider style={{marginTop:1}}/>

                    <RangeSize
                        minSize={this.state.minSize}
                        maxSize={this.state.maxSize}
                        handleChangeMin={this.handleChangeRangeSizeMin}
                        handleChangeMax={this.handleChangeRangeSizeMax}
                    />

               
                </Paper>
			);
        } else if (this.state.symbolizerType == 'INTERPOLATION') {
            style =(
                <Paper zDepth={0} style={{fontSize:13}}>
                    <Column
                        type={this.state.symbolizerType}
                        column={this.props.column}
                        value={this.state.columnName}
                        onChange={this.onChangeColumn}
                        handleChange={this.handleChangeColumn}
                    />

                    <Divider style={{marginTop:1}}/>

                    <Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center', height:66}}>
                        <Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
                            Power
                        </Paper>
                        <Paper zDepth={0} style={{width:'50%'}}>
                            <TextField
                                hintText="숫자를 입력해주세요"
                                value={this.state.power==null?'':this.state.power}
                                onChange={this.handleChangePower}
                                type='number'
                                style={{width:200}}
                            />
                        </Paper>
                    </Paper>

                    <Divider style={{marginTop:1}}/>

                    <RadiusType
                        value={this.state.raidusType}
                        handleChange={this.handleChangeRadiusType}
                    />

                    <Divider style={{marginTop:1}}/>

                    <Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center', height:66}}>
                        <Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
                            numberOfPoints
                        </Paper>
                        <Paper zDepth={0} style={{width:'50%'}}>
                            <TextField
                                hintText="숫자를 입력해주세요"
                                value={this.state.numberOfPoints==null?'':this.state.numberOfPoints}
                                onChange={this.handleChangeNumberOfPoints}
                                type='number'
                                style={{width:200}}
                            />
                        </Paper>
                    </Paper>

                    <Divider style={{marginTop:1}}/>

                    <Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center', height:66}}>
                        <Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
                        distance
                        </Paper>
                        <Paper zDepth={0} style={{width:'50%'}}>
                            <TextField
                                hintText="숫자를 입력해주세요"
                                value={this.state.distance==null?'':this.state.distance}
                                onChange={this.handleChangeDistance}
                                type='number'
                                style={{width:200}}
                            />
                        </Paper>
                    </Paper>
                    <RaisedButton 
                        label="적 용" 
                        style={{
                            marginTop:'10%',
                            marginLeft:'10%',
                            width:'30%'
                        }}
                        onClick={()=>this.setState({changeTypeModal:true})}
                    />
                </Paper>
            )
		} else if (this.state.symbolizerType == 'DENSITY') {
            style =(
                <Paper zDepth={0} style={{fontSize:13}}>
                    <KernelType
                        value={this.state.kernelType}
                        handleChange={this.handleChangeKernelType}
                    />
                    
                    <Divider style={{marginTop:1}}/>

                    <Column
                        type={this.state.symbolizerType}
                        column={this.props.column}
                        value={this.state.columnName}
                        onChange={this.onChangeColumn}
                        handleChange={this.handleChangeColumn}
                    />

                    <Divider style={{marginTop:1}}/>

                    <Paper zDepth={0} style={{ display:'flex',alignItems: 'center',justifyContent:'center', height:66}}>
                        <Paper zDepth={0} style={{width:'30%',textAlign:'left'}}>
                            SearchRadius
                        </Paper>
                        <Paper zDepth={0} style={{width:'50%'}}>
                            <TextField
                                hintText="숫자를 입력해주세요"
                                value={this.state.searchRadius}
                                onChange={this.handleChangeSearchRadius}
                                type='number'
                                style={{width:200}}
                            />
                        </Paper>
                    </Paper>

                    <Divider style={{marginTop:1}}/>

                    <CellSize
                        cellSize={this.state.cellSize}
                        handleChangeCellSize={this.handleChangeCellSize}
                    />
                    <RaisedButton 
                        label="적 용" 
                        style={{
                            marginTop:'10%',
                            marginLeft:'10%',
                            width:'30%'
                        }}
                        onClick={()=>this.setState({changeTypeModal:true})}
                    />
                </Paper>
            )
        }
        
        const changeType = [
            <FlatButton
                hoverColor="#FAFAFA"
                label="취소"
                onClick={()=>this.setState({changeTypeModal:false})}
            />,
            <FlatButton
                backgroundColor="#00BCD4"
                hoverColor="#B2EBF2"
                label="확인"
                onClick={()=>this.editRaster()}
            />
        ];

		return (
            <div style={{paddingTop:10,paddingLeft:10,paddingRight:10}}>
                <Paper zDepth={0} style={{paddingBottom: 10, fontSize: 13, borderBottom: '1px solid #eee', marginBottom:10}}>
                    <h2>스타일 도구</h2>
                </Paper>

                <Paper zDepth={0} style={{padding:3,paddingBottom: 10,display:'flex',widht:100,overflowX:'auto',fontSize:12}}>
                    <Paper style={this.state.symbolizerType=='SINGLE'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.symbolizerTypeChange('SINGLE') }>
                        <img src="/ngiiedu/assets/images/symbol_point_simp.png" style={{width:70,height:70}} alt="SINGLE"></img>
                        <div style={{width:70,height:30,textAlign:'center'}}>단일심볼</div>
                    </Paper>
                    <Paper style={this.state.symbolizerType=='GRADUATED'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.symbolizerTypeChange('GRADUATED') }>
                        <img src='/ngiiedu/assets/images/symbol_point_chor.png' style={{width:70,height:70}} alt="GRADUATED"></img>
                        <div style={{width:70,height:30,textAlign:'center'}}>단계구분</div>
                    </Paper>
                    <Paper style={this.state.symbolizerType=='CATEGORIES'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.symbolizerTypeChange('CATEGORIES') }>
                        <img src='/ngiiedu/assets/images/symbol_point_cate.png' style={{width:70,height:70}} alt="CATEGORIES"></img>
                        <div style={{width:70,height:30,textAlign:'center'}}>분류값사용</div>
                    </Paper>
                    <Paper style={this.state.symbolizerType=='BUBBLE'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.symbolizerTypeChange('BUBBLE') }>
                        <img src='/ngiiedu/assets/images/symbol_point_bubb.png' style={{width:70,height:70}} alt="BUBBLE"></img>
                        <div style={{width:70,height:30,textAlign:'center'}}>거품형지도</div>
                    </Paper>
                    <Paper style={this.state.symbolizerType=='INTERPOLATION'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.symbolizerTypeChange('INTERPOLATION') }>
                        <img src='/ngiiedu/assets/images/interpolation.png' style={{width:70,height:70}} alt="INTERPOLATION"></img>
                        <div style={{width:70,height:30,textAlign:'center'}}>보간법</div>
                    </Paper>
                    <Paper style={this.state.symbolizerType=='DENSITY'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.symbolizerTypeChange('DENSITY') }>
                        <img src='/ngiiedu/assets/images/density.png' style={{width:70,height:70}} alt="DENSITY"></img>
                        <div style={{width:70,height:30,textAlign:'center'}}>밀도지도</div>
                    </Paper>
                </Paper>
                {style}
                {this.state.symbolizerType!='DENSITY'&&this.state.symbolizerType!='INTERPOLATION'?
                    <RaisedButton 
                        label="적 용" 
                        style={{
                            marginTop:'10%',
                            marginLeft:'10%',
                            width:'30%'
                        }}
                        onClick={this.editStyle}
                    />
                :null}

                
                {/* 레이어 선택 삭제 모달 */}
                <Dialog
                    title="주제지도 프로세스"
                    actions={changeType}
                    modal={false}
                    open={this.state.changeTypeModal}
                    onRequestClose={()=>this.setState({changeTypeModal:false})}
                >
                    프로세스를 실행하면 타입이 바뀌어 기존의 스타일링을 할 수 없습니다. <br/>
                    프로세스를 진행하시겠습니까?
                </Dialog>
            </div>

		)
    }

};

PointSymbolizer.defaultProps = {
    symbolizerType :'SINGLE',
    layerId : null
}

export default PointSymbolizer;
