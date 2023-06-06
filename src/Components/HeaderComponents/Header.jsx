import React, { useState, useContext, useEffect, lazy, Suspense } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';
import { ReactComponent as Search } from '../../assets/newIcons/Search.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as Menu } from '../../assets/newIcons/Burger.svg';
import { auth } from '../GoogleSignin/config';
import { Context } from '../../context/ContextApi';
import HeaderRightNoUser from './HeaderRightNoUser';
import HeaderRightUser from './HeaderRightUser';

const Header = () => {
	const [search, setSearch] = useState('');
	const [searchSuggestions, setSearchSuggestions] = useState([]);
	const [throttl, setThrottl] = useState(true);
	const [isFocused, setIsFocused] = useState(false);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const { progress, setProgress, location, mouseUp, mouseDown, rateLimited, setRateLimited, setSelectCategory, handleSidebar, user } =
		useContext(Context);

	useEffect(() => {}, [user]);

	useEffect(() => {
		if (pathname === '/rateLimited') {
			setRateLimited(true);
		} else {
			setRateLimited(false);
		}
	}, [pathname]);
	useEffect(() => {
		setIsFocused(false);
	}, [pathname]);

	const autoCompelete = async () => {
		if (throttl) {
			try {
				const res = await axios.get(`https://youtube138.p.rapidapi.com/auto-complete/?q=${search}&hl=en&gl=US`, {
					headers: {
						'X-RapidAPI-Key': '8d87136f3fmsh0d51cd4a8d4b288p1914d6jsnd764a4d624b5',
						'X-RapidAPI-Host': 'youtube138.p.rapidapi.com',
					},
				});
				if (res.data.results.length <= 7) {
					setSearchSuggestions(res.data.results);
				} else {
					setSearchSuggestions(res.data.results.slice(0, 6));
				}
			} catch (error) {
				console.log(error);
			}
		}
		if (throttl) {
			setThrottl(false);
			setTimeout(() => {
				setThrottl(true);
			}, 1500);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (search === '') {
			return;
		} else {
			navigate(`/results/query/${search}`);
		}
	};
	const closeSearchSuggestions = (e) => {
		if (!e.target.classList.contains('input')) {
			setIsFocused(false);
		}
	};
	useEffect(() => {
		window.addEventListener('click', (e) => {
			closeSearchSuggestions(e);
		});
		return () => {
			window.removeEventListener('click', (e) => {
				closeSearchSuggestions(e);
			});
		};
	}, [isFocused]);
	useEffect(() => {
		if (search.length < 1) {
			setSearchSuggestions([]);
		}
	}, [search.length]);

	return (
		<div id='header' className='header | w-full pl-4 pr-5  h-14 flex items-center sticky top-0 z-10 bg-white dark:bg-[#0f0f0f] '>
			<LoadingBar
				loaderSpeed={100}
				transitionTime={100}
				waitingTime={500}
				color='#ff0000'
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
			/>

			<div className='header__left | flex justify-between gap-4 h-10 min-w-[140px]'>
				{!rateLimited && (
					<button
						id='sidebarBtn'
						className='js_EventBtn | p-[0.4rem] rounded-full hover:bg-[#e5e5e5] dark:hover:bg-[#272727] active:bg-[#cccccc] dark:active:bg-[#3d3d3d] border-transparent  border-[1px]'
						onClick={handleSidebar}
						onMouseUp={mouseUp}
						onMouseDown={mouseDown}>
						<Menu className='fill-[#030303] dark:fill-white pointer-events-none' />
					</button>
				)}
				<Link to='/Youtube-Clone/' className='flex items-end gap-1 pr-[.85rem] relative'>
					<Logo
						className=' fill-[#212121] dark:fill-white '
						onClick={() => {
							setSelectCategory('New');
						}}
					/>
					<span className='text-[#7f7f7f] dark:text-[#8d8d8d] text-[0.65rem] font-bold inline absolute right-0 -top-1'>
						{location ? location : ''}
					</span>
				</Link>
			</div>
			{!rateLimited && (
				<div className='header__center | relative hidden items-center max-w-2xl min-w-[10rem] h-10 mx-10  sm:flex'>
					<div className='search |  flex h-full w-[40.25rem] min-w-[5rem] justify-end '>
						<form
							onSubmit={handleSubmit}
							className=' group/item | input flex items-center w-[36.25rem] min-w-[5rem] pl-5 ml-7 border-[1px] border-[#ccc] dark:border-[#303030] rounded-l-full  overflow-hidden focus-within:border-blue-500 dark:focus-within:border-blue-500  focus-within:ml-0 focus-within:pl-12 relative bg-[hsl(0, 0%, 100%)] dark:bg-[#121212]'>
							<div className='h-10 w-10 items-center ml-1 justify-center hidden group-focus-within/item:flex absolute left-0 top-0 bg-transparent'>
								<Search className='fill-[#0f0f0f] dark:fill-white scale-[0.85]' />
							</div>
							<div className=' input-control  | input flex items-center w-full h-full  bg-transparent'>
								<label htmlFor='search' className='sr-only'>
									Search
								</label>
								<input
									id='search'
									type='text'
									name='search'
									placeholder='Search'
									autoComplete='off'
									className='w-full input  focus:outline-none mt-[0.3rem] pr-2 bg-transparent text-black dark:text-[#e2e2e2] -translate-y-[2px] font-normal placeholder:font-normal  placeholder:text-[#838383] '
									onChange={(e) => {
										setSearch(e.target.value);
										autoCompelete();
									}}
									value={search}
									onFocus={() => {
										setIsFocused(true);
									}}
								/>
							</div>
						</form>
						<button
							onClick={handleSubmit}
							title='Search'
							className='bg-[#f0f0f0]  dark:bg-[#222222] px-5 h-full rounded-r-full border-[1px] border-[#c6c6c6] dark:border-[#303030] border-l-0'>
							<Search className=' fill-[#0f0f0f] dark:fill-white' />
						</button>
					</div>
					<div
						id='searchSuggestions'
						className={`searchSuggestions |  ${
							searchSuggestions.length > 0 && isFocused && search.length > 0 ? 'flex' : 'hidden'
						} absolute top-11 pt-3 pb-2 w-[300px] sm:min-w-[90%] lg:min-w-[36rem] rounded-xl bg-white`}>
						<ul className='flex flex-col w-full list-none'>
							{searchSuggestions.map((suggestion, index) => {
								return (
									<li key={index}>
										<Link
											to={`/results/query/${suggestion}`}
											className='flex gap-3 px-2 py-1 font-medium hover:bg-[#e3e3e3] cursor-pointer'>
											<Search className='fill-[#0f0f0f] scale-[0.85]' />
											<span>{suggestion}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			)}
			<div className='signinBtn'>{user ? <HeaderRightUser /> : <HeaderRightNoUser />}</div>
		</div>
	);
};

export default Header;
