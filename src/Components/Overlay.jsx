import React from 'react';
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../context/ContextApi';

const Overlay = () => {
	const { sidebarExpanded } = useContext(Context);
	const { pathname } = useLocation();

	return (
		<div
			id='overlay'
			className={`overlay fixed top-0 left-0 bg-[rgba(0,0,0,0.4)] transition-color z-[40] ${
				sidebarExpanded && pathname.startsWith('/video/') ? ' w-full h-screen  ' : 'w-0 h-0'
			}
            ${sidebarExpanded && !pathname.startsWith('/video/') ? 'lg:hidden w-full h-screen' : 'w-0 h-0'} `}></div>
	);
};

export default Overlay;
