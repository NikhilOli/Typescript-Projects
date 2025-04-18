import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import logo from "../assets/Movie-haven.jpg"

interface NavLinkProps {
  to: string;
  children: ReactNode;
  mobile?: boolean;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="px-4 sm:px-6 lg:px-8 py-4 b">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                //src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                src={logo}
                alt="MovieHaven Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/movies/popular">Popular</NavLink>
              <NavLink to="/movies/top-rated">Top Rated</NavLink>
              <NavLink to="/movies/upcoming">Upcoming</NavLink>
            </div>
          </div>
          <div className="hidden md:block">
            <CgProfile size={24} className="cursor-pointer text-[#DDDDDD] hover:text-[#BDBDD7]" />
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#DDDDDD] hover:text-[#BDBDD7] focus:outline-none"
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <motion.div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
      >
        <div onClick={() => setIsOpen(!isOpen)} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" mobile>Home</NavLink>
          <NavLink to="/movies/popular" mobile>Popular</NavLink>
          <NavLink to="/movies/top-rated" mobile>Top Rated</NavLink>
          <NavLink to="/movies/upcoming" mobile>Upcoming</NavLink>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <CgProfile size={24} className="text-[#DDDDDD]" />
            <span className="ml-3 text-[#DDDDDD]">Profile</span>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

const NavLink = ({ to, children, mobile = false }: NavLinkProps) => (
  <Link
    to={to}
    className={`${
      mobile ? "block" : "inline-block"
    } px-3 py-2 rounded-md text-base font-medium hover:text-[#BDBDD7] transition duration-150 ease-in-out`}
  >
    {children}
  </Link>
);

export default Navbar;
