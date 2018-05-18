import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ title, metaDescription }) => (
	<Helmet>
		<title>{title ? title : ''}</title>
		<meta name="description" content={metaDescription ? metaDescription : ''} />
	</Helmet>
);

export default Head;
