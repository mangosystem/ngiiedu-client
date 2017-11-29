import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import { cyan500 } from 'material-ui/styles/colors';


class EditorPanel extends React.Component {

  constructor(props){
    super(props);


  }

  componentWillReceiveProps(nextProps){

    // const { oEditors } = this.state;

    // if (oEditors.getById) {
    //   oEditors.getById["smarteditor"].exec("SET_IR", [""]); //내용초기화 
    //   oEditors.getById["smarteditor"].exec("PASTE_HTML", [nextProps.description]);
    // }

    CKEDITOR.instances.smarteditor.setData(nextProps.description);

  }
  
  componentDidMount() {
    

    CKEDITOR.replace( 'smarteditor', {
      // Define the toolbar: http://docs.ckeditor.com/#!/guide/dev_toolbar
      // The standard preset from CDN which we used as a base provides more features than we need.
      // Also by default it comes with a 2-line toolbar. Here we put all buttons in a single row.
      toolbar: [
        { name: 'document', items: ['Source'] },
        { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
        { name: 'styles', items: [ 'Styles', 'Format' ] },
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
        { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
        { name: 'links', items: [ 'Link', 'Unlink' ] },
        { name: 'insert', items: [ 'Image', 'EmbedSemantic', 'Table' ] },
        { name: 'tools', items: [ 'Maximize' ] },
        { name: 'editing', items: [ 'Scayt' ] }
      ],
      // Since we define all configuration options here, let's instruct CKEditor to not load config.js which it does by default.
      // One HTTP request less will result in a faster startup time.
      // For more information check http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-customConfig
      customConfig: '',
      // Enabling extra plugins, available in the standard-all preset: http://ckeditor.com/presets-all
      extraPlugins: 'autoembed,embedsemantic,image2,pastebase64',
      // Remove the default image plugin because image2, which offers captions for images, was enabled above.
      removePlugins: 'image,uploadimage,uploadfile',
      // Make the editing area bigger than default.
      height: 600,
      // An array of stylesheets to style the WYSIWYG area.
      // Note: it is recommended to keep your own styles in a separate file in order to make future updates painless.
      contentsCss: [ 'https://cdn.ckeditor.com/4.7.3/standard-all/contents.css', 'mystyles.css' ],
      // This is optional, but will let us define multiple different styles for multiple editors using the same CSS file.
      bodyClass: 'article-editor',
      // Reduce the list of block elements listed in the Format dropdown to the most commonly used.
      format_tags: 'p;h1;h2;h3;pre',
      // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
      removeDialogTabs: 'image:advanced;link:advanced',
      // Define the list of styles which should be available in the Styles dropdown list.
      // If the "class" attribute is used to style an element, make sure to define the style for the class in "mystyles.css"
      // (and on your website so that it rendered in the same way).
      // Note: by default CKEditor looks for styles.js file. Defining stylesSet inline (as below) stops CKEditor from loading
      // that file, which means one HTTP request less (and a faster startup).
      // For more information see http://docs.ckeditor.com/#!/guide/dev_styles
      stylesSet: [
        /* Inline Styles */
        { name: 'Marker',			element: 'span', attributes: { 'class': 'marker' } },
        { name: 'Cited Work',		element: 'cite' },
        { name: 'Inline Quotation',	element: 'q' },
        /* Object Styles */
        {
          name: 'Special Container',
          element: 'div',
          styles: {
            padding: '5px 10px',
            background: '#eee',
            border: '1px solid #ccc'
          }
        },
        {
          name: 'Compact table',
          element: 'table',
          attributes: {
            cellpadding: '5',
            cellspacing: '0',
            border: '1',
            bordercolor: '#ccc'
          },
          styles: {
            'border-collapse': 'collapse'
          }
        },
        { name: 'Borderless Table',		element: 'table',	styles: { 'border-style': 'hidden', 'background-color': '#E6E6FA' } },
        { name: 'Square Bulleted List',	element: 'ul',		styles: { 'list-style-type': 'square' } },
        /* Widget Styles */
        // We use this one to style the brownie picture.
        { name: 'Illustration', type: 'widget', widget: 'image', attributes: { 'class': 'image-illustration' } },
        // Media embed
        { name: '240p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-240p' } },
        { name: '360p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-360p' } },
        { name: '480p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-480p' } },
        { name: '720p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-720p' } },
        { name: '1080p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-1080p' } }
      ]
    } );

    
  }

  submit() {

    // var oEditors = this.state.oEditors;

    // oEditors.getById["smarteditor"].exec("UPDATE_CONTENTS_FIELD", []);

    // this.validation();
    //this.props.modifyDescription(contents);
    
    
  }
  
  
  validation() {
    
    // var oEditors = this.state.oEditors;
    
    // var contents = $.trim(oEditors[0].getContents()); 
    
    // console.log("validation() : ");
    // console.log(contents);
    
    
    let contents = CKEDITOR.instances.smarteditor.getData();
    console.log(contents);
    
    this.props.modifyDescription(contents,this.props.layerId);
    this.props.onChangeEditorMode();


  }

  render() {

    const style = {
      editStyle: {
        padding: 20
      },
      none: {
        display: 'none'
      }
    };


    return (
      <div style={ this.props.editorMode ? style.editStyle : style.none }>
        <Paper zDepth={0} style={{paddingBottom: 10, fontSize: 15, borderBottom: '1px solid #eee'}}>
          <h2>컨텐츠 입력</h2>
        </Paper>
        <Paper zDepth={0} style={{ width: '270px', height: '90%' }}>
          <textarea 
            name="smarteditor" 
            id="smarteditor" 
            rows="50" 
            cols="35" 
            defaultValue={this.props.description}
            style={{ minWidth: '260px', height: '600px', MaxHeight: '600px' }}
          ></textarea>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <FlatButton
              label="취소"
              onClick={this.props.onChangeEditorMode}
            />
            <FlatButton
              label="적용"
              backgroundColor={cyan500}
              style={{color: 'white'}}
              onClick={this.validation.bind(this)}
            />
          </div>
        </Paper>
      </div>
    );
  }
};

EditorPanel.propTypes = {
	editorMode: React.PropTypes.bool
};

EditorPanel.defaultProps = {
	editorMode: false
};

export default EditorPanel;
