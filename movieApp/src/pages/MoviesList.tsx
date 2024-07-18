import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
}

const typeMapping: { [key: string]: string } = {
  "top-rated": "top_rated",
  "now-playing": "now_playing",
  "upcoming": "upcoming",
  "popular": "popular"
};

const MoviesList = () => {

  const [movieList, setMovieList] = useState<Movie[]>([])
  const {type} = useParams<{type: string}>()


  
  useEffect(() => {
    fetchMovies()
  }, [type])

  const fetchMovies = async () => {
    try {
      const apiType = typeMapping[type || "popular"];
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${apiType}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      const data = res.data;
      setMovieList(data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  fetchMovies();

  return (
    <div className=" min-h-screen p-5 pt-0 text-[#DDDDDD] mx-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        {(type ? type : "POPULAR").toUpperCase()}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {movieList.map((movie) => (
          <Card
            id={movie.id}
            key={movie.id}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            releaseDate={movie.release_date}
            overview={movie.overview}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </div>
        )
};

export default MoviesList;
