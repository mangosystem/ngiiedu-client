import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Step2Work extends React.Component {

	constructor() {
		super();
		this.state = {
      items: [],
      selectedRows: []
		};

    this.onSelectionWork = this.onSelectionWork.bind(this);
    this.isSelected = this.isSelected.bind(this);
	}

  componentDidMount() {
    console.log('componentDidMount');

    const {selectedModule} = this.state;
    ajaxJson(
      ['GET', apiSvr+'/modules/' + this.props.selectedModule + '/moduleWork.json'],
      null,
      function(res) {
        this.setState({
          items: res.response.data
        });

        let workIds = [];
        for (let n of this.props.selectedItems) {
          this.state.items.map(function(v, i) {
            if (n == v.idx) {
              console.log(n)
              workIds.push(i);
              return;
            }
          });
        }

        this.setState({
          selectedRows: workIds
        });

      }.bind(this),
      function(xhr, status, err) {
        alert('Error');
      }.bind(this)
    );

  }

  isSelected(index) {
    return this.state.selectedRows.indexOf(index) !== -1;
  }

  onSelectionWork(selectedRows) {
    this.setState({
      selectedRows: selectedRows
    });

    let workIds = [];
    for (let n of selectedRows) {
      this.state.items.map(function(v, i) {
        if (n == i) {
          workIds.push(v.idx);
          return;
        }
      });
    }

    console.log(workIds);
    this.props.onSelectedWorks(workIds);
  }

	render() {
		return (
      <div style={{textAlign: 'center'}}>
        {(() => {
          const {items} = this.state;
          if (items.length > 0) {
            let tableRows = (
              items.map((item, index) => (
                <TableRow
                  key={index}
                  selected={this.isSelected(index)}
                >
                  <TableRowColumn checked>{item.moduleWorkCourseType}</TableRowColumn>
                  <TableRowColumn>{item.moduleWorkName}</TableRowColumn>
                </TableRow>
              ))
            );

            return (
              <Table
      					selectable
      					multiSelectable
      					showCheckboxes
                onRowSelection={this.onSelectionWork}
      				>
      					<TableBody
      						displayRowCheckbox
      						deselectOnClickaway={false}
      					>
                  {tableRows}
                </TableBody>
              </Table>
            )
          } else {
            return(
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

export default Step2Work;
