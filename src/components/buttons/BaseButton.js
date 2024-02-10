import React from 'react';

const BaseButton = ({ text, onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className="bg-serene-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            {text}
        </button>
    );
};

export default BaseButton;
