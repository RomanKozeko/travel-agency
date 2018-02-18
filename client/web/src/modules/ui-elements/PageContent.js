import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
	pageContent: {
		padding: '40px 0 40px'
	}
});

const PageContent = ({ children }) =>
	<div className={css(styles.pageContent)}>
		<div className="container">
			{children}
		</div>
	</div>

export default PageContent;
