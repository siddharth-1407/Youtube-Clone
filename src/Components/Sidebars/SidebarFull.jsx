import React, { useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Context } from '../../context/ContextApi';
import SigninBtn from '../SigninBtn';
import { CategoriesTop, videoCategories } from '../../Utils/Constants';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as Menu } from '../../assets/newIcons/Burger.svg';

const SidebarFull = () => {
	const { sidebarExpanded, setSidebarExpanded, selectCategory, location, mouseUp, mouseDown, handleSidebar, setSelectCategory, user } =
		useContext(Context);
	const { pathname } = useLocation();

	useEffect(() => {
		const sidebarScreen = document.querySelector('#sidebar-screen');
		if (pathname === '/rateLimited') {
			sidebarScreen.style.display = 'none';
		}
		pathname.startsWith('/video') ? setSelectCategory(null) : '';
	}, [pathname]);

	const sidebarResponsive = () => {
		if (window.innerWidth <= 1024) {
			setSidebarExpanded(false);
		} else if (pathname.startsWith('/video')) {
			setSidebarExpanded(false);
		} else {
			setSidebarExpanded(true);
		}
	};
	useEffect(() => {
		window.addEventListener('resize', sidebarResponsive);
		return () => {
			window.removeEventListener('resize', sidebarResponsive);
		};
	}, [window.innerWidth]);

	useEffect(() => {
		const overlay = document.getElementById('overlay');
		overlay.addEventListener('click', () => {
			setSidebarExpanded(false);
		});

		return overlay.removeEventListener('click', () => {
			setSidebarExpanded(false);
		});
	});

	return (
		<div
			id='sidebar-screen'
			className={`sidebar scrollbar-thin scrollbar-thumb-[#717171] scrollbar-track-transparent overlay_js |  fixed pt-0 flex px-3 pb-3 flex-col w-60  z-50 min-w-min h-screen bg-white dark:bg-[#0f0f0f] overflow-hidden hover:overflow-auto top-0  transition-all ease-in-out  ${
				sidebarExpanded === true ? ' left-0 ' : ' left-[-240px]'
			} ${pathname.startsWith('/video') ? '' : 'lg:hidden'}   transition`}>
			<div className={` flex items-center gap-4 min-h-[56px]  w-[12.75rem] `}>
				{
					<button
						id='sidebarBtn'
						className='js_EventBtn | p-[0.4rem] rounded-full  active:bg-[#e3e3e3] dark:active:bg-[#3d3d3d] border-transparent  border-[1px]'
						onClick={handleSidebar}
						onMouseUp={mouseUp}
						onMouseDown={mouseDown}>
						<Menu className='fill-[#212121] dark:fill-white pointer-events-none' />
					</button>
				}
				<Link to='/' className='flex items-end gap-1 pr-[.85rem] relative'>
					<Logo
						className='fill-[#212121] dark:fill-white'
						onClick={() => {
							setSelectCategory('New');
						}}
					/>
					<span className='text-[#7f7f7f] dark:text-[#8d8d8d] text-[0.65rem] font-bold inline absolute right-0 -top-1'>{location}</span>
				</Link>
			</div>
			<div className='w-[12.75rem]'>
				<ul className='flex flex-col w-full pt-3 list-none'>
					{CategoriesTop.map((category) => {
						return (
							<React.Fragment key={category.name}>
								<li className={`${!user && category?.auth ? 'hidden' : 'block'} rounded-lg cursor-pointer font-semibold`}>
									<Link
										to={category.url}
										title={category.name}
										className={`inline-flex px-3 gap-6 w-[12.75rem] py-2 text-[#0f0f0f] dark:text-white text-sm transition-all rounded-lg hover:bg-[#f2f2f2] dark:hover:bg-[#272727] active:bg-[#cccccc] dark:active:bg-[#3d3d3d] focus-visible:outline-none focus-visible:bg-[#f2f2f2] focus-visible:dark:bg-[#272727] ${
											selectCategory === category.name
												? 'dark:hover:bg-[#3d3d3d] dark:bg-[#272727] hover:bg-[#e6e6e6] bg-[#f2f2f2]'
												: ''
										} `}>
										<span className='flex items-center justify-center w-6 h-6'>
											{selectCategory === category.name ? category.iconActive : category.icon}
										</span>
										<span className={`${selectCategory === category.name ? 'font-medium' : 'font-light'} flex items-center`}>
											{category.name}
										</span>
									</Link>
								</li>
								{category.divider ? <hr className='h-px my-3  border-0 bg-[#e5e5e5] dark:bg-[#272727]' /> : ''}
							</React.Fragment>
						);
					})}
					{!user && (
						<div className='flex flex-col gap-3 items-center text-left   text-[#0f0f0f] border-0 dark:text-white px-6 pb-5 mb-3 border-b-[1px] border-b-[#e5e5e5] dark:border-b-[#272727]'>
							<p className='min-w-min font-light text-[0.87rem]'>Sign in to like videos, comment, and subscribe.</p>
							<SigninBtn />
						</div>
					)}
				</ul>
				<ul>
					<h2 className='text-[#0f0f0f] dark:text-white font-base text-base px-3 pb-1'>Explore</h2>
					{videoCategories.map((category) => {
						return (
							<React.Fragment key={category.name}>
								<li className=' rounded-lg cursor-pointer font-semibold'>
									<Link
										to={category.url}
										title={category.name}
										className={`inline-flex px-3 gap-6 w-[12.75rem] py-2 text-[#0f0f0f] dark:text-white text-sm transition-all rounded-lg hover:bg-[#f2f2f2] dark:hover:bg-[#272727] active:bg-[#cccccc] dark:active:bg-[#3d3d3d] focus-visible:bg-[#f2f2f2] focus-visible:outline-none focus-visible:dark:bg-[#272727] ${
											selectCategory === category.name
												? 'dark:hover:bg-[#3d3d3d] dark:bg-[#272727] hover:bg-[#e6e6e6] bg-[#f2f2f2]'
												: ''
										} `}>
										<span className='flex items-center justify-center w-6 h-6'>
											{selectCategory === category.name ? category.iconActive : category.icon}
										</span>
										<span className={`${selectCategory === category.name ? 'font-medium' : 'font-light'} flex items-center`}>
											{category.name}
										</span>
									</Link>
								</li>
								{category.divider ? <hr className='h-px my-3  border-0 bg-[#e5e5e5] dark:bg-[#272727]' /> : ''}
							</React.Fragment>
						);
					})}
				</ul>
				<p className='text-[#0f0f0f] dark:text-[#eee]'>
					- Made by{' '}
					<Link
						to={'https://github.com/siddharth-1407'}
						className='hover:text-black focus-within:text-black hover:dark:text-white focus-within:dark:text-white  focus-within:outline-none font-medium'>
						Siddharth
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SidebarFull;
