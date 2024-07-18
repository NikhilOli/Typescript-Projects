import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';

interface CardProps {
  id: number;
  imageUrl: string;
  title: string;
  releaseDate: string;
  overview: string;
  rating: number;
}

const Card: React.FC<CardProps> = ({ id, imageUrl, title, releaseDate, overview, rating }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link to={`/movie/${id}`}>
    <div className="relative bg-gray-800 rounded-lg shadow-lg shadow-blue-900/50 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 w-full sm:w-[95%]">
      {isLoading ? (
        <SkeletonTheme baseColor="#121236" highlightColor="#3a3b92">
          <Skeleton height={400} />
        </SkeletonTheme>
      ) : (
        <img src={imageUrl} alt={title} className="w-full h-96 object-cover" />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out p-4 text-[#DDDDDD]">
        <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
        <p className="text-gray-400 text-sm mb-2">Release Date: {releaseDate}</p>
        <p className="text-gray-300 text-sm mb-2 text-center">{overview}</p>
        <p className="text-yellow-500 text-sm">Rating: {Math.round(rating)}/10</p>
      </div>
    </div>
    </Link>
  );
};

export default Card;
