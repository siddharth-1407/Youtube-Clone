import React, { lazy, Suspense, useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import NumberAbbreviate from 'number-abbreviate';
import { Context } from '../../context/ContextApi';
import { fetchData } from '../../Utils/api';
import { formatDistanceToNowStrict, intervalToDuration } from 'date-fns';
import { parse, toSeconds } from 'iso8601-duration';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const IsLive = lazy(() => import('./IsLive'));
const VideoLengthTimer = lazy(() => import('./VideoLengthTimer'));
const SharePopup = lazy(() => import('../SharePopup'));

const VideoCard = ({ video }) => {
	const shareBtnRef = useRef();
	const [open, setOpen] = useState(false);
	const { sidebarExpanded, mouseUpAction, mouseDownAction } = useContext(Context);
	const [channelData, setChannelData] = useState(false);
	const [videoStats, setVideoStats] = useState(false);
	const [videoData, setVideoData] = useState([]);
	const [publishedAt, setPublishedAt] = useState('');
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		fetchChannelData(video.snippet.channelId);
		fetchVideoStats(video.id);
		getPublishedAt(video.snippet.publishedAt);
	}, [video.id]);

	const fetchChannelData = async (channelId) => {
		try {
			const res = await fetchData(`channels?part=snippet&id=${channelId}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`);
			setChannelData(res.items);
		} catch (error) {
			if (error.response.status === 403) {
				console.log('ERROR-> Forbidden :  Api Limit most likely!');
			} else if (error.response.status === 400) {
				console.log('ERROR-> OperationNotSupported : Check parameters!');
			} else if (error.response.status === 404) {
				console.log('ERROR-> CommentNotFound, maybe check the id!');
			} else {
				console.log('Error-> ', error);
			}
		}
	};
	const fetchVideoStats = async (videoId) => {
		try {
			const res = await fetchData(`videos?part=statistics&part=contentDetails&id=${videoId}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`);
			const views = NumberAbbreviate(res.items[0].statistics?.viewCount, 1);
			const duration = intervalToDuration({
				start: 0,
				end: toSeconds(parse(res.items[0].contentDetails.duration)) * 1000,
			});
			setVideoStats(views);
			setVideoData(duration);
		} catch (error) {
			if (error.response.status === 403) {
				console.log('ERROR-> Forbidden :  Api Limit most likely!');
			} else if (error.response.status === 400) {
				console.log('ERROR-> OperationNotSupported : Check parameters!');
			} else if (error.response.status === 404) {
				console.log('ERROR-> CommentNotFound, maybe check the id!');
			} else {
				console.log('Error-> ', error);
			}
		}
	};
	const getPublishedAt = (date) => {
		const result = formatDistanceToNowStrict(new Date(date));
		setPublishedAt(result);
	};

	return (
		<div
			className={`group/player flex justify-between video_card sm:p-[5px] min-w-full sm:w-[22.343rem]   ${
				sidebarExpanded === false ? 'lg:w-[22rem]' : 'lg:w-[23rem]'
			}`}
			onMouseOver={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div className='flex flex-col w-full'>
				<Link className='max-w-full' to={`/video/${video?.id}`}>
					<div className=' hover:rounded-none transition-all  thumbnail relative bg-[#e5e5e5] dark:bg-[#272727] rounded-[12px] overflow-hidden  min-h-[10rem] aspect-video'>
						{(
							<img
								loading='lazy'
								src={video?.snippet?.thumbnails?.maxres?.url || video?.snippet?.thumbnails?.medium?.url}
								alt=''
								className={`w-full  aspect-video  bg-[#e5e5e5] dark:bg-[#272727] border-[#272727] transition-opacity `}
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
						{video.snippet?.liveBroadcastContent === 'live' ? (
							<Suspense fallback={<div></div>}>
								<IsLive />
							</Suspense>
						) : (
							<Suspense fallback={<div></div>}>
								<VideoLengthTimer time={videoData} />
							</Suspense>
						)}
						<div className='player |  rounded-[12px]  group-hover/player:rounded-none transition-all absolute top-0 left-0 w-full h-full  '>
							{isHovered && (
								<ReactPlayer
									url={`https://www.youtube.com/watch?v=${video?.id}`}
									className={' group-hover/player:h-[100%] aspect-video top-0 pointer-events-none'}
									muted={true}
									playing={isHovered ? true : false}
									width={'100%'}
									height={'100%'}
								/>
							)}
						</div>
					</div>
				</Link>

				<div className='details flex gap-4 mt-2'>
					<div className='avatar pt-1'>
						<Link to={`/channels/${video?.snippet?.channelId}`}>
							<div className='  w-[36px] h-[36px] rounded-full overflow-hidden bg-[#e5e5e5] dark:bg-[#272727]'>
								{channelData ? (
									<img
										loading='lazy'
										className='bg-[#e5e5e5] dark:bg-[#272727'
										src={channelData[0]?.snippet?.thumbnails?.default?.url}
										alt=''
										width='68'
										height='68'
									/>
								) : (
									<Skeleton
										circle={true}
										width='36px'
										height='36px'
										baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
										enableAnimation={false}
									/>
								)}
							</div>
						</Link>
					</div>

					<div className='flex flex-col justify-between leading-snug w-full relative'>
						<div className='flex mb-1 pr-9'>
							<Link className='w-full pr-1' title={video?.snippet.title} to={`/video/${video?.id}`}>
								<div className='flex w-full'>
									<p className='line-clamp font-semibold w-full text-base text-[#0f0f0f] dark:text-white'>
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
							<div className='button | h-fit relative' ref={shareBtnRef}>
								<button
									className={`js_EventBtn | opacity-0 absolute w-[39.7px] h-[39.7px] rounded-full flex items-center justify-center   border-transparent  active:bg-[#e3e3e3] dark:active:bg-[#272727] group-hover/player:opacity-100 border-[1px] ${
										open && 'opacity-100'
									}`}
									onMouseUp={mouseUpAction}
									onMouseDown={mouseDownAction}
									onClick={() => setOpen(!open)}>
									<MoreVertIcon className='text-black dark:text-white  pointer-events-none' />
								</button>
								<Suspense fallback={<div></div>}>
									<SharePopup shareRef={shareBtnRef} setOpen={setOpen} open={open} video={video?.id} />
								</Suspense>
							</div>
						</div>
						<div className='flex flex-col text-[#606060] dark:text-[#aaaaaa] text-[0.9rem]  '>
							<Link to={`/channels/${video?.snippet?.channelId}`} className='w-full ' title={video?.snippet?.channelTitle}>
								{videoStats ? (
									<p className='line-clamp  flex items-center gap-2 '>
										<span className='hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition '>
											{video?.snippet?.channelTitle}
										</span>
									</p>
								) : (
									<Skeleton
										baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
										width='80%'
										height='1.25rem'
										enableAnimation={false}
									/>
								)}
							</Link>
							{videoStats && (
								<p className='flex'>
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

export default VideoCard;
