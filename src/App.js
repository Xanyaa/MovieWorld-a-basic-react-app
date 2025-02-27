import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg';
import MovieCard from './Moviecard';

//5065fc2d

const API_URL = 'http://www.omdbapi.com?apikey=5065fc2d';

const App = () => {
   
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  return (
    <div className='app'>
      <h1>Movie World</h1>
    
      <div className='search'>
       <input
          placeholder = 'Search for movies'  
          value = {searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}     
       />
       <img 
         src={SearchIcon}
         alt="search"
         onClick={() => searchMovies(searchTerm)}
       />
      </div>

      { 
        movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))}
          </div>
        ) : (
          <div className='empty'>
             <h2>No Movies Found!</h2>
          </div>
        )
      }
    </div>

  );
};

export default App;
