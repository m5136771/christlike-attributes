/* Display the question and answer options (e.g., radio buttons for ratings 1-5).
On selection, update the parent component’s state (Questionnaire.js). */

import React from 'react';

const Question = ({ data, recordResponse }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{data.text}</h2>
      <div>
        {data.options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name={`question-${data.id}`}
              value={option}
              onChange={() => recordResponse(data.id, option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;