import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ChannelVideoCardFallback = () => {
	return (
		<div className={` flex flex-col gap-2 w-[90%] sm:w-[210px] md:w-[305.9983px]`}>
			<div className='imageSkeleton bg-[#e5e5e5] dark:bg-[#272727] rounded-[12px]  min-h-[10rem] aspect-video'></div>
			<div className='detailsWrapper | flex gap-4'>
				<div className='channelImageSkeleton'>
					<Skeleton
						circle={true}
						width='36px'
						height='36px'
						baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
						enableAnimation={false}
					/>
				</div>
				<div className=' w-full flex flex-col gap-2'>
					<p>
						<Skeleton
							enableAnimation={false}
							baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
							width='95%'
							height='1.25rem'
						/>
					</p>
					<p className='w-5/6'>
						<Skeleton
							enableAnimation={false}
							baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
							width='80%'
							height='1.25rem'
						/>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChannelVideoCardFallback;
