import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard.js';

const MovieList = props => {
  const [movies, setMovies] = useState([])
  
  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          console.log(response);
          setMovies(response.data);
          
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getMovies();
  }, []);
  
  return (
    <div className="movie-list">
      {movies.map((name, id) => (
          <Link to= {`/movies/${name.id}`} key={`link${id}`}>
           
          <MovieDetails key={name.id} movie={name} /></Link>
      ))}
    </div>
  );
}

function MovieDetails({ movie }) {
  const { title, director, metascore, stars } = movie;
  return (
    <MovieCard stars={stars} title={title} director={director} metascore={metascore} />
  );
}

export default MovieList;
