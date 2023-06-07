import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../../context/ContextApi';
import { fetchData } from '../../../Utils/api';
import NumberAbbreviate from 'number-abbreviate';
import { formatDistanceToNowStrict, intervalToDuration } from 'date-fns';
import { parse, toSeconds } from 'iso8601-duration';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import IsLive from '../../../assets/Live.svg';
import VideoLengthTimer from '../../VideosPage/VideoLengthTimer';

const ChannelVideoCardForSlider = ({ video }) => {
	const { mouseUpAction, mouseDownAction } = useContext(Context);
	const [videoStats, setVideoStats] = useState(false);
	const [videoData, setVideoData] = useState([]);
	const [publishedAt, setPublishedAt] = useState('');

	useEffect(() => {
		fetchVideoStats(video.contentDetails.videoId);
		getPublishedAt(video.snippet.publishedAt);
	}, [video.id]);

	const fetchVideoStats = async (videoId) => {
		try {
			const res = await fetchData(`videos?part=statistics&part=contentDetails&id=${videoId}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`);
			setVideoStats(NumberAbbreviate(res.items[0].statistics?.viewCount, 1));
			await setVideoData(
				intervalToDuration({
					start: 0,
					end: toSeconds(parse(res.items[0].contentDetails.duration)) * 1000,
				})
			);
		} catch (error) {
			console.log('Error getting VideoStats or videoData');
		}
	};

	const getPublishedAt = (date) => {
		const result = formatDistanceToNowStrict(new Date(date));
		setPublishedAt(result);
	};

	return (
		<div className={` flex justify-between video_card `}>
			<div className=' group flex flex-col w-full'>
				<Link className='max-w-full' to={`/video/${video?.contentDetails?.videoId}`}>
					<div className='thumbnail relative bg-[#e5e5e5] dark:bg-[#272727] rounded-[12px]   aspect-video'>
						{(
							<img
								loading='lazy'
								src={video?.snippet?.thumbnails?.maxres?.url || video?.snippet?.thumbnails?.medium?.url}
								alt=''
								className='w-full rounded-[12px] aspect-video  bg-[#e5e5e5] dark:bg-[#272727] border-[#272727]'
							/>
						) || (
							<Skeleton
								circle={true}
								width='36px'
								height='36px'
								baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
								enableAnimation={false}
							/>
						)}
						{video.snippet?.liveBroadcastContent === 'live' ? <IsLive /> : <VideoLengthTimer time={videoData} />}
					</div>
				</Link>

				<div className='details flex gap-4 mt-2'>
					<div className='flex flex-col justify-between leading-snug w-full relative'>
						<div className='flex mb-1 pr-7'>
							<Link className='w-full ' title={video?.snippet.title} to={`/video/${video?.contentDetails?.videoId}`}>
								<div className='flex w-full'>
									<p className='line-clamp font-medium w-full text-sm text-[#0f0f0f] dark:text-white'>
										{videoStats ? (
											video?.snippet?.title
										) : (
											<Skeleton
												baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
												height='1.25rem'
												enableAnimation={false}
											/>
										)}
									</p>
								</div>
							</Link>
							<div className='button | h-fit '>
								<button
									className=' js_EventBtn | sm:opacity-0 group-hover:opacity-100 absolute top-[-18%] right-[-4%] w-[35.7px] h-[35.7px] rounded-full flex items-center justify-center  border-transparent  active:bg-[rgba(227,227,227,0.7)] dark:active:bg-[rgba(39,39,39,0.7)] border-[1px]'
									onMouseUp={mouseUpAction}
									onMouseDown={mouseDownAction}>
									<MoreVertIcon className='text-black dark:text-white  pointer-events-none' />
								</button>
							</div>
						</div>
						<div className='flex flex-col text-[#606060] dark:text-[#aaaaaa] text-xs  '>
							{videoStats && (
								<p>
									<span className=''>
										{`${videoStats} `}
										views
									</span>
									<span className='before:content-["•"] before:leading-3 before:text-xs before:mx-1 relative before:top-[-10px]'>
										{`${publishedAt} ago`}
									</span>
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChannelVideoCardForSlider;
