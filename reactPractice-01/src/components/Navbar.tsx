import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";


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
            <Link to="/movies/popular" className="hover:text-[#BDBDD7]">Popular</Link>
            <Link to="/movies/top-rated" className="hover:text-[#BDBDD7]">Top Rated</Link>
            <Link to="/movies/upcoming" className="hover:text-[#BDBDD7]">Upcoming</Link>
          </div>
        </div>
        <div className="text-black"><CgProfile size={24} className="cursor-pointer text-[#DDDDDD] hover:text-[#BDBDD7]  "/></div>
      </div>
    </div>
  );
};

export default Navbar;
