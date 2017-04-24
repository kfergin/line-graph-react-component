import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

// points="19.8 84.57 46.14 59.37 83.15 71.97 116.07 50 136.5 43.93 158.53 15.32"

const Line = ({ points, color, enterPoint, leavePoint, shiftX }) => (
	<TransitionMotion
		willEnter={() => ({...enterPoint})}
		willLeave={() => ({x: spring(leavePoint.x), y: spring(leavePoint.y)})}
		styles={points.map((d, i) => ({
			key: ''+i,
			style: {x: spring(d.x), y: spring(d.y)}
		}))}
	>
		{points => (
			<polyline
				transform={`translate(${shiftX})`}
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				points={points.map(p => `${p.style.x} ${p.style.y}`).join(' ')}
			/>
		)}
	</TransitionMotion>
);

export default Line;