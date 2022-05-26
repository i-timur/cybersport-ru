import {createContext} from 'react';

import {MainStore} from '../stores/mainStore';
import {Post} from '../types';
import {Dota2, Csgo, Lol} from '../assets/icons/categories';

export const StoreContext = createContext<MainStore | null>(null);

export const comparePosts = (post1: Post, post2: Post) => new Date(post2.date).getTime() - new Date(post1.date).getTime();

export const getCategoryImage = (value: string): string => {
  switch (value) {
    case 'dota-2': return Dota2;
    case 'counter-strike-go': return Csgo;
    case 'league-of-legends': return Lol;
    default: return Dota2;
  }
};
