import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const QuestionCard = ({ data, recordResponse, handlePrev, handleNext, current, total }) => {
  const handleOptionChange = (e) => {
    recordResponse(data._id, e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className='w-3/4 md:w-1/2 lg:w-1/3 bg-light-gray border p-6 rounded-lg shadow-lg'>
        <h2 id="question-text" className="text-lg font-semibold mb-3 text-dark-charcoal font-lato">{data.text}</h2>
        <div id="options" className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4, 5].map((option) => (
            <label key={option} className="inline-flex items-center">
              <input
                type="radio"
                name={`question-${data._id}`}
                value={option}
                className="form-radio h-5 w-5 text-gentle-gold"
                onChange={handleOptionChange}
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        {data.reference && (
          <p id="reference" className="text-soft-lavender text-sm mt-2 italic font-merriweather">
            {data.reference}
          </p>
        )}
        <div className='flex justify-between items-center mt-4'>
          <button onClick={handlePrev} disabled={current === 0}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span className="text-dark-charcoal font-lato">{current + 1} of {total}</span>
          <button onClick={handleNext} disabled={current === total - 1}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;