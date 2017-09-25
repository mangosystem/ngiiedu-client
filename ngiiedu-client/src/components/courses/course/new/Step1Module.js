import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

const tilesData = [
  {
    img: './img/a.jpg',
    title: '우리지역 소음지도'
  }, {
		img: './img/a.jpg',
    title: '우리동네 안전지도'
  }, {
		img: './img/a.jpg',
    title: 'GPS 활용 위치학습'
  }, {
		img: './img/a.jpg',
    title: '우리지역 인구지도'
  }, {
		img: './img/a.jpg',
    title: '통합적 영토교육'
  }, {
		img: './img/a.jpg',
    title: '우리학교 운동장 생태지도'
  }, {
		img: './img/a.jpg',
    title: '지도 정확성'
  }, {
		img: './img/a.jpg',
    title: '독도의 중요성'
  }
];

class Step1Module extends React.Component {

	constructor() {
		super();
		this.state = {
		};
	}

	render() {
		return (
      <div>
				<GridList
					cols={3}
					cellHeight={150}
				>
					{tilesData.map((tile, i) => (
						<GridTile
							key={i}
							title={tile.title}
						>
							<img src={tile.img} />
							</GridTile>
					))}
				</GridList>
			</div>
		)
	}
}

export default Step1Module;
