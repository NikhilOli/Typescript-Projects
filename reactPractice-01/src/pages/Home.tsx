import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


interface Movie {
    id: number;
    title: string,
    backdrop_path: string;
    release_date: string;
    overview: string;
}

const Home = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US");
                const data = res.data;
                setPopularMovies(data.results);
                console.log(data.results);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="min-h-screen p-5 ">
            <h1 className="text-4xl font-bold text-center mb-10">Popular Movies</h1>
            <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                className="mb-10"
            >
                {popularMovies.slice(0, 5).map(movie => (
                    <div key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt={movie.title} />
                        <div className="legend">
                            <h2 className="text-xl font-bold">{movie.title}</h2>
                            <p className="text-gray-400 text-sm mb-2">Release Date: {movie.release_date}</p>
                            <p className="text-gray-300 text-sm">{movie.overview}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {popularMovies.map(movie => (
                    <div key={movie.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt={movie.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{movie.title}</h2>
                            <p className="text-gray-400 text-sm mb-2">Release Date: {movie.release_date}</p>
                            <p className="text-gray-300 text-sm">{movie.overview}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
