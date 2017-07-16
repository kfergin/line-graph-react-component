import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

// points="19.8 84.57 46.14 59.37 83.15 71.97 116.07 50 136.5 43.93 158.53 15.32"

const Line = ({ points, color, enterPoint, shiftX }) => {
	const leavePoint = points[points.length-1],
		lineAttrs = {
		transform: `translate(${shiftX})`,
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		stroke: color,
		fill: 'none'
	};
	const willEnter = () => ({...enterPoint});
	const willLeave = () => ({x: spring(leavePoint.x), y: spring(leavePoint.y)});
	return (
		<TransitionMotion
			willEnter={willEnter}
			willLeave={willLeave}
			styles={points.map((d, i) => ({
				key: ''+i,
				style: {x: spring(d.x), y: spring(d.y)}
			}))}
		>
			{points => (
				<polyline
					points={points.reduce((str, p, i) => `${str + (i ? ' ' : '')}${p.style.x} ${p.style.y}`, '')}
					{...lineAttrs}
				/>
			)}
		</TransitionMotion>
	);
}

export default Line;