import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

// eslint-disable-next-line import/no-cycle
import {AuthService} from '../services/authService';

class HttpClient {
  http: AxiosInstance;
  auth: AuthService = new AuthService();

  constructor() {
    this.http = axios.create();
    this.initInterceptors();
  }

  initAuthInterceptor() {
    this.http.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        const request: AxiosRequestConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: token
          }
        };
        return request;
      }
      return config;
    });
  }

  initRespInterceptor() {
    this.http.interceptors.response.use((response) => response.data);
  }

  initInterceptors() {
    this.initAuthInterceptor();
    this.initRespInterceptor();
    this.initUrlInterceptor();
  }

  initUrlInterceptor() {
    this.http.interceptors.request.use((config) => {
      return {
        ...config,
        params: {
          ...config.params,
          auth: this.auth.token
        },
        url: config.url?.startsWith('https') ||
          config.url?.startsWith('http')
            ? config.url
            : [process.env.REACT_APP_DB_URL, config.url].join('/')
      };
    });
  }
}

export const http = new HttpClient().http;
