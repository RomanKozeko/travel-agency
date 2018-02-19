import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { DinnerIcon, ClockIcon, DateIcon, WorkIcon, PlaceIcon } from '../ui-elements/icons/Icons';
import Button from '../ui-elements/Button';

const styles = StyleSheet.create({
	wrapper: {
		minHeight: '210px',
		backgroundColor: '#ffffff',
		display: 'flex',
		flexGrow: '1',
		paddingLeft: '220px',
		position: 'relative',
		borderRadius: '5px',
		transition: 'all .3s ease-in',
		marginBottom: '30px',
		':hover': {
			boxShadow: '0 30px 65px rgba(0,0,0,0.15);'
		},
		overflow: 'hidden'
	},
	sideBarWrapper: {
		flex: '0 1 270px',
		maxWidth: '270px'
	},
	searchContent: {
		marginLeft: '30px'
	},
	img: {
		display: 'flex',
		justifyContent: 'center',
		verticalAlign: 'center',
		width: '210px',
		height: '100%',
		backgroundColor: '#333',
		backgroundSize: 'cover',
		position: 'absolute',
		left: '0',
		top: '0'
	},
	content: {
		padding: '30px;',
		flex: '1',
		display: 'flex'
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
	}
});

const TourItemHorizontal = ({ tour } ) =>
	<div className={css(styles.wrapper)}>
		<div className={css(styles.img)} style={{ backgroundImage: `url(${tour.preview[0] && tour.preview[0].path}`}}>
			{
				tour.preview[0] ? null : <img src="/web/build/v.jpg" alt=""/>
			}
		</div>
		<div className={css(styles.content)}>
			<div className={css(styles.contentLeft)}>
				<div className={css(styles.contentRegions)}>
					Беларусь / Минск
				</div>
				<h4 className={css(styles.title)}>
					{ tour.content.title }
				</h4>
				<div className={css(styles.listItem)}>
					<PlaceIcon color="#1593d0" width={20} />
					<span className={css(styles.listItemText)}>{ tour.content.departureInfo }</span>
				</div>
				<div className={css(styles.listItem)}>
					<WorkIcon color="#1593d0" width={20} />
					<span className={css(styles.listItemText)}>Самолетный</span>
				</div>
				<div className={css(styles.listItem)}>
					<DinnerIcon color="#1593d0" width={20} />
					<span className={css(styles.listItemText)}>Завтраки</span>
				</div>
				<div className={css(styles.listItem)}>
					<ClockIcon color="#1593d0" width={20} />
					<span className={css(styles.listItemText)}>{ tour.content.duration }</span>
				</div>
				<div className={css(styles.listItem)}>
					<DateIcon color="#1593d0" width={20} />
					<span className={css(styles.listItemText)}>Дней: { tour.days }</span>
				</div>
			</div>
			<div className={css(styles.contentRight)}>
				<Button>Заказать</Button>
			</div>
		</div>
	</div>

export default TourItemHorizontal;
