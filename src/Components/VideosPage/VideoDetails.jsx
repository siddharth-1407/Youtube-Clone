import React, { Suspense, lazy, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NumberAbbreviate from 'number-abbreviate';
import { formatDistanceToNowStrict } from 'date-fns';
import { fetchData } from '../../Utils/api';
import { Context } from '../../context/ContextApi';
import NoConnection from '../NoConnection/NoConnection';
const CommentSection = lazy(() => import('./CommentSection/CommentSection'));
const RelatedVideos = lazy(() => import('./RelatedVideos'));
const VideoDetailActions = lazy(() => import('./VideoDetailActions'));

const VideoDetails = () => {
	const { setProgress, setSidebarExpanded, setIsOnline, isOnline, setPlayerRef } = useContext(Context);
	const { id } = useParams(null);
	const playerRef = useRef();
	const [video, setVideo] = useState([]);
	const [channelId, setChannelId] = useState('');
	const [videoStats, setVideoStats] = useState([]);
	const [channelData, setChannelData] = useState([]);
	const [description, setDescription] = useState('');
	const [descExpanded, setDescExpanded] = useState(false);
	const [publishedAt, setPublishedAt] = useState('');
	const [publishedAtExpanded, setPublishedAtExpanded] = useState('');

	useEffect(() => {
		setSidebarExpanded(false);
		if (navigator.onLine) {
			setIsOnline(true);
			fetchVideoData();
			setPlayerRef(playerRef);
			setClickEventOnTimeStamp();
		} else {
			setIsOnline(false);
		}
	}, [id]);
	useEffect(() => {
		if (navigator.onLine) {
			setIsOnline(true);
			fetchChannelData();
		} else {
			setIsOnline(false);
		}
	}, [channelId]);
	useEffect(() => {
		setMetaTags();
	}, [video]);
	const setMetaTags = () => {
		if (video) {
			if (document.querySelector('meta[name=description]')) {
				document.head.removeChild(document.querySelector('meta[name=description]'));
			}
			if (document.querySelectorAll('meta[name=tags]')) {
				const metaTags = document.querySelectorAll('meta[name=tags]');
				metaTags.forEach((tag) => {
					document.head.removeChild(tag);
				});
			}
			const MAX_DESCRIPTION_LENGTH = 160;
			let truncatedDescription = video?.description;
			let keyword = video?.tags;
			if (truncatedDescription?.length > MAX_DESCRIPTION_LENGTH) {
				truncatedDescription = truncatedDescription.substring(0, MAX_DESCRIPTION_LENGTH - 3) + '...';
			}
			// Title
			document.title = video?.title || 'YouTube Clone';
			// Description
			const descriptionTag = document.querySelector('meta[name="description"]');
			if (descriptionTag) {
				descriptionTag.setAttribute('content', truncatedDescription);
			} else {
				const newDescriptionTag = document.createElement('meta');
				newDescriptionTag.setAttribute('name', 'description');
				newDescriptionTag.setAttribute('content', truncatedDescription);
				document.head.appendChild(newDescriptionTag);
			}
			// Keywords
			const keywordTag = document.querySelector('meta[name="keywords"]');
			if (keywordTag) {
				keywordTag.setAttribute('content', keyword);
			} else {
				if (keyword) {
					const newKeywordTag = document.createElement('meta');
					newKeywordTag.setAttribute('name', 'keywords');
					newKeywordTag.setAttribute('content', keyword);
					document.head.appendChild(newKeywordTag);
				}
			}
			// Tags
			keyword?.map((tag) => {
				const metaTag = document.createElement('meta');
				metaTag.setAttribute('name', 'tags');
				metaTag.setAttribute('content', tag);
				document.head.appendChild(metaTag);
			});
		} else {
			return;
		}
	};

	const renderDescription = () => {
		function timeStringToSeconds(timeString) {
			const [hours, minutes, seconds] = timeString.split(':').map(Number);
			return hours * 3600 + minutes * 60 + seconds;
		}

		// Define a regular expression to match URLs in the description
		const urlRegex = /(https?:\/\/[^\s]+)/g;
		const youtubeLinkRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i;
		const timeStampRegex = /\b(\d{1,2}):(\d{2})(?::(\d{2}))?\b/g;
		let final;

		// Replace URLs with HTML links

		const replacedDescription = description.replace(urlRegex, (url) => {
			return youtubeLinkRegex.test(url)
				? `<div class="relative left-3 top-2 inline-flex h-[22px] px-[2px] rounded-full bg-[#e6e6e6] dark:bg-[#3d3d3d] w-[159px] "><a href="${url}" target="_blank" class="w-full flex items-center gap-1 "><span class='w-8 scale-[0.7]'><svg width="91" height="27" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clip-path="url(#clip0_7_3)">
				<path d="M25.2001 5.94801C24.9121 4.86801 24.0601 4.01601 22.9761 3.72401C21.0161 3.20001 13.1521 3.20001 13.1521 3.20001C13.1521 3.20001 5.29208 3.20001 3.32808 3.72401C2.24808 4.01201 1.39608 4.86401 1.10408 5.94801C0.580078 7.90801 0.580078 12 0.580078 12C0.580078 12 0.580078 16.092 1.10408 18.052C1.39208 19.132 2.24408 19.984 3.32808 20.276C5.29208 20.8 13.1521 20.8 13.1521 20.8C13.1521 20.8 21.0161 20.8 22.9761 20.276C24.0561 19.988 24.9081 19.136 25.2001 18.052C25.7241 16.092 25.7241 12 25.7241 12C25.7241 12 25.7241 7.90801 25.2001 5.94801Z" fill="#FF0000"/>
				<path d="M10.6401 15.772L17.1721 12L10.6401 8.22803V15.772Z" fill="white"/>
				<path d="M37.0762 19.212C36.5802 18.876 36.2242 18.356 36.0162 17.648C35.8082 16.94 35.7002 16 35.7002 14.824V13.224C35.7002 12.036 35.8202 11.084 36.0602 10.364C36.3002 9.64402 36.6762 9.12002 37.1842 8.79202C37.6922 8.46402 38.3602 8.29602 39.1882 8.29602C40.0042 8.29602 40.6562 8.46402 41.1482 8.80002C41.6402 9.13602 42.0002 9.66002 42.2282 10.372C42.4562 11.084 42.5682 12.036 42.5682 13.22V14.82C42.5682 15.996 42.4562 16.94 42.2362 17.652C42.0162 18.364 41.6562 18.888 41.1562 19.216C40.6602 19.544 39.9842 19.712 39.1322 19.712C38.2602 19.716 37.5722 19.548 37.0762 19.212ZM39.8642 17.484C40.0002 17.124 40.0722 16.536 40.0722 15.724V12.288C40.0722 11.496 40.0042 10.92 39.8642 10.552C39.7282 10.188 39.4842 10.004 39.1362 10.004C38.8002 10.004 38.5642 10.188 38.4242 10.552C38.2882 10.916 38.2162 11.496 38.2162 12.288V15.724C38.2162 16.54 38.2802 17.128 38.4122 17.484C38.5442 17.844 38.7842 18.024 39.1322 18.024C39.4842 18.024 39.7242 17.844 39.8642 17.484Z"  />
				<path d="M75.2642 14.852V15.408C75.2642 16.116 75.2842 16.644 75.3282 17C75.3682 17.352 75.4562 17.612 75.5882 17.772C75.7202 17.932 75.9242 18.016 76.2002 18.016C76.5722 18.016 76.8282 17.872 76.9642 17.584C77.1002 17.296 77.1762 16.816 77.1882 16.144L79.3282 16.268C79.3402 16.364 79.3442 16.496 79.3442 16.664C79.3442 17.684 79.0642 18.444 78.5082 18.948C77.9522 19.452 77.1642 19.704 76.1442 19.704C74.9202 19.704 74.0642 19.32 73.5722 18.552C73.0802 17.784 72.8362 16.6 72.8362 14.992V13.068C72.8362 11.412 73.0922 10.208 73.6002 9.44402C74.1082 8.68402 74.9802 8.30402 76.2162 8.30402C77.0682 8.30402 77.7202 8.46002 78.1762 8.77202C78.6322 9.08402 78.9522 9.56802 79.1402 10.228C79.3242 10.888 79.4202 11.8 79.4202 12.96V14.848H75.2642V14.852ZM75.5802 10.212C75.4562 10.368 75.3722 10.624 75.3282 10.976C75.2842 11.328 75.2642 11.868 75.2642 12.584V13.376H77.0802V12.584C77.0802 11.876 77.0562 11.34 77.0082 10.976C76.9602 10.612 76.8722 10.352 76.7482 10.204C76.6242 10.056 76.4282 9.98002 76.1642 9.98002C75.9002 9.97602 75.7042 10.056 75.5802 10.212Z"  />
				<path d="M31.0362 14.644L28.2122 4.44803H30.6762L31.6642 9.06803C31.9162 10.208 32.1002 11.176 32.2202 11.98H32.2922C32.3762 11.404 32.5602 10.44 32.8482 9.08403L33.8722 4.44403H36.3362L33.4802 14.644V19.536H31.0362V14.644Z"  />
				<path d="M50.5801 8.51202V19.532H48.6401L48.4241 18.184H48.3721C47.8441 19.204 47.0521 19.712 46.0001 19.712C45.2681 19.712 44.7281 19.472 44.3801 18.992C44.0321 18.512 43.8601 17.764 43.8601 16.744V8.51202H46.3401V16.604C46.3401 17.096 46.3921 17.448 46.5001 17.656C46.6081 17.864 46.7881 17.972 47.0401 17.972C47.2561 17.972 47.4641 17.908 47.6601 17.776C47.8561 17.644 48.0041 17.476 48.1001 17.272V8.51202H50.5801Z"  />
				<path d="M63.3081 8.51202V19.532H61.3681L61.1521 18.184H61.1001C60.5721 19.204 59.7801 19.712 58.7281 19.712C57.9961 19.712 57.4561 19.472 57.1081 18.992C56.7601 18.512 56.5881 17.764 56.5881 16.744V8.51202H59.0681V16.604C59.0681 17.096 59.1201 17.448 59.2281 17.656C59.3361 17.864 59.5161 17.972 59.7681 17.972C59.9841 17.972 60.1921 17.908 60.3881 17.776C60.5841 17.644 60.7321 17.476 60.8281 17.272V8.51202H63.3081Z"  />
				<path d="M57.3243 6.444H54.8603V19.532H52.4323V6.444H49.9683V4.448H57.3203V6.444H57.3243Z"  />
				<path d="M71.5202 10.276C71.3682 9.58003 71.1282 9.07603 70.7922 8.76403C70.4562 8.45203 69.9962 8.29603 69.4082 8.29603C68.9522 8.29603 68.5282 8.42403 68.1322 8.68403C67.7362 8.94003 67.4322 9.28003 67.2162 9.70003H67.1962V3.89203H64.8042V19.536H66.8522L67.1042 18.492H67.1562C67.3482 18.864 67.6362 19.156 68.0202 19.372C68.4042 19.588 68.8282 19.696 69.2962 19.696C70.1362 19.696 70.7522 19.308 71.1482 18.536C71.5442 17.764 71.7402 16.556 71.7402 14.912V13.168C71.7442 11.936 71.6682 10.972 71.5202 10.276ZM69.2442 14.772C69.2442 15.576 69.2122 16.204 69.1442 16.66C69.0802 17.116 68.9682 17.44 68.8122 17.632C68.6562 17.824 68.4482 17.92 68.1842 17.92C67.9802 17.92 67.7922 17.872 67.6162 17.776C67.4442 17.68 67.3002 17.536 67.1922 17.344V11.084C67.2762 10.784 67.4202 10.54 67.6242 10.348C67.8282 10.156 68.0482 10.06 68.2882 10.06C68.5402 10.06 68.7362 10.16 68.8722 10.356C69.0082 10.552 69.1042 10.888 69.1602 11.352C69.2122 11.82 69.2402 12.484 69.2402 13.348V14.772H69.2442Z"  />
				</g>
				<defs>
				<clipPath id="clip0_7_3">
				<rect width="80" height="24" fill="white"/>
				</clipPath>
				</defs>
				</svg></span><span class=" text-[#0f0f0f] dark:text-white">•&nbsp;</span>
				<span class="text-[#0f0f0f] dark:text-white text-sm font-normal dark:font-medium line-clamp-custom leading-relaxed">${url}</span></a></div>`
				: `<a href="${url}" target="_blank" class="text-[#3ea6ff]">${url}</a>`;
		});
		if (replacedDescription.match(timeStampRegex)) {
			final = replacedDescription.replace(timeStampRegex, (timeStamp) => {
				return `<button class='timeStamp text-[#3ea6ff]' data-time=${timeStringToSeconds(timeStamp)}>${timeStamp}</button>`;
			});
		}
		if (!final) {
			return { __html: replacedDescription };
		}
		setClickEventOnTimeStamp();
		return { __html: final };
	};
	const getPublishedAt = (date) => {
		const result = formatDistanceToNowStrict(new Date(date));
		setPublishedAt(result);
	};
	const setClickEventOnTimeStamp = () => {
		const Btns = document.getElementsByClassName('timeStamp');
		for (let i = 0; i < Btns.length; i++) {
			let element = Btns[i];
			const time = element.getAttribute('data-time');
			element.addEventListener('click', () => playerRef.current.seekTo(time));
		}
	};
	const fetchVideoData = async () => {
		setProgress(2);
		try {
			const res = await fetchData(`videos?part=snippet&part=statistics&id=${id}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`);
			setVideo(res.items[0].snippet);
			setDescription(res.items[0].snippet.description);
			setChannelId(res.items[0].snippet.channelId);
			getPublishedAt(res.items[0].snippet.publishedAt);
			setVideoStats(res.items[0].statistics);
			setPublishedAtExpanded(
				new Intl.DateTimeFormat('en-us', {
					dateStyle: 'medium',
				}).format(new Date(res.items[0].snippet.publishedAt))
			);
		} catch (error) {
			console.log(error);
		}
		setProgress(100);
	};
	const fetchChannelData = async () => {
		if (channelId) {
			try {
				const res = await fetchData(`channels?part=snippet&part=statistics&id=${channelId}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`);
				await setChannelData(res.items[0]);
			} catch (error) {
				console.log('Error -> ', error);
			}
		}
	};

	const handleDescription = () => {
		descExpanded ? setDescExpanded(false) : setDescExpanded(true);
	};

	return (
		<div className=' flex h-full min-h-[calc(100vh-56px)] w-full justify-between md:px-6 md:pt-6 '>
			{isOnline ? (
				<div className='wrapper | mx-auto flex w-full min-w-full max-w-[109.625rem] flex-col justify-between gap-6 min-[1060px]:min-w-[640px]  min-[1060px]:flex-row xl:px-6'>
					<main className='flex w-full flex-1 flex-col gap-2'>
						<div className='player '>
							<ReactPlayer
								ref={playerRef}
								url={`https://www.youtube.com/watch?v=${id}`}
								controls
								playing={true}
								width={`100%`}
								height='auto'
								outline='none'
							/>
						</div>
						<div className='title | mt-1 px-3 text-[1.2rem] font-medium text-[#0f0f0f] dark:text-[#f1f1f1] sm:px-0'>
							<p>{video?.title}</p>
						</div>
						<Suspense fallback={<div></div>}>
							<VideoDetailActions video={video} videoStats={videoStats} channelData={channelData} />
						</Suspense>
						<article
							className={`description | group/description mx-auto mt-2 flex w-[calc(100%-(0.75rem*2))] flex-col gap-2 rounded-xl bg-[#f2f2f2] px-3 py-[0.625rem] dark:bg-[#272727] sm:w-full
				${descExpanded ? '' : 'cursor-pointer hover:bg-[#e5e5e5] dark:hover:bg-[#3f3f3f]'} `}
							onClick={() => {
								!descExpanded ? handleDescription() : '';
							}}>
							<header className='text-[0.9rem]'>
								<p>
									<span className='font-medium text-[#0f0f0f] dark:font-semibold dark:text-[#f1f1f1]'>
										{`${
											descExpanded
												? Intl.NumberFormat().format(videoStats?.viewCount)
												: NumberAbbreviate(videoStats?.viewCount, 1)
										} views `}
										<span>{descExpanded ? publishedAtExpanded : `${publishedAt} ago`}</span>
									</span>
									{video?.tags?.length <= 3 ? (
										<span className={`${descExpanded ? 'text-[#aaaaaa]' : 'text-[#3ea6ff]'}`}>{video?.tags}</span>
									) : (
										''
									)}
								</p>
							</header>
							<div
								className={` relative flex  text-[0.9rem] ${
									descExpanded ? ' max-h-min w-full flex-col' : ' max-h-14  w-1/2 flex-row '
								}`}>
								<p
									id='descriptionText'
									className={`${
										descExpanded ? ' ' : 'line-clamp-custom fade '
									} whitespace-pre-line font-normal text-[#0f0f0f] dark:font-normal dark:text-[#f1f1f1] `}
									dangerouslySetInnerHTML={renderDescription()}>
									{/* Video Description */}
								</p>
								<button
									className={`${
										descExpanded
											? 'mt-2 max-w-min px-2'
											: 'z-1 from-10% to-90% to-position-[5%] mt-0 -translate-x-5 bg-gradient-to-r from-[#f2f2f2] to-transparent pl-4 group-hover/description:from-[#e5e5e5] dark:from-[#272727] dark:group-hover/description:from-[#3f3f3f] '
									} whitespace-nowrap font-bold text-[#0f0f0f] dark:text-[#f1f1f1]`}
									onClick={handleDescription}>
									Show Less
								</button>
							</div>
						</article>
						<Suspense fallback={''}>
							<CommentSection id={id} />
						</Suspense>
					</main>
					<Suspense fallback={''}>
						<RelatedVideos />
					</Suspense>
				</div>
			) : (
				<NoConnection />
			)}
		</div>
	);
};

export default VideoDetails;
