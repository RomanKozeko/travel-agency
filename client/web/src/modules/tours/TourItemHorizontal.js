import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { DinnerIcon, ClockIcon, DateIcon, WorkIcon, PlaceIcon } from '../ui-elements/icons/Icons';
import Button from '../ui-elements/Button';
import PrefixLink from '../ui-elements/PrefixLink';
import { theme } from '../../services/constans';

const styles = StyleSheet.create({
	wrapper: {
		minHeight: '210px',
		backgroundColor: '#ffffff',
		position: 'relative',
		borderRadius: '5px',
		transition: 'all .3s ease-in',
		marginBottom: '30px',
		':hover': {
			boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
		},
		overflow: 'hidden',
		'@media (min-width: 750px)': {
			display: 'flex',
			flexGrow: '1',
			paddingLeft: '220px',
		},
	},
	img: {
		display: 'flex',
		justifyContent: 'center',
		verticalAlign: 'center',
		width: '100%',
		paddingTop: '70%',
		backgroundColor: '#333',
		backgroundSize: 'cover',
		'@media (min-width: 750px)': {
			width: '210px',
			height: '100%',
			position: 'absolute',
			left: '0',
			top: '0',
			paddingTop: '0',
		},
	},
	content: {
		padding: '20px;',
		flex: '1',
		flexDirection: 'column',
		display: 'flex',
		'@media (min-width: 750px)': {
			flexDirection: 'row'
		},
	},
	contentRegions: {
		fontSize: '12px',
		color: '#bebebe;',
	},
	title: {
		fontSize: '18px;',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: '#222222;'
	},
	listItem: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: '5px'
	},
	listItemText: {
		marginLeft: '10px'
	},
	contentLeft: {
		flexGrow: '1',
	},
	contentRight: {
		paddingTop: '20px',
		'@media (min-width: 750px)': {
			paddingTop: '0'
		},
	}
});

const TourItemHorizontal = ({ tour: { url, preview, days, content = {} }} ) =>
	<div className={css(styles.wrapper)}>
		<div className={css(styles.img)}
		     style={{ backgroundImage: `url(${preview[0] && preview[0].path ? preview[0].path : '/web/build/v.jpg'}`}}
		>
		</div>
		<div className={css(styles.content)}>
			<div className={css(styles.contentLeft)}>
				<div className={css(styles.contentRegions)}>
					Беларусь / Минск
				</div>
				<h4 className={css(styles.title)}>
					<PrefixLink to={`/tours/${ url }`}>{ content.title }</PrefixLink>
				</h4>
				<div className={css(styles.listItem)}>
					<PlaceIcon color={ theme.colors.primary } width={20} />
					<span className={css(styles.listItemText)}>{ content.departureInfo }</span>
				</div>
				<div className={css(styles.listItem)}>
					<WorkIcon color={ theme.colors.primary } width={20} />
					<span className={css(styles.listItemText)}>Самолетный</span>
				</div>
				<div className={css(styles.listItem)}>
					<DinnerIcon color={ theme.colors.primary } width={20} />
					<span className={css(styles.listItemText)}>Завтраки</span>
				</div>
				<div className={css(styles.listItem)}>
					<ClockIcon color={ theme.colors.primary } width={20} />
					<span className={css(styles.listItemText)}>{ content.duration }</span>
				</div>
				<div className={css(styles.listItem)}>
					<DateIcon color={ theme.colors.primary } width={20} />
					<span className={css(styles.listItemText)}>Дней: { days }</span>
				</div>
			</div>
			<div className={css(styles.contentRight)}>
				<Button>Заказать</Button>
			</div>
		</div>
	</div>

export default TourItemHorizontal;
