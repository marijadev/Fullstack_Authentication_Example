import React from 'react';
import { Route } from 'react-router-dom';
import Welcome from './Welcome';

export default () => {
	return (
		<div>
			<Route path='/' exact component={ Welcome } />
		</div>
	);
}