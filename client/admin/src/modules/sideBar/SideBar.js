import React from 'react'
import { Link } from 'react-router-dom'
import {StyleSheet, css} from 'aphrodite/no-important';

const styles = StyleSheet.create({

});

const SideBar = () =>  (
	<div style={{
		background: '#f0f0f0'
	}}>
		<ul style={{ listStyleType: 'none', padding: 0 }}>
			<li><Link to="/tours">Tours</Link></li>
			<li><Link to="/pages">Pages</Link></li>
			<li><Link to="/tours">Tours</Link></li>
			<li><Link to="/pages">Pages</Link></li>
			<li><Link to="/tours">Tours</Link></li>
			<li><Link to="/pages">Pages</Link></li>
		</ul>
	</div>
);

export default SideBar;
