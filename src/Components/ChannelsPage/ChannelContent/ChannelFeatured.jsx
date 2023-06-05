import React, { useContext, useState, useEffect } from 'react';
import UnsubTrailer from '../UnsubTrailer';
import ChannelPlaylistSlider from '../ChannelsComponents/ChannelPlaylistSlider';
import { Context } from '../../../context/ContextApi';
import { fetchData } from '../../../Utils/api';
import ChannelSlider from '../ChannelsComponents/ChannelSlider';

const ChannelFeatured = () => {
	const { channelData, setProgress } = useContext(Context);
	const [playlist, setPlaylist] = useState([]);
	useEffect(() => {
		getPlaylists();
	}, [channelData]);
	const getPlaylists = async () => {
		try {
			setProgress(80);
			const res = await fetchData(
				`playlists?part=contentDetails&part=id&part=snippet&channelId=${channelData.id}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`
			);
			setPlaylist(res.items.filter((item) => item.contentDetails.itemCount >= 12));
		} catch (error) {
			console.log('Error getting Playlist', error.massage);
		}
		setProgress(100);
	};

	return (
		<div className='sm:max-w-[calc(100vw-72px)] xl:max-w-[61rem] 2xl:max-w-[80.25rem]  divide-y-[1px] divide-[#e5e5e5] dark:divide-[#3f3f3f]'>
			{channelData?.brandingSettings?.channel?.unsubscribedTrailer && <UnsubTrailer />}
			<ChannelPlaylistSlider playlistId={channelData?.contentDetails?.relatedPlaylists?.uploads} playlistTitle='Videos' />
			{playlist?.length > 0
				? playlist.map((playlist) => {
						return <ChannelPlaylistSlider key={playlist.id} playlistId={playlist.id} playlistTitle={playlist.snippet.title} />;
				  })
				: ''}
			<ChannelSlider />
		</div>
	);
};

export default ChannelFeatured;
