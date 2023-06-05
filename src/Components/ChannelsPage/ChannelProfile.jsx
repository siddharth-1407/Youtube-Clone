import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NumberAbbreviate from 'number-abbreviate';
import { ReactComponent as ArrowForward } from '../.././assets/newIcons/ArrowForward.svg';
import { Context } from '../../context/ContextApi';

const ChannelProfile = () => {
	const { sidebarExpanded, channelData } = useContext(Context);
	const { pathname } = useLocation();
	useEffect(() => {}, [pathname, channelData]);

	return (
		<div className='profile flex flex-col '>
			{channelData?.brandingSettings?.image?.bannerExternalUrl && (
				<div
					className={`channelBanner flex flex-col w-full mb-2 sm:mb-4 lg:mb-6 justify-center overflow-hidden aspect-video ${
						sidebarExpanded ? ' sm:h-[calc((100vw-240px)/6.2-1px)]' : 'h-[calc((100vw-80px)/6.2-1px)]'
					}`}>
					<img
						loading='lazy'
						draggable='false'
						src={`${channelData?.brandingSettings?.image?.bannerExternalUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
						className='w-full'
						alt=''
					/>
				</div>
			)}
			<div className='wrapper |  w-full flex flex-col items-center justify-center mx-auto mb-4'>
				<div className='profileMain | w-[calc(100%-3rem)] md:w-[40rem] lg:w-[50rem] xl:px-8 2xl:px-0 xl:min-w-[65rem]  min-w-[1450]:min-w-[65rem] 2xl:min-w-[81.25rem] flex flex-col md:flex-row items-center justify-start gap-2 sm:gap-6 '>
					<div className='profileImage  w-14 sm:w-24 md:w-32 lg:w-32 2xl:w-[10rem] aspect-square rounded-full overflow-hidden'>
						<img
							loading='lazy'
							draggable='false'
							src={channelData?.snippet?.thumbnails?.high?.url || channelData?.snippet?.thumbnails?.medium?.url}
							className='dark:bg-[#272727] bg-[#e5e5e5]'
							alt=''
						/>
					</div>
					<div className='wrapperResponsive | w-full flex flex-col sm:flex-row md:flex-col justify-center'>
						<div className='profileInfo w-full h-full mt-2 flex flex-col flex-wrap'>
							<h1
								className='title |  font-medium text-xl lg:text-2xl text-[#0f0f0f] dark:text-[#f1f1f1]'
								title={channelData?.snippet?.title}>
								{channelData?.snippet?.title}
							</h1>
							<p className=' text-[#606060] dark:text-[#aaaaaa] font-semibold text-xs lg:text-[0.95rem] mb-2 flex items-center gap-2'>
								<span>{`${channelData?.snippet?.customUrl}`}</span>
								<span className='font-normal text-sm'>
									<span className='uppercase'>{`${NumberAbbreviate(channelData?.statistics?.subscriberCount, 2)} `}</span>
									<span>subscribers</span>
								</span>
								<span className='font-normal text-sm'>{`${NumberAbbreviate(channelData?.statistics?.videoCount, 1)}`} videos</span>
							</p>
							<Link to={`/channels/${channelData.id}/about`} className='flex  mt-auto mb-2'>
								<p className='channelDescription line-clamp-custom | max-w-[500px] text-xs lg:text-sm text-[#606060] dark:text-[#aaaaaa] font-normal leading-8 '>
									{channelData?.snippet?.description.split(/\n/)[0] || 'More about this channel'}
								</p>
								<span className='flex justify-center items-center'>
									<div className='w-6  aspect-square'>
										<ArrowForward className='fill-[#606060] dark:fill-[#aaaaaa]' />
									</div>
								</span>
							</Link>
						</div>
						<div className='hidden sm:flex md:hidden items-center  text-[#606060] dark:text-[#aaaaaa] text-[0.9rem]  '>
							<button className=' js_EventBtn | h-9 px-4 flex items-center gap-2 rounded-full font-medium text-[#f1f1f1] bg-[#0f0f0f] hover:bg-[#272727] dark:text-[#0f0f0f] dark:bg-[#f1f1f1] dark:hover:bg-[#d9d9d9] border-transparent  border-[1px]'>
								<span className=' pointer-events-none'>Subscribe</span>
							</button>
						</div>
					</div>

					<div className='sm:hidden md:flex sm:ml-auto  sm:pb-12  items-center  text-[#606060] dark:text-[#aaaaaa] text-[0.9rem]  '>
						<button className=' js_EventBtn | h-9 px-4 flex items-center gap-2 rounded-full font-medium text-[#f1f1f1] bg-[#0f0f0f] hover:bg-[#272727] dark:text-[#0f0f0f] dark:bg-[#f1f1f1] dark:hover:bg-[#d9d9d9] border-transparent  border-[1px]'>
							{/* <span className='w-6 aspect-square pointer-events-none'>{<Bell className=' dark:fill-[#0f0f0f] fill-[#f1f1f1] ' />}</span> */}
							<span className=' pointer-events-none'>Subscribe</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChannelProfile;
