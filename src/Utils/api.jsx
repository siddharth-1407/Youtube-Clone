import axios from 'axios';

// const key = import.meta.env.REACT_APP_YOUTUBE_API_KEY;
const key = '0dac31d92bmshe82f4784a167048p136817jsn4e73c5c3c080 ';
const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

export const fetchData = async (url) => {
	const { data } = await axios.get(`${BASE_URL}/${url}`);
	return data;
};
