import React from 'react';
import { useContext } from 'react';
import { auth, provider } from './GoogleSignin/config';
import { signInWithPopup } from 'firebase/auth';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Context } from '../context/ContextApi';

const SigninBtn = () => {
	const { setUser } = useContext(Context);
	const login = async () => {
		try {
			const res = await signInWithPopup(auth, provider);
			setUser(true);
			localStorage.setItem('user', res.user.displayName);
			localStorage.setItem('email', res.user.email);
			localStorage.setItem('pfp', res.user.photoURL);
			localStorage.setItem('token', res.user.accessToken);
			localStorage.setItem('refreshToken', res.user.refreshToken);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<button
			onClick={login}
			className='px-3 py-[.35rem] text-[#065fd4] dark:text-[#3ea6ff] border-[1px] border-[#e5e5e5] dark:border-[#3f3f3f] rounded-full hover:bg-[#def1ff] dark:hover:bg-[#263850] hover:border-[#def1ff] hover:dark:border-[#263850] focus-visible:outline-none focus-visible:border-[#def1ff] focus-visible:dark:border-[#263850] focus-visible:bg-[#def1ff] dark:focus-visible:bg-[#263850]'>
			<div className='flex gap-2  text-sm font-semibold'>
				<span className='flex items-center '>
					<AccountCircleOutlinedIcon />
				</span>
				<span className='flex items-center whitespace-nowrap'>Sign in</span>
			</div>
		</button>
	);
};

export default SigninBtn;
