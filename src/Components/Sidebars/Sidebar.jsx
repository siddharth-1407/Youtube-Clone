import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { categoriesClosed, CategoriesTop, videoCategories } from '../../Utils/Constants';
import { Context } from '../../context/ContextApi';
import SigninBtn from '../SigninBtn';

const Sidebar = () => {
	const { selectCategory, sidebarExpanded, mouseUpAction, mouseDownAction, user } = useContext(Context);

	return (
		<nav
			className={`sidebar scrollbar-thin  dark:scrollbar-thumb-[#717171] scrollbar-thumb-[#999999] scrollbar-track-transparent overflow-hidden  | min-w-min h-[calc(100%-48px)] bg-white dark:bg-[#0f0f0f] fixed  top-[56px] left-0 ${
				sidebarExpanded === true ? 'hover:overflow-scroll flex sm:px-3 w-60 ' : 'flex sm:p-1 w-[4.5]'
			} `}>
			<ul className={` ${sidebarExpanded === true ? 'hidden' : ' hidden sm:flex'} flex-col overflow-hidden  w-min list-none`}>
				{categoriesClosed.map((category) => {
					return (
						<React.Fragment key={category.name}>
							<li className=' rounded-lg cursor-pointer font-semibold overflow-hidden'>
								<Link
									to={category.url}
									title={category.name}
									className={`flex flex-col justify-center items-center px-0  py-4 gap-1 w-[4rem] border-[1px] border-transparent text-[#0f0f0f] dark:text-[#f1f1f1] text-[0.65rem] transition-all active:bg-[#cccccc] dark:active:bg-[#3d3d3d]  focus-visible:bg-[#f2f2f2] focus-visible:dark:bg-[#272727] ${
										selectCategory === category.name
											? 'dark:hover:bg-[#3d3d3d] dark:bg-[#272727] hover:bg-[#e6e6e6] bg-[#f2f2f2]'
											: 'hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
									} `}
									onMouseDown={mouseDownAction}
									onMouseUp={mouseUpAction}>
									<span className='flex items-center justify-center w-6 h-6 pointer-events-none'>
										{selectCategory === category.name ? category.iconActive : category.icon}
									</span>
									<span className={`${selectCategory === category.name ? 'font-medium' : 'font-light'} pointer-events-none`}>
										{category.name}
									</span>
								</Link>
							</li>
						</React.Fragment>
					);
				})}
			</ul>

			<div className={`${sidebarExpanded === true ? ' hidden lg:flex ' : 'hidden'}  mt-3 flex-col w-full`}>
				<ul className='flex flex-col w-min list-none'>
					{CategoriesTop.map((category) => {
						return (
							<React.Fragment key={category.name}>
								<li
									className={`${
										!user && category?.auth ? 'hidden' : 'block'
									} rounded-lg cursor-pointer font-semibold overflow-hidden`}>
									<Link
										to={category.url}
										title={category.name}
										className={`inline-flex px-3 gap-6 w-[12.75rem] py-2 text-[#0f0f0f] border-[1px] border-transparent dark:text-[#f1f1f1] text-sm transition-all active:bg-[#cccccc] dark:active:bg-[#3d3d3d] focus-visible:bg-[#f2f2f2] focus-visible:dark:bg-[#272727] ${
											selectCategory === category.name
												? 'dark:hover:bg-[#3d3d3d] dark:bg-[#272727] hover:bg-[#e6e6e6] bg-[#f2f2f2]'
												: 'hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
										} `}
										onMouseDown={mouseDownAction}
										onMouseUp={mouseUpAction}>
										<span className='flex items-center justify-center w-6 h-6 pointer-events-none'>
											{selectCategory === category.name ? category.iconActive : category.icon}
										</span>
										<span
											className={`${
												selectCategory === category.name ? 'font-medium' : 'font-light'
											} flex items-center pointer-events-none`}>
											{category.name}
										</span>
									</Link>
								</li>
								{category.divider ? <hr className='h-px my-3  border-0 bg-[#e5e5e5] dark:bg-[#3f3f3f]' /> : ''}
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

				<ul className={`${sidebarExpanded === true ? ' hidden lg:flex ' : 'hidden'} flex-col w-min list-none`}>
					<h2 className='text-[#0f0f0f] dark:text-[#f1f1f1] font-base text-base px-3 pb-1'>Explore</h2>
					{videoCategories.map((category) => {
						return (
							<React.Fragment key={category.name}>
								<li className=' rounded-lg cursor-pointer font-semibold overflow-hidden'>
									<Link
										to={category.url}
										title={category.name}
										className={`inline-flex px-3 gap-6 w-[12.75rem] py-2 border-[1px] border-transparent text-[#0f0f0f] dark:text-[#f1f1f1] text-sm transition-all active:bg-[#cccccc] dark:active:bg-[#3d3d3d] focus-visible:bg-[#f2f2f2] focus-visible:dark:bg-[#272727] ${
											selectCategory === category.name
												? 'dark:hover:bg-[#3d3d3d] dark:bg-[#272727] hover:bg-[#e6e6e6] bg-[#f2f2f2]'
												: 'hover:bg-[#f2f2f2] dark:hover:bg-[#272727]'
										} `}
										onMouseDown={mouseDownAction}
										onMouseUp={mouseUpAction}>
										<span className='flex items-center justify-center w-6 h-6 pointer-events-none'>
											{selectCategory === category.name ? category.iconActive : category.icon}
										</span>
										<span
											className={`${
												selectCategory === category.name ? 'font-medium' : 'font-light'
											} flex items-center pointer-events-none`}>
											{category.name}
										</span>
									</Link>
								</li>
								{category.divider ? <hr className='h-px my-3  border-0 bg-[#e5e5e5] dark:bg-[#3f3f3f]' /> : ''}
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
		</nav>
	);
};

export default Sidebar;
