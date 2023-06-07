import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../Utils/api';
import { useCallback } from 'react';
import { useRef } from 'react';
const RelatedVideosCard = lazy(() => import('./RelatedVideosCard'));

const RelatedVideos = () => {
	const navigate = useNavigate();
	const observer = useRef(null);
	const [loading, setLoading] = useState(true);
	const [showLoader, setShowLoader] = useState(false);
	const [relatedVideos, setRelatedVideos] = useState([]);
	const [nextPageToken, setNextPageToken] = useState(null);
	const [prevPageToken, setPrevPageToken] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		if (navigator.onLine) {
			fetchRelatedVideoData();
		}
	}, [id]);

	const fetchRelatedVideoData = async () => {
		//Important:  relatedToVideoId  Api parameter deprecating  from August 7,2023. Try  to find related videos on a topic.!
		try {
			const res = await fetchData(
				`search?part=snippet&maxResults=12&relatedToVideoId=${id}&type=video&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`
			);
			setRelatedVideos(res.items);
			setNextPageToken(res.nextPageToken);
			setLoading(false);
		} catch (error) {
			console.log('Error', error);
			navigate('/rateLimited');
		}
	};

	const handleScrollRelatedVideos = async () => {
		//Important:  relatedToVideoId  Api parameter deprecating  from August 7,2023. Try  to find related videos on a topic.!
		if (nextPageToken !== prevPageToken) {
			try {
				setShowLoader(true);
				const res = await fetchData(
					`search?part=snippet&maxResults=12&relatedToVideoId=${id}&pageToken=${nextPageToken}&type=video&key=${
						import.meta.env.VITE_APP_YOUTUBE_API_KEY
					}`
				);
				setRelatedVideos((prev) => [...prev, ...res.items]);
				setNextPageToken(res.nextPageToken);
				setPrevPageToken(res.prevPageToken);
				setLoading(false);
				setShowLoader(false);
			} catch (error) {
				console.log('Error', error);
				navigate('/rateLimited');
			}
		}
	};
	const lastVideo = useCallback(
		(node) => {
			if (!node) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					handleScrollRelatedVideos();
				}
			});
			observer.current.observe(node);
		},
		[relatedVideos]
	);

	return (
		<section className='relatedVideos | h-fit my-4 lg:mb-4 lg:m-0 px-3 sm:px-0 flex flex-col gap-2 min-w-full min-[1060px]:min-w-[19.75rem] min-[1060px]:max-w-[25.125rem]  '>
			{!loading && relatedVideos.length > 0
				? relatedVideos.map((item, index) => {
						return (
							<div className='relatedVideo' key={index}>
								<Suspense fallback={<div></div>}>
									<div ref={index === relatedVideos?.length - 1 ? lastVideo : null}>
										<RelatedVideosCard video={item} />
									</div>
								</Suspense>
							</div>
						);
				  })
				: ''}
			{showLoader && (
				<div className='loaderWrapper | flex justify-center mt-4'>
					<div className='loader'></div>
				</div>
			)}
		</section>
	);
};

export default RelatedVideos;
