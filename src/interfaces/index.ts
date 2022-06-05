import {OutputData} from '@editorjs/editorjs';
import {Dispatch} from 'react';

import {Option} from '../utils';
import {Role} from '../enums';

export interface FbUserRequest {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
  localId: string;
}

export interface Post {
  id?: string;
  postType: Option;
  previewLink: string;
  title: string;
  data: OutputData;
  date: Date;
  game: Category;
  comments: Comm[];
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
  repeatedPassword: string;
  email: string;
}

export interface User {
  id: string;
  email: string;
  login: string;
  role: Role;
}

export interface Comm {
  id?: string;
  postId: string;
  authorId: string;
  text: string;
  likes?: string[];
  dislikes?: string[];
  date: Date;
}
