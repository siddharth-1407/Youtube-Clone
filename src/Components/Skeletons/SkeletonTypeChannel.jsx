import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonTypeChannel = () => {
	let height = window.innerWidth < 640 ? '1rem' : '1.25rem';
	let heightTextSmall = window.innerWidth < 640 ? '0.75rem' : '1rem';
	let width = window.innerWidth < 640 ? '85%' : '33%';
	let widthTextSmall = window.innerWidth < 640 ? '100%' : '53%';
	return (
		<div className='w-full flex flex-row items-center min-h-[110px] gap-4 sm:gap-6 p-1'>
			<div className='flex item justify-center bg-white dark:bg-[#0f0f0f] rounded-[12px] min-h-[100px] sm:min-h-[8rem] w-1/2 sm:w-[360px] aspect-video overflow-hidden'>
				<Skeleton
					circle={true}
					width='80px'
					height='80px'
					baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
					enableAnimation={false}
				/>
			</div>
			<div className='flex flex-col mb-auto flex-1 gap-0 sm:gap-3 py-3'>
				<div className='pb-1 pr-9 '>
					<Skeleton
						enableAnimation={false}
						baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
						width={width}
						height={height}
					/>
				</div>
				<div>
					<Skeleton
						enableAnimation={false}
						baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
						width={widthTextSmall}
						height={heightTextSmall}
					/>
				</div>
			</div>
		</div>
	);
};

export default SkeletonTypeChannel;
