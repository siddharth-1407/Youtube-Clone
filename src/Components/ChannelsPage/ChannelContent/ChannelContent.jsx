import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../../../context/ContextApi';
const ChannelVideos = lazy(() => import('./ChannelVideos'));
const ChannelFeatured = lazy(() => import('./ChannelFeatured'));
const ChannelPlaylists = lazy(() => import('./ChannelPlaylists'));
const ChannelAbout = lazy(() => import('./ChannelAbout'));
const ChannelCommunity = lazy(() => import('./ChannelCommunity'));
const FeaturedChannels = lazy(() => import('./FeaturedChannels'));

const ChannelContent = () => {
	const { channelData } = useContext(Context);
	const { pathname } = useLocation();
	const [content, setContent] = useState('featured');
	const showContent = () => {
		if (pathname.startsWith(`/channels/${channelData.id}/videos`)) {
			setContent('videos');
		} else if (pathname.startsWith(`/channels/${channelData.id}/featuredChannels`)) {
			setContent('channels');
		} else if (pathname.startsWith(`/channels/${channelData.id}/community`)) {
			setContent('community');
		} else if (pathname.startsWith(`/channels/${channelData.id}/playlists`)) {
			setContent('playlists');
		} else if (pathname.startsWith(`/channels/${channelData.id}/about`)) {
			setContent('about');
		} else if (pathname.startsWith(`/channels/${channelData.id}/featured`) || pathname.startsWith(`/channels/${channelData.id}`)) {
			setContent('featured');
		}
	};
	useEffect(() => {
		showContent();
	}, [pathname]);
	useEffect(() => {}, [content]);

	return (
		<div className='h-full flex justify-center   '>
			{content === 'videos' && (
				<Suspense fallback={''}>
					<ChannelVideos />
				</Suspense>
			)}
			{content === 'featured' && (
				<Suspense fallback={''}>
					<ChannelFeatured />
				</Suspense>
			)}
			{content === 'community' && (
				<Suspense fallback={''}>
					<ChannelCommunity />
				</Suspense>
			)}
			{content === 'playlists' && (
				<Suspense fallback={''}>
					<ChannelPlaylists />
				</Suspense>
			)}
			{content === 'channels' && (
				<Suspense fallback={''}>
					<FeaturedChannels />
				</Suspense>
			)}
			{content === 'about' && (
				<Suspense fallback={''}>
					<ChannelAbout />
				</Suspense>
			)}
		</div>
	);
};

export default ChannelContent;
