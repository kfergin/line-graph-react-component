import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Legend from './Legend';

describe('<Legend/>', () => {
	const props = {
		names: [],
		colors: ['#00f']
	};
	
	it('should render its empty snapshot', () => {
		const tree = renderer.create(
			<Legend {...props}/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should render its snapshot with legend keys', () => {
		const names = ['first', 'second', 'third'];
		const tree = renderer.create(
			<Legend {...{...props, names}}/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});

	// is this the right test for the componentWillReceiveProps part?
	it('should set a new timestamp in state when legend keys change', () => {
		const names = ['first', 'second', 'third'];
		const component = mount(
			<Legend {...{...props, names}}/>
		);
		const instance = component.instance();
		const spySetState = jest.spyOn(instance, 'setState');
		component.setProps({names});
		expect(spySetState).not.toHaveBeenCalled();
		component.setProps({names: [
			'fourth', 'fifth', 'sixth'
		]});
		expect(spySetState).toHaveBeenCalled();
	});
});