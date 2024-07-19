import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { FaStar, FaLanguage, FaClock, FaFire } from "react-icons/fa";
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
      className="min-h-screen p-5 text-[#DDDDDD]"
    >
      <div className="max-w-6xl mx-auto p-5 bg-[#1a1a2e] rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 flex flex-col justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <p className="text-gray-400 text-lg mb-2">Release Date: {format(new Date(movie.release_date), 'MMM d, yyyy')}</p>
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-500 mr-2" />
                <p className="text-yellow-500 text-lg">Rating: {movie.vote_average}/10</p>
              </div>
              <p className="text-gray-300 mb-4">{movie.overview}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="bg-blue-600 text-blue-100 px-3 py-1 rounded-full">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaClock className="mr-2 text-blue-400" />
                <p><span className="font-bold">Runtime:</span> {movie.runtime} minutes</p>
              </div>
              <div className="flex items-center">
                <FaLanguage className="mr-2 text-green-400" />
                <p><span className="font-bold">Language:</span> {movie.original_language.toUpperCase()}</p>
              </div>
              <div className="flex items-center">
                <FaFire className="mr-2 text-red-400" />
                <p><span className="font-bold">Popularity:</span> {movie.popularity.toFixed(0)}</p>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Image</h2>
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MovieDetail;