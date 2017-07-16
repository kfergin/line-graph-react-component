import React from 'react';

import Line from '../components/Line';

export default class LineContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {points: this.formatData(props), enterPoint: null};
	}
	formatData(props) {
		let { points, xMin, xMax, yMin, yMax, width, height } = props;
		return points.map((point, i) => ({
			x: (point.x - xMin)/(xMax - xMin) * width,
			y: (1 - (point.y - yMin)/(yMax - yMin)) * height
		}));
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.points !== nextProps.points) {
			this.setState((prevState) => ({
				points: this.formatData(nextProps),
				enterPoint: prevState.points[prevState.points.length-1]
			}));
		}
	}
	render() {
		return (
			<Line
				points={this.state.points}
				enterPoint={this.state.enterPoint}
				color={this.props.color}
				shiftX={this.props.shiftX}
			/>
		);
	}
}