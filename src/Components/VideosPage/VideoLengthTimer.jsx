import React from 'react';

const VideoLengthTimer = ({ time }) => {
	return (
		<div
			className={`absolute bottom-1 right-1 bg-black text-white text-xs rounded-[0.3rem] opacity-90 font-medium ${
				time.hours === undefined && time.minutes === undefined ? '' : 'px-1 py-0.5'
			} ${time.hours === undefined && time.minutes === undefined ? 'py-0 font-medium' : ''}`}>
			{time.hours === undefined || time.hours < 1 ? '' : <span>{`${time.hours}:`}</span>}
			{!(time.minutes === undefined) && <span>{time.minutes < 10 ? `0${time.minutes}:` : `${time.minutes}:`}</span>}
			<span>{time.seconds < 10 ? `0${time.seconds}` : time.seconds}</span>
		</div>
	);
};

export default VideoLengthTimer;
