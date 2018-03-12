import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import PrefixLink from '../ui-elements/PrefixLink';

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		margin: '0 -15px',
		flexWrap: 'wrap',
		paddingBottom: '40px'
	},
	column: {
		width: '100%',
		margin: '15px',
		'@media (min-width: 500px)': {
			width: 'calc(100% / 2 - 30px)',
		},
		'@media (min-width: 970px)': {
			width: 'calc(100% / 3 - 30px)',
		}
	},
	img: {
		maxWidth: '100%'
	},
	item: {
		display: 'block',
		color: '#222',
		backgroundColor: '#fff',
		borderRadius: '5px',
		overflow: 'hidden',
		transition: 'box-shadow .3s ease-in',
		marginBottom: '30px',
		boxShadow: '0px 30px 90px rgba(0,0,0,0.14)',
		':hover': {
			textDecoration: 'none',
			color: '#222'
		},

	},
	content: {
		padding: '20px'
	},
	title: {
		marginTop: '0'
	}
});

const LatestNews = () => (
	<div className={css(styles.wrapper)}>

		<div className={css(styles.column)}>
			<PrefixLink className={css(styles.item)}>
				<img className={css(styles.img)} src="/web/build/bike.jpg" alt=""/>
				<div className={css(styles.content)}>
					<h3 className={css(styles.title)}>Байк -фестиваль апрель 2018</h3>
					<p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…</p>
				</div>
			</PrefixLink>

			<PrefixLink className={css(styles.item)}>
				<img className={css(styles.img)} src="/web/build/victory.jpg" alt=""/>
				<div className={css(styles.content)}>
					<h3 className={css(styles.title)}>9 мая 2018 встречаем в Беларуси!</h3>
					<p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
						Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
						Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
					</p>
				</div>
			</PrefixLink>

			<PrefixLink className={css(styles.item)}>
				<img className={css(styles.img)} src="/web/build/opera.jpg" alt=""/>
				<div className={css(styles.content)}>
					<h3 className={css(styles.title)}>Фестиваль оперы и балета в Несвижском замке июнь 2018</h3>
					<p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
						Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
					</p>
				</div>
			</PrefixLink>

		</div>

		<div className={css(styles.column)}>
			<PrefixLink className={css(styles.item)}>
				<img className={css(styles.img)} src="/web/build/slav-market.jpg" alt=""/>
				<div className={css(styles.content)}>
					<h3 className={css(styles.title)}>Славянский базар в Витебске! июль 2018 </h3>
					<p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
						Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
					</p>
				</div>
			</PrefixLink>

			<PrefixLink className={css(styles.item)}>
				<img className={css(styles.img)} src="/web/build/kupala.jpg" alt=""/>
				<div className={css(styles.content)}>
					<h3 className={css(styles.title)}>"Купальская ночь"-- славянские гулянья 06-07.07.2018</h3>
					<p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…</p>
				</div>
			</PrefixLink>




			<PrefixLink className={css(styles.item)}>
				<img className={css(styles.img)} src="/web/build/top-city.jpg" alt=""/>
				<div className={css(styles.content)}>
					<h3 className={css(styles.title)}> Летний музыкально-туристический сезон в Минске в Верхнем городе (май-сентябрь 2018)
					</h3>
					<p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
						Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
						Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
					</p>
				</div>
			</PrefixLink>

		</div>

		<div className={css(styles.column)}>




			<PrefixLink className={css(styles.item)}>
				<img className={css(styles.img)} src="/web/build/fireworks.jpg" alt=""/>
				<div className={css(styles.content)}>
					<h3 className={css(styles.title)}>"Навальнiца" Международный фестиваль фейерверков 25.-26.08.2018
					</h3>
					<p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
						Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
						Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
					</p>
				</div>
			</PrefixLink>
			<PrefixLink className={css(styles.item)}>
				<img className={css(styles.img)} src="/web/build/bearfast.jpg" alt=""/>
				<div className={css(styles.content)}>
					<h3 className={css(styles.title)}>Пивной фестиваль "Актоубэрфэст" 22-23.09.2018</h3>
					<p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…</p>
				</div>
			</PrefixLink>
			<PrefixLink className={css(styles.item)}>
				<img className={css(styles.img)} src="/web/build/new-year.jpg" alt=""/>
				<div className={css(styles.content)}>
					<h3 className={css(styles.title)}>Новый год в гостях у Деде Мороза в Пуще!</h3>
					<p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place…
						Separated they live i
					</p>
				</div>
			</PrefixLink>


		</div>


	</div>
);

export default LatestNews