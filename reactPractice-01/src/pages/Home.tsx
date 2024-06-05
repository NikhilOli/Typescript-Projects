import React, { useEffect, useState } from "react";
import axios from 'axios'

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US");
                const data = res.data;
                setPopularMovies(data.results); 
                console.log(data.results[0].original_title);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
            }
        };

        fetchMovies();
    }, []);
  return <div>Home</div>;
};

export default Home;
