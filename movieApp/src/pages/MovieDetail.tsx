import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { FaStar, FaLanguage, FaClock, FaFire, FaLink, FaImdb, FaMoneyBillWave, FaTicketAlt } from "react-icons/fa";
import { format } from "date-fns";

interface MovieDetailProps {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  runtime: number;
  original_language: string;
  popularity: number;
  homepage: string;
  imdb_id: string;
  production_companies: { id: number; name: string; logo_path: string | null }[];
  budget: number;
  revenue: number;
  tagline: string;
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        );
        const data = res.data;
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#030637]">
        <SkeletonTheme baseColor="#242424" highlightColor="#525252">
          <Skeleton height={600} width={400} />
        </SkeletonTheme>
      </div>
    );
  }

  if (!movie) {
    return <div className="min-h-screen flex justify-center items-center bg-[#030637] text-[#DDDDDD]">Movie not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-5 text-[#DDDDDD] bg-gradient-to-b from-[#030637] to-[#1a1a2e]"
    >
      <div className="max-w-7xl mx-auto p-8 bg-[#1a1a2e] rounded-lg shadow-2xl backdrop-blur-md bg-opacity-80">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          {movie.title}
        </motion.h1>
        {movie.tagline && (
          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl italic text-center mb-8 text-gray-400"
          >
            "{movie.tagline}"
          </motion.p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-2"
          >
            <div className="bg-[#252547] p-6 rounded-lg shadow-md">
              <p className="text-gray-300 text-lg mb-6">{movie.overview}</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center">
                  <FaStar className="text-yellow-500 mr-3 text-xl" />
                  <div>
                    <p className="font-bold">Rating</p>
                    <p>{movie.vote_average.toFixed(1)}/10</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-blue-400 mr-3 text-xl" />
                  <div>
                    <p className="font-bold">Runtime</p>
                    <p>{movie.runtime} minutes</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaLanguage className="text-green-400 mr-3 text-xl" />
                  <div>
                    <p className="font-bold">Language</p>
                    <p>{movie.original_language.toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaFire className="text-red-400 mr-3 text-xl" />
                  <div>
                    <p className="font-bold">Popularity</p>
                    <p>{movie.popularity.toFixed(0)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-green-500 mr-3 text-xl" />
                  <div>
                    <p className="font-bold">Budget</p>
                    <p>${movie.budget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaTicketAlt className="text-yellow-400 mr-3 text-xl" />
                  <div>
                    <p className="font-bold">Revenue</p>
                    <p>${movie.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="bg-blue-600 text-blue-100 px-3 py-1 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex space-x-4">
                <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                  <FaLink className="mr-2" />
                  Official Website
                </a>
                <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer" className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                  <FaImdb className="mr-2" />
                  IMDB
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Production Companies</h2>
          <div className="flex flex-wrap justify-start gap-8">
          {movie.production_companies.map((company) => (
                company.logo_path && (
                  <div key={company.id} className="flex flex-col my-2 items-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      className="h-16 object-contain mb-2"
                    />
                    <p className="text-center text-sm">{company.name}</p>
                  </div>
                )
              ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Featured Image</h2>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MovieDetail;