import { ReactComponent as HistoryIcon } from '../assets/newIcons/History.svg';
import { ReactComponent as Subscriptions } from '../assets/newIcons/Subscriptions.svg';
import { ReactComponent as Library } from '../assets/newIcons/Library.svg';
import { ReactComponent as WatchlaterActive } from '../assets/newIcons/WatchlaterActive.svg';
import { ReactComponent as MylikesActive } from '../assets/newIcons/MylikesActive.svg';

export const ContentNoUser = [
	{
		icon: <HistoryIcon className='fill-black dark:fill-white w-full h-full' />,
		heading: 'Keep track of what you watch',
		para: "Watch history isn't viewable when signed out.",
		link: '/',
		ForPage: '/history',
	},
	{
		icon: <Subscriptions className='fill-black dark:fill-white w-full h-full' />,
		heading: 'Don’t miss new videos',
		para: 'Sign in to see updates from your favorite YouTube channels',
		link: '/',
		ForPage: '/subscriptions',
	},
	{
		icon: <Library className='fill-black dark:fill-white w-full h-full ' />,
		heading: 'Enjoy your favorite videos',
		para: 'Sign in to access videos that you’ve liked or saved',
		link: '/',
		ForPage: '/library',
	},
	{
		icon: <WatchlaterActive className='fill-black dark:fill-white w-full h-full ' />,
		heading: "Keep track of all videos you've saved watch later",
		para: '',
		ForPage: '/watchLater',
	},
	{
		icon: <MylikesActive className='fill-black dark:fill-white w-full h-full ' />,
		heading: 'Keep track of what you like',
		para: 'Sign in to access videos that you’ve liked',
		ForPage: '/likedVideos',
	},
];
