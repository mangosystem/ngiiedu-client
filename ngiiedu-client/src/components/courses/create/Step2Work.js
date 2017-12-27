import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import NewDataset from './NewDataset.js';


class Step2Work extends React.Component {

	constructor() {
		super();
		this.state = {
      items: [],
      selectedRows: [],
      datasetWorkIdx:'',
      newDataset:false, //데이터셋 생성 창
      moduleId : '',//moduleId 현장실습 default 값을 정하기 위해서 ...
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
        let data = res.response.data;
        this.setState({
          items: data,
        });

        data.map((row,idx)=>{
          if(row.moduleWorkCourseType=="현장실습"){
            this.setState({
              datasetWorkIdx:row.idx,
              moduleId:row.moduleId
            })
          }
        })


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

    let newDataset = false;
    let stateDatasetWorkIdx = this.state.datasetWorkIdx;

    for (let n of selectedRows) {
      this.state.items.map((v, i)=> {
        if (n == i) {
          if(v.idx==stateDatasetWorkIdx){
            newDataset = true;
          }
          workIds.push(v.idx);
          return;
        }
      });
    }

    if(this.stateNewDataset!=newDataset){
      this.setState({
        newDataset:newDataset
      })
    }

    console.log(workIds);
    this.props.onSelectedWorks(workIds);
  }

	render() {
		return (
      <div style={{textAlign: 'center' }}>
        {(() => {
          const {items} = this.state;
          if (items.length > 0) {
            let tableRows = (
              items.map((item, index) => (
                <TableRow
                  key={index}
                  selected={this.isSelected(index)}
                  
                >
                  <TableRowColumn checked >{item.moduleWorkCourseType}</TableRowColumn>
                  <TableRowColumn >{item.moduleWorkName}</TableRowColumn>
                </TableRow>
              ))
            );

            return (
              <Table
      					selectable
      					multiSelectable
      					showCheckboxes
                onRowSelection={this.onSelectionWork}
                className="material-table"
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

        {this.state.newDataset ? 
          <NewDataset moduleId = {this.state.moduleId}/>
         :
          null
        } 
        





			</div>
		)
	}
}

export default Step2Work;
