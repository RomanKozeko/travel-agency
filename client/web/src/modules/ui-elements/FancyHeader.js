import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { theme } from '../../services/constans'

const styles = StyleSheet.create({
	header: {
		color: theme.colors.primary,
		textTransform: 'uppercase',
		paddingBottom: '15px',
		marginBottom: '20px',
		lineHeight: '27px',
		marginTop: '0',
		position: 'relative',
		fontSize: '20px',
		textAlign: 'center',
		':after': {
			content: '""',
			display: 'block',
			position: 'absolute',
			left: '50%',
			bottom: '0',
			borderTop: `5px solid ${theme.colors.primary}`,
			width: '70px',
			transform: 'translateX(-50%)'
		},
	},
});

const FancyHeader = ({ title}) => (
	<h3 className={css(styles.header)}>
		{ title }
	</h3>
)

export default FancyHeader