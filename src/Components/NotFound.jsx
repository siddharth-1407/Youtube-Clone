import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context/ContextApi';
import { ReactComponent as Monkey } from '../assets/Images/Monkey.svg';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import { ReactComponent as Search } from '../assets/newIcons/Search.svg';

const NotFound = () => {
	const { location } = useContext(Context);

	return (
		<div className=' min-h-[calc(100vh-56px)] h-full text-[#838383] flex justify-center items-center '>
			<div className='flex flex-col gap-4'>
				<div className='image | flex flex-col items-center gap-4 '>
					<Monkey />
					<p className='font-semibold text-base max-w-[20rem] text-center'>
						This page isn't available. Sorry about that. Try searching for something else.
					</p>
				</div>
				<div className='form | min-w-fit flex gap-8'>
					<Link to='/' className='flex items-end gap-1'>
						<Logo className='fill-[#212121] dark:fill-white w-[111px] h-[47px]' />
						<span className='text-[#167ac6] text-xs font-semibold inline mb-2'>{location}</span>
					</Link>

					<div className='form-container | flex'>
						<form action='' className='flex items-center '>
							<div className='form-control'>
								<label htmlFor='' className='sr-only'>
									Search
								</label>
								<input
									type='text'
									autoComplete='off'
									spellCheck='false'
									autoCorrect='off'
									placeholder='Search'
									className='border-[#cccccc] dark:border-[#303030] border-[1px] bg-transparent text-black dark:text-[#e2e2e2]  font-medium focus-within:outline-none px-2 py-[0.1rem]'
								/>
							</div>
							<button className='border-[#cccccc] dark:border-[#303030] border-[1px] bg-[#f8f8f8] dark:bg-[#222222] px-4 py-[0.1rem] '>
								<Search className=' fill-[#0f0f0f] dark:fill-white' />
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
