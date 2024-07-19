import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar, FaLanguage } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const typeMapping: { [key: string]: string } = {
  "top-rated": "top_rated",
  "now-playing": "now_playing",
  "upcoming": "upcoming",
  "popular": "popular"
};

const MovieGallery: React.FC = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { type } = useParams<{ type: string }>();

  useEffect(() => {
    fetchMovies();
  }, [type]);

  const fetchMovies = async () => {
    try {
      const apiType = typeMapping[type || "popular"];
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${apiType}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      const data = res.data;
      setMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#030637] to-[#1a1a2e] text-white">
        <div className="text-3xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#030637] to-[#1a1a2e] p-8"
    >
      <h1 className="text-4xl font-bold text-center mb-10 text-[#DDDDDD]">
        {(type ? type : "POPULAR").toUpperCase()}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

const MovieCard: React.FC<{ movie: MovieProps; index: number }> = ({
  movie,
  index,
}) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-[#1a1a2e] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#1a1a2e] to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h2 className="text-xl font-bold text-white">{movie.title}</h2>
            <p className="text-sm text-gray-300">{movie.release_date}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {movie.overview}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="text-white">{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <FaLanguage className="text-blue-400 mr-1" />
              <span className="text-white">
                {movie.original_language.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MovieGallery;