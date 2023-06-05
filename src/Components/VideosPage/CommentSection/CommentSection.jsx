import React, { useEffect, useState, Suspense, lazy, useCallback, useRef } from 'react';
import { fetchData } from '../../../Utils/api';
const Comment = lazy(() => import('./Comment'));
const CommentForm = lazy(() => import('./CommentForm'));

const CommentSection = ({ id }) => {
	const observer = useRef(null);
	const [comments, setComments] = useState([]);
	const [nextPageToken, setNextPageToken] = useState(null);

	useEffect(() => {
		getComments();
	}, []);
	const getComments = async () => {
		try {
			const res = await fetchData(
				`commentThreads?part=snippet&part=id&part=replies&order=relevance&textFormat=html&videoId=${id}&key=${
					import.meta.env.VITE_APP_YOUTUBE_API_KEY
				}`
			);
			setComments(res.items);
			setNextPageToken(res.nextPageToken);
		} catch (error) {
			if (error.response.status === 403) {
				console.log('ERROR-> Forbidden :  Api Limit most likely!');
			} else if (error.response.status === 400) {
				console.log('ERROR-> OperationNotSupported : Check parameters!');
			} else if (error.response.status === 404) {
				console.log('ERROR-> CommentNotFound, maybe check the id!');
			} else {
				console.log('Error-> ', error);
			}
		}
	};
	const getScrolledComments = async () => {
		try {
			if (nextPageToken) {
				const res = await fetchData(
					`commentThreads?part=snippet&part=id&part=replies&order=relevance&pageToken=${nextPageToken}&textFormat=html&videoId=${id}&key=${
						import.meta.env.VITE_APP_YOUTUBE_API_KEY
					}`
				);
				setComments((prev) => [...prev, ...res.items]);
				setNextPageToken(res.nextPageToken);
			}
		} catch (error) {
			if (error.response.status === 403) {
				console.log('ERROR-> Forbidden :  Api Limit most likely!');
			} else if (error.response.status === 400) {
				console.log('ERROR-> OperationNotSupported : Check parameters!');
			} else if (error.response.status === 404) {
				console.log('ERROR-> CommentNotFound, maybe check the id!');
			} else {
				console.log('Error-> ', error);
			}
		}
	};

	const lastComment = useCallback(
		(node) => {
			if (!node) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					getScrolledComments();
				}
			});
			observer.current.observe(node);
		},
		[comments]
	);

	return (
		<div className='commentsSection | pl-3 pr-5 lg:px-0 mt-4 flex flex-col gap-8 '>
			<div>
				<Suspense fallback={<div></div>}>
					<CommentForm />
				</Suspense>
			</div>

			<div className='comments | flex flex-col gap-4'>
				{comments.length > 0 &&
					comments.map((comment, index) => {
						return (
							<Suspense fallback={<div></div>} key={comment.id}>
								<div ref={index === comments?.length - 1 ? lastComment : null}>
									<Comment comment={comment} />
								</div>
							</Suspense>
						);
					})}
			</div>
		</div>
	);
};

export default CommentSection;
