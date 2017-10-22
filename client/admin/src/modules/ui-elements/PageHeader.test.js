import { StyleSheetTestUtils } from 'aphrodite';
import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageHeader from './PageHeader';

Enzyme.configure({ adapter: new Adapter() });


it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<PageHeader />, div);
});

test('renders text from props', () => {
	// Render a checkbox with label in the document
	const pageHeader = shallow(
		<PageHeader text="Welcom" />
	);
	expect(pageHeader.text()).toEqual('Welcom');

});

beforeEach(() => {
	StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
	StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});