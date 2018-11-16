import React, { Component } from 'react';
import requireAuth from './requireAuth';
import './styles/feature-style.css';

class Feature extends Component {
	render() {
		return <div className='feature'>Protected component - seen only if signed up.</div>
	}
}

export default requireAuth( Feature );