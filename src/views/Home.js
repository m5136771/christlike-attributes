import React from 'react';

/* import Auth from '../components/Auth';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; */

import BaseButton from '../components/buttons/BaseButton';

function Home() {

	// Firebase Authentication
	/* const handleRegister = (email, password) => {
		createUserWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			console.log(user);
			// ...
		  })
		  .catch((error) => {
			const errorMessage = error.message;
			console.log(errorMessage);
			// ..
		  });
	  }
	
	  const handleLogin = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			console.log(user);
			// ...
		  })
		  .catch((error) => {
			const errorMessage = error.message;
			console.log(errorMessage);
		  });
	  } */

	const handleButtonClick = () => {
		console.log('Button clicked');
	};

	return (
		<div>
			<h1>Welcome to Becoming!</h1>
			<BaseButton 
                text="Take the Test" 
                onClick={handleButtonClick} 
            />
			{/* <Auth onRegister={handleRegister} onLogin={handleLogin} /> */}
		</div>
	);
}

export default Home;