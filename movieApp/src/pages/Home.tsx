import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import MoviesList from './MoviesList';
import { format } from 'date-fns';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
}

const Home: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US'
        );
        const data = res.data;
        setTimeout(() => {          
          setPopularMovies(data.results);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#030637]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#DDDDDD]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#030637] min-h-screen p-5 text-[#DDDDDD]">
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        className="mb-10"
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button type="button" onClick={onClickHandler} title={label} className="absolute top-1/2 left-0 z-10">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button type="button" onClick={onClickHandler} title={label} className="absolute top-1/2 right-0 z-10">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )
        }
      >
        {popularMovies.slice(0, 5).map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div className="relative group touch-action-manipulation">
              <img
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                className="object-cover h-[50vh] md:h-[80vh] w-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#0306378e] bg-opacity-80 p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <h2 className="text-2xl font-bold text-[#DDDDDD]">{movie.title}</h2>
                <p className="text-gray-300 text-sm mb-2">Release Date: {format(new Date(movie.release_date), 'MMM d, yyyy')}</p>
                <p className="text-gray-300 text-sm">{movie.overview}</p>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
      <MoviesList />
    </div>
  );
};

export default Home;
