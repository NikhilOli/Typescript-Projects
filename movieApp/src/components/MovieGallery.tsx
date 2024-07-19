import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import GalleryCard from "./GalleryCard";

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
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

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
          <GalleryCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </motion.div>
  );
};


export default MovieGallery;