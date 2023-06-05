import React, { useEffect, useContext, Suspense, lazy } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NoUserTemplate from '../NoUserTemplate';
const Sidebar = lazy(() => import('../Sidebars/Sidebar'));
import { Context } from '../../context/ContextApi';

const Subscriptions = () => {
	const navigate = useNavigate();
	const { rateLimited, setSelectCategory, setSidebarExpanded } = useContext(Context);
	const { pathname } = useLocation();

	useEffect(() => {
		setSelectCategory('Library');
		ResetMetaTags();
		if (window.innerWidth <= 1024) {
			setSidebarExpanded(false);
		}
	}, []);
	const ResetMetaTags = () => {
		document.title = 'YouTube Clone';
		if (document.querySelector('meta[name=description]')) {
			document.head.removeChild(document.querySelector('meta[name=description]'));
		}
		if (document.querySelector('meta[name="keywords"]')) {
			document.head.removeChild(document.querySelector('meta[name=keywords]'));
		}
		if (document.querySelectorAll('meta[name="tags"]')) {
			const metaTags = document.querySelectorAll('meta[name="tags"]');
			metaTags.forEach((tag) => {
				document.head.removeChild(tag);
			});
		}
	};

	return (
		<div className='flex min-h-[calc(100vh-56px)] h-full justify-center p-6 sm:p-0'>
			{!rateLimited && (
				<Suspense fallback={<div></div>}>
					<Sidebar />
				</Suspense>
			)}
			{!rateLimited ? <NoUserTemplate page={pathname} /> : navigate('/rateLimited')}
		</div>
	);
};
export default Subscriptions;
