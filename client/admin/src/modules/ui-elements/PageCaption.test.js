import { StyleSheetTestUtils } from 'aphrodite';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import PageCaption from './PageCaption';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<PageCaption />, div);
});

it('renders correctly', () => {
	const tree = renderer
		.create(<PageCaption text="Welcome" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

test('renders text from props', () => {
	const caption = shallow(
		<PageCaption text="Welcome" />
	);
	expect(caption.text()).toEqual('Welcome');
});

beforeEach(() => {
	StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
	StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});