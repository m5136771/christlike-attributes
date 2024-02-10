/* Home Page */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Auth from '../components/Auth';

function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				navigate('/dashboard');
			}
		});

		return () => unsubscribe();
	}, [navigate]);

	return (
		<div>
			<h1>Welcome to Becoming!</h1>
			<Auth />
		</div>
	);
}

export default Home;