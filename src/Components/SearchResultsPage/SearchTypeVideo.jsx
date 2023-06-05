import React, { useContext, useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import NumberAbbreviate from 'number-abbreviate';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import intervalToDuration from 'date-fns/intervalToDuration';
import { parse, toSeconds } from 'iso8601-duration';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Context } from '../../context/ContextApi';
import { fetchData } from '../../Utils/api';
const SharePopup = lazy(() => import('../SharePopup'));
const IsLive = lazy(() => import('../VideosPage/IsLive'));
const VideoLengthTimer = lazy(() => import('../VideosPage/VideoLengthTimer'));

const SearchTypeVideo = ({ video }) => {
	const parcer = new DOMParser();
	const shareBtnRef = useRef();
	const { mouseUpAction, mouseDownAction } = useContext(Context);
	const [open, setOpen] = useState(false);
	const [channelData, setChannelData] = useState(false);
	const [videoStats, setVideoStats] = useState(false);
	const [videoData, setVideoData] = useState([]);
	const [publishedAt, setPublishedAt] = useState('');
	useEffect(() => {
		fetchChannelData(video.snippet.channelId);
		fetchVideoStats(video.id.videoId);
		fetchVideoData(video.id.videoId);
		getPublishedAt(video.snippet.publishedAt);
	}, [video.id.videoId]);
	useEffect(() => {
		let handler = (e) => {
			if (!shareBtnRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, []);

	const fetchChannelData = (channelId) => {
		fetchData(`channels?part=snippet&id=${channelId}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`).then(({ items }) => {
			setChannelData(items);
		});
	};
	const fetchVideoStats = (videoId) => {
		fetchData(`videos?part=statistics&id=${videoId}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`).then(({ items }) => {
			const views = NumberAbbreviate(items[0]?.statistics?.viewCount, 1);
			setVideoStats(views);
		});
	};
	const fetchVideoData = (videoId) => {
		fetchData(`videos?id=${videoId}&part=contentDetails&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`).then(({ items }) => {
			const duration = intervalToDuration({
				start: 0,
				end: toSeconds(parse(items[0]?.contentDetails?.duration)) * 1000,
			});

			setVideoData(duration);
		});
	};
	const getPublishedAt = (date) => {
		const result = formatDistanceToNowStrict(new Date(date));
		setPublishedAt(result);
	};
	return (
		<div className='group w-full flex flex-col sm:flex-row gap-4 p-1 '>
			<Link className='max-w-full' to={`/video/${video.id?.videoId}`}>
				<div className='thumbnail | relative flex justify-center items-center bg-[#e5e5e5] dark:bg-[#272727] rounded-[12px] sm:w-auto  sm:min-h-[12.563rem] aspect-video overflow-hidden'>
					<img
						loading='lazy'
						src={video?.snippet?.thumbnails?.medium?.url || video?.snippet?.thumbnails?.high?.url}
						alt=''
						className='w-full aspect-video bg-[#e5e5e5] dark:bg-[#272727]'
					/>
					{video.snippet?.liveBroadcastContent === 'live' ? (
						<Suspense fallback={<div></div>}>
							<IsLive />
						</Suspense>
					) : (
						<Suspense fallback={<div></div>}>
							<VideoLengthTimer time={videoData} />
						</Suspense>
					)}
				</div>
			</Link>
			<div className='flex flex-col gap-2 sm:gap-4 leading-snug w-full relative'>
				<div className='flex flex-col gap-1 '>
					<div className='flex '>
						<Link className='w-full pr-1' to={`/video/${video.id?.videoId}`}>
							<div className='flex w-full'>
								<p className='line-clamp font-semibold w-full text-base text-[#0f0f0f] dark:text-white'>
									{video?.snippet?.title.match(/<("[^"]*"|'[^']*'|[^'">])*>|&(amp|lt|gt|quot|apos|#\d+);|\b(\w+)\b|\d+/g)
										? video.snippet.title.replace(
												/<("[^"]*"|'[^']*'|[^'">])*>|&(amp|lt|gt|quot|apos|#\d+);|\b(\w+)\b|\d+/g,
												(html) => parcer.parseFromString(html, 'text/html').documentElement.innerText
										  )
										: video.snippet.title}
								</p>
							</div>
						</Link>
						<div className='button | w-[39.7px] h-[39.7px]' ref={shareBtnRef}>
							<button
								className={` js_EventBtn | opacity-1 sm:opacity-0 absolute w-[39.7px] h-[39.7px] rounded-full flex items-center justify-center border-transparent  active:bg-[#e3e3e3] dark:active:bg-[#272727] border-[1px] group-hover:opacity-100 ${
									open && 'opacity-100'
								}`}
								onClick={() => setOpen(!open)}
								onMouseUp={mouseUpAction}
								onMouseDown={mouseDownAction}>
								<MoreVertIcon className='text-black dark:text-white  pointer-events-none' />
							</button>
							<Suspense fallback={<div></div>}>
								<SharePopup setOpen={setOpen} video={video.id?.videoId} shareRef={shareBtnRef} open={open} />
							</Suspense>
						</div>
					</div>
					{videoStats && (
						<Link to={`/video/${video.id?.videoId}`}>
							<p className='text-[0.8rem] text-[#606060] dark:text-[#aaaaaa] line-clamp-custom'>
								<span className=''>
									{`${videoStats} `}
									views
								</span>
								<span className='before:content-["•"] before:leading-3 before:text-xs before:mx-1 relative before:top-[-10px]'>
									{`${publishedAt} ago`}
								</span>
							</p>
						</Link>
					)}
				</div>

				<div className=' flex fle-col text-[#606060] dark:text-[#aaaaaa] text-[0.8rem]  '>
					<Link to={`/${video?.snippet?.channelId}`} className='flex items-center min-w-min gap-2'>
						<div className='w-[30px] h-[30px] rounded-full overflow-hidden bg-[#e5e5e5] dark:bg-[#272727]'>
							<img
								loading='lazy'
								src={channelData[0]?.snippet?.thumbnails?.medium?.url || channelData[0]?.snippet?.thumbnails?.high?.url}
								alt=''
								className='w-full aspect-square bg-[#e5e5e5] dark:bg-[#272727]'
							/>
						</div>
						<div>
							<p className=' my-auto flex items-center gap-2 '>
								<span className='hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition line-clamp-custom'>
									{video?.snippet?.channelTitle}
								</span>
							</p>
						</div>
					</Link>
				</div>
				<div>
					<Link to={`/video/${video.id?.videoId}`} title='From the video description' className=' w-full hidden sm:flex items-center'>
						{videoStats ? (
							<p className='line-clamp my-auto flex items-center gap-2  text-[0.8rem] text-[#606060] dark:text-[#aaaaaa]'>
								<span className='line-clamp-custom'>{video?.snippet?.description}</span>
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
				</div>
			</div>
		</div>
	);
};

export default SearchTypeVideo;
