import React, { useContext, useState, useEffect, Suspense, lazy } from 'react';
import { ReactComponent as LikeOutline } from '../../../assets/LikeOutline.svg';
import { ReactComponent as ArrowForward } from '../../../assets/newIcons/ArrowForward.svg';
import { auth, provider } from '../../GoogleSignin/config';
import { signInWithPopup } from 'firebase/auth';
import Avatar from '@mui/material/Avatar';
import { Context } from '../../../context/ContextApi';
import { Link } from 'react-router-dom';
import NumberAbbreviate from 'number-abbreviate';
import { formatDistanceToNowStrict } from 'date-fns';
import Replyform from './Replyform';
const Reply = lazy(() => import('./Reply'));

const Comment = ({ comment }) => {
	const { user, setUser, playerRef } = useContext(Context);
	const [publishedAt, setPublishedAt] = useState('');
	const [showReplies, setShowReplies] = useState(false);
	const [replyForm, setReplyForm] = useState(false);
	// Note: YouTube currently supports replies only for top-level comments. However, replies to replies may be supported in the future.

	useEffect(() => {
		setPublishedAt(formatDistanceToNowStrict(new Date(comment?.snippet?.topLevelComment?.snippet?.publishedAt)));
		setClickEventOnTimeStamp();
	}, []);
	const renderComment = () => {
		function timeStringToSeconds(timeString) {
			if (timeString.length === 7 || timeString.length === 8) {
				const [hours, minutes, seconds] = timeString.split(':').map(Number);
				return hours * 3600 + minutes * 60 + seconds;
			}
			if (timeString.length === 4 || timeString.length === 5) {
				const [minutes, seconds] = timeString.split(':').map(Number);
				return minutes * 60 + seconds;
			}
		}
		const urlRegex = /(https?:\/\/[^\s]+)/g;
		const timeStampRegex = /\b(\d{1,2}):(\d{2})(?::(\d{2}))?\b/g;
		let finalComment;

		const replacedComment = comment?.snippet?.topLevelComment?.snippet?.textOriginal.replace(urlRegex, (url) => {
			return `<a href="${url}" target="_blank" class="text-[#065fd4] dark:text-[#3ea6ff]">${url}</a>`;
		});

		finalComment = replacedComment.replace(timeStampRegex, (timeStamp) => {
			return `<button class='inline timeStamp text-[#065fd4] dark:text-[#3ea6ff]' data-time=${timeStringToSeconds(
				timeStamp
			)}>${timeStamp}</button>`;
		});

		return { __html: finalComment };
	};
	const setClickEventOnTimeStamp = () => {
		const Btns = document.getElementsByClassName('timeStamp');
		for (let i = 0; i < Btns.length; i++) {
			let element = Btns[i];
			const time = element.getAttribute('data-time');
			element.addEventListener('click', () => playerRef.current.seekTo(time));
		}
	};
	const actionLogin = async () => {
		try {
			const res = await login();
			if (res === 'success') {
				setReplyForm(true);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const login = async () => {
		try {
			const res = await signInWithPopup(auth, provider);
			setUser(true);
			localStorage.setItem('user', res.user.displayName);
			localStorage.setItem('email', res.user.email);
			localStorage.setItem('pfp', res.user.photoURL);
			localStorage.setItem('token', res.user.accessToken);
			localStorage.setItem('refreshToken', res.user.refreshToken);
			return 'success';
		} catch (error) {
			console.log(error);
			return 'login failed';
		}
	};
	return (
		<div className='flex items-start gap-3'>
			<Link to={`/channels/${comment?.snippet?.topLevelComment?.snippet?.authorChannelId?.value}`} className='image-container'>
				<Avatar src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl || ''} />
			</Link>
			<div className='flex flex-1 flex-col  gap-1'>
				<Link
					to={`/channels/${comment?.snippet?.topLevelComment?.snippet?.authorChannelId?.value}`}
					className='flex w-fit gap-2 text-[0.8rem] text-[#0f0f0f] dark:text-[#f1f1f1]'>
					<span>@{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}</span>
					<span className='text-[#606060] hover:text-[#0f0f0f] dark:text-[#aaaaaa] dark:hover:text-white'>{`${publishedAt} ago`}</span>
				</Link>
				<div>
					<p
						className=' w-full whitespace-pre-line bg-transparent text-[0.95rem] text-[#0f0f0f] dark:text-[#f1f1f1] lg:w-[97%]'
						dangerouslySetInnerHTML={renderComment()}>
						{/* {comment?.snippet?.topLevelComment?.snippet?.textOriginal} */}
					</p>
				</div>
				<div className={`buttons |  flex flex-row items-center justify-start gap-2 `}>
					<div className='flex items-center gap-1 '>
						<button className='w-8 overflow-hidden rounded-full bg-transparent p-2 text-sm font-medium text-[#0f0f0f] hover:bg-[#e5e5e5] dark:text-[#f1f1f1] dark:hover:bg-[#3f3f3f]'>
							<LikeOutline className='scale-[3.5]' />
						</button>
						<span className='text-xs text-[#606060] dark:text-[#aaaaaa]'>
							{NumberAbbreviate(comment?.snippet?.topLevelComment?.snippet?.likeCount, 2)}
						</span>
					</div>
					<div>
						<button className='w-8 rounded-full bg-transparent p-2 text-sm font-medium text-[#0f0f0f] hover:bg-[#e5e5e5] dark:text-[#f1f1f1] dark:hover:bg-[#3f3f3f]'>
							<LikeOutline className='rotate-180 scale-[3.5]' />
						</button>
					</div>
					<div>
						<button
							className='rounded-full bg-transparent py-[0.3rem] px-2 text-xs font-medium text-[#0f0f0f] hover:bg-[#e5e5e5] dark:text-[#f1f1f1] dark:hover:bg-[#3f3f3f]'
							onClick={actionLogin}>
							<span>Reply</span>
						</button>
					</div>
				</div>
				{replyForm && (
					<div className='replyFormContainer | flex w-full'>
						<Replyform setReplyForm={setReplyForm} />
					</div>
				)}

				{comment?.replies?.comments.length > 0 && (
					<button
						className='flex w-fit items-center gap-2  text-[#065fd4] dark:text-[#3ea6ff]'
						onClick={() => setShowReplies(!showReplies)}>
						<span className='ml-auto flex aspect-square w-6 items-center'>
							<ArrowForward className={` ${showReplies ? 'rotate-[270deg]' : 'rotate-90'} fill-[#065fd4] dark:fill-[#3ea6ff]`} />
						</span>
						<span className='text-[0.95rem] font-medium'>{`${comment?.replies?.comments.length} ${
							comment?.replies?.comments.length === 1 ? 'reply' : 'replies'
						}`}</span>
					</button>
				)}
				{comment?.replies?.comments.length > 0 && (
					<div className={`repliesContainer | mt-4  flex-col gap-4 ${showReplies ? 'flex' : 'hidden'}`}>
						{comment.replies.comments.map((reply) => {
							return (
								<Suspense fallback={<div></div>} key={reply.id}>
									<Reply reply={reply} />
								</Suspense>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Comment;
