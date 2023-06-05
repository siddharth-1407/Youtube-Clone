import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { Context } from '../../../context/ContextApi';
import { fetchData } from '../../../Utils/api';
const ChannelCard = lazy(() => import('../ChannelsComponents/ChannelCard'));

const FeaturedChannels = () => {
	const { channelData, setProgress } = useContext(Context);
	const [otherChannels, setOtherChannels] = useState([]);
	useEffect(() => {
		getOtherChannels();
	}, [channelData]);
	const getOtherChannels = async () => {
		try {
			setProgress(80);
			const res = await fetchData(
				`channelSections?part=snippet&part=contentDetails&channelId=${channelData.id}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`
			);
			let channelIDs = res.items.filter((item) => item.snippet.type === 'multiplechannels');
			setOtherChannels(channelIDs[0]?.contentDetails?.channels);
		} catch (error) {
			console.log('Error getting Playlist', error);
		}
		setProgress(100);
	};
	return (
		<div className='flex flex-col mt-6 gap-6 w-[calc(100%-3rem)] md:w-[40rem] lg:w-[50rem] xl:px-8 xl:w-[65rem] 2xl:px-0 2xl:min-w-[81.25rem] min-h-[780px]'>
			{otherChannels?.length > 0 ? (
				<>
					<h2 className='text-[#0f0f0f] dark:text-[#f1f1f1]'>{otherChannels?.snippet?.title}</h2>
					<div className='flex gap-x-2 gap-y-8 flex-wrap lg:justify-start justify-evenly'>
						{otherChannels.map((item) => {
							return (
								<Suspense key={item} fallback={<div></div>}>
									<ChannelCard id={item} />
								</Suspense>
							);
						})}
					</div>
				</>
			) : (
				<p className='text-center w-full'>This channel doesn't feature any other channels.</p>
			)}
		</div>
	);
};

export default FeaturedChannels;
