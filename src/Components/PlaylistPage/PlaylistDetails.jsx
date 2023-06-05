import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Context } from '../../context/ContextApi';
import { fetchData } from '../../Utils/api';
import NoConnection from '../NoConnection/NoConnection';
const PlaylistVideo = lazy(() => import('./PlaylistVideo'));
const Sidebar = lazy(() => import('../Sidebars/sidebar'));

const PlaylistDetails = () => {
	const { id } = useParams();
	const [playlistItems, setPlaylistItems] = useState([]);
	const [nextPageToken, setNextPageToken] = useState(null);
	const [playlist, setPlaylist] = useState(null);
	const navigate = useNavigate();
	const { rateLimited, setSelectCategory, setRateLimited, setProgress, sidebarExpanded, setSidebarExpanded, isOnline, setIsOnline } =
		useContext(Context);

	useEffect(() => {
		setSelectCategory(null);
		setSidebarExpanded(true);
		if (navigator.onLine) {
			setIsOnline(true);
			getPlaylists();
			fetchPlaylistItems();
		} else {
			setIsOnline(false);
		}
	}, [id]);
	const getPlaylists = async () => {
		try {
			setProgress(80);
			const res = await fetchData(`playlists?part=snippet&part=contentDetails&id=${id}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`);
			setPlaylist(res.items[0]);
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
		setProgress(100);
	};
	const fetchPlaylistItems = async () => {
		document.documentElement.scrollTop = 0;
		setProgress(80);
		try {
			const res = await fetchData(
				`playlistItems?part=snippet&part=id&part=contentDetails&maxResults=10&playlistId=${id}&key=${
					import.meta.env.VITE_APP_YOUTUBE_API_KEY
				}`
			);
			setRateLimited(false);
			setNextPageToken(res.nextPageToken);
			setPlaylistItems(res.items);
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
			setRateLimited(true);
		}
		setProgress(100);
	};

	const handleScroll = async () => {
		setProgress(80);
		try {
			const res = await fetchData(
				`playlistItems?part=snippet&part=id&part=contentDetails&maxResults=6&pageToken=${nextPageToken}&playlistId=${id}&key=${
					import.meta.env.VITE_APP_YOUTUBE_API_KEY
				}`
			);

			setNextPageToken(res.nextPageToken);

			setPlaylistItems((prev) => [...prev, ...res.items]);
		} catch (error) {
			setRateLimited(true);
		}
		setProgress(100);
	};
	const handleInfiniteScroll = async () => {
		if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
			try {
				setProgress(80);
				if (navigator.onLine) {
					setIsOnline(true);
					handleScroll();
				} else {
					setIsOnline(false);
				}
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
	useEffect(() => {}, [playlist]);
	// sidebarExpanded ? 'ml-0 sm:ml-[57px]  lg:ml-[240px] ' : 'ml-0'
	return (
		<div className='flex min-h-[calc(100vh-56px)]'>
			{!rateLimited && (
				<Suspense fallback={<div></div>}>
					<Sidebar />
				</Suspense>
			)}

			{isOnline ? (
				<div
					className={`main-feed | px-6 ml-0 sm:pr-0 sm:pl-5 sm:mt-6 md:px-6 flex flex-col lg:flex-row  flex-wrap justify-center lg:justify-start  gap-y-7   text-white  ${
						rateLimited
							? 'w-screen ml-[0px]'
							: `${sidebarExpanded ? 'w-full lg:w-[calc(100%-240px)]' : 'w-full sm:w-[calc(100%-50px)] md:w-[calc(100%-69px)]'}`
					}
                    mx-auto sm:ml-auto sm:mr-0`}>
					<div className='flex w-full lg:w-[360px]'>
						<div className='playlistHero | relative rounded-[14px] overflow-hidden  w-full p-6 lg:w-[360px] h-60 lg:h-[calc(100%-6rem)] lg:fixed bg-gradient-to-b from-indigo-700 to-transparent '>
							<div className='container |  flex flex-col gap-4 '>
								<div className='flex  '>
									<img
										className='hidden lg:block rounded-[14px] '
										src={playlist?.snippet?.thumbnails?.maxres?.url || playlist?.snippet?.thumbnails?.medium?.url}
										alt=''
									/>
									<div className='w-[200%] lg:w-[720px] aspect-video -translate-x-1/4 absolute left-0 top-0 z-[-1] bg-gradient-to-b from-black to-transparent'>
										<img
											src={playlist?.snippet?.thumbnails?.maxres?.url || playlist?.snippet?.thumbnails?.medium?.url}
											alt=''
											aria-hidden={true}
											className='blur-[30px] brightness-[70%]'
										/>
									</div>
								</div>
								<div className='details '>
									<h1 className='text-[1.6rem] font-semibold'>{playlist?.snippet?.title}</h1>
								</div>
								<div className='info text-[#fff]'>
									<span className='after:content-["•"] after:leading-3 after:text-xs after:mx-1 relative after:top-[-10px] text-sm font-medium'>
										{playlist?.snippet?.channelTitle}
									</span>
									<span className='text-sm'>{`${playlist?.contentDetails?.itemCount} videos`}</span>
								</div>
								<div className='playlistDescription | text-[rgba(255, 255, 255, 0.7)] text-base'>
									{playlist?.snippet?.description}
								</div>
							</div>
						</div>
					</div>
					<div className='items | w-full lg:w-[calc(100%-360px)] lg:ml-auto lg:pr-4 lg:pl-2'>
						{!rateLimited
							? playlistItems.map((item, index) => {
									return (
										<div className='videoCard' key={item.id}>
											<Suspense fallback={<div></div>}>
												<PlaylistVideo video={item} index={index} />
											</Suspense>
										</div>
									);
							  })
							: navigate('/rateLimited')}
					</div>
				</div>
			) : (
				<NoConnection />
			)}
		</div>
	);
};

export default PlaylistDetails;
