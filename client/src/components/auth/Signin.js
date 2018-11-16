import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import './auth-styles/sign-form.css';

class Signin extends Component {

	onSubmit = formProps => {
		this.props.signin( formProps, () => {
			this.props.history.push( '/feature' );
		} );
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form className='form' onSubmit={ handleSubmit( this.onSubmit ) }>
				<fieldset>
					<label>Email:</label>
					<Field name='email' component='input' type='email' autoComplete='off' />
				</fieldset>
				<fieldset>
					<label>Password:</label>
					<Field name='password' component='input' type='password' autoComplete='off' />
				</fieldset>
				<p>{ this.props.errorMessage }</p>
				<button type='submit'>Sign In</button>
			</form>
		);
	}
}

function mapStateToProps( state ) {
	return { errorMessage: state.auth.errorMessage };
}

export default compose(
	connect( mapStateToProps, actions ),
	reduxForm( { form: 'signin' } )
)( Signin );