import React, { useContext, useState, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/ContextApi';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReactComponent as PlaylistIcon } from '../../assets/newIcons/Playlist.svg';
const SharePopup = lazy(() => import('../SharePopup'));

const PlaylistCard = ({ playlistData }) => {
	const shareBtnRef = useRef();
	const [open, setOpen] = useState(false);
	const { mouseDownAction, mouseUpAction } = useContext(Context);
	return (
		<div className={` flex justify-between video_card  w-[210px]`}>
			<div className=' group flex flex-col w-full'>
				<Link className='max-w-full' to={`/playlist/${playlistData?.id}`}>
					<div className='thumbnail relative  bg-[#e5e5e5] dark:bg-[#272727] rounded-[12px] aspect-video   '>
						<img
							loading='lazy'
							src={playlistData?.snippet?.thumbnails?.maxres?.url || playlistData?.snippet?.thumbnails?.medium?.url}
							alt=''
							className='w-full rounded-[12px] aspect-video  bg-[#e5e5e5] dark:bg-[#272727] border-[#272727] '
						/>
						<div className='flex flex-col gap-2 justify-center items-center rounded-r-[10px] absolute top-0 right-0 z-10 w-[40%] opacity-80 h-full bg-black'>
							<span className='text-lg'>{playlistData?.contentDetails?.itemCount}</span>
							<PlaylistIcon className='fill-white' />
						</div>
					</div>
				</Link>

				<div className='details flex gap-4 mt-2'>
					<div className='flex flex-col justify-between leading-snug w-full relative'>
						<div className='flex mb-1 pr-7'>
							<Link className='w-full ' title={playlistData?.snippet?.localized?.title} to={`/playlist/${playlistData?.id}`}>
								<div className='flex w-full'>
									<p className='line-clamp font-medium w-full text-sm text-[#0f0f0f] dark:text-white'>
										{playlistData?.snippet?.localized?.title}
									</p>
								</div>
							</Link>
							<div className='button | h-fit ' ref={shareBtnRef}>
								<button
									className={` js_EventBtn | opacity-0 group-hover:opacity-100 absolute top-[-18%] right-[-4%] w-[35.7px] h-[35.7px] rounded-full flex items-center justify-center  border-transparent  active:bg-[rgba(227,227,227,0.7)] dark:active:bg-[rgba(39,39,39,0.7)] border-[1px]  ${
										open && 'opacity-100'
									}`}
									onClick={() => setOpen(!open)}
									onMouseUp={mouseUpAction}
									onMouseDown={mouseDownAction}>
									<MoreVertIcon className='text-black dark:text-white pointer-events-none' />
								</button>
								<Suspense fallback={<div></div>}>
									<SharePopup open={open} setOpen={setOpen} playlist={playlistData?.id} shareRef={shareBtnRef} />
								</Suspense>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaylistCard;
