import React, { useEffect, useState } from 'react';

import SigninBtn from './SigninBtn';

const SigninActionPopup = ({ popupRef, setOpen, open, action, id }) => {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	useEffect(() => {
		setContent();
		let handler = (e) => {
			if (!popupRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, []);
	const setContent = () => {
		switch (action) {
			case 'subscribe':
				setTitle('Want to subscribe to this channel?');
				setDesc('Sign in to subscribe to this channel.');
				break;

			case 'like':
				setTitle('Like this video?');
				setDesc('Sign in to make your opinion count.');
				break;
			case 'dislike':
				setTitle("Don't like this video?");
				setDesc('Sign in to make your opinion count.');
				break;

			default:
				break;
		}
	};

	return (
		<div
			className={`box-shadow-custom | bg-white dark:bg-[#212121] absolute bottom-12 -translate-x-1/2 sm:translate-x-0 left-1/2  z-[1] ${
				action === 'subscribe' ? 'right1/2 sm:left-auto' : 'sm:right-0 sm:left-auto'
			} min-w-[20.438rem] w-[378px] h-44 p-6 flex-col justify-between items-start  ${action === id && open ? 'flex' : 'hidden'}`}>
			<h3 className='text-[#0f0f0f] dark:text-[#f1f1f1] font-normal text-[1.1rem]'>{title}</h3>
			<h3 className='text-[#606060] dark:text-[#aaaaaa] mb-3 text-[0.95rem]'>{desc}</h3>
			<SigninBtn />
		</div>
	);
};

export default SigninActionPopup;
