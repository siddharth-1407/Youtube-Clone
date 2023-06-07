import React, { useEffect, useState, useContext } from 'react';
import { fetchData } from '../../../Utils/api';
import { Context } from '../../../context/ContextApi';
import ChannelsCardForSlider from './ChannelsCardForSlider';
import { ReactComponent as Arrow } from '../../../assets/newIcons/ArrowForward.svg';

const ChannelSlider = () => {
	const { channelData } = useContext(Context);
	const [otherChannels, setOtherChannels] = useState([]);
	const [activeSlide, setActiveSlide] = useState(0);
	const [totalSlides, setTotalSlides] = useState(2);
	const [currentSlider, setCurrentSlider] = useState(null);
	const [windowWidth, setWindowWidth] = useState('');

	useEffect(() => {
		getOtherChannels();
	}, [channelData]);

	useEffect(() => {
		const handleSliders = () => {
			const sliderContainer = document.querySelector('.channelSliderContainer').offsetWidth;
			const slider = document.querySelector('.channelSlider').offsetWidth;
			setTotalSlides(Math.ceil(slider / sliderContainer));
			setWindowWidth(document.documentElement.innerWidth);
		};
		window.addEventListener('resize', handleSliders);
		activeSlide < 0 && setActiveSlide(0);
		activeSlide >= totalSlides ? setActiveSlide(totalSlides - 1) : activeSlide;
		if (currentSlider !== null) {
			currentSlider.style.transform = `translateX(${activeSlide <= 0 ? '0' : (-100 * activeSlide) / totalSlides}%)`;
		}

		return () => {
			window.removeEventListener('resize', handleSliders);
		};
	}, [activeSlide, totalSlides, otherChannels, windowWidth]);

	const getOtherChannels = async () => {
		let channelIDs;
		try {
			const res = await fetchData(
				`channelSections?part=snippet&part=contentDetails&channelId=${channelData.id}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`
			);
			channelIDs = await res.items.filter((item) => item.snippet.type === 'multiplechannels');
			await setOtherChannels(channelIDs[0]);
			await console.log(res.items.filter((item) => item.snippet.type === 'multiplechannels'));
		} catch (error) {
			console.log('Error getting Playlist', error.massage);
		}
	};

	return (
		<div className={`w-[calc(100vw-3rem)] mx-auto sm:px-12 sm:w-full md:px-0  md:w-[40rem] lg:w-[50rem] xl:px-0 2xl:px-0 xl:min-w-[60rem]  min-w-[1450]:min-w-[65rem] 2xl:min-w-[80.25rem] py-6 flex-col gap-6 ${otherChannels?.length > 0 ? 'flex' : 'hidden'}`}>
			<h3 className='playlistTitle | font-medium'>{otherChannels?.snippet?.title}</h3>
			<div className='relative'>
				<button
					className={`absolute w-10 p-2 z-[9] -translate-x-1/2 top-1/4 rounded-full rotate-180  justify-center items-center bg-white dark:bg-[#212121] hover:bg-[#e5e5e5] dark:hover:bg-[#4d4d4d] ${
						activeSlide <= 0 ? 'hidden' : 'flex'
					}`}
					onClick={(e) => {
						setActiveSlide(activeSlide - 1);
						setCurrentSlider(e.target.closest('div').querySelector('.channelSlider'));
					}}>
					<Arrow className='dark:fill-[#dfdfdf] fill-[#242424] ' />
				</button>
				<div className='channelSliderContainer |  overflow-hidden'>
					<div className='channelSlider |  w-min grid grid-flow-col grid-cols-none  gap-[0.2rem] transition-transform'>
						{otherChannels?.contentDetails?.channels.map((item) => {
							return <ChannelsCardForSlider key={item} id={item} />;
						})}
					</div>
				</div>
				<button
					className={`absolute w-10 p-2 z-[9]  translate-x-1/2 right-0 top-1/4 rounded-full  justify-center items-center bg-white dark:bg-[#212121] hover:bg-[#e5e5e5] dark:hover:bg-[#4d4d4d] ${
						activeSlide === totalSlides - 1 ? 'hidden' : 'flex'
					}`}
					onClick={(e) => {
						setActiveSlide(activeSlide + 1);
						setCurrentSlider(e.target.closest('div').querySelector('.channelSlider'));
					}}>
					<Arrow className='dark:fill-[#dfdfdf] fill-[#242424] ' />
				</button>
			</div>
		</div>
	);
};

export default ChannelSlider;
