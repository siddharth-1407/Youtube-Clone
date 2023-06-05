import React, { createContext, useState } from 'react';

export const Context = createContext();

export const AppContext = (props) => {
	const [searchResults, setSearchResults] = useState([]);
	const [selectCategory, setSelectCategory] = useState('New');
	const [progress, setProgress] = useState(0);
	const [sidebarExpanded, setSidebarExpanded] = useState(true);
	const [nextPageToken, setNextPageToken] = useState(null);
	const [rateLimited, setRateLimited] = useState(false);
	const [loading, setLoading] = useState(true);
	const [location, setLocation] = useState('');
	const [showHeader, setShowHeader] = useState(true);
	const [user, setUser] = useState(false);
	const [theme, setTheme] = useState('DeviceTheme');
	const [channelData, setChannelData] = useState([]);
	const [isOnline, setIsOnline] = useState(null);
	const [playerRef, setPlayerRef] = useState(null);

	const getLocation = async () => {
		try {
			const res = await fetch('https://ipinfo.io/?token=553941d3c0dccc', {
				method: 'GET',
				credentials: 'same-origin',

				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Headers': '*',
				},
			});
			const data = await res.json();
			setLocation(data.country);
			return data.country;
		} catch (error) {
			console.log('Location Error', error);
			setLocation('US');
		}
	};

	const handleSidebar = () => {
		if (sidebarExpanded === true) {
			setSidebarExpanded(false);
		} else {
			setSidebarExpanded(true);
		}
	};
	const mouseUp = (e) => {
		e.target.style.borderColor = 'transparent';
		if (document.documentElement.classList.contains('dark')) {
			e.target.classList.add('mouseUpDark');
		} else {
			e.target.classList.add('mouseUp');
		}
	};
	const mouseDown = (e) => {
		e.target.classList.remove('mouseUpDark');
		e.target.classList.remove('mouseUp');
		e.target.classList.remove('handleClick');
	};

	const mouseUpAction = (e) => {
		e.target.style.borderColor = 'transparent';
		if (document.documentElement.classList.contains('dark')) {
			e.target.classList.add('mouseUpAction-BtnDark');
		} else {
			e.target.classList.add('mouseUpAction-Btn');
		}
	};
	const mouseDownAction = (e) => {
		e.target.classList.remove('mouseUpAction-BtnDark');
		e.target.classList.remove('mouseUpAction-Btn');
		e.target.classList.remove('handleClick');
	};

	return (
		<Context.Provider
			value={{
				searchResults,
				selectCategory,
				setSelectCategory,
				progress,
				setProgress,
				sidebarExpanded,
				setSidebarExpanded,
				rateLimited,
				setRateLimited,
				loading,
				setLoading,
				nextPageToken,
				setNextPageToken,
				setSearchResults,
				location,
				setLocation,
				getLocation,
				mouseUp,
				mouseDown,
				mouseUpAction,
				mouseDownAction,
				showHeader,
				setShowHeader,
				handleSidebar,
				user,
				setUser,
				theme,
				setTheme,
				channelData,
				setChannelData,
				isOnline,
				setIsOnline,
				playerRef,
				setPlayerRef,
			}}>
			{props.children}
		</Context.Provider>
	);
};
