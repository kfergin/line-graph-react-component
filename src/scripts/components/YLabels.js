import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

const YLabelsComponent = ({styles, labels, yDiff, width, height}) => (
	<g style={styles}>
		{labels.map((label, i) => {
			const yPosition = height - yDiff*i;
			return (
				<g key={i} className="yLabel">
					<line
						x1="0"
						x2={width}
						y1={yPosition}
						y2={yPosition}
					/>
					{label ? <text x="0" y={yPosition}>{label}</text> : null}
				</g>
			)
		})}
	</g>
);

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
		let amount = labels.length || labels;
		let yDiff = height/Math.max(amount-1, 1);
		if (typeof labels === 'number') {
			labels = Array.apply(null, {length: labels});
		}
		const willEnter = () => ({opacity: 0});
		const willLeave = () => ({opacity: spring(0)});
		return (
			<TransitionMotion
				willEnter={willEnter}
				willLeave={willLeave}
				styles={[{
					key: 'time' + this.state.timestamp,
					style: {opacity: spring(1)},
					data: {labels, yDiff}
				}]}
			>
				{instances => (
					<g className="y-labels">
						{instances.map(inst => (
							<YLabelsComponent
								key={inst.key}
								{...{
									styles: inst.style,
									width, height,
									...inst.data
								}}
							/>
						))}
					</g>
				)}
			</TransitionMotion>
		);
	}
}

export default YLabels;