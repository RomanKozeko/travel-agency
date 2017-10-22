import { StyleSheetTestUtils } from 'aphrodite';
import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageCaption from './PageCaption';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<PageCaption />, div);
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