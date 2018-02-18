import React, { Fragment } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import ToursContainer from './ToursContainer'
import PageContent from '../ui-elements/PageContent'
import PageHeader from '../ui-elements/PageHeader'
import SearchFormContainer from './SearchFormContainer'

const styles = StyleSheet.create({
	headerTitle: {
		lineHeight: '27px',
		fontSize: '38px',
		fontWeight: 'bold',
		color: '#fefefe',
		textTransform: 'uppercase'
	}
});


class ToursPage extends React.Component {

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
