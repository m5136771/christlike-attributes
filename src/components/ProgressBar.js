import React from "react";
import questions from "../temp/question-bank";

const ProgressBar = ({ current, sectionColors }) => {
	const totalQuestions = questions.length;
	let currentCount = 0;

	// Calculate section progress
	const sectionProgress = questions.reduce((acc, question, index) => {
		acc[question.section] = acc[question.section] || {
			start: currentCount,
			count: 0,
			currentIndex: index,
		};
		acc[question.section].count++;
		currentCount++;
		return acc;
	}, {});

	// Render progress bar segments
	const renderProgressBarSegments = () => {
		return Object.keys(sectionProgress).map((section, index) => {
			const { count, currentIndex } = sectionProgress[section];
			const widthPercentage = (count / totalQuestions) * 100;
			const isCurrentSection =
				current >= currentIndex && current < currentIndex + count;

			return (
				<div
					key={index}
					style={{ width: `${widthPercentage}%` }}
					className={`h-2.5 ${isCurrentSection ? `bg-${sectionColors[section]}-600` : "bg-gray-300"
						} rounded-full transition-all duration-300 ease-in-out hover:bg-${sectionColors[section]}-700`}
					title={section}
				/>
			);
		});
	};

	return (
		<div className="w-full bg-gray-200 rounded-full overflow-hidden h-2.5 dark:bg-gray-700 flex">
			{renderProgressBarSegments()}
		</div>
	);
};

export default ProgressBar;
