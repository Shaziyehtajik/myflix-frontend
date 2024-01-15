import React, { Component } from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends Component {
  state = {
    movies: [],
    selectedMovie: null,
  };

  componentDidMount() {
    axios.get('https://myflix919.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  setSelectedMovie = newSelectedMovie => {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  };

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => this.setSelectedMovie(newSelectedMovie)} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={movie => this.setSelectedMovie(movie)} />
          ))}
      </div>
    );
  }
}

export default MainView;
