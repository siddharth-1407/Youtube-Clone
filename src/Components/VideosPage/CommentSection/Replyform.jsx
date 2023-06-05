// Note: YouTube currently supports replies only for top-level comments. However, replies to replies may be supported in the future.
import React, { useEffect, useContext, useState, useRef } from 'react';
import { auth } from '../../GoogleSignin/config';
import { Avatar } from '@mui/material';
import { Context } from '../../../context/ContextApi';

const Replyform = ({ setReplyForm }) => {
	const ReplyRef = useRef();
	const [comment, setComment] = useState('');
	const { user } = useContext(Context);

	useEffect(() => {
		const reply = document.querySelector('#reply');
		ReplyRef.current.focus();
		reply.addEventListener('input', (e) => {
			if (e.target.style.height >= '600px') {
				e.target.classList.add('overflow-y-auto');
				e.target.classList.add('scrollbar-thin');
			} else {
				e.target.classList.remove('overflow-y-auto');
				e.target.classList.remove('scrollbar-thin');
			}
		});
	}, []);
	useEffect(() => {}, [user]);

	const handleSubmitComment = () => {};

	return (
		<div className='form | w-full my-2 flex items-start gap-3'>
			<div className='image-container'>
				<Avatar src={user ? auth?.currentUser?.photoURL : ''} sx={{ width: 24, height: 24 }} />
			</div>
			<form method='post' className='flex-1  relative focus-within:outline-none'>
				<div className='form-control | group h-full flex flex-col gap-3'>
					<label htmlFor='comment' className='sr-only'>
						Reply to this comment
					</label>
					<div
						className={` relative min-h-[30px]  flex before:absolute before:opacity-0 before:w-full before:z-10 before:scale-0 before:border-b-[#0f0f0f] dark:before:border-b-white before:border-b-[2px] before:bottom-0 before:origin-center focus-within:before:opacity-100 focus-within:before:scale-100 before:transition-transform before:duration-500`}>
						<textarea
							ref={ReplyRef}
							maxLength={5000}
							name='comment'
							value={comment}
							onChange={(e) => {
								setComment(e.target.value);
								e.target.style.height = `30px`;
								const scrollHeight = e.target.scrollHeight;
								e.target.style.height = `${scrollHeight}px`;
							}}
							spellCheck='false'
							id='reply'
							className='relative overflow-hidden bottom-0 min-h-[30px] max-h-[600px] h-[30px]  w-full bg-transparent border-b-[1px] border-b-[#e5e5e5] dark:border-b-[#717171]   focus-visible:outline-none resize-none text-[0.95rem] py-1 dark:text-[#f1f1f1] text-[#0f0f0f] dark:placeholder:text-[#aaaaaa] placeholder:text-[#606060] placeholder:text-[0.95rem]'
							placeholder='Add a reply...'></textarea>
					</div>
					<div className={`buttons | group-focus-within:flex  gap-4 justify-end flex`}>
						<div
							className={`${
								comment.length > 0 ? 'flex' : 'hidden'
							} h-full items-center mr-auto dark:text-[#f1f1f1] text-[#0f0f0f] text-sm`}>
							<p>{comment.length}/5000</p>
						</div>
						<button
							className='px-2 py-[0.33rem]  rounded-full font-medium text-[0.9rem] bg-transparent hover:bg-[#e5e5e5] dark:hover:bg-[#3f3f3f] text-[#0f0f0f] dark:text-[#f1f1f1]'
							onClick={(e) => {
								e.preventDefault();
								setReplyForm(false);
							}}>
							Cancel
						</button>
						<button
							type='submit'
							disabled={comment.trim().length <= 0 ? true : false}
							className={`px-2 py-[0.33rem] rounded-full text-[0.9rem] ${
								comment.trim().length <= 0
									? 'bg-[#f2f2f2] dark:bg-[#272727] text-[#909090] dark:text-[#717171] cursor-not-allowed'
									: 'bg-[#065fd4] dark:bg-[#3ea6ff] text-[#ffffff] dark:text-[#0f0f0f] cursor-pointer'
							}    `}>
							Reply
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
export default Replyform;
