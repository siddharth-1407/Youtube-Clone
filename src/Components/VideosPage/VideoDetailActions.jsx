import React, { useState, useContext, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/ContextApi';
import NumberAbbreviate from 'number-abbreviate';
import { ReactComponent as ShareIcon } from '../../assets/shareIcon.svg';
import { ReactComponent as Bell } from '../../assets/newIcons/Bell.svg';
import { ReactComponent as DisikeOutline } from '../../assets/DislikeOutline.svg';
import NotificationsActiveSharpIcon from '@mui/icons-material/NotificationsActiveSharp';
import SigninActionPopup from '../SigninActionPopup';
const SharePopup = lazy(() => import('../SharePopup'));
// import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
// import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
// import { ReactComponent as LikeOutline } from '../assets/LikeOutline.svg';
// import { ReactComponent as LikeFill } from '../assets/LikeFill.svg';
// import { ReactComponent as DislikeFill } from '../assets/DislikeFill.svg';
// import SigninActionPopup from './SigninActionPopup';
// import { ReactComponent as Verified } from '../assets/newIcons/Verified.svg';

const VideoDetailActions = ({ video, channelData, videoStats }) => {
	const { mouseUpAction, mouseDownAction, user } = useContext(Context);
	const SignInActionRef = useRef();
	const shareBtnRef = useRef();
	const [open, setOpen] = useState(false);
	const [shareOpen, setShareOpen] = useState(false);
	const [id, setId] = useState(null);

	return (
		<div className='actions | px-3 sm:px-0 flex justify-between gap-x-2 gap-y-3 flex-wrap'>
			<div className='channelActions | '>
				<div className='channelProfile | flex gap-3'>
					<div className='channelImage | w-10 aspect-square flex'>
						<Link to={`/channels/${channelData.id}`}>
							<img
								src={channelData?.snippet?.thumbnails?.default?.url || channelData?.snippet?.thumbnails?.medium?.url}
								alt=''
								className='rounded-full'
							/>
						</Link>
					</div>

					<div className='channelInfo | flex flex-col justify-between'>
						<Link to={`/channels/${channelData.id}`}>
							<h1 className='ChannelName | inline-flex font-medium text-black dark:text-[#f1f1f1] '>{channelData?.snippet?.title}</h1>
						</Link>

						<p className='ChannelSubCount | text-xs font-medium   text-[#606060] dark:text-[#8d8d8d]'>
							<span className='uppercase'>{NumberAbbreviate(channelData?.statistics?.subscriberCount, 2)}</span>{' '}
							<span>subscribers</span>
						</p>
					</div>
					<div className='channelActionButtons flex gap-2 items-center sm:relative' ref={SignInActionRef}>
						<button
							className=' js_EventBtn | h-9 px-3 flex items-center gap-2 rounded-full text-[#f1f1f1] bg-[#0f0f0f] hover:bg-[#272727] dark:text-[#0f0f0f] dark:bg-[#f1f1f1] dark:hover:bg-[#d9d9d9] border-transparent  border-[1px]'
							onClick={() => {
								setOpen(!open);
								setId('subscribe');
							}}
							onBlur={() => setId(null)}>
							{user === undefined ? (
								''
							) : (
								<span className='w-6 aspect-square pointer-events-none'>
									{<Bell className=' dark:fill-[#0f0f0f] fill-[#f1f1f1] ' /> || (
										<NotificationsActiveSharpIcon style={{ color: '#f1f1f1' }} />
									)}
								</span>
							)}
							<span className='font-medium pointer-events-none'>Subscribe</span>
						</button>
						<SigninActionPopup popupRef={SignInActionRef} setOpen={setOpen} open={open} action={'subscribe'} id={id} />
					</div>
				</div>
			</div>
			<div className='videoActions | flex gap-2 items-center min-[500px]:ml-0 ml-auto'>
				<div className='likeDislike | h-9  flex  rounded-full bg-[#f2f2f2] dark:bg-[#272727] hover:bg-[#e5e5e5] dark:hover:bg-[#3f3f3f] sm:relative'>
					<button
						title='I like this'
						id='like-btn'
						className='js_EventBtn | rounded-tl-full rounded-bl-full h-full flex gap-2 px-4 items-center bg-[#f2f2f2] hover:bg-[#e5e5e5] dark:bg-[#272727] dark:hover:bg-[#3f3f3f]  border-transparent  border-[1px]'
						ref={SignInActionRef}
						onClick={() => {
							setOpen(!open);
							setId('like');
						}}
						onBlur={() => setId(null)}
						onMouseUp={mouseUpAction}
						onMouseDown={mouseDownAction}>
						<span className='text-[#0f0f0f] dark:text-[#f1f1f1] w-6 aspect-square pointer-events-none'>
							<DisikeOutline className=' fill-[#0f0f0f] dark:fill-[#f1f1f1] pointer-events-none' style={{ rotate: '180deg' }} />
						</span>
						<span className='text-[#0f0f0f] dark:text-[#f1f1f1] text-sm font-medium uppercase pointer-events-none'>
							{NumberAbbreviate(videoStats?.likeCount, 1)}
						</span>
						<SigninActionPopup popupRef={SignInActionRef} open={open} setOpen={setOpen} action={'like'} id={id} />
					</button>
					<hr className='bg-[#c2c2c2] dark:bg-[#525252] w-[1px] h-5/6 my-auto' />
					<button
						title='I dislike this'
						id='dislike-btn'
						className='js_EventBtn | rounded-tr-full rounded-br-full h-full flex items-center gap-2 px-3 bg-[#f2f2f2] hover:bg-[#e5e5e5] dark:bg-[#272727] dark:hover:bg-[#3f3f3f] border-transparent  border-[1px]'
						onMouseUp={mouseUpAction}
						onMouseDown={mouseDownAction}
						onClick={() => {
							setOpen(!open);
							setId('dislike');
						}}
						onBlur={() => setId(null)}>
						<span className='text-[#0f0f0f] dark:text-[#f1f1f1] w-6 aspect-square pointer-events-none'>
							<DisikeOutline className='  fill-[#0f0f0f] dark:fill-[#f1f1f1] pointer-events-none' />
						</span>
						<SigninActionPopup setOpen={setOpen} open={open} popupRef={SignInActionRef} action={'dislike'} id={id} />
					</button>
				</div>
				<div className='relative h-fit'>
					<button
						ref={shareBtnRef}
						title='Share'
						id='share-btn'
						className=' js_EventBtn | hidden md:flex items-center gap-2 h-9 pl-3 pr-4 rounded-full bg-[#f2f2f2] hover:bg-[#e5e5e5] dark:bg-[#272727] dark:hover:bg-[#3f3f3f] border-transparent  border-[1px]'
						onClick={() => setShareOpen(!shareOpen)}
						onMouseUp={mouseUpAction}
						onMouseDown={mouseDownAction}>
						<span className='w-6 aspect-square pointer-events-none'>
							<ShareIcon className='fill-[#0f0f0f] dark:fill-[#f1f1f1] pointer-events-none' />
						</span>
						<span className='text-[#0f0f0f] dark:text-[#f1f1f1] text-sm font-medium pointer-events-none'>Share</span>
					</button>
					<Suspense fallback={<div></div>}>
						<SharePopup shareRef={shareBtnRef} setOpen={setShareOpen} open={shareOpen} video={id} />
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default VideoDetailActions;
