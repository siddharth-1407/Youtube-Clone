import React, { useState, useContext, useEffect, useRef, lazy, Suspense } from 'react';
const Options = lazy(() => import('./Options'));
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SigninBtn from '../SigninBtn';
import { Context } from '../../context/ContextApi';

const HeaderRightNoUser = () => {
	const { mouseUpAction, mouseDownAction } = useContext(Context);
	const [open, setOpen] = useState(false);
	const optionsRef = useRef();
	useEffect(() => {
		let handler = (e) => {
			if (!optionsRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, []);

	return (
		<div className='flex gap-2 items-center '>
			<div ref={optionsRef}>
				<button
					className='js_EventBtn | w-[39.7px] py-[.35rem] rounded-full border-transparent  active:bg-[#e6e6e6] dark:hover:bg-[#272727]  dark:active:bg-[#3d3d3d]  border-[1px]'
					onClick={() => setOpen(true)}
					onMouseUp={mouseUpAction}
					onMouseDown={mouseDownAction}>
					<MoreVertIcon className='dark:text-white text-black pointer-events-none' />
				</button>
				<Suspense fallback={<div className=' absolute z-50 loader dark:border-b-[transparent] border-[#2f2f2f] dark:border-[#c7c7c7]'></div>}>
					<Options setOpen={setOpen} OptionsOpen={open} />
				</Suspense>
			</div>
			<SigninBtn />
		</div>
	);
};

export default HeaderRightNoUser;
