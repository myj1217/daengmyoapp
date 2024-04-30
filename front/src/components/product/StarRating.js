import React from "react";

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const decimal = rating - filledStars;
  const emptyStars = 5 - filledStars - (decimal >= 0.5 ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(filledStars)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 16.7l-4.096 2.13.78-4.568-3.317-3.227 4.586-.667L10 5.333l1.047 5.335 4.586.667-3.317 3.227.78 4.568z"
            clipRule="evenodd"
          />
        </svg>
      ))}
      {decimal >= 0.5 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 16.7l-4.096 2.13.78-4.568-3.317-3.227 4.586-.667L10 5.333l1.047 5.335 4.586.667-3.317 3.227.78 4.568z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={filledStars + index}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 16.7l-4.096 2.13.78-4.568-3.317-3.227 4.586-.667L10 5.333l1.047 5.335 4.586.667-3.317 3.227.78 4.568z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
