import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

class YLabels extends React.Component {
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
		let {labels, width, height} = this.props;
		let amount = typeof labels === 'number' ? labels : labels.length;
		let yDiff = height/(amount-1 > 0 ? amount-1 : 1);
		if (typeof labels === 'number') {
			labels = Array.apply(null, {length: labels});
		}
		return (
			<TransitionMotion
				willEnter={() => ({opacity: 0})}
				willLeave={() => ({opacity: spring(0)})}
				styles={[{
					key: 'time' + this.state.timestamp,
					style: {opacity: spring(1)},
					data: {labels, yDiff}
				}]}
			>
				{instances => (
					<g className="y-labels">
						{instances.map(inst => (
							<g key={inst.key} style={inst.style}>
								{inst.data.labels.map((l, i) => (
									<g key={i} className="yLabel">
										<line
											x1="0"
											x2={width}
											y1={height - inst.data.yDiff*i}
											y2={height - inst.data.yDiff*i}
										/>
										{l ? <text x="0" y={height - inst.data.yDiff*i}>{l}</text> : null}
									</g>
								))}
							</g>
						))}
					</g>
				)}
			</TransitionMotion>
		);
	}
}

export default YLabels;