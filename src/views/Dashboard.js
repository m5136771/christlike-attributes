import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updatePassword } from 'firebase/auth';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

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
		<div className="container mx-auto p-4">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-4xl font-bold mb-4">Dashboard</h1>

				<div className="flex flex-col my-4">
					<label htmlFor="profilePicture" className="text-gray-700">Profile Picture</label>
					<input
						type="file"
						name="profilePicture"
						onChange={handleInputChange}
						className="p-2 border border-gray-300 rounded-md"
					/>
				</div>

				<div className='flex flex-col my-2 space-y-3'>
					<input
						type="text"
						name="email"
						value={user.email}
						onChange={handleInputChange}
						className="p-2 border border-gray-300 rounded-md"
						placeholder="Email"
					/>
					<input
						type="text"
						name="firstName"
						value={user.firstName}
						onChange={handleInputChange}
						className="p-2 border border-gray-300 rounded-md"
						placeholder="First Name"
					/>
					<input
						type="text"
						name="lastName"
						value={user.lastName}
						onChange={handleInputChange}
						className="p-2 border border-gray-300 rounded-md"
						placeholder="Last Name"
					/>
					<input
						type="text"
						name="phoneNumber"
						value={user.phoneNumber}
						onChange={handleInputChange}
						className="p-2 border border-gray-300 rounded-md"
						placeholder="Phone Number"
					/>
					<div className="flex flex-col my-4 space-y-3">
						<input
							type="password"
							name="newPassword"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="p-2 border border-gray-300 rounded-md"
							placeholder="New Password"
						/>
						<button onClick={handleChangePassword} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Change Password</button>
					</div>
					<button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save Profile</button>
				</div>
			</div>
			<div className="flex justify-center mt-8">
				<button
					onClick={goToQuestionnaire}
					className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
				>
					<span className="flex items-center justify-center space-x-2">
						<FontAwesomeIcon icon={faClipboardList} className="w-6 h-6" />
						<span>Go to Questionnaire</span>
					</span>
				</button>
			</div>
		</div>
	);
};

export default Dashboard;
