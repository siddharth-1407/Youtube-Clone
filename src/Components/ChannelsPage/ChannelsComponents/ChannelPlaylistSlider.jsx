import React, { useEffect, useState, useContext } from 'react';
import { fetchData } from '../../../Utils/api';
import ChannelVideoCardForSlider from './ChannelVideoCardForSlider';
import { ReactComponent as Arrow } from '../../../assets/newIcons/ArrowForward.svg';
import { Context } from '../../../context/ContextApi';

const ChannelPlaylistSlider = ({ playlistId, playlistTitle }) => {
	const { channelData } = useContext(Context);
	const [playlistItems, setPlaylistItems] = useState([]);
	const [activeSlide, setActiveSlide] = useState(0);
	const [totalSlides, setTotalSlides] = useState(2);
	const [currentSlider, setCurrentSlider] = useState(null);

	useEffect(() => {
		getLatestUploads();
	}, [channelData]);

	useEffect(() => {
		const handleSlider = () => {
			if (currentSlider !== null) {
				if (activeSlide === totalSlides - 1) {
					currentSlider.style.transform = `translateX(-${100 / (totalSlides / activeSlide)}%)`;
				} else {
					currentSlider.style.transform = `translateX(${activeSlide <= 0 ? '0' : (-100 * activeSlide) / totalSlides}%)`;
				}
			}
		};
		handleSlider();
	}, [activeSlide]);
	useEffect(() => {
		const handleContainerSize = () => {
			const sliderContainer = document.querySelector('.sliderContainer').offsetWidth;
			const slider = document.querySelector('.slider').offsetWidth;
			setTotalSlides(Math.round(slider / sliderContainer));
			if (totalSlides > 1) {
				activeSlide >= totalSlides ? setActiveSlide(totalSlides - 1) : activeSlide;
			} else {
				activeSlide < 0 && setActiveSlide(0);
			}
		};
		window.addEventListener('resize', handleContainerSize);

		return () => {
			window.removeEventListener('resize', handleContainerSize);
		};
	}, []);
	useEffect(() => {
		const sliderContainer = document.querySelector('.sliderContainer').offsetWidth;
		const slider = document.querySelector('.slider').offsetWidth;
		setTotalSlides(Math.round(slider / sliderContainer));
	}, [playlistItems]);
	useEffect(() => {
		if (totalSlides > 1) {
			activeSlide >= totalSlides ? setActiveSlide(totalSlides - 1) : activeSlide;
		} else {
			activeSlide < 0 && setActiveSlide(0);
		}
	}, [totalSlides]);

	const getLatestUploads = async () => {
		try {
			const res = await fetchData(
				`playlistItems?part=snippet&part=contentDetails&playlistId=${playlistId}&maxResults=12&key=${
					import.meta.env.VITE_APP_YOUTUBE_API_KEY
				}`
			);
			setPlaylistItems(res.items);
		} catch (error) {
			console.log('Error getting Uploads', error.message);
		}
	};

	return (
		<div className=' w-[calc(100vw-3rem)] mx-auto sm:px-12 sm:w-full md:px-0  md:w-[40rem] lg:w-[50rem] xl:px-0 2xl:px-0 xl:min-w-[60rem]  min-w-[1450]:min-w-[65rem] 2xl:min-w-[80.25rem] py-6 flex flex-col gap-6'>
			<h3 className='playlistTitle | font-medium'>{playlistTitle}</h3>
			<div className='relative'>
				<button
					className={`absolute w-10 p-2 z-[9] -translate-x-1/2 top-1/4 rounded-full rotate-180  justify-center items-center bg-white dark:bg-[#212121] hover:bg-[#e5e5e5] dark:hover:bg-[#4d4d4d] ${
						activeSlide <= 0 ? 'hidden' : 'flex'
					}`}
					onClick={(e) => {
						setActiveSlide(activeSlide - 1);
						setCurrentSlider(e.target.closest('div').querySelector('.slider'));
					}}>
					<Arrow className='dark:fill-[#dfdfdf] fill-[#242424] ' />
				</button>
				<div className='sliderContainer |  overflow-hidden'>
					<div className='slider |  w-min grid grid-flow-col grid-cols-none  gap-1 transition-transform'>
						{playlistItems.map((item) => {
							return (
								<div
									className='videoCard | w-[160px]  sm:max-w-[315px] md:w-[210px] lg:w-[263px] xl:w-[236px] 2xl:w-[210px]'
									key={item.id}>
									<ChannelVideoCardForSlider video={item} />
								</div>
							);
						})}
					</div>
				</div>
				<button
					className={`absolute w-10 p-2 z-[9]  translate-x-1/2 right-0 top-1/4 rounded-full  justify-center items-center bg-white dark:bg-[#212121] hover:bg-[#e5e5e5] dark:hover:bg-[#4d4d4d] ${
						activeSlide === totalSlides - 1 ? 'hidden' : 'flex'
					}`}
					onClick={(e) => {
						setActiveSlide(activeSlide + 1);
						setCurrentSlider(e.target.closest('div').querySelector('.slider'));
					}}>
					<Arrow className='dark:fill-[#dfdfdf] fill-[#242424] ' />
				</button>
			</div>
		</div>
	);
};

export default ChannelPlaylistSlider;
