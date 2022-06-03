import {Category, Message, Post} from '../interfaces';
import {Dota2, Csgo, Lol} from '../assets/icons/categories';

export const comparePosts = (post1: Post, post2: Post) => new Date(post2.date).getTime() - new Date(post1.date).getTime();

export const compareCommentsByDateAsc =
  (comment1: Message, comment2: Message) => new Date(comment1.date).getTime() - new Date(comment2.date).getTime();

export const compareCommentsByLikesDesc =
  (comment1: Message, comment2: Message) => comment2.likes - comment1.likes;

export const getCategoryImage = (value: string): string => {
  switch (value) {
    case 'dota-2': return Dota2;
    case 'counter-strike-go': return Csgo;
    case 'league-of-legends': return Lol;
    default: return Dota2;
  }
};

export const makeArrayOf = (obj: any): any[] => {
  if (!obj || !Object.keys.length) {
    return [];
  }

  return Object.keys(obj)
    .map((key) => {
      return {
        id: key,
        ...obj[key]
      };
    });
};

export interface Option {
  value: string;
  label: string;
}

export const categoryOptions: Category[] = [
  {
    name: 'Dota 2',
    value: 'dota-2',
    img: Dota2
  },
  {
    name: 'CS:GO',
    value: 'counter-strike-go',
    img: Csgo
  },
  {
    name: 'WARCRAFT III',
    value: 'warcraft-iii',
    img: Dota2
  },
  {
    name: 'PUBG',
    value: 'pubg',
    img: Dota2
  },
  {
    name: 'FORNITE',
    value: 'fortnite',
    img: Dota2
  },
  {
    name: 'APEX LEGENDS',
    value: 'apex-legends',
    img: Dota2
  },
  {
    name: 'VALORANT',
    value: 'valorant',
    img: Dota2
  },
  {
    name: 'LEAGUE OF LEGENDS',
    value: 'league-of-legends',
    img: Lol
  }
];

export const postOptions: Option[] = [
  {
    label: 'Новость',
    value: 'news'
  },
  {
    label: 'Статьи',
    value: 'articles'
  },
  {
    label: 'Интервью',
    value: 'interviews'
  },
  {
    label: 'Бизнес',
    value: 'business'
  },
  {
    label: 'Образование',
    value: 'education'
  }
];
