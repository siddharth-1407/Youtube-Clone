import React from 'react';
import { ReactComponent as LiveSvg } from '../../assets/Live.svg';

const IsLive = () => {
	return (
		<div className='absolute bottom-1 right-1 bg-[#cc0000e6] text-white text-xs font-bold rounded-[0.3rem] flex gap-1 items-center px-1 py-[0.1rem]'>
			<LiveSvg className='fill-white' />
			<span className='uppercase'>Live</span>
		</div>
	);
};

export default IsLive;
