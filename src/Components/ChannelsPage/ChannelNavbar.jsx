import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/ContextApi';

const ChannelNavbar = () => {
	const { pathname } = useLocation();
	const { channelData } = useContext(Context);
	const [path, setPath] = useState('');
	// let url = pathname.split('/').filter((item) => item !== '');

	useEffect(() => {
		handleIndicator();
	}, [pathname]);
	const handleIndicator = () => {
		if (pathname.startsWith(`/channels/${channelData.id}/videos`)) {
			setPath('videos');
		} else if (pathname.startsWith(`/channels/${channelData.id}/playlists`)) {
			setPath('playlists');
		} else if (pathname.startsWith(`/channels/${channelData.id}/featuredChannels`)) {
			setPath('channels');
		} else if (pathname.startsWith(`/channels/${channelData.id}/about`)) {
			setPath('about');
		} else if (pathname.startsWith(`/channels/${channelData.id}`)) {
			setPath('featured');
		} else {
			setPath('featured');
		}
	};

	return (
		<div id='ChannelNav' className='w-full flex flex-col items-center bg-white dark:bg-[#0f0f0f] '>
			<div className='channelNavigationWrapper | flex flex-col w-[calc(100%-3rem)] md:w-[40rem] lg:w-[50rem] xl:px-8 xl:w-[65rem] 2xl:px-0 2xl:min-w-[81.25rem]'>
				<ul
					id='channelList'
					className='channelNavigation | overflow-x-scroll scrollbar-thin lg:overflow-auto  relative flex h-12 font-medium dark:font-semibold text-sm text-[#606060] dark:text-[#aaaaaa]  tracking-wide uppercase'>
					<li
						className={`hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors   ${
							path === 'featured' && 'text-[#0f0f0f] dark:text-[#f1f1f1]'
						}`}>
						<Link
							className='flex items-center px-8 h-full focus-visible:bg-[#1a1a1a] focus-visible:outline-transparent focus-visible:outline-2 focus-visible:outline'
							to={`/channels/${channelData.id}/featured`}>
							Home
						</Link>
					</li>
					<li
						className={`hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors ${
							path === 'videos' && 'text-[#0f0f0f] dark:text-[#f1f1f1]'
						}`}>
						<Link
							className='flex items-center px-8 h-full focus-visible:bg-[#1a1a1a] focus-visible:outline-transparent focus-visible:outline-2 focus-visible:outline'
							to={`/channels/${channelData.id}/videos`}>
							Videos
						</Link>
					</li>
					<li
						className={`hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors ${
							path === 'playlists' && 'text-[#0f0f0f] dark:text-[#f1f1f1]'
						}`}>
						<Link
							className='flex items-center px-8 h-full focus-visible:bg-[#1a1a1a] focus-visible:outline-transparent focus-visible:outline-2 focus-visible:outline'
							to={`/channels/${channelData.id}/playlists`}>
							Playlists
						</Link>
					</li>
					{/* <li
						className={`hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors ${
							path === 'community' && 'text-[#0f0f0f] dark:text-[#f1f1f1]'
						}`}>
						<Link
							className='flex items-center px-8 h-full focus-visible:bg-[#1a1a1a] focus-visible:outline-transparent focus-visible:outline-2 focus-visible:outline'
							to={`/channels/${channelData.id}/community`}>
							Community
						</Link>
					</li> */}
					<li
						className={`hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors ${
							path === 'channels' && 'text-[#0f0f0f] dark:text-[#f1f1f1]'
						}`}>
						<Link
							className='flex items-center px-8 h-full focus-visible:bg-[#1a1a1a] focus-visible:outline-transparent focus-visible:outline-2 focus-visible:outline'
							to={`/channels/${channelData.id}/featuredChannels`}>
							Channels
						</Link>
					</li>
					<li
						className={`hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors ${
							path === 'about' && 'text-[#0f0f0f] dark:text-[#f1f1f1]'
						}`}>
						<Link
							className='flex items-center px-8 h-full focus-visible:bg-[#1a1a1a] focus-visible:outline-transparent focus-visible:outline-2 focus-visible:outline'
							to={`/channels/${channelData.id}/about`}>
							About
						</Link>
					</li>
					<div
						id='indicator'
						className={`indicator absolute left-0 translate-x-0 w-[105.1px] transition-all bottom-0  border-b-[3px] border-[#606060] dark:border-[#aaaaaa]  
						${path === 'videos' && 'translate-x-[105.1px] w-[114.583px]'} 
						${path === 'playlists' && 'translate-x-[219.683px] w-[138.367px]'} 
						${path === 'channels' && 'translate-x-[358.05px] w-[139.233px]'}
						${path === 'about' && 'translate-x-[498.05px] w-[111.65px]'}`}></div>
				</ul>
			</div>
			<hr className='w-full border-[#e5e5e5] dark:border-[#3f3f3f]' />
		</div>
	);
};

export default ChannelNavbar;
