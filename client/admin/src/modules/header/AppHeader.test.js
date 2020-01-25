import { StyleSheetTestUtils } from 'aphrodite';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AppHeader } from './AppHeader'
Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<AppHeader />, div);
});

beforeEach(() => {
	StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
	StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});