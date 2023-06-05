import React, { useContext, useEffect, useState, lazy, Suspense } from 'react';
import { Context } from '../../../context/ContextApi';
import { fetchData } from '../../../Utils/api';
import ChannelVideoCardFallback from '../../Skeletons/ChannelVideoCardFallback';
const ChannelVideoCard = lazy(() => import('../ChannelsComponents/ChannelVideoCard'));

const ChannelVideos = () => {
	const { setProgress, setRateLimited, channelData } = useContext(Context);
	const [channelVideos, setChannelVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [nextPageToken, setNextPageToken] = useState('');
	const array = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

	useEffect(() => {
		fetchChannelVideos();
	}, []);
	const fetchChannelVideos = async () => {
		document.documentElement.scrollTop = 0;
		setProgress(80);
		try {
			setLoading(true);
			setRateLimited(false);
			const res = await fetchData(
				`playlistItems?part=snippet&maxResults=16&playlistId=${channelData?.contentDetails?.relatedPlaylists?.uploads}&key=${
					import.meta.env.VITE_APP_YOUTUBE_API_KEY
				}`
			);
			setLoading(false);
			setChannelVideos(res.items);
			setNextPageToken(res.nextPageToken);
		} catch (error) {
			console.log('Error', error);
			if (error.response.status === 404) {
				setLoading(false);
			} else if (error.response.status === 403) {
				setLoading(false);
				setRateLimited(true);
			}
		}
		setProgress(100);
	};

	const handleScroll = () => {
		fetchData(
			`playlistItems?part=snippet&maxResults=16&playlistId=${
				channelData?.contentDetails?.relatedPlaylists?.uploads
			}&pageToken=${nextPageToken}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`
		)
			.then((res) => {
				setRateLimited(false);
				console.log(res);
				setNextPageToken(res.nextPageToken);
				setChannelVideos((prev) => [...prev, ...res.items]);
				console.log('next page token', nextPageToken);
			})
			.catch((error) => {
				console.log('Error', error);
				setLoading(false);
				setRateLimited(true);
			});
	};
	const handleInfiniteScroll = async () => {
		if (window.innerHeight + document.documentElement.scrollTop + 1 === document.documentElement.scrollHeight && nextPageToken) {
			try {
				setProgress(80);
				handleScroll();
				setProgress(100);
			} catch (error) {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		window.addEventListener('scroll', handleInfiniteScroll);

		return () => {
			window.removeEventListener('scroll', handleInfiniteScroll);
		};
	}, [nextPageToken]);
	return (
		<div className='w-[calc(100vw-2rem)] mx-auto min-h-[780px] h-full sm:px-12 sm:w-full md:px-0 md:w-[40rem] lg:w-[50rem] xl:px-0 2xl:px-0 xl:min-w-[61rem]  2xl:min-w-[81.25rem] pt-4  divide-y-[1px] divide-[#e5e5e5] dark:divide-[#3f3f3f]'>
			<div className='flex flex-wrap gap-x-4 gap-y-8 justify-center md:justify-start'>
				{loading && array.map((_element, index) => <ChannelVideoCardFallback key={index} />)}
				{!loading && channelVideos?.length > 0 ? (
					channelVideos.map((video) => {
						return (
							<Suspense fallback={<ChannelVideoCardFallback />} key={video.id}>
								<ChannelVideoCard video={video} />
							</Suspense>
						);
					})
				) : (
					<p className='text-center w-full'>This channel has no videos.</p>
				)}
			</div>
		</div>
	);
};

export default ChannelVideos;
