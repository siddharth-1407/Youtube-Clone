import React, { useEffect, useContext, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import NoUserTempate from '../NoUserTemplate';
const Sidebar = lazy(() => import('../Sidebars/Sidebar'));
const LimitExceded = lazy(() => import('../LimitExceded'));

import { Context } from '../../context/ContextApi';

const Subscriptions = () => {
	const { rateLimited, setSelectCategory } = useContext(Context);
	const { pathname } = useLocation();

	useEffect(() => {
		setSelectCategory('Subscriptions');
	}, []);

	return (
		<div className='flex min-h-[calc(100vh-56px)] h-full justify-center p-6 sm:p-0'>
			{!rateLimited && (
				<Suspense fallback={<div></div>}>
					<Sidebar />
				</Suspense>
			)}
			{rateLimited ? (
				<Suspense fallback={<div></div>}>
					<LimitExceded />
				</Suspense>
			) : (
				<NoUserTempate page={pathname} />
			)}
		</div>
	);
};

export default Subscriptions;
