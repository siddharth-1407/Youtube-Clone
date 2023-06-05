import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';
import { Context } from '../../../context/ContextApi';
import { fetchData } from '../../../Utils/api';
const PlaylistCard = lazy(() => import('../../PlaylistPage/PlaylistCard'));

const ChannelPlaylists = () => {
	const { channelData, setProgress } = useContext(Context);
	const [playlists, setPlaylists] = useState([]);
	useEffect(() => {
		getPlaylists();
	}, [channelData]);
	const getPlaylists = async () => {
		try {
			setProgress(80);
			const res = await fetchData(
				`playlists?part=contentDetails&part=id&part=snippet&channelId=${channelData.id}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`
			);
			await console.log(res.items);
			setPlaylists(res.items);
		} catch (error) {
			console.log('Error getting Playlist', error.massage);
		}
		setProgress(100);
	};
	return (
		<div className='h-full flex flex-col mt-6 gap-6 w-[calc(100%-3rem)] md:w-[40rem] lg:w-[50rem] xl:px-8 xl:w-[65rem] 2xl:px-0 2xl:min-w-[81.25rem] min-h-[780px]'>
			{playlists?.length > 0 ? (
				<>
					<h2 className='text-[#0f0f0f] dark:text-[#f1f1f1]'>Created playlists</h2>
					<div className='flex gap-x-2 gap-y-8 flex-wrap justify-center sm:justify-start '>
						{playlists.map((playlist) => {
							return (
								<Suspense key={playlist.id}>
									<PlaylistCard playlistData={playlist} />
								</Suspense>
							);
						})}
					</div>
				</>
			) : (
				<p className='text-center w-full'>This channel has no playlists.</p>
			)}
		</div>
	);
};

export default ChannelPlaylists;
