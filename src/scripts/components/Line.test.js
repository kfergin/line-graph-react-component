import React from 'react';
import renderer from 'react-test-renderer';

import Line from './Line';

describe('<Line/>', () => {
	const props = {
		points: [
			{x: 0, y: 2},
			{x: 0, y: 1},
			{x: 0, y: 5}
		],
		color: '#00F',
		enterPoint: null,
		shiftX: 10
	};
	it('should render a polyline', () => {
		const tree = renderer.create(
			<Line {...props}/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	// how would you test functions handed to TransitionMotion?
});