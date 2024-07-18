import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Card from '../components/Card';

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
        setPopularMovies(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-[#030637] mx-8 min-h-screen p-5 text-[#DDDDDD]">
      <Carousel
  showArrows={true}
  showThumbs={false}
  showStatus={false}
  infiniteLoop={true}
  autoPlay={true}
  interval={3000}
  className="mb-10"
>
  {popularMovies.slice(0, 5).map((movie) => (
    <div key={movie.id} className="relative group">
      <img
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={movie.title}
        className="object-cover h-[80vh] w-full"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-[#0306378e] bg-opacity-80 p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <h2 className="text-2xl font-bold text-[#DDDDDD]">{movie.title}</h2>
        <p className="text-gray-300 text-sm mb-2">Release Date: {movie.release_date}</p>
        <p className="text-gray-300 text-sm">{movie.overview}</p>
      </div>
    </div>
  ))}
</Carousel>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {popularMovies.map((movie) => (
          <Card
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
  );
};

export default Home;
