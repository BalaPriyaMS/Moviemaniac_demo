import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./components/MovieList/MovieList";
import Fire from "./assets/fire.png";
import Face from "./assets/partying-face.png";
import Star from "./assets/star.png";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <MovieList type="popular" title="Popular" emoji={Fire} />
      <MovieList type="upcoming" title="Latest" emoji={Face} />
      <MovieList type="top_rated" title="Top Rating" emoji={Star} />
    </div>
  );
};

export default App;
