import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import Welcome from './components/Welcome';

ReactDOM.render(
	<BrowserRouter>
		<App>
			<Welcome />
		</App>
	</BrowserRouter>,
	document.querySelector( '#root' ) ); 