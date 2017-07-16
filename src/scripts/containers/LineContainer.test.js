import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import LineContainer from './LineContainer';

describe('<LineContainer/>', () => {
	const points = [
		{x: 0, y: 2},
		{x: 0, y: 1},
		{x: 0, y: 5}
	];
	const props = {
		points,
		xMin: 0, xMax: 3,
		yMin: 0, yMax: 6,
		width: 200, height: 100,
		color: '#00f', shiftX: 10
	};
	
	it('renders a Line component', () => {
		const tree = renderer.create(
			<LineContainer {...props}/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('sets the last point from the last line as the enter point for the new line', () => {
		const component = mount(
			<LineContainer {...props}/>
		);
		const currentPoints = component.state('points');
		const enterPoint = currentPoints[currentPoints.length-1];
		component.setProps({points: [
			{x: 0, y: 1},
			{x: 0, y: 1},
			{x: 0, y: 3}
		]});
		expect(component.state('enterPoint')).toEqual(enterPoint);
	});

	it('should call setState when points change', () => {
		const component = mount(
			<LineContainer {...props}/>
		);
		let instance = component.instance();
		const spy = jest.spyOn(instance, 'setState');
		component.setProps({points});
		expect(spy).not.toHaveBeenCalled();
		component.setProps({points: [
			{x: 0, y: 1},
			{x: 0, y: 1},
			{x: 0, y: 3}
		]});
		expect(spy).toHaveBeenCalled();
	});
})