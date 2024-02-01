import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const RadarChartComponent = () => {
  // Dummy data
  const data = [
    { attribute: 'Faith', score: 4 },
    { attribute: 'Diligence', score: 3 },
    { attribute: 'Virtue', score: 2 },
    { attribute: 'Charity', score: 5 },
    { attribute: 'Obedience', score: 3 },
    { attribute: 'Hope', score: 4 },
    { attribute: 'Knowledge', score: 1 },
    { attribute: 'Patience', score: 2 },
    { attribute: 'Humility', score: 4 },
    { attribute: 'Integrity', score: 0 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="attribute" />
        <PolarRadiusAxis angle={30} domain={[0, 5]} />
        <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartComponent;
