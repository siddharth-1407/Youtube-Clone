import React, { useState, useEffect, useContext, useRef } from 'react';
import { Context } from '../../../context/ContextApi';
import { ReactComponent as ShareIcon } from '../../../assets/shareIcon.svg';
import countryCodes from '../../GetFullCountry';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChannelAbout = () => {
	const shareRef = useRef();
	const [open, setOpen] = useState(false);
	const { channelData, mouseUpAction, mouseDownAction, setProgress, theme } = useContext(Context);
	const date = new Date(channelData?.snippet?.publishedAt);
	const f = new Intl.DateTimeFormat('en-us', {
		dateStyle: 'medium',
	});
	useEffect(() => {
		setProgress(100);
	}, []);

	useEffect(() => {
		// toggles popup menu
		let handler = (e) => {
			if (!shareRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, []);

	return (
		<div className='mx-auto h-full min-h-[780px] w-[calc(100vw-3rem)] divide-y-[1px] divide-[#e5e5e5] pt-4 dark:divide-[#3f3f3f] sm:w-full sm:px-12 md:w-[40rem] md:px-0  lg:w-[50rem] xl:min-w-[61rem]  xl:px-0 2xl:min-w-[81.25rem] 2xl:px-0'>
			<div className='flex flex-col gap-0 lg:flex-row lg:justify-between  '>
				{channelData?.snippet?.description && (
					<div className='about | flex h-fit flex-col divide-y-[1px] divide-[#e5e5e5] border-0 border-b-[1px] border-b-[#e5e5e5] text-[#0f0f0f]  dark:divide-[#3f3f3f] dark:border-b-[#3f3f3f] dark:text-[#f1f1f1] lg:mb-4 lg:w-1/2'>
						<div className='description | flex flex-col gap-4 py-6'>
							<h2 className='font-base text-base'>Description</h2>
							<p className='whitespace-pre-line text-sm font-light text-[#0f0f0f] dark:font-normal dark:text-[#f1f1f1]'>
								{channelData?.snippet?.description || 'More about this channel'}
							</p>
						</div>
						<div className='Details | flex flex-col gap-4 py-6'>
							<h2 className='font-base text-base'>Details</h2>
							<p className=' font-base flex w-1/2 gap-4 text-sm text-[#606060] dark:text-[#aaa] lg:grid lg:grid-flow-col lg:gap-0'>
								<span className=''>Location:</span>
								<span className=''>{countryCodes[channelData?.snippet?.country?.toString().toLowerCase()]}</span>
							</p>
						</div>
					</div>
				)}
				<div className='Stats | lg:ml-auto flex flex-col gap-4 divide-y-[1px] divide-[#e5e5e5] py-6 text-[#0f0f0f] dark:divide-[#3f3f3f] dark:text-[#f1f1f1] lg:w-1/3'>
					<h2 className='font-base text-base'>Stats</h2>
					<div className='flex flex-col divide-y-[1px] divide-[#e5e5e5] text-[0.93rem] font-light text-[#0f0f0f] dark:divide-[#3f3f3f] dark:font-normal dark:text-[#f1f1f1]'>
						<p className='py-3 '>
							<span>Joined</span> <span>{f.format(date)}</span>
						</p>
						{channelData?.statistics?.viewCount > 0 && (
							<p className='py-3'>
								<span>{Intl.NumberFormat().format(channelData?.statistics?.viewCount)}</span> <span>views</span>
							</p>
						)}
						<div>
							<div className=' share-btn relative w-min py-2' ref={shareRef}>
								<button
									className='w-8 rounded-full border-[1px] border-transparent p-1 hover:bg-[#e5e5e5] dark:hover:bg-[#3f3f3f]'
									onClick={() => setOpen(!open)}
									onMouseDown={mouseDownAction}
									onMouseUp={mouseUpAction}>
									<span className='pointer-events-none aspect-square w-6'>
										<ShareIcon className='pointer-events-none fill-[#0f0f0f] dark:fill-[#f1f1f1]' />
									</span>
								</button>
								<div
									className={`sharePopup box-shadow-custom |  w-40 rounded-[12px] bg-[bg-white]   py-3 dark:bg-[#282828] ${
										open ? 'flex' : 'hidden'
									}`}>
									<ul className='flex w-full flex-col '>
										<li>
											<button
												className='w-full px-2 py-2 text-center hover:bg-[#e5e5e5] hover:dark:bg-[#535353]'
												onClick={() => {
													toast.success('Channel link copied');
													navigator.clipboard.writeText(window.location.href.split('/', 5).join('/'));
													setOpen(false);
												}}>
												Share channel
											</button>{' '}
										</li>
										<li>
											<button
												className='w-full px-2 py-2 text-center hover:bg-[#e5e5e5] hover:dark:bg-[#535353]'
												onClick={() => {
													toast.success('Channel ID copied');
													navigator.clipboard.writeText(channelData.id);
													setOpen(false);
												}}>
												Copy channel ID
											</button>{' '}
										</li>
									</ul>
								</div>
								<ToastContainer
									position='top-right'
									autoClose={1500}
									hideProgressBar={false}
									newestOnTop={false}
									closeOnClick
									rtl={false}
									pauseOnFocusLoss
									draggable
									pauseOnHover
									theme={theme === 'Light' ? 'light' : 'dark'}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChannelAbout;
