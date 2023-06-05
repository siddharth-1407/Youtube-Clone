import React, { useState, useEffect, useContext, useRef } from 'react';
import { ReactComponent as ThemeOptions } from '../../assets/newIcons/ThemeOptions.svg';
import { ReactComponent as ArrowForward } from '../../assets/newIcons/ArrowForward.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import { Context } from '../../context/ContextApi';

const Options = ({ setOpen, OptionsOpen }) => {
	const ThemeRef = useRef();
	const [openThemes, setOpenThemes] = useState(false);
	const { theme, setTheme } = useContext(Context);
	useEffect(() => {
		let handler = (e) => {
			if (!ThemeRef.current.contains(e.target)) {
				setOpenThemes(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, []);
	const getThemeFromSystem = () => {
		if (window.matchMedia('(prefers-color-scheme: dark)')) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};
	const getTheme = () => {
		if (localStorage.getItem('Theme') === null) {
			getThemeFromSystem();
		} else {
			setTheme(localStorage.getItem('Theme'));
		}
		if (theme === 'DeviceTheme') {
			getThemeFromSystem();
		} else if (theme === 'Dark') {
			document.documentElement.classList.add('dark');
		} else if (theme === 'Light') {
			document.documentElement.classList.remove('dark');
		}
	};

	useEffect(() => {
		const themeOptions = document.getElementsByName('Theme');
		for (let i = 0; i < themeOptions.length; i++) {
			const element = themeOptions[i];
			element.addEventListener('click', () => {
				setTheme(element.id);
				localStorage.setItem('Theme', element.id);
			});
		}
	}, []);

	useEffect(() => {
		getTheme();
	}, [theme]);

	return (
		<>
			<div
				id='optionsPopup'
				className={` box-shadow-custom overlay_js |  ${
					OptionsOpen ? 'flex' : 'hidden'
				} flex-col w-[18.75rem] h-auto rounded-lg py-2 fixed top-[56px] right-2 sm:right-32  bg-white  dark:bg-[#282828] text-[#0f0f0f] dark:text-[#f1f1f1] `}>
				<button
					className='flex justify-between items-center px-3 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#3e3e3e] active:bg-[#cccccc] dark:active:bg-[#545454]'
					onClick={() => {
						setOpenThemes(true);
						setOpen(false);
					}}>
					<div className='flex gap-3 '>
						<div className='w-6 aspect-square'>
							<ThemeOptions className='fill-[#0f0f0f] dark:fill-[#f1f1f1]' />
						</div>
						<span>Appearance:{` ${theme === 'DeviceTheme' ? 'Device Theme' : theme}`}</span>
					</div>
					<div className='flex w-6 aspect-square items-center '>
						<ArrowForward className='  fill-[#0f0f0f] dark:fill-[#f1f1f1]' />
					</div>
				</button>
			</div>

			<div
				id='themes'
				ref={ThemeRef}
				className={`box-shadow-custom overlay_js ${
					openThemes ? 'flex' : 'hidden'
				} flex-col w-[18.75rem] h-auto rounded-lg py-2 fixed top-[56px] right-2 sm:right-32 gap-2 bg-white  dark:bg-[#282828] text-[#0f0f0f] dark:text-[#f1f1f1] divide-y-[1px] divide-[#e5e5e5] dark:divide-[#535353]`}>
				<div className=' px-3'>
					<button
						className='flex justify-center items-center hover:bg-[#e5e5e5] dark:hover:bg-[#3e3e3e] active:bg-[#e6e6e6] dark:active:bg-[#545454] p-1 rounded-full aspect-square'
						onClick={() => {
							setOpenThemes(false);
							setOpen(true);
						}}>
						<ArrowBackIcon />
					</button>
				</div>
				<div>
					<div className='flex flex-col justify-between w-full items-center  '>
						<div
							className='flex gap-3 px-3 py-2 w-full relative hover:bg-[#f2f2f2] dark:hover:bg-[#3e3e3e] active:bg-[#cccccc] dark:active:bg-[#545454]'
							onClick={() => setOpenThemes(false)}>
							<div className='w-6 aspect-square'>
								{theme === 'DeviceTheme' ? <CheckIcon className='fill-[#0f0f0f] dark:fill-[#f1f1f1]' /> : ''}
							</div>
							<input type='radio' name='Theme' id='DeviceTheme' className='w-full h-full absolute inset-0 appearance-none' />
							<label htmlFor='DeviceTheme'>Device Theme</label>
						</div>
						<div
							className='flex gap-3 px-3 py-2 w-full relative hover:bg-[#f2f2f2] dark:hover:bg-[#3e3e3e] active:bg-[#cccccc] dark:active:bg-[#545454]'
							onClick={() => setOpenThemes(false)}>
							<div className='w-6 aspect-square'>
								{theme === 'Dark' ? <CheckIcon className='fill-[#0f0f0f] dark:fill-[#f1f1f1]' /> : ''}
							</div>
							<input type='radio' name='Theme' id='Dark' className='w-full h-full absolute inset-0 appearance-none' />
							<label htmlFor='DeviceTheme'>Dark</label>
						</div>
						<div
							className='flex gap-3 px-3 py-2 w-full relative hover:bg-[#f2f2f2] dark:hover:bg-[#3e3e3e] active:bg-[#cccccc] dark:active:bg-[#545454]'
							onClick={() => setOpenThemes(false)}>
							<div className='w-6 aspect-square'>
								{theme === 'Light' ? <CheckIcon className='fill-[#0f0f0f] dark:fill-[#f1f1f1]' /> : ''}
							</div>
							<input type='radio' name='Theme' id='Light' className='w-full h-full absolute inset-0 appearance-none' />
							<label htmlFor='DeviceTheme'>Light</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Options;
