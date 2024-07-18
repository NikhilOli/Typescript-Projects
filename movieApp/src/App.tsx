import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviesList from "./pages/MoviesList";
import MovieDetail from "./pages/MovieDetail";
import Navbar from "./components/Navbar";
import MovieGallery from "./components/MovieGallery";
const App = () => {
  return (
    <div className="bg-[#030637]">
      <Router>
        <Navbar/>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/movies/:type" element={<MovieGallery />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App