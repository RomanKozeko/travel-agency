import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import CheckBox from '../ui-elements/checkbox/CheckBox'
import TextFieldSmall from '../ui-elements/TextFieldSmall'

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

const SearchSideBar = ({regions, categories, onInputChange, onFieldChange}) =>
	<div className={css(styles.wrapper)}>
		<div className={css(styles.block)}>
			<h3 className={css(styles.blockTitle)}>По названию</h3>
			<TextFieldSmall
				onChange={(e) => onInputChange('title', e.target.value)}
				placeholder='Название тура'
			/>
		</div>
		<div className={css(styles.block)}>
			<h3 className={css(styles.blockTitle)}>Регионы</h3>
			{
        regions.map(region => (
					<CheckBox
						key={region._id}
						onChange={(e) => onFieldChange('regions', region._id)}
						label={region.content.title}
						name={region.content.title}
						block={ true }
					/>
				))
			}
		</div>
		<div className={css(styles.block)}>
			<h3 className={css(styles.blockTitle)}>Количество дней</h3>
			{
        Array.from({length: 10}, (x,i) => i + 1).map(day => (
					<CheckBox
						key={day}
						onChange={(e) => onFieldChange('days', day)}
						label={day}
						name={day}
					/>
        ))
			}
		</div>
		<div className={css(styles.block)}>
			<h3 className={css(styles.blockTitle)}>Тип тура</h3>
      {
        categories.map(category => (
					<CheckBox
						key={category._id}
						onChange={(e) => onFieldChange('categories', category._id)}
						label={category.content.title}
						name={category.content.title}
						block={ true }
					/>
        ))
      }
		</div>
	</div>;

export default SearchSideBar;
