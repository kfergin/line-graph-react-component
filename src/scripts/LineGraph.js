import React from 'react';
import PropTypes from 'prop-types';

import LineContainer from './containers/LineContainer';
import YLabels from './components/YLabels';
import XLabels from './components/XLabels';
import Legend from './components/Legend';

import './LineGraph.scss'

class LineGraph extends React.Component {
	constructor(props) {
		super(props);
		this.graphHeight = 100;
	}
	render() {
		let { width, xLabels, yLabels, lines, colors, ...lineProps } = this.props;
		let yLabelSpace = typeof yLabels === 'object' && yLabels.length;
		return (
			<div className="line-graph">
				<svg viewBox={`0 0 ${this.graphHeight*width} ${this.graphHeight}`}>
					<XLabels
						labels={xLabels}
						width={this.graphHeight*width*(yLabelSpace ? 0.9 : 0.96)}
						height={this.graphHeight*0.95}
						shiftX={this.graphHeight*width*(yLabelSpace ? 0.08 : 0.02)}
					/>
					<YLabels
						labels={yLabels}
						width={this.graphHeight*width}
						height={this.graphHeight*0.9}
					/>
					{lines.map((line, i) => (
						<LineContainer
							key={i}
							{...lineProps}
							points={line.points}
							color={colors[i%colors.length]}
							width={this.graphHeight*width*(yLabelSpace ? 0.9 : 0.96)}
							height={this.graphHeight*0.9}
							shiftX={this.graphHeight*width*(yLabelSpace ? 0.08 : 0.02)}
						/>
					))}
				</svg>
				<Legend
					names={lines.map(l => l.name)}
					colors={colors}
				/>
			</div>
		);
	}
}

LineGraph.defaultProps = {
	width: 1.8,
	lines: [],
	xMin: 0,
	xMax: 1,
	yMin: 0,
	yMax: 1,
	xLabels: [],
	yLabels: [],
	colors: ['#3498db','#e74c3c','#1abc9c','#f1c40f','#9b59b6','#2ecc71']
};

LineGraph.propTypes = {
	width: PropTypes.number,
	lines: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		points: PropTypes.arrayOf(PropTypes.shape({
			x: PropTypes.number,
			y: PropTypes.number
		}))
	})),
	xMin: PropTypes.number,
	xMax: PropTypes.number,
	yMin: PropTypes.number,
	yMax: PropTypes.number,
	xLabels: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
	yLabels: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
	colors: PropTypes.arrayOf(PropTypes.string)
};

export default LineGraph;