import React, { useEffect, useState, useContext } from 'react';
import ReactPlayer from 'react-player';
import { Context } from '../../context/ContextApi';
import { fetchData } from '../../Utils/api';
import { formatDistanceToNowStrict, intervalToDuration } from 'date-fns';
import { Link } from 'react-router-dom';

const UnsubTrailer = () => {
	const { channelData } = useContext(Context);
	const [publishedAt, setPublishedAt] = useState('');
	const [channelTrailer, setChannelTrailer] = useState([]);

	const onPause = () => {
		localStorage.setItem('PauseUnsubTrailer', true);
	};
	const onPlay = () => {
		localStorage.setItem('PauseUnsubTrailer', false);
	};
	useEffect(() => {
		getUnsubTrailer();
	}, [publishedAt]);

	const getUnsubTrailer = async () => {
		const res = await fetchData(
			`videos?part=snippet&part=statistics&id=${channelData?.brandingSettings?.channel?.unsubscribedTrailer}&key=${
				import.meta.env.VITE_APP_YOUTUBE_API_KEY
			}`
		);
		setChannelTrailer(res?.items[0]);
		// let date = await new Date(res?.items[0]?.snippet?.publishedAt).toISOString();
		setPublishedAt(formatDistanceToNowStrict(new Date(res?.items[0]?.snippet?.publishedAt)));
	};
	return (
		<div className='flex py-6 justify-center sm:w-[calc(100%-3rem)] md:justify-start md:w-[40rem] lg:w-[50rem] xl:w-[61rem] 2xl:w-auto mx-auto'>
			<div className='featuredTop | w-min md:w-full  flex flex-col md:flex-row gap-4 xl:gap-6'>
				<div className='unsubTrailer | w-[calc(100vw-3rem)] sm:w-[26.5rem] md:min-w-[26.5rem] h-full flex justify-between items-center rounded-xl overflow-hidden'>
					<ReactPlayer
						id='player'
						url={`https://www.youtube.com/embed/${channelData?.brandingSettings?.channel?.unsubscribedTrailer}`}
						controls
						// onPlay={onPlay}
						// onPause={onPause}
						playing={true}
						width={'100%'}
						height={'100%'}
						outline='none'
					/>
				</div>
				<div className='details |  md:min-w-0   lg:max-w-[400px] flex flex-col gap-4'>
					<Link className='text-[#0f0f0f] dark:text-[#f1f1f1]' to={`/video/${channelData?.brandingSettings?.channel?.unsubscribedTrailer}`}>
						<h2 className='text-sm font-medium line-clamp lg:line-clamp-0'>{channelTrailer?.snippet?.title}</h2>
					</Link>
					<p className='text-xs text-[#606060] dark:text-[#aaaaaa]'>
						{`${Intl.NumberFormat().format(channelTrailer?.statistics?.viewCount)} views`}
						<span className='before:content-["•"] before:leading-3 before:text-xs before:mx-1 relative before:top-[-10px] '>
							{`${publishedAt} ago`}
						</span>
					</p>
					<div className='md:flex flex-col hidden'>
						<Link
							to={`/video/${channelData?.brandingSettings?.channel?.unsubscribedTrailer}`}
							className=' text-[#0f0f0f] dark:text-[#f1f1f1]'>
							<p className='description line-clamp-7 | whitespace-pre-wrap text-sm '>{channelTrailer?.snippet?.description}</p>
						</Link>
						<Link
							to={`/video/${channelData?.brandingSettings?.channel?.unsubscribedTrailer}`}
							className='text-xs font-medium uppercase text-[#606060] dark:text-[#f1f1f1] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1]'>
							Read More
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UnsubTrailer;
