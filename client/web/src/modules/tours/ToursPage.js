import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import ToursContainer from './ToursContainer'
import PageContent from '../ui-elements/PageContent'
import PageHeader from '../ui-elements/PageHeader'
import SearchFormContainer from './SearchFormContainer'

class ToursPage extends Component {

	render() {
		return (
			<div>
				<PageHeader title="Поиск туров" />
				<PageContent>
					<SearchFormContainer />
					<ToursContainer />
				</PageContent>
			</div>
		);
	}
}

export default ToursPage
