import React, { useContext, useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import NumberAbbreviate from 'number-abbreviate';
import { formatDistanceToNowStrict, intervalToDuration } from 'date-fns';
import { parse, toSeconds } from 'iso8601-duration';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import 'react-loading-skeleton/dist/skeleton.css';
import { Context } from '../../context/ContextApi';
import { fetchData } from '../../Utils/api';
import IsLive from '../../assets/Live.svg';
import VideoLengthTimer from '../VideosPage/VideoLengthTimer';
import SharePopup from '../SharePopup';

const PlaylistVideo = ({ video, index }) => {
	const shareBtnRef = useRef();
	const [open, setOpen] = useState(false);
	const { mouseUpAction, mouseDownAction } = useContext(Context);
	const [channelData, setChannelData] = useState('');
	const [videoStats, setVideoStats] = useState(false);
	const [videoLength, setVideoLength] = useState([]);
	const [publishedAt, setPublishedAt] = useState('');
	useEffect(() => {
		fetchChannelData(video.snippet.channelId);
		fetchVideoStats(video.snippet.resourceId.videoId);
		getPublishedAt(video.snippet.publishedAt);
	}, [video.id.videoId]);

	const fetchChannelData = (channelId) => {
		fetchData(`channels?part=snippet&id=${channelId}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`).then(({ items }) => {
			setChannelData(items);
		});
	};
	const fetchVideoStats = async (videoId) => {
		try {
			const res = await fetchData(`videos?part=statistics&part=contentDetails&id=${videoId}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`);
			setVideoStats(NumberAbbreviate(res.items[0]?.statistics?.viewCount, 1));
			const duration = intervalToDuration({
				start: 0,
				end: toSeconds(parse(res.items[0]?.contentDetails?.duration)) * 1000,
			});
			setVideoLength(duration);
		} catch (error) {
			console.log(error);
		}
	};
	const getPublishedAt = (date) => {
		const result = formatDistanceToNowStrict(new Date(date));
		setPublishedAt(result);
	};
	return (
		<div
			className='group w-full flex flex-col sm:flex-row gap-4 p-1 hover:bg-[#e5e5e5] hover:dark:bg-[#272727] rounded-[12px] border-[1px] border-transparent'
			onMouseDown={mouseDownAction}
			onMouseUp={mouseUpAction}>
			<Link
				className='max-w-full h-fit focus-visible:outline-none focus-visible:scale-110 transition-transform flex'
				to={`/video/${video?.snippet?.resourceId?.videoId}`}>
				<div className='justify-center items-center pl-1 pr-3 text-[#606060] dark:text-[#aaa] hidden lg:flex'>{index + 1}</div>
				<div className='thumbnail | w-full relative flex justify-center items-center bg-[#e5e5e5] dark:bg-[#272727] rounded-[12px] sm:w-auto  sm:h-[6.563rem] aspect-video overflow-hidden '>
					<img
						loading='lazy'
						src={video?.snippet?.thumbnails?.medium?.url || video?.snippet?.thumbnails?.high?.url}
						alt=''
						aria-hidden='true'
						className='w-full aspect-video bg-[#e5e5e5] dark:bg-[#272727] '
					/>
					{video.snippet?.liveBroadcastContent === 'live' ? <IsLive /> : <VideoLengthTimer time={videoLength} />}
				</div>
			</Link>
			<div className='flex flex-col gap-2  leading-snug w-full relative pointer-events-none'>
				<div className='flex flex-col  flex-1 '>
					<div className='flex relative '>
						<Link className='w-[90%] pr-1 pb-2 pointer-events-auto' to={`/video/${video?.snippet?.resourceId?.videoId}`}>
							<div className='flex w-full'>
								<h2 className='line-clamp font-semibold w-full text-base text-[#0f0f0f] dark:text-white'>{video?.snippet?.title}</h2>
							</div>
						</Link>
						<div className='button | absolute right-0 w-[39.7px] h-[39.7px] pointer-events-auto' ref={shareBtnRef}>
							<button
								className={`js_EventBtn | opacity-95 md:opacity-0  group-hover:opacity-100 focus-visible:opacity-100 absolute w-[39.7px] h-[39.7px] rounded-full flex items-center justify-center border-transparent  active:bg-[#e3e3e3] dark:active:bg-[#272727] border-[1px]  focus-visible:outline-none focus-visible:dark:bg-[#272727] focus-visible:bg-[#e3e3e3] ${
									open && 'opacity-100'
								}`}
								onClick={() => setOpen(!open)}
								onMouseUp={mouseUpAction}
								onMouseDown={mouseDownAction}>
								<MoreVertIcon className='text-black dark:text-white  pointer-events-none' />
							</button>
							<SharePopup open={open} setOpen={setOpen} video={video?.snippet?.resourceId?.videoId} shareRef={shareBtnRef} />
						</div>
					</div>
					{videoStats && (
						<p className='h-1/2 flex flex-wrap text-[0.8rem] text-[#606060] dark:text-[#aaaaaa]  line-clamp-custom'>
							<Link
								to={`/channels/${video?.snippet?.channelId}`}
								className='pointer-events-auto hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] focus-visible:dark:text-[#f1f1f1] focus-visible:outline-none focus-visible:text-[#0f0f0f] transition line-clamp-custom'>
								{video?.snippet?.channelTitle}
							</Link>
							<Link
								to={`/video/${video?.snippet?.resourceId?.videoId}`}
								className='flex flex-wrap pointer-events-auto focus-visible:outline-none'>
								<span className='before:content-["•"] before:leading-3 before:text-xs before:mx-1 relative before:top-[-10px] line-clamp-custom'>
									{`${videoStats} views`}
								</span>
								<span className='before:content-["•"] before:leading-3 before:text-xs before:mx-1 relative before:top-[-10px] line-clamp-custom'>
									{`${publishedAt} ago`}
								</span>
							</Link>
						</p>
					)}
				</div>
			</div>
		</div>
	);
};
export default PlaylistVideo;
