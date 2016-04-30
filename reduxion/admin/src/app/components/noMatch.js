import React from 'react';
import '../../assets/sass/base';

export default React.createClass({
    render() {
    	let baseUrl = window.location.origin+"/coffee";
		return (
			<div className='small-12 coloumn error-msg'>
				<h2 className='text-center'><span>404</span><em>Page not Found</em></h2>
				<p className='text-center'>The page might have been removed, or is temporarily unavailable.<br />Go back <a href={baseUrl}>Home</a>.</p>
				<p className='copy'>&copy; 2016 Arbitrium. All rights reserved.</p>
			</div>
		);
	}
});


