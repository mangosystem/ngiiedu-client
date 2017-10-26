import React from 'react';
import { withRouter } from "react-router-dom";

//팝업창
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { cyan500 } from 'material-ui/styles/colors';
import IconFullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import IconClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';


class AuthkeyInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const divStyle = {
      fontSize: '8em', 
      lineHeight: '1.5em',
      textAlign: 'center', 
      color: 'white',
      marginBottom: 72
    };

    const styles = {
      smallIcon: {
        width: 36,
        height: 36,
        color: 'white'
      },
      small: {
        width: 72,
        height: 72,
        padding: 16,
        verticalAlign: 'middle'
      }
    };

    const closeButton = [
      <div key="0" style={{background: cyan500, width: '100%', textAlign: 'right'}}>
        <IconButton
          iconStyle={styles.smallIcon}
          style={{marginRight: '10px', padding: 16, width: 72, height: 72}}
          onClick={this.props.changeAuthkeyOpen}
        >
          <IconClose />
        </IconButton>
      </div>
    ];

    return (
      <div>
        <Dialog
          onRequestClose={this.props.changeAuthkeyOpen}
          title={closeButton}
          open={this.props.authkeyOpen}
          bodyStyle={{background: cyan500}}
        >
          <div style={divStyle}>
            {this.props.authkey}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(AuthkeyInfo);
