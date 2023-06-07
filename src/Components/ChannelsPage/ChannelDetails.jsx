import React, { useContext, useEffect } from 'react';
import { Context } from '../../context/ContextApi';
import ChannelProfile from './ChannelProfile';
import ChannelNavbar from './ChannelNavbar';
import ChannelContent from './ChannelContent/ChannelContent';

const ChannelDetails = () => {
	const { channelData } = useContext(Context);
	useEffect(() => {}, [channlData]);
	return (
		<div className='flex  flex-col w-full'>
			<ChannelProfile />
			<ChannelNavbar />
			<ChannelContent />
		</div>
	);
};

export default ChannelDetails;
