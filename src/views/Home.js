import React from 'react';
/* import Auth from '../components/Auth';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; */

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

	return (
		<div>
			<h1>Welcome to the Home page!</h1>
			{/* <Auth onRegister={handleRegister} onLogin={handleLogin} /> */}
		</div>
	);
}

export default Home;