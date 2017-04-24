import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

class Legend extends React.Component {
	constructor(props) {
		super(props);
		this.state = {timestamp: Date.now()};
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.names !== nextProps.names) {
			this.setState({timestamp: Date.now()});
		}
	}
	render() {
		let {names, colors} = this.props;
		return (
			<TransitionMotion
				willEnter={() => ({opacity: 0})}
				willLeave={() => ({opacity: spring(0)})}
				styles={[{
					key: 'time' + this.state.timestamp,
					style: {opacity: spring(1)},
					data: {names, colors}
				}]}
			>
				{instances => (
					<div className="legend">
						{instances.map(inst => (
							<ul key={inst.key} style={inst.style}>
								{inst.data.names.map((name, i) => (
									<li
										key={i}
										style={{color: inst.data.colors[i%inst.data.colors.length]}}
									>
										{name}
									</li>
								))}
							</ul>
						))}
					</div>
				)}
			</TransitionMotion>
		);
	}
}

export default Legend;