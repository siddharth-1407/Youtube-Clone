import './App.css';
import './Loader.css';
import './Scrollbar.css';
import React, { useState, Suspense, lazy, useContext, useEffect } from 'react';
import { Routes, Route, HashRouter, Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const Header = lazy(() => import('./Components/HeaderComponents/Header'));
const LimitExceded = lazy(() => import('./Components/LimitExceded'));
const Feed = lazy(() => import('./Components/CategoriesComponents/Feed'));
const SearchResults = lazy(() => import('./Components/SearchResultsPage/SearchResults'));
const VideoDetails = lazy(() => import('./Components/VideosPage/VideoDetails'));
const History = lazy(() => import('./Components/History/History'));
const NotFound = lazy(() => import('./Components/NotFound'));
const SidebarFull = lazy(() => import('./Components/Sidebars/SidebarFull'));
const VideoCardSkeletonFallback = lazy(() => import('./Components/Skeletons/SkeletonTempateFallback'));
const Subscriptions = lazy(() => import('./Components/Subscriptions/Subscriptions'));
const Library = lazy(() => import('./Components/Library/Library'));
const CategoryFashion = lazy(() => import('./Components/CategoriesComponents/CategoryFashion'));
const CategoryGaming = lazy(() => import('./Components/CategoriesComponents/CategoryGaming'));
const CategoryLearning = lazy(() => import('./Components/CategoriesComponents/CategoryLearning'));
const CategoryMovies = lazy(() => import('./Components/CategoriesComponents/CategoryMovies'));
const CategoryMusic = lazy(() => import('./Components/CategoriesComponents/CategoryMusic'));
const CategoryNews = lazy(() => import('./Components/CategoriesComponents/CategoryNews'));
const CategorySports = lazy(() => import('./Components/CategoriesComponents/CategorySports'));
const CategoryTrending = lazy(() => import('./Components/CategoriesComponents/CategoryTrending'));
const PlaylistDetails = lazy(() => import('./Components/PlaylistPage/PlaylistDetails'));
const LikedVideos = lazy(() => import('./Components/LikedVideos/LikedVideos'));
const ChannelDetailsWrapper = lazy(() => import('./Components/ChannelsPage/ChannelDetailsWrapper'));
const WatchLater = lazy(() => import('./Components/WatchLater/WatchLater'));
import { Context } from './context/ContextApi';
import Overlay from './Components/Overlay';

function App() {
	const { getLocation, rateLimited, setIsOnline } = useContext(Context);
	const [showAlert, setShowAlert] = useState(null);

	useEffect(() => {
		if (navigator.onLine) {
			setIsOnline(true);
		} else {
			setIsOnline(false);
		}
	}, [navigator.onLine]);
	useEffect(() => {
		getLocation();
		if (shouldDisplayNotification()) {
			setShowAlert(true);
		} else {
			setShowAlert(false);
		}
	}, []);
	const handleClose = () => {
		const topAlert = document.querySelector('.alert');
		topAlert.classList.add('hidden');
		const now = new Date();
		const expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
		document.cookie = `notificationClosed=true; expires=${expirationDate.toUTCString()}; path=/`;
	};
	const getCookie = (name) => {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			if (cookie.indexOf(name + '=') === 0) {
				return cookie.substring(name.length + 1);
			}
		}
		return null;
	};
	function shouldDisplayNotification() {
		const notificationClosed = getCookie('notificationClosed');

		if (notificationClosed) {
			// Check if the cookie is still valid
			const expirationDate = new Date(notificationClosed);
			const now = new Date();
			if (expirationDate > now) {
				return false; // Do not display the notification
			}
		} else {
			return true; // Display the notification
		}
	}

	return (
		<HashRouter>
			<div
				className={`alert | justify-center px-4 py-1 fixed top-0 z-50 w-full bg-[#FF0000] text-white font-semibold ${
					showAlert ? 'flex' : 'hidden'
				}`}>
				<span className='ml-auto '>
					This is a YouTube clone project created for demonstration and educational purposes only. we recommend visiting the official
					YouTube website at &nbsp;
					<Link to={'https://www.youtube.com/'}>
						<span className='underline'>www.youtube.com.</span>
						<OpenInNewIcon />
						&nbsp;to access all services YouTube offers.
					</Link>
				</span>

				<button className='ml-auto' aria-label='close' onClick={handleClose}>
					<CloseIcon />
				</button>
			</div>
			<div className='App font-roboto '>
				<Suspense fallback={''}>
					<Header />
				</Suspense>
				<Suspense fallback={''}>{!rateLimited && <SidebarFull />}</Suspense>
				<Overlay />

				<div className='h-full flex bg-white dark:bg-[#0f0f0f] sm:p-6 md:p-0 sm:pt-2 '>
					<div className='bg-white dark:bg-[#0f0f0f] w-full flex flex-col'>
						<Suspense fallback={<div className='h-screen bg-white dark:bg-[#0f0f0f]'></div>}>
							<Routes>
								<Route
									exact
									path='/'
									element={
										<Suspense fallback={<VideoCardSkeletonFallback />}>
											<Feed />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/Youtube-Clone/results/query/:searchQuery/'
									element={
										<Suspense fallback={<div></div>}>
											<SearchResults />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/Youtube-Clone/video/:id/'
									element={
										<Suspense fallback={''}>
											<VideoDetails />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/Youtube-Clone/playlist/:id/'
									element={
										<Suspense fallback={<div></div>}>
											<PlaylistDetails />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/Youtube-Clone/channels/:id/*'
									element={
										<Suspense fallback={<div></div>}>
											<ChannelDetailsWrapper />
											<Routes>
												<Route path='/' element={''} />
												<Route path='/featured/' element={''} />
												<Route path='/videos/' element={''} />
												<Route path='/playlists/' element={''} />
												<Route path='/featuredChannels/' element={''} />
												<Route path='/about/' element={''} />
											</Routes>
										</Suspense>
									}
								/>
								<Route
									exact
									path='/Youtube-Clone/history/'
									element={
										<Suspense fallback={<div></div>}>
											<History />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/Youtube-Clone/watchlater/'
									element={
										<Suspense fallback={<div></div>}>
											<WatchLater />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/Youtube-Clone/likedvideos/'
									element={
										<Suspense fallback={<div></div>}>
											<LikedVideos />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/Youtube-Clone/subscriptions/'
									element={
										<Suspense fallback={<div></div>}>
											<Subscriptions />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/library/'
									element={
										<Suspense fallback={<div></div>}>
											<Library />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/fashion&beauty/'
									element={
										<Suspense fallback={<VideoCardSkeletonFallback />}>
											<CategoryFashion />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/gaming/'
									element={
										<Suspense fallback={<VideoCardSkeletonFallback />}>
											<CategoryGaming />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/learning/'
									element={
										<Suspense fallback={<VideoCardSkeletonFallback />}>
											<CategoryLearning />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/movies/'
									element={
										<Suspense fallback={<VideoCardSkeletonFallback />}>
											<CategoryMovies />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/#/music/'
									element={
										<Suspense fallback={<VideoCardSkeletonFallback />}>
											<CategoryMusic />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/news/'
									element={
										<Suspense fallback={<VideoCardSkeletonFallback />}>
											<CategoryNews />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/sports/'
									element={
										<Suspense fallback={<VideoCardSkeletonFallback />}>
											<CategorySports />
										</Suspense>
									}
								/>
								<Route
									exact
									path='/trending/'
									element={
										<Suspense fallback={<VideoCardSkeletonFallback />}>
											<CategoryTrending />
										</Suspense>
									}
								/>

								<Route
									exact
									path='/Youtube-Clone/rateLimited/'
									element={
										<Suspense fallback={<div></div>}>
											<LimitExceded />
										</Suspense>
									}
								/>
								<Route
									exact
									path='*'
									element={
										<Suspense fallback={<div></div>}>
											<NotFound />
										</Suspense>
									}
								/>
							</Routes>
						</Suspense>
					</div>
				</div>
			</div>
		</HashRouter>
	);
}

export default App;
