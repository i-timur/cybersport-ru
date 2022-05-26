import {OutputData} from '@editorjs/editorjs';
import {Dispatch} from 'react';

export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Post {
  id?: string;
  title: string;
  data: OutputData;
  date: Date;
  game: Category;
  commentsCount: number;
}

export interface AuthContextValue {
  auth: boolean;
  setAuth: Dispatch<boolean>;
}

export interface PostsResp extends Record<string, Post> {
}

export interface Category {
  value: string;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IComment {
  id?: string;
  authorId: string;
  authorName: string;
  text: string;
  date: string;
}
