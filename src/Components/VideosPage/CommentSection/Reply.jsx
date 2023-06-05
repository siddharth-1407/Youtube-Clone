// Note: YouTube currently supports replies only for top-level comments. However, replies to replies may be supported in the future.
import React, { useContext, useState, useEffect } from 'react';
import { ReactComponent as LikeOutline } from '../../../assets/LikeOutline.svg';
import { ReactComponent as ArrowForward } from '../../../assets/newIcons/ArrowForward.svg';
import Avatar from '@mui/material/Avatar';
import { Context } from '../../../context/ContextApi';
import { Link } from 'react-router-dom';
import NumberAbbreviate from 'number-abbreviate';
import { formatDistanceToNowStrict } from 'date-fns';
import Replyform from './Replyform';

const Reply = ({ reply }) => {
	const { user } = useContext(Context);
	const [publishedAt, setPublishedAt] = useState('');
	const [replyForm, setReplyForm] = useState(false);

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
	const renderReply = () => {
		const timeStampRegex = /\\b(\d{1,2}):(\d{2})(?::(\d{2}))?\\b/g;
		const usernameRegex = /@([A-Za-z0-9_]+)/;
		let finalReply;
		const replacedReply = reply?.snippet?.textOriginal.replace(usernameRegex, (username) => {
			return `<span class="text-[#3ea6ff]"><span aria-hidden='true'>@</span>${username.substr(1)}</span>`;
		});

		finalReply = replacedReply.replace(timeStampRegex, (timeStamp) => {
			return `<button class='timeStamp text-[#3ea6ff]' data-time=${timeStringToSeconds(timeStamp)}>${timeStamp}</button>`;
		});

		return { __html: finalReply };
	};

	useEffect(() => {
		setPublishedAt(formatDistanceToNowStrict(new Date(reply?.snippet?.updatedAt)));
	}, []);
	return (
		<div className=' flex gap-3'>
			<Link to={reply?.snippet?.authorChannelUrl} className='image-container '>
				<Avatar src={reply?.snippet?.authorProfileImageUrl || ''} sx={{ width: 24, height: 24 }} />
			</Link>
			<div className='flex flex-1 flex-col gap-[0.15rem]'>
				<Link to={reply?.snippet?.authorChannelUrl} className='flex w-fit gap-2 text-[0.8rem] text-[#0f0f0f] dark:text-[#f1f1f1]'>
					<span>@{reply?.snippet?.authorDisplayName}</span>
					<span className='text-[#606060] hover:text-[#0f0f0f] dark:text-[#aaaaaa] dark:hover:text-white'>{`${publishedAt} ago`}</span>
				</Link>
				<div>
					<p
						className=' w-full bg-transparent text-[0.95rem] text-[#0f0f0f] dark:text-[#f1f1f1] lg:w-[97%]'
						dangerouslySetInnerHTML={renderReply()}></p>
				</div>
				<div className={`buttons |  flex flex-row items-center justify-start gap-2 `}>
					<div className='flex items-center gap-1 '>
						<button className='w-8 overflow-hidden rounded-full bg-transparent p-2 text-sm font-medium text-[#0f0f0f] hover:bg-[#e5e5e5] dark:text-[#f1f1f1] dark:hover:bg-[#3f3f3f]'>
							<LikeOutline className='scale-[3.5]' />
						</button>
						<span className='text-xs text-[#606060] dark:text-[#aaaaaa]'>{NumberAbbreviate(reply?.snippet?.likeCount, 2)}</span>
					</div>
					<div>
						<button
							className='w-8 rounded-full bg-transparent p-2 text-sm font-medium text-[#0f0f0f] hover:bg-[#e5e5e5] dark:text-[#f1f1f1] dark:hover:bg-[#3f3f3f]'
							onClick={(e) => handleCancelComment(e)}>
							<LikeOutline className='rotate-180 scale-[3.5]' />
						</button>
					</div>
					<div>
						<button
							className='rounded-full bg-transparent py-1 px-2 text-xs font-medium text-[#0f0f0f] hover:bg-[#e5e5e5] dark:text-[#f1f1f1] dark:hover:bg-[#3f3f3f]'
							onClick={(e) => setReplyForm(true)}>
							<span>Reply</span>
						</button>
					</div>
				</div>
				{replyForm && <Replyform setReplyForm={setReplyForm} />}
			</div>
		</div>
	);
};

export default Reply;
