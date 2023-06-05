import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RateLimited } from '../assets/Images/rateLimited.svg';
import { fetchData } from '../Utils/api';
const LimitExceded = () => {
	const navigate = useNavigate();
	const CheckStatus = async () => {
		try {
			const res = await fetchData(`videos?part=snippet&chart=mostPopular&maxResults=1&key=AIzaSyCicvBaD2AkkL17-bGCTYO9RKzDmqJg7oc`);
			console.log('Connection - Success!');
			await navigate('/');
		} catch (error) {
			console.log(
				'Request failed with status code 403: Rate Limited! Please try again tomorrow .',
				error.response ? error.response.status : 'network error'
			);
		}
	};
	useEffect(() => {
		document.body.classList.remove('bg-fade');
		console.log('retrying connection please wait...');
		setTimeout(() => {
			CheckStatus();
		}, 10000);
	}, []);

	return (
		<div className=' min-h-[calc(100vh-56px)] text-[black] dark:text-[#838383] flex justify-center items-center max-w-[45rem] lg:max-w-[50rem] mx-auto'>
			<div className='flex flex-col w-full '>
				<div className='image | flex flex-col items-center mb-6 lg:mb-0'>
					<RateLimited className='  w-[40%] h-auto md:w-1/3 sm:h-auto lg:w-auto   sm:w-auto lg:scale-75 ' />
				</div>
				<h1 className='text-2xl  font-semibold text-center'>You are being rate limited!</h1>
				<div className='mt-5 flex flex-col gap-2 '>
					<h2 className='text-xl font-medium'>Why am I seeing this?</h2>
					<p className='text-base md:text-lg font-normal'>
						Youtube Api is being used in this Youtube clone project. The Youtube Api has a daily quota of 10,000, and the cost for hitting
						different endpoints to get the data ranges from 1 to 1600. For example getting video data cost 1 unit where as a search cost
						100 units and a video upload costs 1600 units. If you're seeing this then it means that our daily quota of 10,000 units has
						all been used up. Please try again tomorrow!
					</p>
				</div>
			</div>
		</div>
	);
};

export default LimitExceded;
