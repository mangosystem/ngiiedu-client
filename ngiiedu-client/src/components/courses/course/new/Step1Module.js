import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';

import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

const style = {
  item: {
    selected: {
      width: 200,
      height: 250,
      margin: 10,
      display: 'inline-block',
      borderStyle: 'solid',
      borderColor: '#26C6DA'
    },
    unSelected: {
      width: 200,
      height: 250,
      margin: 10,
      display: 'inline-block',
      borderStyle: 'none'
    }
  }
};

class Step1Module extends React.Component {

	constructor() {
		super();
		this.state = {
      items: []
		};
    this.onSelectionModule = this.onSelectionModule.bind(this);
	}

  componentWillMount() {
    ajaxJson(
			['GET', apiSvr+'/modules.json'],
			null,
			function(res) {
        this.setState({
          items: res.response.data
        });
			}.bind(this),
			function(xhr, status, err) {
				alert('Error');
			}.bind(this)
		);
  }

  onSelectionModule(itemId) {
    this.props.onSelectedModule(itemId);
  }

	render() {
		return (
      <div style={{textAlign: 'center'}}>
      {(() => {
        const {items} = this.state;
        if (items.length > 0) {

          let itemCells = (
            items.map((item, i) => (
              <Paper
                key={i}
                style={this.props.selectedItem == item.idx ? style.item.selected : style.item.unSelected}
                zDepth={1}
              >
                <Paper
                  zDepth={0}
                  style={{
                    height:'150px',
                    backgroundImage: 'url(' + item.moduleMetadata + ')',
                    backgroundSize: 'auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    cursor: 'pointer'
                  }}
                  onClick={() => this.onSelectionModule(item.idx)}
                >
                  <IconButton iconClassName="muidocs-icon-custom-github" />
                </Paper>
                <p style={{paddingTop: '5px', paddingBottom: '5px'}}>{item.moduleName}</p>
                <br />
                <RaisedButton
                  label="상세정보"
                />
              </Paper>
            ))
          );

          return (
            <div>
              {itemCells}
            </div>
          )
        } else {
          return (
            <div>
              <img src="https://react.semantic-ui.com//assets/images/wireframe/paragraph.png" />
            </div>
          )
        }
      })()}
      </div>
		)
	}
}

export default Step1Module;
