import { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useDebounce from "./hooks/useDebounce.js";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import { updateSearchCount } from "./appwrite.js";

const HomePage = () => {
  // ... All your existing state and logic here
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
