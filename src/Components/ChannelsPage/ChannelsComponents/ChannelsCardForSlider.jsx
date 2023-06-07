import React, { useState, useEffect } from 'react';
import { fetchData } from '../../../Utils/api';
import { Link } from 'react-router-dom';
import NumberAbbreviate from 'number-abbreviate';

const ChannelsCardForSlider = ({ id }) => {
	const [channelData, setChannelData] = useState([]);

	useEffect(() => {
		fetchOtherChannelsData(id);
	}, []);
	useEffect(() => {}, [channelData]);
	const fetchOtherChannelsData = async (id) => {
		try {
			const res = await fetchData(`channels?part=snippet&part=statistics&id=${id}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`);
			await setChannelData(res.items[0]);
		} catch (error) {
			console.log('Error', error);
		}
	};
	return (
		<div className='videoCard | w-[10rem]  sm:max-w-[19.688rem] md:w-[13.125rem] lg:w-[16.438rem] xl:w-[14.75rem] 2xl:w-[13.125rem]'>
			<div className='flex flex-col w-[13.125rem]'>
				<div className={`channelImage | w-full flex justify-center  `}>
					<Link to={`/channels/${channelData?.snippet?.id}`}>
						<div className='w-[6.438rem] aspect-square overflow-hidden rounded-full'>
							<img
								loading='lazy'
								src={channelData?.snippet?.thumbnails?.medium?.url || channelData?.snippet?.thumbnails?.high?.url}
								alt=''
							/>
						</div>
					</Link>
				</div>
				<div className='flex flex-col gap-1 mt-1 text-center '>
					<Link to={`/channels/${channelData?.snippet?.id}`}>
						<h4 className='font-medium text-sm text-[#0f0f0f] dark:text-[#f1f1f1]'>{channelData?.snippet?.title}</h4>
					</Link>
					<p className='text-[0.75rem] text-[#606060] dark:text-[#aaa]'>
						<span className='uppercase text-[0.75rem]'>{NumberAbbreviate(channelData?.statistics?.subscriberCount, 0)}</span>{' '}
						<span>subscribers</span>
					</p>
				</div>
				<button className='text-xs  rounded-full mt-2 py-2 px-4 self-center bg-[#f2f2f2] dark:bg-[#272727] hover:bg-[#e5e5e5] dark:hover:bg-[#3f3f3f] font-medium text-[#0f0f0f] dark:text-[#f1f1f1]'>
					Subscribe
				</button>
			</div>
		</div>
	);
};

export default ChannelsCardForSlider;
