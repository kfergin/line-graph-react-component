import React from 'react';

import Line from '../components/Line';

class LineContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {points: this.formatData(props.points), enterPoint: null};
	}
	formatData(points) {
		let { xMin, xMax, yMin, yMax, width, height } = this.props;
		return points.slice().reverse().map(point => ({
			x: (point.x - xMin)/xMax * width,
			y: (1 - (point.y - yMin)/yMax) * height
		}));
	}
	componentDidUpdate(prevProps) {
		if (prevProps.points !== this.props.points) {
			this.setState((prevState) => ({
				points: this.formatData(this.props.points),
				enterPoint: prevState.points[prevState.points.length-1]
			}));
		}
	}
	render() {
		return (
			<Line
				points={this.state.points}
				color={this.props.color}
				enterPoint={this.state.enterPoint}
				leavePoint={{...this.state.points[this.state.points.length-1]}}
				shiftX={this.props.shiftX}
			/>
		);
	}
}

export default LineContainer;