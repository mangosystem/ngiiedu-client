import React from 'react';
// import { Grid, Segment, List } from 'semantic-ui-react'

import Column from './material/Column.js';
import Classification from './material/Classification.js';
import ClassesNum from './material/ClassesNum.js';
import RangeSize from './material/RangeSize.js';
import Marker from './material/Marker.js';
import MarkerSize from './material/MarkerSize.js';
import FillColor from './material/FillColor.js';
import FillPalette from './material/FillPalette.js';
import StrokeWidth from './material/StrokeWidth.js';
import StrokeColor from './material/StrokeColor.js';
import Reverse from './material/Reverse.js';


import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { cyan500 } from 'material-ui/styles/colors';


class PointSymbolizer extends React.Component {

	constructor() {
		super();
		this.state = {
            styleType:'SINGLE',

			markerType: null,
			markerSize: null,

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

            column: ['컬럼1','컬럼2'],
            layerId:null,

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

        this.editStyle = this.editStyle.bind(this);
        this.styleTypeChange = this.styleTypeChange.bind(this);
        
	}
///
// componentDidMount() { console.log('componentDidMount'); }
//   shouldComponentUpdate(nextProps, nextState) { console.log('shouldComponentUpdate'); return true / false; } 
//   componentWillUpdate(nextProps, nextState) { console.log('componentWillUpdate'); } 
//   componentDidUpdate(prevProps, prevState) { console.log('componentDidUpdate'); } 
//   componentWillUnmount() { console.log('componentWillUnmount'); } 


///


	componentWillReceiveProps(nextProps) {
        console.debug('PointSymbolizer componentWillReceiveProps');
        
        console.dir(this.props.styles);
        if (this.props.styles != null) {
            this.setState({
                styleType: this.props.styles.styleType != undefined ? this.props.styles.styleType : 'SINGLE',
            })
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
					markerType: options.markerType != undefined ? options.markerType : null,
					markerSize: options.markerSize != undefined ? options.markerSize : null,

					fillPalette: options.fillPalette != undefined ? options.fillPalette : null,
					fillColor: options.fillColor != undefined ? options.fillColor : null,
					fillOpacity: options.fillOpacity != undefined ? Number(options.fillOpacity) : null,

					strokeWidth: options.strokeWidth != undefined ? Number(options.strokeWidth) : null,
					strokeColor: options.strokeColor != undefined ? options.strokeColor : null,
					strokeOpacity: options.strokeOpacity != undefined ? Number(options.strokeOpacity) : null,

					columnName: options.columnName != undefined ? options.columnName : null,
					classification: options.classification != undefined ? options.classification : null,
					classesNumber: options.classesNumber != undefined ? Number(options.classesNumber) : null,

					reverse: options.reverse != undefined ? options.reverse : null,

					column: this.props.column
				});
			}
		} else {
			this.setState({
				column: this.props.column
			});
		}

	}

	componentWillMount() {
        console.debug('PointSymbolizer componentWillMount');
        
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
        console.log('markerType : ' + value);
        this.setState({
            markerType:value
        })

    }

    //MarkerSize
    handleChangeMarkerSize(event, index, value){
        console.log('markerSize : ' + value);
        this.setState({
            markerSize:value
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

        console.log('fillColor : '+ color);

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

        console.log('StrokeColor : '+ color);
        
    }

    //StrokeWidth
    handleChangeStrokeWidth(event, index, value){
        console.log('StrokeWidth : ' + value);
        this.setState({
            strokeWidth:value
        })
    }

    //Column
    handleChangeColumn(event, index, value){
        console.log('Column : '+ value);
        this.setState({
            columnName:value
        })
    }

	onChangeColumn(evt, data) {

    }

    //Classification
    handleChangeClassification(event, index, value){
        console.log('Classification : '+ value);
        this.setState({
            classification:value
        })
    }

    //ClassesNum
    handleChangeClassesNum(event, index, value){
        console.log('ClassesNum : '+ value);
        this.setState({
            classesNumber:value
        })
    }

    //Reverse
    handleChangeReverse(event, bool){
        console.log('Reverse : '+bool);
        this.setState({
            reverse:bool
        })
    }

    //RangeSize - min
    handleChangeRangeSizeMin(event, index, value){
        console.log('minSize : '+value);
        this.setState({
            minSize:value
        })
    }

    //RangeSize - max
    handleChangeRangeSizeMax(event, index, value){
        console.log('maxSize : '+value);
        this.setState({
            maxSize:value
        })
    }

    //FillPalette
    handleChangeFillPalette(event, index, value){
        console.log('FillPalette : '+value);
        this.setState({
            fillPalette:value
        })
    }

    //FillPalette
    handleChangeFillOpacity(event, index, value){
        console.log('FillOpacity : '+value);
        this.setState({
            fillOpacity:value
        })
    }

    //editStyle
    editStyle(){
        let style={
            styleType:null,
            options:null,
            isClassified:false,
            geometryType:"MULTIPOLYGON"
        }
        if(this.state.styleType == 'SINGLE'){

            let options ={
                markerType: this.state.markerType==null ? Marker.defaultProps.value : this.state.markerType,
                markerSize: this.state.markerSize==null ? MarkerSize.defaultProps.value : this.state.markerSize,
                fillColor: this.state.fillColor==null ? FillColor.defaultProps.color : this.state.fillColor,
                fillOpacity: this.state.fillOpacity==null ? 1 : this.state.fillOpacity,
                strokeWidth: this.state.strokeWidth==null ? StrokeWidth.defaultProps.value : this.state.strokeWidth,
                strokeColor: this.state.strokeColor==null ? this.state.defaultStrokeColor : this.state.strokeColor,
                strokeOpacity: this.state.strokeOpacity ==null ? 1 : this.state.strokeOpacity,
            }

            style.options = options;
            style.styleType = 'SINGLE'
            console.dir(style);

        }else if(this.state.styleType == 'GRADUATED'){
            let option = {
                columnName: this.state.columnName ==null? this.props.column[0] : this.state.columnName,
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
            style.styleType = 'GRADUATED';
            console.log(style);

        }else if(this.state.styleType == 'CATEGORIES'){
            let option = {
                columnName: this.state.columnName ==null? this.props.column[0] : this.state.columnName,
                strokeWidth: this.state.strokeWidth==null ? StrokeWidth.defaultProps.value : this.state.strokeWidth,
                strokeColor: this.state.strokeColor==null ? StrokeColor.defaultProps.color : this.state.strokeColor,
                strokeOpacity: this.state.strokeOpacity ==null ? 1 : this.state.strokeOpacity,
            
            }
            style.options = option;
            style.styleType = 'CATEGORIES';
            console.log(style);

        }else if(this.state.styleType == 'BUBBLE'){
            let option = {
                columnName: this.state.columnName ==null? this.props.column[0] : this.state.columnName,
                classification:this.state.classification==null ? Classification.defaultProps.value : this.state.classification,
                classesNumber: this.state.classesNumber==null ? ClassesNum.defaultProps.value : this.state.classesNumber,
                fillPalette: this.state.fillPalette==null ? FillPalette.defaultProps.fillPalette : this.state.fillPalette,
                fillOpacity: this.state.fillOpacity==null ? 1 : this.state.fillOpacity,
                minSize : this.state.minSize==null ? RangeSize.defaultProps.minSize : this.state.minSize,
                maxSize : this.state.maxSize==null ? RangeSize.defaultProps.maxSize : this.state.maxSize,
            }
            style.options = option;
            style.styleType = 'BUBBLE';
            console.log(style);
            
        }else if(this.state.styleType == 'HEATMAP'){

        }
    }

    styleTypeChange(styleType){
        var options = this.props.styles.options
        this.setState({
            fillColor:options.fillColor !=undefined ? options.fillColor: undefined ,
            fillOpacity:options.fillOpacity !=undefined ? options.fillOpacity: undefined ,
            strokeColor:options.strokeColor !=undefined ? options.strokeColor: undefined ,
            strokeOpacity:options.strokeOpacity !=undefined ? options.strokeOpacity: undefined ,
            styleType:styleType
        })
    }

	render() {
        let styleStyle={
            selected:{
                boxSizing: 'content-box',
                height:100,
                minWidth:70,
                backgroundColor:'#F6EFEF',
                border: '3px solid',
                borderColor: cyan500
            },
            unSelected:{
                boxSizing: 'content-box',
                height:100,
                minWidth:70,
                backgroundColor:'#F6EFEF',
            }

        }
		let style = null;

		if (this.state.styleType == 'SINGLE') {
			// SINGLE
			// markerType
			// markerSize
			// fillColor
			// fillOpacity
			// outlineColor
			// outlineWidth
			// outlineOpacity

			style = (
                <Paper zDepth={0} style={{fontSize:13}}>
                    <Marker
                        value={this.state.markerType}
                        handleChange={this.handleChangeMarker}
                    />
                    <Divider style={{marginTop:1}}/>
                    <MarkerSize
                        value={this.state.markerSize}
                        handleChange={this.handleChangeMarkerSize}
                    />
                    <Divider style={{marginTop:1}}/>
                    {
                        this.state.defaultFillColor != null ?
                            <FillColor
                                defaultColor={this.state.defaultFillColor}
                                color={this.state.fillColor}
                                opacity={this.state.fillOpacity}
                                handleChange={this.handleChangeFillColor}
                            />
                            :
                            <FillColor
                                defaultColor={'#3182bd'}
                                color={this.state.fillColor}
                                opacity={this.state.fillOpacity}
                                handleChange={this.handleChangeFillColor}
                            />
                    }
                    <Divider style={{marginTop:1}}/>
                    {
                        this.state.defaultStrokeColor != null?
                        <StrokeColor
                            defaultColor={this.state.defaultStrokeColor}
                            color={this.state.strokeColor}
                            opacity={this.state.strokeOpacity}
                            handleChange={this.handleChangeStrokeColor}
                        />
                        :
                        <StrokeColor
                            defaultColor={'#3182bd'}
                            color={this.state.strokeColor}
                            opacity={this.state.strokeOpacity}
                            handleChange={this.handleChangeStrokeColor}
                        />
                    }

                    <Divider style={{marginTop:1}}/>
                    
                    <StrokeWidth
                        value={this.state.strokeWidth}
                        handleChange={this.handleChangeStrokeWidth}
                    />
                </Paper>
			);
        } 
        
        else if (this.state.styleType == 'GRADUATED') {
			// GRADUATED 단계
			// inputDataset, propertyName, methodName, numClasses
			// markerSize, brewerPaletteName, fillOpacity
			// outlineOpacity, outlineWidth, outlineColor, reverse
			style = (
				<Paper zDepth={0} style={{fontSize:13}}>
                    <Column
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
                    
                    <StrokeWidth
                        value={this.state.strokeWidth}
                        handleChange={this.handleChangeStrokeWidth}
                    />
                    <Divider style={{marginTop:1}}/>
                    
                    {
                        this.state.defaultStrokeColor != null?
                        <StrokeColor
                            defaultColor={this.state.defaultStrokeColor}
                            color={this.state.strokeColor}
                            opacity={this.state.strokeOpacity}
                            handleChange={this.handleChangeStrokeColor}
                        />
                        :
                        <StrokeColor
                            defaultColor={'#3182bd'}
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
		} else if (this.state.styleType == 'CATEGORIES') {
            // 분류값 사용
            style = (
				<Paper zDepth={0} style={{fontSize:13}}>
                    <Column
                        column={this.state.column}
                        value={this.state.columnName}
                        onChange={this.onChangeColumn}
                        handleChange={this.handleChangeColumn}
                    />
                    <Divider style={{marginTop:1}}/>

                    <StrokeWidth
                        value={this.state.strokeWidth}
                        handleChange={this.handleChangeStrokeWidth}
                    />
                    <Divider style={{marginTop:1}}/>

                    {
                        this.state.defaultStrokeColor != null?
                        <StrokeColor
                            defaultColor={this.state.defaultStrokeColor}
                            color={this.state.strokeColor}
                            opacity={this.state.strokeOpacity}
                            handleChange={this.handleChangeStrokeColor}
                        />
                        :
                        <StrokeColor
                            defaultColor={'#3182bd'}
                            color={this.state.strokeColor}
                            opacity={this.state.strokeOpacity}
                            handleChange={this.handleChangeStrokeColor}
                        />
                        
                    }

                </Paper>
			);
            
		} else if (this.state.styleType == 'BUBBLE') {
			style = (
				<Paper zDepth={0} style={{fontSize:13}}>
                <Column
                    column={this.state.column}
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
		} else if (this.state.styleType == 'HEATMAP') {
            style =(
                <div>
                    
                </div>
            )
		}

      

		return (
            <div style={{paddingTop:10,paddingLeft:10,paddingRight:10}}>
                <Paper zDepth={0} style={{paddingBottom: 10, fontSize: 13, borderBottom: '1px solid #eee', marginBottom:10}}>
                    <h2>스타일 도구</h2>
                </Paper>   

                <Paper zDepth={0} style={{padding:3,paddingBottom: 10,display:'flex',widht:100,overflowY:'auto',fontSize:12,height:135}}>
                    <Paper style={this.state.styleType=='SINGLE'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.styleTypeChange('SINGLE') }>
                        <img src="/assets/images/single.png" style={{width:70,height:70}}></img>
                        <div style={{width:70,height:30,textAlign:'center'}}>단일심볼</div>
                    </Paper>
                    <Paper style={this.state.styleType=='GRADUATED'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.styleTypeChange('GRADUATED') }>
                        <img src='/assets/images/graduated.png' style={{width:70,height:70}}></img>
                        <div style={{width:70,height:30,textAlign:'center'}}>단계구분</div>
                    </Paper>
                    <Paper style={this.state.styleType=='CATEGORIES'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.styleTypeChange('CATEGORIES') }>
                        <img src='/assets/images/categories.png' style={{width:70,height:70}}></img>
                        <div style={{width:70,height:30,textAlign:'center'}}>분류값사용</div>
                    </Paper>
                    <Paper style={this.state.styleType=='BUBBLE'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.styleTypeChange('BUBBLE') }>
                        <img src='/assets/images/bubble.png' style={{width:70,height:70}}></img>
                        <div style={{width:70,height:30,textAlign:'center'}}>거품형지도</div>
                    </Paper>
                    <Paper style={this.state.styleType=='HEATMAP'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.styleTypeChange('HEATMAP') }>
                        <img src='/assets/images/heatmap.png' style={{width:70,height:70}}></img>
                        <div style={{width:70,height:30,textAlign:'center'}}>온도지도</div>
                    </Paper>
                </Paper>
                {style}
                
                <RaisedButton 
                    label="취 소" 
                    style={{
                        marginTop:'10%',
                        marginLeft:'10%',
                        width:'30%'
                    }}
                    onClick={this.props.closePanel}
                />
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

PointSymbolizer.defaultProps = {
    styleType :'SINGLE',
    layerId : null
}

export default PointSymbolizer;
