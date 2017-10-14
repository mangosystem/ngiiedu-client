import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

class Step4Complete extends React.Component {

	constructor() {
		super();
		this.state = {
		};
	}

	render() {
		return (
      <div style={{textAlign: 'center'}}>
				<p>
					<i className="fa fa-check-square-o" style={{fontSize: '200px'}}></i>
				</p>
				<p>
					위와 같은 내용으로 새로운 수업을 만들겠습니다. <br />
					아래 버튼을 클릭하면 수업페이지로 이동합니다.
				</p>
			</div>
		)
	}
}

export default Step4Complete;
