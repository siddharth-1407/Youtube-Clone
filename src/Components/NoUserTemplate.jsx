import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ContentNoUser } from '../Utils/ContentNoUser';
import SigninBtn from './SigninBtn';
import { Context } from '../context/ContextApi';

const NoUserTempate = ({ page }) => {
	const { user } = useContext(Context);
	const navigate = useNavigate();
	const [pageContent, setPageContent] = useState([]);
	let pageinfo = '';

	const getPageInfo = () => {
		console.log(page)
		switch (page) {
			case '/Youtube-Clone/history':
				pageinfo = '/history';
				break;
			case '/Youtube-Clone/subscriptions':
				pageinfo = '/subscriptions';
				break;
			case '/Youtube-Clone/library':
				pageinfo = '/library';
				break;
			case '/Youtube-Clone/watchlater':
				pageinfo = '/watchLater';
				break;
			case '/Youtube-Clone/likedvideos':
				pageinfo = '/likedVideos';
				break;

			default:
				navigate('/');
				break;
		}
	};
	useEffect(() => {
		getPageInfo();
		const content = ContentNoUser.filter((item) => item.ForPage === pageinfo);
		setPageContent(content[0]);
	}, [user]);

	return (
		<div className='history w-full text-black dark:text-[#f1f1f1] flex justify-center pt-[10%]'>
			<div className='flex flex-col items-center gap-5'>
				<div className='w-24 aspect-square'>{pageContent.icon}</div>
				<h1 className='text-2xl text-center'>{pageContent.heading}</h1>
				{!user && (
					<p className='text-center'>
						{pageContent.para}{' '}
						{pageContent.link && (
							<Link to={pageContent?.link} className='text-[#065fd4] dark:text-[#3ea6ff]'>
								Learn more
							</Link>
						)}
					</p>
				)}
				{!user && <SigninBtn />}
				{user && (
					<p className='text-[#FF0000] font-medium animate-[blink_1.5s_linear_infinite] text-center'>This feature is not available yet!</p>
				)}
			</div>
		</div>
	);
};

export default NoUserTempate;
