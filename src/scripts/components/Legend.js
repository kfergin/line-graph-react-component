import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

import './Legend.scss';

const LegendComponent = ({styles, names, colors}) => (
	<ul style={styles}>
		{names.map((name, i) => (
			<li
				key={i}
				style={{color: colors[i%colors.length]}}
			>
				{name}
			</li>
		))}
	</ul>
);

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
		const {names, colors} = this.props,
			willEnter = () => ({opacity: 0}),
			willLeave = () => ({opacity: spring(0)});
		return (
			<TransitionMotion
				willEnter={willEnter}
				willLeave={willLeave}
				styles={[{
					key: 'time' + this.state.timestamp,
					style: {opacity: spring(1)},
					data: {names, colors}
				}]}
			>
				{instances => (
					<div className="legend">
						{instances.map(inst => (
							<LegendComponent
								key={inst.key}
								{...{...inst.data, styles: inst.style}}
							/>
						))}
					</div>
				)}
			</TransitionMotion>
		);
	}
}

export default Legend;