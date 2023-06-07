import React, { useState, useContext, useEffect, useCallback, useRef, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../context/ContextApi';
import { fetchData } from '../../Utils/api';
const Sidebar = lazy(() => import('../Sidebars/Sidebar'));
const SearchResultsCard = lazy(() => import('./SearchResultsCard'));
import VideoCardSkeleton from '../Skeletons/VideoCardSkeleton';
const SkeletonTypeChannel = lazy(() => import('../Skeletons/SkeletonTypeChannel'));
const SkeletonTypeVideo = lazy(() => import('../Skeletons/SkeletonTypeVideo'));

const SearchResults = () => {
	const observer = useRef(null);
	const { setProgress, loading, setLoading, rateLimited, sidebarExpanded, setSidebarExpanded } = useContext(Context);
	const [searchResults, setSearchResults] = useState([]);
	const [nextPageToken, setNextPageToken] = useState(null);
	let { searchQuery } = useParams();

	const array = ['', '', '', '', '', '', '', '', '', '', '', '', ''];
	useEffect(() => {
		setSidebarExpanded(true);
		setLoading(true);
		ResetMetaTags();
	}, []);
	useEffect(() => {
		getSearchResults();
	}, [searchQuery]);
	const ResetMetaTags = () => {
		document.title = `${searchQuery} - YouTube Clone`;
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
	const getSearchResults = async () => {
		setProgress(80);
		try {
			const res = await fetchData(`search?part=snippet&q=${searchQuery}&maxResults=10&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`);
			setLoading(false);
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
		}
		setProgress(100);
	};

	const handleScrolledResults = async () => {
		try {
			const res = await fetchData(
				`search?part=snippet&q=${searchQuery}&pageToken=${nextPageToken}&maxResults=10&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`
			);
			setSearchResults((prev) => [...prev, ...res.items]);
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
		}
	};
	const lastItem = useCallback(
		(node) => {
			if (!node) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					handleScrolledResults();
				}
			});
			observer.current.observe(node);
		},
		[searchResults]
	);

	return (
		<div className='flex min-h-[calc(100vh-56px)] px-6 sm:px-0 xl:pr-5 '>
			{!rateLimited && (
				<Suspense fallback={<div></div>}>
					<Sidebar />
				</Suspense>
			)}
			{loading && (
				<div className='flex h-full flex-wrap justify-center gap-y-7 gap-2  py-5 mx-auto  max-w-[2500px] min-w-[375px]  overflow-auto'>
					{array.forEach((_element, index) => (
						<VideoCardSkeleton key={index} />
					))}
				</div>
			)}

			{!loading && (
				<div
					className={` w-full ml-0  items-center sm:py-5  mx-auto overflow-auto ${rateLimited ? 'w-screen ml-0' : 'max-w-[2500px]'} ${
						sidebarExpanded ? 'ml-0 sm:ml-[57px] lg:ml-[240px] ' : ' ml-0 sm:ml-[72px] '
					} `}>
					<div className='mx-auto w-full sm:w-[90%] xl:w-[960px] 2xl:w-[1096px] flex flex-col gap-y-4'>
						{!rateLimited ? (
							searchResults?.length > 0 ? (
								searchResults.map((item, index) => {
									return (
										<main className='w-full ' key={index} ref={index === searchResults.length - 1 ? lastItem : null}>
											<Suspense
												fallback={
													item.id.kind === 'youtube#channel' ? (
														<Suspense fallback={''}>
															<SkeletonTypeChannel video={item} />
														</Suspense>
													) : (
														<Suspense fallback={''}>
															<SkeletonTypeVideo video={item} />
														</Suspense>
													)
												}>
												<SearchResultsCard video={item} />
											</Suspense>
										</main>
									);
								})
							) : (
								<p className='w-full text-center text-[#0f0f0f] dark:text-[#f1f1f1]'>
									Nothing to show. Try searching for something else.
								</p>
							)
						) : (
							navigate('/rateLimited')
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default SearchResults;
