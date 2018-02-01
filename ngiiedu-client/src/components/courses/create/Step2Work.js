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

    this.isSelected = this.isSelected.bind(this);
    this.handleNewDataset = this.handleNewDataset.bind(this);
	}

  handleNewDataset(){
    this.setState({newDataset:true})
  }

  componentDidMount() {

    const {selectedModule} = this.state;

    let handleNewDataset = this.handleNewDataset;
    ajaxJson(
      ['GET', apiSvr+'/modules/' + this.props.selectedModule + '/moduleWork.json'],
      null,
      function(res) {
        let data = res.response.data;
        this.setState({
          items: data,
        });

        let datasetWorkIdx ='';

        let workIds = [];

        data.map((row,idx)=>{
          workIds.push(row.idx);
          if(row.moduleWorkCourseType=="현장실습"){
            datasetWorkIdx=row.idx;
            this.setState({
              datasetWorkIdx:datasetWorkIdx,
              moduleId:row.moduleId,
              newDataset:true
            })
          }
        })

        this.props.onSelectedWorks(workIds);


        workIds = [];
        for (let n of this.props.selectedItems) {
          this.state.items.map(function(v, i) {
            if (n == v.idx) {
              if(n == datasetWorkIdx){
                handleNewDataset() //newDataset =true
              }
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

	render() {
		return (
      <div>
        <div style={{width:'80%',marginLeft:'10%' }}>
        <h2 style={{textAlign:'left',margin:10}}> * 수업과정</h2>
          {(() => {
            const {items} = this.state;
            if (items.length > 0) {
              let tableRows = (
                items.map((item, index) => (
                  <TableRow
                    key={index}
                    selected={this.isSelected(index)}
                  >
                    <TableRowColumn style={{width:100}} checked >{item.moduleWorkCourseType}</TableRowColumn>
                    <TableRowColumn >{item.moduleWorkName}</TableRowColumn>
                  </TableRow>
                ))
              );

              return (
                <Table
                  selectable = {false}
                  multiSelectable = {false}
                  showCheckboxes = {false}
                  className="material-table"
                >
                  <TableBody
                    displayRowCheckbox = {false}
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
        {this.state.newDataset ? 
          <NewDataset 
            moduleId = {this.state.moduleId}
            onChangedDataset = {this.props.onChangedDataset}
            datasetData = {this.props.datasetData}
          />
         :
          null
        } 
       
			</div>
		)
	}
}

export default Step2Work;
