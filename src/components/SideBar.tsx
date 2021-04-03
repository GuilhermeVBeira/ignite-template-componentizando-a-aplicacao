import React, {useEffect, useState} from 'react';
import {api} from '../services/api';
import {Button} from './Button';


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
    handleClickButton(genderId: number): void,
    selectedGenreId: number
}

export const SideBar:React.FC<SideBarProps> = ({handleClickButton, selectedGenreId}) => {
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
        setGenres(response.data);
        });
    }, []);
    return (
        <div className="buttons-container">
            {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
      ))}
    </div>
)
}
