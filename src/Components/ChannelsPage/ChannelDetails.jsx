import React from 'react';
import ChannelProfile from './ChannelProfile';
import ChannelNavbar from './ChannelNavbar';
import ChannelContent from './ChannelContent/ChannelContent';

const ChannelDetails = () => {
	return (
		<div className='flex  flex-col w-full'>
			<ChannelProfile />
			<ChannelNavbar />
			<ChannelContent />
		</div>
	);
};

export default ChannelDetails;
