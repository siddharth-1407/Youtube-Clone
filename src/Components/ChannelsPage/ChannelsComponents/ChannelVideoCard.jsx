import React, { useContext, useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Context } from '../../../context/ContextApi';
import { fetchData } from '../../../Utils/api';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideoLengthTimer from '../../VideosPage/VideoLengthTimer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NumberAbbreviate from 'number-abbreviate';
import { formatDistanceToNowStrict, intervalToDuration } from 'date-fns';
import { parse, toSeconds } from 'iso8601-duration';
const SharePopup = lazy(() => import('../../SharePopup'));

const ChannelVideoCard = ({ video }) => {
	const shareBtnRef = useRef();
	const { mouseDownAction, mouseUpAction } = useContext(Context);
	const [videoStats, setVideoStats] = useState('');
	const [publishedAt, setPublishedAt] = useState('');
	const [videoLength, setVideoLength] = useState('');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		getVideoStats();
		getPublishedAt(video?.snippet?.publishedAt);
	}, []);
	const getPublishedAt = (date) => {
		const result = formatDistanceToNowStrict(new Date(date));
		setPublishedAt(result);
	};
	const getVideoStats = async () => {
		try {
			const res = await fetchData(
				`videos?part=snippet&part=statistics&part=contentDetails&id=${video?.snippet?.resourceId?.videoId}&key=${
					import.meta.env.VITE_APP_YOUTUBE_API_KEY
				}`
			);

			setVideoStats(res.items[0].statistics);
			const duration = intervalToDuration({
				start: 0,
				end: toSeconds(parse(res.items[0].contentDetails.duration)) * 1000,
			});
			setVideoLength(duration);
		} catch (error) {
			console.log('errror', error.message);
		}
	};

	return (
		<div className={` flex justify-between video_card w-[90%] sm:w-[210px] md:w-[305.9983px] `}>
			<div className=' group flex flex-col w-full'>
				<Link className='max-w-full' to={`/video/${video?.snippet?.resourceId.videoId}`}>
					<div className='thumbnail relative  bg-[#e5e5e5] dark:bg-[#272727] rounded-[12px]   aspect-video'>
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
						{video.snippet?.liveBroadcastContent === 'live' ? <IsLive /> : <VideoLengthTimer time={videoLength} />}
					</div>
				</Link>

				<div className='details flex gap-4 mt-2'>
					<div className='flex flex-col justify-between leading-snug w-full relative'>
						<div className='flex mb-1 pr-7'>
							<Link className='w-full ' title={video?.snippet.title} to={`/video/${video?.snippet?.resourceId.videoId}`}>
								<div className='flex w-full'>
									<p className='line-clamp font-medium w-full text-sm text-[#0f0f0f] dark:text-white'>{video?.snippet?.title}</p>
								</div>
							</Link>
							<div className='button | h-fit ' ref={shareBtnRef}>
								<button
									className=' js_EventBtn | sm:opacity-0  group-hover:opacity-100 focus-visible:opacity-100 absolute top-[-18%] right-[-4%] w-[35.7px] h-[35.7px] rounded-full flex items-center justify-center  border-transparent focus-visible:outline-none focus-visible:bg-[rgba(227,227,227,0.7)] dark:focus-visible:bg-[rgba(39,39,39,0.7)] active:bg-[rgba(227,227,227,0.7)] dark:active:bg-[rgba(39,39,39,0.7)] border-[1px]'
									onClick={() => setOpen(!open)}
									onMouseUp={mouseUpAction}
									onMouseDown={mouseDownAction}>
									<MoreVertIcon className='text-black dark:text-white  pointer-events-none' />
								</button>
								<Suspense fallback={<div></div>}>
									<SharePopup shareRef={shareBtnRef} setOpen={setOpen} open={open} video={video?.snippet?.resourceId.videoId} />
								</Suspense>
							</div>
						</div>
						<div className='flex flex-col text-[#606060] dark:text-[#aaaaaa] text-xs  '>
							{videoStats && (
								<p>
									<span className=''>
										{`${NumberAbbreviate(videoStats.viewCount, 0)} `}
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

export default ChannelVideoCard;
