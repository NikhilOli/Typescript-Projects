import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-10 mt-4 ">
        <div className="flex items-center gap-x-20">
          <div>
            <Link to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                alt=""
                height="50px"
                width="70px"
              />
            </Link>
          </div>
          <div className="flex gap-4">
            <Link to="/movies/popular">Popular</Link>
            <Link to="/movies/top-rated">Top Rated</Link>
            <Link to="/movies/upcoming">Upcoming</Link>
          </div>
        </div>
        <div className="text-black">LogoProfile</div>
      </div>
    </div>
  );
};

export default Navbar;
