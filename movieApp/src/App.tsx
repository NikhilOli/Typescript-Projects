import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Navbar from "./components/Navbar";
import MovieGallery from "./components/MovieGallery";

const App = () => {
  return (
    <div className="bg-[#030637] min-h-screen text-[#DDDDDD]">
      <Router>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/movies/:type" element={<MovieGallery />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </div>
  );
};

export default App;