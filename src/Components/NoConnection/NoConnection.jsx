import React, { useEffect } from 'react';
import { ReactComponent as NoInternet } from '../../assets/newIcons/NoInternet.svg';

const NoConnection = () => {
	useEffect(() => {
		const handleOnline = () => {
			window.location.reload();
		};
		window.addEventListener('online', handleOnline);
		return () => {
			window.removeEventListener('online', handleOnline);
		};
	}, []);
	return (
		<div className='w-screen h-[100vh-56px] grid place-items-center'>
			<div className='flex flex-col items-center gap-2'>
				<div className='w-32 aspect-square'>
					<NoInternet />
				</div>
				<h1 className='dark:text-[#f1f1f1] text-[#0f0f0f] text-2xl'>Connect to the internet</h1>
				<p className='text-sm dark:text-[#f1f1f1] text-[#0f0f0f]'>You're offline. Check your connection.</p>
				<button
					className='px-3 py-[.35rem] text-[#065fd4] dark:text-[#3ea6ff] border-[1px] border-[#e5e5e5] dark:border-[#3f3f3f] rounded-full hover:bg-[#def1ff] dark:hover:bg-[#263850] hover:border-[#def1ff] hover:dark:border-[#263850] focus-visible:outline-none focus-visible:border-[#def1ff] focus-visible:dark:border-[#263850] focus-visible:bg-[#def1ff] dark:focus-visible:bg-[#263850]'
					onClick={() => window.location.reload()}>
					Retry
				</button>
			</div>
			<div className='fixed bottom-0 w-full text-center py-1 dark:text-white text-[#0f0f0f] bg-[#e5e5e5] dark:bg-[#212121]'>
				No internet connection{' '}
			</div>
		</div>
	);
};

export default NoConnection;
