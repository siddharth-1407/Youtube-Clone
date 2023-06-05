import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonTypeVideo = () => {
	let height = window.innerWidth < 640 ? '1rem' : '1.25rem';
	let heightTextSmall = window.innerWidth < 640 ? '0.75rem' : '1rem';
	let width = window.innerWidth < 640 ? '20%' : '15%';
	return (
		<div className='w-full flex flex-col sm:flex-row gap-0 sm:gap-4 p-1'>
			<div className='flex bg-[#e5e5e5] dark:bg-[#272727] rounded-[12px] min-h-[10.563rem] sm:min-h-[12.563rem] w-full sm:w-[360px] aspect-video overflow-hidden'></div>
			<div className='flex flex-col flex-1 gap-0 sm:gap-3 py-2'>
				<div className='pb-1 pr-9 '>
					<p className=' flex flex-col gap-1'>
						<Skeleton
							enableAnimation={false}
							baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
							width='95%'
							height={height}
						/>
						<Skeleton
							enableAnimation={false}
							baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
							width='45%'
							height={height}
						/>
					</p>
				</div>
				<div className=' flex gap-2 items-center text-[#606060] dark:text-[#aaaaaa] text-[0.8rem]  '>
					<Skeleton
						circle={true}
						width='30px'
						height='30px'
						baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
						enableAnimation={false}
					/>
					<p className='text-base w-full'>
						<Skeleton
							enableAnimation={false}
							baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
							width={width}
							height={heightTextSmall}
						/>
					</p>
				</div>
				<div className='hidden sm:block '>
					<Skeleton
						enableAnimation={false}
						baseColor={document.documentElement.classList.contains('dark') ? '#272727' : '#e5e5e5'}
						width='80%'
						height={height}
					/>
				</div>
			</div>
		</div>
	);
};

export default SkeletonTypeVideo;
