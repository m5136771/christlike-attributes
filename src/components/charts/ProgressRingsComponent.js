import React from 'react';
import { Cell, PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSeedling, faPrayingHands, faAnchor, faEye, faShield, faBookOpen, faHandPaper, faHourglassHalf, faGem } from '@fortawesome/free-solid-svg-icons';

function getIcon(name) {
	switch (name) {
		case 'Charity':
			return faHeart;
		case 'Diligence':
			return faSeedling;
		case 'Faith':
			return faPrayingHands;
		case 'Hope':
			return faAnchor;
		case 'Humility':
			return faEye;
		case 'Integrity':
			return faShield;
		case 'Knowledge':
			return faBookOpen;
		case 'Obedience':
			return faHandPaper;
		case 'Patience':
			return faHourglassHalf;
		case 'Virtue':
			return faGem;
		default:
			return faHeart;
	}
}

const ProgressRingsComponent = ({ data }) => {
	const renderTooltipContent = (value) => {
		if (value && value.payload && value.payload.length) {
			const payloadData = value.payload[0];
			return <span>{`${payloadData.name}: Score ${payloadData.value}`}</span>;
		}
		return null;
	};

	return (
		<div className="flex flex-wrap justify-center items-center">
			{data.map((item, index) => {
				const scorePercentage = item.averageScore * 100;
				return (
					<div key={index} className="m-4 relative text-center">
						<ResponsiveContainer width={200} height={200}>
							<PieChart>
								<Pie
									data={[{ name: item.name, value: item.averageScore }]}
									dataKey="value"
									cx="50%"
									cy="50%"
									innerRadius={50}
									outerRadius={70}
									startAngle={90}
									endAngle={-270 * item.averageScore + 90}
									fill={item.color}
									blendStroke
								>
									<Cell key={`cell-${index}`} fill={item.color} />
								</Pie>
								<Tooltip content={renderTooltipContent} cursor={{ fill: 'transparent' }} />
							</PieChart>
						</ResponsiveContainer>
						<FontAwesomeIcon
							icon={getIcon(item.name)}
							className="text-3xl text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
						/>
						<div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
							<p className="text-lg font-bold">{item.name}</p>
							<p className="text-sm">{`${scorePercentage.toFixed(1)}%`}</p>
						</div>
						{/* <p className="text-center text-lg font-bold -mt-2">{item.name}</p> */}
					</div>
				);
			}
			)}
		</div>
	);
};

export default ProgressRingsComponent;
