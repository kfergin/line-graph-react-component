import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import YLabels from './YLabels';

describe('<YLabels/>', () => {
	const props = {
		labels: [],
		width: 200,
		height: 100
	};
	
	it('should render its empty snapshot', () => {
		const tree = renderer.create(
			<YLabels {...props}/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});

	// would you test for the number of labels?
	it('should render its snapshot with string labels', () => {
		const labels = ['first', 'second', 'third'];
		const tree = renderer.create(
			<YLabels {...{...props, labels}}/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});

	// would you test to make sure there isn't any text with empty labels?
	it('should render its snapshot with lines only (no text)', () => {
		const labels = Array.apply(null, {length: 3});
		const tree = renderer.create(
			<YLabels {...{...props, labels}}/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});

	// is this the right test for the componentWillReceiveProps part?
	it('should set a new timestamp in state when labels change', () => {
		const labels = ['first', 'second', 'third'];
		const component = mount(
			<YLabels {...{...props, labels}}/>
		);
		const instance = component.instance();
		const spySetState = jest.spyOn(instance, 'setState');
		component.setProps({labels});
		expect(spySetState).not.toHaveBeenCalled();
		component.setProps({labels: 1});
		expect(spySetState).toHaveBeenCalled();
	});
});