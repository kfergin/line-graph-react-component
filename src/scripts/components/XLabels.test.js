import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import XLabels from './XLabels';

describe('<XLabels/>', () => {
	const props = {
		labels: [],
		width: 200,
		height: 100,
		shiftX: 10
	};
	it('should render its empty snapshot', () => {
		const tree = renderer.create(
			<XLabels {...props}/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('should render its snapshot with string labels', () => {
		const labels = ['first', 'second', 'third'];
		const tree = renderer.create(
			<XLabels {...{...props, labels}}/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('should render its snapshot with dots (instead of text)', () => {
		const labels = 4;
		const tree = renderer.create(
			<XLabels {...{...props, labels}}/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});

	// is this the right test for the componentWillReceiveProps part?
	it('should set a new timestamp in state when labels change', () => {
		const labels = ['first', 'second', 'third'];
		const component = mount(
			<XLabels {...{...props, labels}}/>
		);
		const instance = component.instance();
		const spySetState = jest.spyOn(instance, 'setState');
		component.setProps({labels});
		expect(spySetState).not.toHaveBeenCalled();
		component.setProps({labels: 1});
		expect(spySetState).toHaveBeenCalled();
	});
});