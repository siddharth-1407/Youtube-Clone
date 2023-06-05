import React from 'react';
import VideoCardSkeleton from './VideoCardSkeleton';

const SkeletonTempateFallback = () => {
	const array = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

	return (
		<div className='flex flex-wrap justify-center gap-y-7 gap-2  py-5 mx-auto  max-w-[2500px] min-w-[375px]  overflow-auto'>
			{array.forEach((_element, index) => (
				<VideoCardSkeleton key={index} />
			))}
		</div>
	);
};

export default SkeletonTempateFallback;
