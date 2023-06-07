import React, { useEffect, useContext, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/ContextApi';
import { fetchData } from '../../Utils/api';
const Sidebar = lazy(() => import('../Sidebars/Sidebar'));
const ChannelDetails = lazy(() => import('./ChannelDetails'));
import { useParams } from 'react-router-dom';

const ChannelDetailsWrapper = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { rateLimited, loading, setSelectCategory, setLoading, setRateLimited, setProgress, sidebarExpanded, setSidebarExpanded, setChannelData } =
		useContext(Context);

	useEffect(() => {
		setSelectCategory(null);
		setSidebarExpanded(true);
		if (window.innerWidth <= 1024) {
			setSidebarExpanded(false);
		}
	}, []);
	useEffect(() => {
		console.log(id)
		fetchChannelData();
	}, [id]);

	const fetchChannelData = async () => {
		setProgress(80);
		try {
			const res = await fetchData(
				`channels?part=brandingSettings&part=contentDetails&part=contentOwnerDetails&part=snippet&part=statistics&id=${id}&key=${
					import.meta.env.VITE_APP_YOUTUBE_API_KEY
				}`
			);
			console.log(res);
			// document Title
			document.title = `${res?.items[0]?.snippet?.title} - YouTube Clone`;
			setLoading(false);
			setRateLimited(false);
			setChannelData(res.items[0]);
			// Resetting meta tags
			ResetMetaTags();
		} catch (error) {
			console.log('Error', error);
			setLoading(false);
			setRateLimited(true);
		}

		setProgress(100);
	};
	const ResetMetaTags = () => {
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
		<div className='flex h-full min-h-screen'>
			{!rateLimited && (
				<Suspense fallback={<div></div>}>
					<Sidebar />
				</Suspense>
			)}

			{!loading && (
				<div
					className={`main-feed | h-full ml-0 flex flex-wrap justify-center gap-y-7 gap-x-2 p-0  mx-auto w-full overflow-hidden text-white ${
						rateLimited ? 'w-screen ml-[0px]' : `${sidebarExpanded ? 'lg:w-[calc(100vw-240px)]' : 'lg:w-[calc(100vw-72px)]'}`
						// ' max-w-[2500px]'
					} ${sidebarExpanded ? 'ml-0 sm:ml-[57px]  lg:ml-[240px] ' : ' ml-0 sm:ml-[50px] '} `}>
					{!rateLimited ? (
						<Suspense fallback={<div></div>}>
							<ChannelDetails />
						</Suspense>
					) : (
						navigate('/rateLimited')
					)}
				</div>
			)}
		</div>
	);
};

export default ChannelDetailsWrapper;
