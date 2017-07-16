import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

import './XLabels.scss';

const XLabelsComponent = ({styles, labels, xDiff, height}) => (
	<g style={styles}>
		{labels.map((label, i) => {
			if (!label) {
				return <circle key={i} cx={xDiff*i} cy={height-2} r="0.75" fill="#ccc"/>;
			}
			return (
				<text
					key={i}
					className="xLabel"
					x={xDiff*i}
					y={height}
				>
					{label}
				</text>
			);
		})}
	</g>
);

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
		let amount = labels.length || labels;
		let xDiff = width/Math.max(amount, 1);
		if (typeof labels === 'number') {
			labels = Array.apply(null, {length: labels});
			xDiff = width/Math.max(amount-1, 1);
		}
		const willEnter = () => ({opacity: 0}),
			willLeave = () => ({opacity: spring(0)});
		return (
			<TransitionMotion
				willEnter={willEnter}
				willLeave={willLeave}
				styles={[{
					key: 'time' + this.state.timestamp,
					style: {opacity: spring(1)},
					data: {labels, xDiff}
				}]}
			>
				{instances => (
					<g transform={`translate(${shiftX})`} className="x-labels">
						{instances.map(inst => (
							<XLabelsComponent
								key={inst.key}
								{...{
									styles: inst.style,
									height, ...inst.data
								}}
							/>
						))}
					</g>
				)}
			</TransitionMotion>
		);
	}
}

export default XLabels;