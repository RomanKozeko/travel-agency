import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
	pageContent: {
		padding: '40px 0 40px'
	}
});

const PageContent = ({ children, small }) =>
	<div className={css(styles.pageContent)}>
		<div className="container" style={{ maxWidth: small && '980px'}}>
			{children}
		</div>
	</div>

export default PageContent;
