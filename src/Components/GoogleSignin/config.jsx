import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signOut } from 'firebase/auth';
const firebaseConfig = {
	apiKey: 'AIzaSyA6B4le_iLNUNhDdsV502qkuVeB1-P7feg',
	authDomain: 'clone-b270e.firebaseapp.com',
	projectId: 'clone-b270e',
	storageBucket: 'clone-b270e.appspot.com',
	messagingSenderId: '1020364572673',
	appId: '1:1020364572673:web:aa0401a9b037f1351a1800',
	measurementId: 'G-Q0BVNCZ145',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const signout = signOut(auth)
	.then(() => {
		console.log('Sign-out successful.');
	})
	.catch((error) => {
		console.log('An error happened', error);
	});

export { auth, provider, signout };
