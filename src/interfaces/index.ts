import {OutputData} from '@editorjs/editorjs';
import {Dispatch} from 'react';

import {Option} from '../utils';

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
  postType: Option;
  previewLink: string;
  title: string;
  data: OutputData;
  date: Date;
  game: Category;
  comments: Message[];
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
  img?: string;
}

export interface Message {
  id?: string;
  authorId: string;
  authorName: string;
  text: string;
  date: Date;
  dislikes: number;
  likes: number;
}

export interface UserSignInForm {
  login: string;
  password: string;
}

export interface UserSignUpForm {
  login: string;
  password: string;
  email: string;
}
