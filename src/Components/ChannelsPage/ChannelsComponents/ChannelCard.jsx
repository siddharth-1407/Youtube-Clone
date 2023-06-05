import React, { useState, useEffect, useContext } from 'react';
import { fetchData } from '../../../Utils/api';
import { Link } from 'react-router-dom';
import NumberAbbreviate from 'number-abbreviate';
import { Context } from '../../../context/ContextApi';

const ChannelCard = ({ id }) => {
	const { user } = useContext(Context);
	const [channelData, setChannelData] = useState([]);

	useEffect(() => {
		fetchOtherChannelsData(id);
	}, []);
	useEffect(() => {}, [channelData]);
	const fetchOtherChannelsData = async (id) => {
		try {
			const res = await fetchData(`channels?part=snippet&part=statistics&id=${id}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`);
			setChannelData(res.items[0]);
		} catch (error) {
			console.log('Error', error);
		}
	};
	return (
		<div className='videoCard | w-[9.375rem]  sm:max-w-[19.688rem] md:w-[13.125rem] lg:w-[25rem] xl:w-[14.75rem] 2xl:w-[13.125rem] flex justify-center '>
			<div className='flex flex-col  w-[13.125rem]'>
				<div className={`channelImage | w-full flex justify-center  `}>
					<Link to={`/channels/${id}`}>
						<div className='w-[6.438rem] aspect-square overflow-hidden rounded-full'>
							<img
								loading='lazy'
								src={channelData?.snippet?.thumbnails?.high?.url || channelData?.snippet?.thumbnails?.medium?.url}
								alt=''
								className='dark:bg-[#272727] bg-[#e5e5e5]'
							/>
						</div>
					</Link>
				</div>
				<div className='flex flex-col gap-1 text-center '>
					<Link to={`/channels/${id}`}>
						<h4 className='mt-1 font-medium  text-sm text-[#0f0f0f] dark:text-[#f1f1f1]'>{channelData?.snippet?.title}</h4>
					</Link>
					<p className='text-[0.75rem] text-[#606060] dark:text-[#aaa]'>
						<span className='uppercase text-[0.75rem]'>{NumberAbbreviate(channelData?.statistics?.subscriberCount, 0)}</span>{' '}
						<span>subscribers</span>
					</p>
				</div>
				<button className='text-xs rounded-full mt-2 py-2 px-4 self-center bg-[#f2f2f2] dark:bg-[#272727] hover:bg-[#e5e5e5] dark:hover:bg-[#3f3f3f] font-medium text-[#0f0f0f] dark:text-[#f1f1f1] '>
					{!user ? 'Subscribe' : 'TBD'}
				</button>
			</div>
		</div>
	);
};

export default ChannelCard;
