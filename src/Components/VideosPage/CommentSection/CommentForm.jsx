import React, { useEffect, useContext, useState } from 'react';
import { auth, provider } from '../../GoogleSignin/config';
import { signInWithPopup } from 'firebase/auth';
import { Avatar } from '@mui/material';
import { Context } from '../../../context/ContextApi';

const CommentForm = () => {
	const { user, setUser } = useContext(Context);
	useEffect(() => {
		const textArea = document.querySelector('#comment');
		textArea.addEventListener('input', (e) => {
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

	const [comment, setComment] = useState('');
	const handleSubmitComment = () => {};
	const handleCancelComment = (e) => {
		e.preventDefault();
		const textArea = document.querySelector('#comment');
		textArea.style.height = '40px';
		e.target.blur();
		setComment('');
	};

	const actionLogin = async (e) => {
		const formFooter = document.querySelector('.formFooter');
		try {
			const res = await login();
			if (res === 'success') {
				e.target.value = comment;
				formFooter.classList.add('group-focus-within:flex');
			} else {
				formFooter.classList.remove('group-focus-within:flex');
				e.target.blur();
				e.target.value = '';
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
		<div className='form | flex gap-3'>
			<div className='image-container'>
				<Avatar src={user ? auth?.currentUser?.photoURL : ''} />
			</div>
			<form method='post' className='flex-1  relative focus-within:outline-none'>
				<div className='form-control | group h-full flex flex-col gap-3'>
					<label htmlFor='comment' className='sr-only'>
						Add a comment
					</label>
					<div
						className={` relative min-h-[40px]  flex ${
							user &&
							'before:absolute before:opacity-0 before:w-full before:z-10 before:scale-0 before:border-b-[#0f0f0f] dark:before:border-b-white before:border-b-[2px] before:bottom-0 before:origin-center focus-within:before:opacity-100 focus-within:before:scale-100 before:transition-transform before:duration-500'
						}`}>
						<textarea
							onClick={(e) => {
								user ? '' : actionLogin(e);
							}}
							maxLength={5000}
							name='comment'
							value={comment}
							onChange={(e) => {
								user && setComment(e.target.value);
								e.target.style.height = `40px`;
								const scrollHeight = e.target.scrollHeight;
								e.target.style.height = `${scrollHeight}px`;
							}}
							spellCheck='false'
							id='comment'
							className='relative overflow-hidden bottom-0 min-h-[40px] max-h-[600px] h-[40px]  w-full bg-transparent border-b-[1px] border-b-[#e5e5e5] dark:border-b-[#717171]   focus-visible:outline-none resize-none text-[0.95rem] py-2 dark:text-[#f1f1f1] text-[#0f0f0f] dark:placeholder:text-[#aaaaaa] placeholder:text-[#606060] placeholder:text-[0.95rem]'
							placeholder='Add a comment...'></textarea>
					</div>
					<div
						// actionLogin function handles display flex
						className={`formFooter | gap-4 justify-end ${
							document.activeElement === document.querySelector('#comment') && comment.length > 0 ? 'flex' : 'hidden'
						}`}>
						<div
							className={`${
								comment.length > 0 ? 'flex' : 'hidden'
							} h-full items-center mr-auto dark:text-[#f1f1f1] text-[#0f0f0f] text-sm`}>
							<p>{comment.length}/5000</p>
						</div>
						<button
							className='px-4 py-2  rounded-full font-medium text-sm bg-transparent hover:bg-[#e5e5e5] dark:hover:bg-[#3f3f3f] text-[#0f0f0f] dark:text-[#f1f1f1]'
							onClick={(e) => handleCancelComment(e)}>
							Cancel
						</button>
						<button
							type='submit'
							disabled={comment.trim().length <= 0 ? true : false}
							className={`px-4 py-2 rounded-full ${
								comment.trim().length <= 0
									? 'bg-[#f2f2f2] dark:bg-[#272727] text-[#909090] dark:text-[#717171] cursor-not-allowed'
									: 'bg-[#065fd4] dark:bg-[#3ea6ff] text-[#ffffff] dark:text-[#0f0f0f] cursor-pointer'
							}    `}>
							Comment
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CommentForm;
