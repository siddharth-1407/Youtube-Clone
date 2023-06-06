import { ReactComponent as Home } from '../assets/newIcons/Home.svg';
import { ReactComponent as HomeActive } from '../assets/newIcons/HomeActive.svg';
import { ReactComponent as Subscriptions } from '../assets/newIcons/Subscriptions.svg';
import { ReactComponent as SubscriptionsActive } from '../assets/newIcons/SubscriptionsActive.svg';
import { ReactComponent as Library } from '../assets/newIcons/Library.svg';
import { ReactComponent as LibraryActive } from '../assets/newIcons/LibraryActive.svg';
import { ReactComponent as History } from '../assets/newIcons/History.svg';
import { ReactComponent as HistoryActive } from '../assets/newIcons/HistoryActive.svg';
import { ReactComponent as Watchlater } from '../assets/newIcons/Watchlater.svg';
import { ReactComponent as WatchlaterActive } from '../assets/newIcons/WatchlaterActive.svg';
import { ReactComponent as Mylikes } from '../assets/newIcons/Mylikes.svg';
import { ReactComponent as MylikesActive } from '../assets/newIcons/MylikesActive.svg';
import { ReactComponent as Trending } from '../assets/newIcons/Trending.svg';
import { ReactComponent as TrendingActive } from '../assets/newIcons/TrendingActive.svg';
import { ReactComponent as Music } from '../assets/newIcons/Song.svg';
import { ReactComponent as MusicActive } from '../assets/newIcons/SongActive.svg';
import { ReactComponent as Gaming } from '../assets/newIcons/Videogames.svg';
import { ReactComponent as GamingActive } from '../assets/newIcons/VideogamesActive.svg';
import { ReactComponent as Sports } from '../assets/newIcons/Sport.svg';
import { ReactComponent as SportsActive } from '../assets/newIcons/SportActive.svg';
import { ReactComponent as Learning } from '../assets/newIcons/Bulb.svg';
import { ReactComponent as LearningActive } from '../assets/newIcons/BulbActive.svg';
import { ReactComponent as Fashion } from '../assets/newIcons/Fashion.svg';
import { ReactComponent as FashionActive } from '../assets/newIcons/FashionActive.svg';
import { ReactComponent as News } from '../assets/newIcons/News.svg';
import { ReactComponent as NewsActive } from '../assets/newIcons/NewsActive.svg';
// import { ReactComponent as Movies } from '../assets/newIcons/Films.svg';
// import { ReactComponent as MoviesActive } from '../assets/newIcons/FilmsActive.svg';
// import { ReactComponent as Live } from '../assets/newIcons/Live.svg';
// import { ReactComponent as LiveActive } from '../assets/newIcons/LiveActive.svg';
// import { ReactComponent as YouTubeIcon } from '../assets/newIcons/YoutubeLogo.svg';

export const videoCategories = [
	{
		name: 'Trending',
		icon: <Trending className='  dark:fill-white  fill-black' />,
		iconActive: <TrendingActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		url: '/trending/',
	},
	{
		name: 'Music',
		icon: <Music className='  dark:fill-white  fill-black' />,
		iconActive: <MusicActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		url: '/music/',
	},
	// {
	// 	name: 'Movies',
	// 	icon: <Movies className='  dark:fill-white  fill-black' />,
	// 	iconActive: <MoviesActive className='  dark:fill-white  fill-black' />,
	// 	type: 'category',
	// 	url:'/Youtube-Clone/movies',
	// },
	// {
	// 	name: 'Live',
	// 	icon: <Live className='  dark:fill-white  fill-black' />,
	// 	iconActive: <LiveActive className='  dark:fill-white  fill-black' />,
	// 	type: 'category',
	// 	url:'/Youtube-Clone/live',
	// },
	{
		name: 'Gaming',
		icon: <Gaming className='  dark:fill-white  fill-black' />,
		iconActive: <GamingActive className='  dark:fill-white  fill-black ' />,
		type: 'category',
		url: '/gaming/',
	},
	{
		name: 'News',
		icon: <News className='  dark:fill-white  fill-black' />,
		iconActive: <NewsActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		url: '/news/',
	},
	{
		name: 'Sports',
		icon: <Sports className='  dark:fill-white  fill-black' />,
		iconActive: <SportsActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		url: '/sports/',
	},
	{
		name: 'Learning',
		icon: <Learning className='  dark:fill-white  fill-black' />,
		iconActive: <LearningActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		url: '/learning/',
	},
	{
		name: 'Fashion & Beauty',
		icon: <Fashion className='  dark:fill-white  fill-black' />,
		iconActive: <FashionActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		divider: true,
		url: '/fashion&beauty/',
	},
];
export const CategoriesTop = [
	{
		name: 'Home',
		icon: <Home className='  dark:fill-white  fill-black' />,
		iconActive: <HomeActive className='  dark:fill-white  fill-black' />,
		type: 'home',
		url: '/',
	},

	{
		name: 'Subscriptions',
		icon: <Subscriptions className='  dark:fill-white  fill-black' />,
		iconActive: <SubscriptionsActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		divider: true,
		url: '/subscriptions/',
	},
	{
		name: 'Library',
		icon: <Library className='  dark:fill-white  fill-black' />,
		iconActive: <LibraryActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		url: '/library/',
	},
	{
		name: 'History',
		icon: <History className='  dark:fill-white  fill-black' />,
		iconActive: <HistoryActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		url: '/history/',
	},

	{
		name: 'Watch later',
		icon: <Watchlater className='  dark:fill-white  fill-black' />,
		iconActive: <WatchlaterActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		url: '/watchlater/',
		auth: true,
	},
	{
		name: 'Liked videos',
		icon: <Mylikes className='  dark:fill-white  fill-black' />,
		iconActive: <MylikesActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		divider: true,
		url: '/likedvideos/',
		auth: true,
	},
];
// export const CategoriesPremium = [
// 	{
// 		name: 'Youtube Premium',
// 		icon: <YouTubeIcon className='text-[#ff0000] ' />,
// 		iconActive: <YouTubeIcon className='text-[#ff0000] ' />,
// 		type: 'category',
// 		divider: true,
// 		url:'/Youtube-Clone/premium',
// 	},
// ];
//

export const categoriesClosed = [
	{
		name: 'Home',
		icon: <Home className='  dark:fill-white  fill-black' />,
		iconActive: <HomeActive className='  dark:fill-white  fill-black' />,
		type: 'home',
		url: '/',
	},
	{
		name: 'Subscriptions',
		icon: <Subscriptions className='  dark:fill-white  fill-black' />,
		iconActive: <SubscriptionsActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		divider: true,
		url: '/subscriptions/',
	},
	{
		name: 'Library',
		icon: <Library className='  dark:fill-white  fill-black' />,
		iconActive: <LibraryActive className='  dark:fill-white  fill-black' />,
		type: 'category',
		url: '/library/',
	},
];
