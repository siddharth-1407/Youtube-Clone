import React, { useEffect, useState, useContext, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchData } from '../../Utils/api';
import NumberAbbreviate from 'number-abbreviate';
import { formatDistanceToNowStrict, intervalToDuration } from 'date-fns';
import { parse, toSeconds } from 'iso8601-duration';
import VideoLengthTimer from './VideoLengthTimer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Context } from '../../context/ContextApi';
const SharePopup = lazy(() => import('../SharePopup'));

const RelatedVideosCard = ({ video }) => {
	const shareBtnRef = useRef();
	const { mouseUpAction, mouseDownAction } = useContext(Context);
	const [channelData, setChannelData] = useState(false);
	const [videoStats, setVideoStats] = useState(false);
	const [videoData, setVideoData] = useState([]);
	const [publishedAt, setPublishedAt] = useState('');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		fetchChannelData(video.snippet.channelId);
		fetchVideoStats(video.id.videoId);
		fetchVideoData(video.id.videoId);
		getPublishedAt(video.snippet.publishedAt);
	}, [video.id.videoId]);

	const fetchChannelData = (channelId) => {
		fetchData(`channels?part=snippet&id=${channelId}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`).then(({ items }) => {
			setChannelData(items);
		});
	};

	const fetchVideoStats = (videoId) => {
		fetchData(`videos?part=statistics&id=${videoId}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`).then(({ items }) => {
			const views = NumberAbbreviate(items[0].statistics?.viewCount, 1);

			setVideoStats(views);
		});
	};

	const fetchVideoData = (videoId) => {
		fetchData(`videos?id=${videoId}&part=contentDetails&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`).then(({ items }) => {
			const duration = intervalToDuration({
				start: 0,
				end: toSeconds(parse(items[0].contentDetails.duration)) * 1000,
			});
			setVideoData(duration);
		});
	};
	const getPublishedAt = (date) => {
		const result = formatDistanceToNowStrict(new Date(date));
		setPublishedAt(result);
	};

	return (
		<div className='suggested group | w-full flex gap-2 sm:h-[5.875rem]'>
			<div className='image | flex '>
				<Link to={`/video/${video.id.videoId}`} className='image | w-[10.5rem] rounded-lg overflow-hidden'>
					<div className='relative'>
						<img src={video.snippet.thumbnails?.medium.url} alt='' />
						{<VideoLengthTimer time={videoData} />}
					</div>
				</Link>
			</div>

			<div className='flex w-full justify-between py-1 min-w-[150px]'>
				<div className='details  | w-full  flex flex-col'>
					<div className='title | flex'>
						<Link className='w-full pb-1' title={video?.snippet.title} to={`/video/${video.id.videoId}`}>
							<div className='flex w-full'>
								<p className='line-clamp text-sm font-bold w-full text-[#0f0f0f] dark:text-[#f1f1f1] '>
									{videoStats ? video?.snippet?.title : <Skeleton baseColor='#272727' highlightColor='#272727' height='1.25rem' />}
								</p>
							</div>
						</Link>
						<div className=' w-[26px] h-[26px] relative' ref={shareBtnRef}>
							<button
								className=' js_EventBtn | group-hover:opacity-100 opacity-0 w-full rounded-full flex items-center justify-center  border-transparent  active:bg-[#e3e3e3] dark:active:bg-[#272727] border-[1px] '
								onClick={() => setOpen(!open)}
								onMouseUp={mouseUpAction}
								onMouseDown={mouseDownAction}>
								<MoreVertIcon className='text-black dark:text-white pointer-events-none' />
							</button>
							<Suspense fallback={<div></div>}>
								<SharePopup shareRef={shareBtnRef} setOpen={setOpen} open={open} video={video.id.videoId} />
							</Suspense>
						</div>
					</div>
					<div className='text-[#606060] dark:text-[#aaaaaa] text-[0.8rem]'>
						<Link className='w-full ' to={`/channels/${video.snippet.channelId}`} title={video?.snippet?.channelTitle}>
							{channelData ? (
								<p className='line-clamp  flex items-center gap-2 '>
									<span className='hover:text-[#606060] dark:hover:text-[#f1f1f1] transition '>{video?.snippet?.channelTitle}</span>
								</p>
							) : (
								<Skeleton baseColor='#272727' highlightColor='#272727' width='80%' height='1.25rem' />
							)}
						</Link>
						<Link to={`/video/${video.id.videoId}`} className='line-clamp-custom'>
							{videoStats && (
								<p className=''>
									<span className='line-clamp-custom '>
										{`${videoStats} `}
										views
										<span className='before:content-["•"] before:leading-3 before:text-xs before:mx-1 relative before:top-[-10px] '>
											{`${publishedAt} ago`}
										</span>
									</span>
								</p>
							)}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RelatedVideosCard;
