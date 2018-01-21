import React from 'react';
// import { Grid, Segment, List } from 'semantic-ui-react'

import Column from '../material/Column.js';
import Classification from '../material/Classification.js';
import ClassesNum from '../material/ClassesNum.js';
import RangeSize from '../material/RangeSize.js';
import FillColor from '../material/FillColor.js';
import FillPalette from '../material/FillPalette.js';
import StrokeWidth from '../material/StrokeWidth.js';
import StrokeColor from '../material/StrokeColor.js';
import Reverse from '../material/Reverse.js';
import RowColor from '../material/RowColor.js';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { cyan500 } from 'material-ui/styles/colors';


class PolygonSymbolizer extends React.Component {

  constructor() {
    super();
    this.state = {
      symbolizerType:'SINGLE',

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
      // randomFillColor:null,
      // randomStrokeColor:null
    }

    this.onChangeColumn = this.onChangeColumn.bind(this);
    
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
    this.handleChangeRowColor = this.handleChangeRowColor.bind(this);

    this.editStyle = this.editStyle.bind(this);
    this.symbolizerTypeChange = this.symbolizerTypeChange.bind(this);

  }


  componentDidMount(nextProps) {
    if (this.props.styles != null) {
      this.setState({
        symbolizerType: this.props.styles.symbolizerType != undefined ? this.props.styles.symbolizerType : 'SINGLE',
      });
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

          fillPalette: options.fillPalette != undefined ? options.fillPalette : FillPalette.defaultProps.fillPalette ,
          fillColor: options.fillColor != undefined ? options.fillColor : FillColor.defaultProps.color,
          fillOpacity: options.fillOpacity != undefined ? Number(options.fillOpacity) : 1,

          strokeWidth: options.strokeWidth != undefined ? Number(options.strokeWidth) : StrokeWidth.defaultProps.value,
          strokeColor: options.strokeColor != undefined ? options.strokeColor : StrokeColor.defaultProps.color,
          strokeOpacity: options.strokeOpacity != undefined ? Number(options.strokeOpacity) : 1,

          columnName: options.columnName != undefined ? options.columnName : this.props.columnName,
          classification: options.classification != undefined ? options.classification : Classification.defaultProps.value,
          classesNumber: options.classesNumber != undefined ? Number(options.classesNumber) : ClassesNum.defaultProps.value,

          reverse: options.reverse != undefined ? options.reverse : Reverse.defaultProps.value,

          //column: nextProps.column
        });
      }
    } else {
    // this.setState({
    // 	column: nextProps.column
    // });
    }
  }

  componentWillMount() {
    console.debug('PointSymbolizer componentWillMount');
    //defaultRandomColor
    // var letters = '0123456789ABCDEF';
    // var defaultFillColor = '#';
    // var defaultStrokeColor = '#';
    // for (var i = 0; i < 6; i++) {
    //   defaultFillColor += letters[Math.floor(Math.random() * 16)];
    //   defaultStrokeColor += letters[Math.floor(Math.random() * 16)];
    // }        

    // this.setState({
    //   randomFillColor: defaultFillColor,
    //   randomStrokeColor: defaultStrokeColor
    // })
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
    })
    if(this.state.symbolizerType == 'CATEGORIES'){
        this.props.getRowUniqueInfo(value);
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

  handleChangeRowColor(color, row){
    this.props.handleChangeRowColor(color, row)
}

  //editStyle
  editStyle(){
    let style={
      symbolizerType:null,
      options:null,
      isClassified:false,
      symbolType:'POLYGON'
    }
    if(this.state.symbolizerType == 'SINGLE'){

      let options ={
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
        strokeWidth: this.state.strokeWidth==null ? StrokeWidth.defaultProps.value : this.state.strokeWidth,
        strokeColor: this.state.strokeColor==null ? StrokeColor.defaultProps.color : this.state.strokeColor,
        strokeOpacity: this.state.strokeOpacity ==null ? 1 : this.state.strokeOpacity,
        fillColor: this.state.fillColor==null ? FillColor.defaultProps.color : this.state.fillColor,
        fillOpacity: this.state.fillOpacity==null ? 1 : this.state.fillOpacity,
      }
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
        marginRight:20,
        marginTop:10
      },
      unSelected:{
        boxSizing: 'content-box',
        height:100,
        minWidth:70,
        backgroundColor:'#F6EFEF',
        marginRight:20,
        marginTop:10
      }
    }
		let style = null;

    if (this.state.symbolizerType == 'SINGLE') {
      // SINGLE
      // fillColor
      // fillOpacity
      // outlineColor
      // outlineWidth
      // outlineOpacity

      style = (
        <Paper zDepth={0} style={{fontSize:13}}>
          {this.state.fillColor != null ?
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

        </Paper>
      );
    }else if (this.state.symbolizerType == 'GRADUATED') {
      // GRADUATED 단계
      // inputDataset, propertyName, methodName, numClasses
      // brewerPaletteName, fillOpacity
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
            column={this.props.column}
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

          <RowColor
            type='FILL'
            rowInfo={this.props.rowUniqueInfo}
            handleChangeFillColor={this.handleChangeFillColor}
            handleChangeRowColor={this.handleChangeRowColor}
            categoryType={0}
          />

        </Paper>
      );
    } else if (this.state.symbolizerType == 'BUBBLE') {
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

          <RangeSize
            minSize={this.state.minSize}
            maxSize={this.state.maxSize}
            handleChangeMin={this.handleChangeRangeSizeMin}
            handleChangeMax={this.handleChangeRangeSizeMax}
          />
        </Paper>
      );
    }

    return (
      <div style={{paddingTop:10,paddingLeft:10,paddingRight:10}}>
        <Paper zDepth={0} style={{paddingBottom: 10, fontSize: 13, borderBottom: '1px solid #eee', marginBottom:10}}>
          <h2>스타일 도구</h2>
        </Paper>

        <Paper zDepth={0} style={{padding:3,paddingBottom: 10,display:'flex',widht:100,overflowY:'auto',fontSize:12,height:135, marginLeft:15, marginLeft:15}}>
          <Paper style={this.state.symbolizerType=='SINGLE'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.symbolizerTypeChange('SINGLE') }>
            <img src="/ngiiedu/assets/images/symbol_polygon_simp.png" style={{width:70,height:70}} alt="SINGLE"></img>
            <div style={{width:70,height:30,textAlign:'center'}}>단일심볼</div>
          </Paper>
          <Paper style={this.state.symbolizerType=='GRADUATED'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.symbolizerTypeChange('GRADUATED') }>
            <img src='/ngiiedu/assets/images/symbol_polygon_chor.png' style={{width:70,height:70}} alt="GRADUATED"></img>
            <div style={{width:70,height:30,textAlign:'center'}}>단계구분</div>
          </Paper>
          <Paper style={this.state.symbolizerType=='CATEGORIES'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.symbolizerTypeChange('CATEGORIES') }>
            <img src='/ngiiedu/assets/images/symbol_polygon_cate.png' style={{width:70,height:70}} alt="CATEGORIES"></img>
            <div style={{width:70,height:30,textAlign:'center'}}>분류값사용</div>
          </Paper>
          <Paper style={this.state.symbolizerType=='BUBBLE'? styleStyle.selected : styleStyle.unSelected} onClick={()=>this.symbolizerTypeChange('BUBBLE') }>
            <img src='/ngiiedu/assets/images/symbol_point_bubb.png' style={{width:70,height:70}} alt="BUBBLE"></img>
            <div style={{width:70,height:30,textAlign:'center'}}>거품형지도</div>
          </Paper>
        </Paper>
        {style}

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

PolygonSymbolizer.defaultProps = {
  symbolizerType :'SINGLE',
  layerId : null
}

export default PolygonSymbolizer;
