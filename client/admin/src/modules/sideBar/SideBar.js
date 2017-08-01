import React from 'react'
import { Route, Link } from 'react-router-dom'
import {StyleSheet, css} from 'aphrodite/no-important'
import classNames from 'classnames'
import Icon from 'material-ui/Icon';

const styles = StyleSheet.create({
	sideBarMenu: {
		padding: '10px 0',
		borderRadius: '4px',
		backgroundColor: '#fff',
		boxShadow: '0 2px 3px 2px rgba(0,0,0,.03)',
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
	active: {
		borderLeft: '3px solid #5C9ACF',
		marginLeft: '-3px',
		color: '#5b9bd1;',
		background: '#f2f6f9'
	},
	icon: {
		verticalAlign: 'bottom',
		marginRight: '8px'
	}
});

const CustomLink = ({ label, to, icon }) => (
	<Route path={to} children={({ match }) => (
			<Link className={classNames({
				[css(styles.link)]: !match,
				[css(styles.link, styles.active)]: match
			})} to={to}>
				<Icon className={css(styles.icon)}>{icon}</Icon>
				{label}
			</Link>
	)}/>
);

const SideBar = () =>  (
	<ul className={css(styles.sideBarMenu)}>
		<li className={css(styles.item)}><CustomLink to="/tours" label="Tours" icon="library_books"/></li>
		<li className={css(styles.item)}><CustomLink to="/regions" label="Regions" icon="place"/></li>
		<li className={css(styles.item)}><CustomLink to="/hotels" label="Hotels" icon="business"/></li>
		<li className={css(styles.item)}><CustomLink to="/pages" label="Pages" icon="web"/></li>
		<li className={css(styles.item)}><CustomLink to="/lang" label="Languages" icon="language"/></li>
		<li className={css(styles.item)}><CustomLink to="/settings" label="Settings" icon="settings"/></li>
	</ul>
);

export default SideBar;
