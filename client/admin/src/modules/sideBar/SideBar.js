import React from 'react'
import { Route, Link } from 'react-router-dom'
import {StyleSheet, css} from 'aphrodite/no-important';

const styles = StyleSheet.create({
	sideBarMenu: {
		margin: '10px 0',
		padding: '0',
		borderRadius: '4px',
		listStyle: 'none'
	},
	item: {
		display: 'block'
	},
	link: {
		display: 'block',
		color: '#678098',
		margin: '1px 0 0',
		padding: '12px 15px',
		':hover': {
			color: '#5b9bd1;',
			background: '#f2f6f9',
		}
	},
	activeLink: {
		display: 'block',
		margin: '1px 0 0',
		padding: '12px 15px',
		borderLeft: '3px solid #5C9ACF',
		marginLeft: '-3px',
		color: '#5b9bd1;',
		background: '#f2f6f9'
	}
});

const CustomLink = ({ label, to }) => (
	<Route path={to} children={({ match }) => (
			<Link className={css( match ? styles.activeLink : styles.link )} to={to}>{label}</Link>
	)}/>
);

const SideBar = () =>  (
	<ul className={css(styles.sideBarMenu)}>
		<li className={css(styles.item)}><CustomLink to="/tours" label="Tours" /></li>
		<li className={css(styles.item)}><CustomLink to="/regions" label="Regions" /></li>
		<li className={css(styles.item)}><CustomLink to="/hotels" label="Hotels" /></li>
		<li className={css(styles.item)}><CustomLink to="/pages" label="Pages" /></li>
		<li className={css(styles.item)}><CustomLink to="/lang" label="Languages" /></li>
		<li className={css(styles.item)}><CustomLink to="/settings" label="Settings" /></li>
	</ul>
);

export default SideBar;
