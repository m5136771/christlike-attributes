import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = () => {
	const navigate = useNavigate();

	const goToQuestionnaire = () => {
		navigate('/questionnaire');
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold mb-4">Dashboard</h1>
			<p className="text-lg">Welcome to the Dashboard view!</p>
			<button
				className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={goToQuestionnaire}
			>
				Take Quiz
			</button>
		</div>
	);
};

export default Dashboard;
