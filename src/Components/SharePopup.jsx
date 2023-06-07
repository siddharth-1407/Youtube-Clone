import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context/ContextApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SharePopup = ({ shareRef, setOpen, open, video, playlist }) => {
	const { theme } = useContext(Context);
	const id = video ? `/video/${video}` : `/playlist/${playlist}`;
	const youtubeLink = video ? ` https://youtu.be/${video}` : `https://youtube.com/playlist?list=${playlist}`;
	useEffect(() => {
		let handler = (e) => {
			if (!shareRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, []);
	return (
		<>
			<div
				className={`sharePopup box-shadow-custom | z-[1] w-[240px] absolute top-9 -right-6 py-2 rounded-[12px] text-[#0f0f0f] dark:text-[#e5e5e5] dark:bg-[#282828] bg-white  ${
					open ? 'flex' : 'hidden'
				}`}>
				<ul className='w-full flex flex-col '>
					<li>
						<button
							className='px-2 py-2 w-full  hover:bg-[#e5e5e5] hover:dark:bg-[#535353]'
							onClick={() => {
								toast.success('Video Link copied');
								navigator.clipboard.writeText('Youtube-Clone/#/' + window.location.href.split('/', 3).join('/') + id);
								setOpen(false);
							}}>
							<span>{video !== undefined ? 'Copy video link' : 'Copy playlist link'}</span>
						</button>
					</li>
					<li>
						<button
							className='px-2 py-2 w-full  hover:bg-[#e5e5e5] hover:dark:bg-[#535353]'
							onClick={() => {
								toast.success('Video Link copied');
								navigator.clipboard.writeText(youtubeLink);
								setOpen(false);
							}}>
							<span>{video !== undefined ? 'Copy Youtube Link' : 'Copy Playlist Link (Youtube)'}</span>
						</button>
					</li>
				</ul>
			</div>
			<ToastContainer
				position='bottom-left'
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={theme === 'Light' ? 'light' : 'dark'}
			/>
		</>
	);
};

export default SharePopup;
