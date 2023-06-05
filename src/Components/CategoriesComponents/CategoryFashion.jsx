import React, { useEffect, useContext, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/ContextApi';
import VideoCardSkeleton from '../Skeletons/VideoCardSkeleton';
import { fetchData } from '../../Utils/api';
const NoConnection = lazy(() => import('../NoConnection/NoConnection'));
const VideoCard = lazy(() => import('../VideosPage/VideoCard'));
const Sidebar = lazy(() => import('../Sidebars/Sidebar'));

const CategoryFashion = () => {
	const navigate = useNavigate();
	const {
		searchResults,
		rateLimited,
		loading,
		setSelectCategory,
		setLoading,
		setRateLimited,
		nextPageToken,
		setNextPageToken,
		setSearchResults,
		setProgress,
		location,
		sidebarExpanded,
		setSidebarExpanded,
		setIsOnline,
		isOnline,
	} = useContext(Context);
	let query = '&videoCategoryId=22';
	useEffect(() => {
		setSelectCategory('Fashion & Beauty');
		ResetMetaTags();
		setSidebarExpanded(true);
		if (navigator.onLine) {
			setIsOnline(true);
			fetchSelectedCategoryData();
		} else {
			setIsOnline(false);
		}
	}, []);
	useEffect(() => {
		window.addEventListener('scroll', handleInfiniteScroll);

		return () => {
			window.removeEventListener('scroll', handleInfiniteScroll);
		};
	}, [nextPageToken]);
	const ResetMetaTags = () => {
		document.title = 'Fashion & Beauty - YouTube Clone';
		if (document.querySelector('meta[name=description]')) {
			document.head.removeChild(document.querySelector('meta[name=description]'));
		}
		if (document.querySelector('meta[name="keywords"]')) {
			document.head.removeChild(document.querySelector('meta[name=keywords]'));
		}
		if (document.querySelectorAll('meta[name="tags"]')) {
			const metaTags = document.querySelectorAll('meta[name="tags"]');
			metaTags.forEach((tag) => {
				document.head.removeChild(tag);
			});
		}
	};

	const fetchSelectedCategoryData = async () => {
		document.documentElement.scrollTop = 0;
		setProgress(80);
		try {
			const res = await fetchData(
				`videos?part=contentDetails&part=snippet&part=statistics&chart=mostPopular&maxResults=16${query}&regionCode=${location}&key=${
					import.meta.env.VITE_APP_YOUTUBE_API_KEY
				}`
			);
			setLoading(false);
			setRateLimited(false);

			setSearchResults(res.items);
			setNextPageToken(res.nextPageToken);
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
			setLoading(false);
			setRateLimited(true);
		}
		setProgress(100);
	};

	const handleScrolledCategoryData = async () => {
		setProgress(80);
		try {
			const res = await fetchData(
				`videos?part=snippet&chart=mostPopular&maxResults=16${query}&pageToken=${nextPageToken}&
			regionCode=${location}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`
			);
			setRateLimited(false);

			setNextPageToken(res.nextPageToken);
			setSearchResults((prev) => [...prev, ...res.items]);
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
			setLoading(false);
			setRateLimited(true);
		}
		setProgress(100);
	};
	const handleInfiniteScroll = async () => {
		// document.documentElement.scrollTop
		if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
			try {
				setProgress(80);
				if (navigator.onLine) {
					setIsOnline(true);
					handleScrolledCategoryData();
				} else {
					setIsOnline(false);
				}
				setProgress(100);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const array = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

	return (
		<div className='flex min-h-[calc(100vh-56px)] h-full'>
			{!rateLimited && (
				<Suspense fallback={<div></div>}>
					<Sidebar />
				</Suspense>
			)}
			{loading && (
				<div className='flex flex-wrap justify-center gap-y-7 gap-2  py-5 mx-auto  max-w-[2500px] min-w-[375px]  overflow-auto'>
					{isOnline ? array.forEach((_element, index) => <VideoCardSkeleton key={index} />) : <NoConnection />}
				</div>
			)}

			{!loading && (
				<div
					className={`main-feed | h-full p-6 ml-0 flex flex-wrap justify-center gap-y-7 gap-x-2 sm:px-0 sm:py-5 mx-auto overflow-auto text-white ${
						rateLimited ? 'w-screen ml-[0px]' : 'max-w-[2500px]'
					} ${sidebarExpanded ? 'ml-0 sm:ml-[57px]  lg:ml-[240px] ' : ' ml-0 sm:ml-[72px] '} `}>
					{isOnline ? (
						!rateLimited ? (
							searchResults.map((item, index) => {
								return (
									<div className='videoCard' key={index}>
										<Suspense fallback={<VideoCardSkeleton />}>
											<VideoCard video={item} />
										</Suspense>
									</div>
								);
							})
						) : (
							navigate('/rateLimited')
						)
					) : (
						<Suspense fallback={''}>
							<NoConnection />
						</Suspense>
					)}
				</div>
			)}
		</div>
	);
};

export default CategoryFashion;
