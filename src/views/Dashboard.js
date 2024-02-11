import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updatePassword } from 'firebase/auth';
import axios from 'axios';

// TODO: Make Saving profile button update DB

const Dashboard = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		profilePicture: null
	});
	const [newPassword, setNewPassword] = useState('');

	useEffect(() => {
		const auth = getAuth();
		const u = auth.currentUser;

		if (u) {
			axios.get('http://localhost:5000/api/users', {
				params: { email: u.email }
			})
				.then(response => {
					setUser(response.data);
				})
				.catch(error => {
					console.error('Error finding user:', error);
				});
		} else {
			navigate('/');
		}
	}, [navigate]);

	const goToQuestionnaire = () => {
		navigate('/questionnaire');
	};

	const handleInputChange = async (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
		try {
			await axios.put('http://localhost:5000/api/users', user);
			console.log('User profile updated');
		} catch (error) {
			console.error('Error updating user profile:', error);
		}
	};

	const handleSubmit = async () => {
		try {
			await axios.put('http://localhost:5000/api/users', user);
			console.log('User profile updated');
		} catch (error) {
			console.error('Error updating user profile:', error);
		}
	};

	const handleChangePassword = async () => {
		const auth = getAuth();
		const firebaseUser = auth.currentUser;

		if (firebaseUser) {
			try {
				await updatePassword(firebaseUser, newPassword);
				console.log('Password successfully updated');
			} catch (error) {
				console.error('Error updating password:', error);
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold mb-4">Dashboard</h1>
			<p className="text-lg">Welcome to the Dashboard view!</p>

			<div className="flex flex-col my-4">
				<label htmlFor="profilePicture">Profile Picture</label>
				<input
					type="file"
					name="profilePicture"
					onChange={handleInputChange}
				/>
			</div>

			<div className='flex flex-col my-2'>
				<input
					type="text"
					name="email"
					value={user.email}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="firstName"
					value={user.firstName}
					onChange={handleInputChange}
					placeholder="First Name"
				/>
				<input
					type="text"
					name="lastName"
					value={user.lastName}
					onChange={handleInputChange}
					placeholder="Last Name"
				/>
				<input
					type="text"
					name="phoneNumber"
					value={user.phoneNumber}
					onChange={handleInputChange}
					placeholder="Phone Number"
				/>
				<div className="flex flex-col my-4">
					<input
						type="password"
						name="newPassword"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						placeholder="New Password"
					/>
					<button onClick={handleChangePassword}>Change Password</button>
				</div>
				<button onClick={handleSubmit}>Save Profile</button>
			</div>
		</div>
	);
};

export default Dashboard;
