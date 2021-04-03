import React, {useEffect, useState} from 'react';
import {api} from '../services/api';
import {MovieCard} from './MovieCard';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
    selectedGenreId: number
}

export const Content:React.FC<ContentProps> = ({selectedGenreId}) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  useEffect(() => {

    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

    return (
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
    )
}

