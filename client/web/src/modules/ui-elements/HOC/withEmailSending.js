import React from 'react';
import {connect} from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import { sendEmail } from '../../orderForm/orderReducer';

const withEmailSending = (WrappedComponent, emailSubject) => {
	class BaseContainer extends React.Component {
		render() {
			return (
				<WrappedComponent {...this.props} />
			)
		}
	}

	return compose(
		connect(
			null,
			{ sendEmail }
		),
		withStateHandlers(
			({ isEmailSent, reset }) => ({ isEmailSent : false, reset }),
			{
				onSubmit: ({}, {reset, sendEmail, tour}) => (options) => {
					options = tour ?
						{
							...options,
							tour: {
								title: tour.content.title,
								url: `${window.location.origin}/tours/${tour.url}`
							}
						}
						:
						options;
						sendEmail({ ...options, emailSubject });
						return { isEmailSent: true };
				},
				onModalClose: (props, props2) => () => {
					return { isEmailSent: false };
				}
			}
		)
	)(BaseContainer);
};

export default withEmailSending;
