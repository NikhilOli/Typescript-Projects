import { FaStar, FaLanguage } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { format } from "date-fns";

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

const GalleryCard: React.FC<{ movie: MovieProps; index: number }> = ({
    movie,
    index,
}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if(isLoading) {
        return (
            <SkeletonTheme baseColor="#1a1a2e" highlightColor="#3a3b92">
                <div className="bg-[#121236] rounded-lg overflow-hidden shadow-lg p-4">
                    <Skeleton height={200} className="mb-4" />
                    <Skeleton width={150} height={24} className="mb-2" />
                    <Skeleton width={100} height={16} className="mb-4" />
                    <Skeleton count={3} className="mb-2" />
                    <div className="flex justify-between items-center">
                        <Skeleton width={50} height={20} />
                        <Skeleton width={50} height={20} />
                    </div>
                </div>
            </SkeletonTheme>
        )
    }

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
            <p className="text-sm text-gray-300">{format(new Date(movie.release_date), 'MMM d, yyyy')}</p>
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

export default GalleryCard;