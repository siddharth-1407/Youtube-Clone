import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SearchTypeChannel = ({ video }) => {
	return (
		<>
			<div className='group w-full flex  gap-4 p-1 '>
				<Link className='max-w-full' to={`/channels/${video.id?.channelId}`}>
					<div className='thumbnail | relative flex justify-center items-center bg-white dark:bg-[#0f0f0f] rounded-[12px] sm:w-auto sm:min-w-[360px] min-h-[8rem] sm:min-h-[12.563rem] aspect-square sm:aspect-video overflow-hidden'>
						<img
							loading='lazy'
							src={
								video?.snippet?.thumbnails?.high?.url ||
								video?.snippet?.thumbnails?.medium?.url || (
									<path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'></path>
								)
							}
							alt=''
							className='h-3/4 rounded-full aspect-square bg-[#e5e5e5] dark:bg-[#272727]'
						/>
					</div>
				</Link>
				<div className='flex flex-col gap-2 sm:gap-4  py-5 sm:py-10 md:py-5 leading-snug w-full  relative  '>
					<div className='flex flex-col justify-between md:justify-center md:gap-4 h-full gap-1 '>
						<Link className='w-full flex flex-col justify-between md:justify-start pr-1' to={`/channels/${video.id?.channelId}`}>
							<p className='line-clamp font-semibold w-full text-base text-[#0f0f0f] dark:text-white'>{video?.snippet?.title}</p>
						</Link>
						{video?.snippet?.description ? (
							<Link to={`/${video.id?.channelId}`}>
								<p className='text-[0.8rem] text-[#606060] dark:text-[#aaaaaa] line-clamp-custom sm:max-w-[163px] md:max-w-[200px] lg:max-w-[100%]'>
									{video.snippet?.description}
								</p>
							</Link>
						) : (
							<Skeleton
								baseColor={document.documentElement.classList.contains('dark') ? '#0f0f0f' : '#white'}
								width='80%'
								height='1.25rem'
								enableAnimation={false}
							/>
						)}
						<div className='flex md:hidden text-[#606060] dark:text-[#aaaaaa] text-[0.8rem]  '>
							<button className=' js_EventBtn | h-7 px-3 flex items-center gap-2 rounded-full text-[#f1f1f1] bg-[#0f0f0f] hover:bg-[#272727] dark:text-[#0f0f0f] dark:bg-[#f1f1f1] dark:hover:bg-[#d9d9d9] border-transparent  border-[1px]'>
								{/* <span className='w-6 aspect-square pointer-events-none'>{<Bell className=' dark:fill-[#0f0f0f] fill-[#f1f1f1] ' />}</span> */}
								<span className='font-semibold pointer-events-none'>Subscribe</span>
							</button>
						</div>
					</div>
				</div>
				<div className='hidden md:flex text-[#606060] dark:text-[#aaaaaa] text-[0.8rem]  '>
					<button className=' js_EventBtn | self-center h-9 px-3 flex items-center gap-2 rounded-full text-[#f1f1f1] bg-[#0f0f0f] hover:bg-[#272727] dark:text-[#0f0f0f] dark:bg-[#f1f1f1] dark:hover:bg-[#d9d9d9] border-transparent  border-[1px]'>
						{/* <span className='w-6 aspect-square pointer-events-none'>{<Bell className=' dark:fill-[#0f0f0f] fill-[#f1f1f1] ' />}</span> */}
						<span className='font-semibold pointer-events-none'>Subscribe</span>
					</button>
				</div>
			</div>
			<hr className='border-[#e5e5e5] dark:border-[#535353] hidden sm:block  sm:my-2' />
		</>
	);
};

export default SearchTypeChannel;
