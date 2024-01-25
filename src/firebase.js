import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase authentication service
export const auth = getAuth(app);