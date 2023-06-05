import React from 'react';
import SearchTypeChannel from './SearchTypeChannel';
import SearchTypeVideo from './SearchTypeVideo';

const SearchResultsCard = ({ video }) => {
	return video.id.kind === 'youtube#channel' ? <SearchTypeChannel video={video} /> : <SearchTypeVideo video={video} />;
};

export default SearchResultsCard;
