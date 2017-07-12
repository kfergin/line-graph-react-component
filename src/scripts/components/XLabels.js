import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

import './XLabels.scss';

class XLabels extends React.Component {
	constructor(props) {
		super(props);
		this.state = {timestamp: Date.now()};
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.labels !== nextProps.labels) {
			this.setState({timestamp: Date.now()});
		}
	}
	render() {
		let {labels, width, height, shiftX} = this.props;
		let amount = typeof labels === 'number' ? labels : labels.length;
		let xDiff = width/(Math.abs(amount) || 1);
		if (typeof labels === 'number') {
			labels = Array.apply(null, {length: labels});
			xDiff = width/(Math.abs(amount-1) || 1);
		}
		return (
			<TransitionMotion
				willEnter={() => ({opacity: 0})}
				willLeave={() => ({opacity: spring(0)})}
				styles={[{
					key: 'time' + this.state.timestamp,
					style: {opacity: spring(1)},
					data: {labels, xDiff}
				}]}
			>
				{instances => (
					<g transform={`translate(${shiftX})`} className="x-labels">
						{instances.map(inst => (
							<g key={inst.key} style={inst.style}>
								{inst.data.labels.map((l, i) => {
									if (!l) {
										return <circle key={i} cx={inst.data.xDiff*i} cy={height-2} r="0.75" fill="#ccc"/>;
									}
									return (
										<text
											key={i}
											className="xLabel"
											x={inst.data.xDiff*i}
											y={height}
										>
											{l}
										</text>
									);
								})}
							</g>
						))}
					</g>
				)}
			</TransitionMotion>
		);
	}
}

export default XLabels;