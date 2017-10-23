import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import Checkbox from 'material-ui/Checkbox';
import ToggleRadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import ToggleRadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import Chip from 'material-ui/Chip';

// import Menu from 'material-ui/Menu';
// import MenuItem from 'material-ui/MenuItem';


// import checkBoxOutLineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';
// import PersonAdd from 'material-ui/svg-icons/social/person-add';
// import FontIcon from 'material-ui/FontIcon';
// import SvgIcon from 'material-ui/SvgIcon';

// ToggleRadioButtonChecked
// radio-button-checked

class TeamPopup extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            open: false,
            value : '',
        }
        
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.search = this.search.bind(this);
        this.enterKey = this.enterKey.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);

    }

    handleOpen(){
        this.setState({open: true});
    }

    handleClose(){
        this.setState({open: false});
    }

    search() {
        
        // let schoolLevel = this.state.schoolLevel;
        let keyword = this.state.value;

        alert(keyword);
        // this.props.searchList(schoolLevel, keyword);

    };

    enterKey(e) {
        if(e.keyCode==13){
            alert(e.keyCode);
        }
        // if (e.keyCode == 13) this.search();
    };

    handleRequestDelete () {
        alert('You clicked the delete button.');
     }
    

  render() {
    const bDivStyle = {
        width: '32%',
        height: '250px',
        marginBottom: '1%',
        marginLeft: '1%', 
        display: 'flex', 
        alignItems: 'center'
      }


    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    const dialLogStyle = {
        width:'100%',
        height:350
    }

    const leftStyle = {
        position:'absolute',
        left:0,
        width:'70%',
        height:'70%',
        border:'1px solid #ccc'
    }

    const rightStyle = {
        position:'absolute',
        right:0,
        width:'30%',
        height:'70%',
        border:'1px solid #ccc'
    }

    

    return (
    
            <div style={bDivStyle}>
                    <FloatingActionButton zDepth={0} style={{margin: '0 auto'}} onClick={()=>this.handleOpen()} >
                        <ContentAdd />
                    </FloatingActionButton>
                <Dialog
                title="A팀"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                contentStyle={{width:'30%',  maxWidth: 'none'}}
                >
                <div style={dialLogStyle}>
                    <div style={leftStyle}>
                        <Paper
                            style={{
                                maxWidth: '100%',
                                margin: 'auto',
                                marginTop:20,
                                height:'10%'
                            }}
                        >
                        <TextField
                            hintText="Search"
                            style={{
                                marginLeft: 20,
                                maxWidth: '80%'
                            }}
                            fullWidth={true}
                            underlineShow={false}
                            onChange={(event, value) => this.setState({value: value})}
                            onKeyDown={(event) => this.enterKey(event)}
                        />
                        <i
                            className="fa fa-search"
                            aria-hidden="true"
                            style={{
                                marginLeft: 10,
                                color: 'grey',
                                cursor: 'pointer'
                            }}
                            onMouseUp={this.search.bind(this)}
                        >
                        </i>
                    </Paper>
                    <div style={{overflow:'auto',height:'80%'}}>
                        <Divider style={{marginTop:10}}/>
                        <p>미배정</p>
                        <div style={{marginTop:10}}>
                            <Checkbox
                                style={{marginBottom:16}}
                                label="문수민"
                                labelposition="left"
                            />
                            <Checkbox
                                style={{marginBottom:16}}
                                label="문수민"
                                labelposition="left"
                            />
                            <Checkbox
                                style={{marginBottom:16}}
                                label="문수민"
                                labelposition="left"
                            />
                            <Checkbox
                                style={{marginBottom:16}}
                                label="문수민"
                                labelposition="left"
                            />

                        </div>

                        <Divider style={{marginTop:10}}/>
                        <p>A팀</p>
                        <div style={{marginTop:10}}>
                            <Checkbox
                                style={{marginBottom:16}}
                                label="문수민"
                                labelposition="left"
                                checked={true}
                                disabled={true}
                            />
                            <Checkbox
                                style={{marginBottom:16}}
                                label="문수민"
                                labelposition="left"
                                checked={true}
                                disabled={true}
                            />
                            <Checkbox
                                style={{marginBottom:16}}
                                label="문수민"
                                labelposition="left"
                                checked={true}
                                disabled={true}
                            />
                            <Checkbox
                                style={{marginBottom:16}}
                                label="문수민"
                                labelposition="left"
                                checked={true}
                                disabled={true}
                            />

                        </div>

                        <Divider style={{marginTop:10}}/>
                        <p>B팀</p>
                        <div style={{marginTop:10}}>
                            <Checkbox
                                style={{marginBottom:16}}
                                label="문수민"
                                labelposition="left"
                                checked={true}
                                disabled={true}
                            />
                            <Checkbox
                                style={{marginBottom:16}}
                                label="문수민"
                                labelposition="left"
                                checked={true}
                                disabled={true}
                            />
                            <Checkbox
                                style={{marginBottom:16}}
                                label="문수민"
                                labelposition="left"
                                checked={true}
                                disabled={true}
                            />
                            <Checkbox
                                style={{marginBottom:16}}
                                label="문수민"
                                labelposition="left"
                                checked={true}
                                disabled={true}
                            />

                        </div>
                    </div>

                </div>
                    <div style={rightStyle}>
                        <Chip
                            style={{margin: 4}}
                            onRequestDelete={this.handleRequestDelete}

                        >
                            Text Chip
                        </Chip>
                        <Chip
                            style={{margin: 4}}
                            onRequestDelete={this.handleRequestDelete}

                        >
                            Text Chip
                        </Chip>
                        <Chip
                            style={{margin: 4}}
                            onRequestDelete={this.handleRequestDelete}

                        >
                            Text Chip
                        </Chip>
                        <Chip
                            style={{margin: 4}}
                            onRequestDelete={this.handleRequestDelete}

                        >
                            Text Chip
                        </Chip>
                    </div>    
                </div>
                </Dialog>
            </div>
    );
  }
}

export default TeamPopup;

