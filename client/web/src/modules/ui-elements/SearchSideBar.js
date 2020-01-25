import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import CheckBox from '../ui-elements/checkbox/CheckBox';
import TextFieldSmall from '../ui-elements/TextFieldSmall';
import TreeList from './TreeList';

const styles = StyleSheet.create({
	wrapper: {
		background: '#fff',
		borderRadius: '3px',
		padding: '20px',
	},
	block: {
		padding: '20px 0',
		borderBottom: '1px solid #eaeaea'
	},
	blockTitle: {
		fontSize: '22px',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		margin: '0 0 15px'
	}
});

const SearchSideBar = ({regions, categories, days, onInputChange, onFieldChange}) =>
	<div className={css(styles.wrapper)}>
		<div className={css(styles.block)}>
			<h3 className={css(styles.blockTitle)}>{ window.TA.content.byName }</h3>
			<TextFieldSmall
				onChange={(e) => onInputChange('title', e.target.value)}
				placeholder='Название'
			/>
		</div>
		{regions &&
			<div className={css(styles.block)}>
				<h3 className={css(styles.blockTitle)}>{window.TA.content.regions}</h3>
				<TreeList items={regions} onChange={onFieldChange} />
			</div>
		}
		{days &&
			<div className={css(styles.block)}>
				<h3 className={css(styles.blockTitle)}>{ window.TA.content.daysAmount }</h3>
				{
	        Array.from({length: days }, (x,i) => i + 1).map(day => (
						<CheckBox
							key={day}
							onChange={(e) => onFieldChange('days', day)}
							label={day}
							name={day}
						/>
	        ))
				}
			</div>
		}
		{categories &&
			<div className={css(styles.block)}>
				<h3 className={css(styles.blockTitle)}>{ window.TA.content.tourType }</h3>

				{categories.map(category => (
						<CheckBox
							key={category._id}
							onChange={(e) => onFieldChange('categories', category._id)}
							label={category.content ? category.content.title : ''}
							name={category.content ? category.content.title : ''}
							block={ true }
						/>
	        ))}
			</div>
		}
	</div>;

export default SearchSideBar;
