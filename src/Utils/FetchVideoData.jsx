const fetchSelectedCategoryData = () => {
	document.documentElement.scrollTop = 0;
	let query;
	switch (selectCategory) {
		case 'New':
			query = '';
			break;
		case 'Music':
			query = '&videoCategoryId=10';
			break;
		case 'Movies':
			query = '&videoCategoryId=44';
			break;
		case 'Gaming':
			query = '&videoCategoryId=20';
			break;
		case 'News':
			query = '&videoCategoryId=25';
			break;
		case 'Learning':
			query = '&videoCategoryId=28';
			break;
		case 'Sports':
			query = '&videoCategoryId=17';
			break;
		case 'Fashion & Beauty':
			query = '&videoCategoryId=22';
			break;

		default:
			query = '';
			break;
	}
	setProgress(80);
	fetchData(
		`videos?part=contentDetails&part=snippet&part=statistics&chart=mostPopular&maxResults=16${query}&regionCode=${location}&key=AIzaSyCicvBaD2AkkL17-bGCTYO9RKzDmqJg7oc`
	)
		.then((res) => {
			setLoading(false);
			setRateLimited(false);
			console.log(res);
			console.log(res.nextPageToken);
			setSearchResults(res.items);
			setNextPageToken(res.nextPageToken);
			// console.log(nextPageToken);
			console.log(searchResults);
		})
		.catch((error) => {
			console.log('Error', error);
			setLoading(false);
			setRateLimited(true);
		});

	setProgress(100);
};

const handleScrolledCategoryData = (selectCategory) => {
	console.log('Real', nextPageToken);
	let query;
	switch (selectCategory) {
		case 'Music':
			query = '&videoCategoryId=10';
			break;
		case 'Movies':
			query = '&videoCategoryId=44';
			break;
		case 'Gaming':
			query = '&videoCategoryId=20';
			break;
		case 'News':
			query = '&videoCategoryId=25';
			break;
		case 'Learning':
			query = '&videoCategoryId=28';
			break;
		case 'Sports':
			query = '&videoCategoryId=17';
			break;
		case 'Fashion & Beauty':
			query = '&videoCategoryId=22';
			break;

		default:
			query = '';
			break;
	}
	setProgress(80);
	fetchData(
		`videos?part=snippet&chart=mostPopular&maxResults=16${query}&pageToken=${nextPageToken}&
        regionCode=${location}&key=AIzaSyCicvBaD2AkkL17-bGCTYO9RKzDmqJg7oc`
	)
		.then((res) => {
			setRateLimited(false);
			console.log(res);
			setNextPageToken(res.nextPageToken);
			setSearchResults((prev) => [...prev, ...res.items]);
			console.log('next page token', nextPageToken);
			console.log(searchResults);
		})
		.catch((error) => {
			console.log('Error', error);
			setLoading(false);
			setRateLimited(true);
		});

	setProgress(100);
};

const handleInfiniteScroll = async () => {
	// document.documentElement.scrollTop
	if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
		try {
			setProgress(80);
			console.log(document.documentElement.scrollTop);
			handleScrolledCategoryData(selectCategory);
			setProgress(100);
		} catch (error) {
			console.log(error);
		}
	}
};
