import React, { useState, useEffect, useContext, useRef } from 'react';
import { Context } from '../../context/ContextApi';
import { signOut } from 'firebase/auth';
import { auth } from '../GoogleSignin/config';
import Avatar from '@mui/material/Avatar';
import { ReactComponent as Bell } from '../../assets/newIcons/Bell.svg';
import { ReactComponent as Search } from '../../assets/newIcons/Search.svg';
import { ReactComponent as Logout } from '../../assets/newIcons/Logout.svg';
import { ReactComponent as UserIcon } from '../../assets/newIcons/UserIcon.svg';
import { ReactComponent as ThemeOptions } from '../../assets/newIcons/ThemeOptions.svg';
import { ReactComponent as ArrowForward } from '../../assets/newIcons/ArrowForward.svg';

import ThemeOptionsUser from './ThemeOptionsUser';

const HeaderRightUser = () => {
	const optionsRef = useRef(null);

	const { theme, setUser } = useContext(Context);
	const [open, setOpen] = useState(false);
	const [openThemeOptions, setOpenThemeOptions] = useState(false);
	const userOptions = useRef();
	const themeOptions = useRef();
	useEffect(() => {
		let handler = (e) => {
			if (!userOptions?.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, []);
	const LogUserOut = () => {
		setUser(false);
		localStorage.clear();
		signOut(auth);
		setOpen(false);
	};
	return (
		<div className='header__right | relative h-10 min-w-min flex items-center  px-1.5 sm:gap-[0.6rem]'>
			<div className='formResponsive | h-full w-10  rounded-full sm:hidden'>
				<button title='Search' className='h-full w-full flex items-center justify-center '>
					<Search className='fill-[#0f0f0f] dark:fill-white' />
				</button>
			</div>
			<div className='notifications | h-full w-10   '>
				<button
					title='Notifications'
					className='h-full w-full rounded-full flex items-center justify-center hover:bg-[#eeeeee] active:bg-[#e5e5e5] dark:active:bg-[#272727] dark:hover:bg-[#272727]'>
					<Bell className='fill-[#0f0f0f] dark:fill-white' />
				</button>
				<section className='notification_dropdown | absolute hidden'>
					<div className='head'>
						<span>Notifications</span>
						<img src='' alt='' />
					</div>
				</section>
			</div>
			<div className='profile | h-full w-10 ml-2 rounded-full overflow-hidden' ref={userOptions}>
				<button
					className='h-full w-full flex items-center justify-center '
					ref={optionsRef}
					onClick={(e) => {
						e.preventDefault();
						setOpen(!open);
					}}>
					<Avatar alt='' src={auth?.currentUser?.photoURL || './broken-image.jpg'} sx={{ height: '32px', width: '32px' }} />
				</button>
				<div
					className={`dropdown box-shadow-custom | absolute top-[50px] right-0 w-[300px]  bg-white dark:bg-[#282828] rounded-[12px] py-2 text-[#0f0f0f] dark:text-[#f1f1f1] text-sm ${
						open ? 'flex' : 'hidden'
					}`}>
					
					<ul className=' w-full '>
						<li className='py-2 px-4 flex hover:bg-[#e5e5e5] hover:dark:bg-[#535353]'>
							<button className='w-full  flex items-center gap-4' onClick={LogUserOut}>
								<Logout className='fill-[#0f0f0f] dark:fill-white w-6 pointer-events-none' /> <span>Sign out</span>
							</button>
						</li>
						<hr className='h-px my-0  border-0 bg-[#e5e5e5] dark:bg-[#3f3f3f]' />
						<li className='py-2 px-4 flex hover:bg-[#e5e5e5] hover:dark:bg-[#535353]' ref={themeOptions}>
							<button
								className='w-full flex items-center gap-4'
								onClick={() => {
									setOpenThemeOptions(true);
									setOpen(false);
								}}>
								<ThemeOptions className='fill-[#0f0f0f] dark:fill-white w-6' />
								<span>Appearance: {` ${theme === 'DeviceTheme' ? 'Device Theme' : theme}`}</span>
								<div className='flex w-6 aspect-square items-center ml-auto'>
									<ArrowForward className='  fill-[#0f0f0f] dark:fill-[#f1f1f1]' />
								</div>
							</button>
						</li>
					</ul>
				</div>
			</div>

			<ThemeOptionsUser setOpen={setOpen} open={open} setOpenThemeOptions={setOpenThemeOptions} openThemeOptions={openThemeOptions} />
		</div>
	);
};

export default HeaderRightUser;
