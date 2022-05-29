import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

class HttpClient {
  http: AxiosInstance;

  constructor() {
    this.http = axios.create();
    this.initInterceptors();
  }

  initInterceptors() {
    this.initAuthInterceptor();
    this.initRespInterceptor();
    this.initUrlInterceptor();
  }

  initAuthInterceptor() {
    this.http.interceptors.request.use((config) => {
      const token = localStorage.getItem('fb-token');
      if (token) {
        const request: AxiosRequestConfig = {
          ...config,
          params: {
            ...config.params,
            auth: token
          }
        };
        return request;
      }
      return config;
    });
  }

  initRespInterceptor() {
    this.http.interceptors.response.use(
      (response) => response.data,
      (err) => Promise.reject(err.response.data)
    );
  }

  initUrlInterceptor() {
    this.http.interceptors.request.use((config) => {
      return {
        ...config,
        url: config.url?.startsWith('https') ||
          config.url?.startsWith('http')
            ? config.url
            : [process.env.REACT_APP_DB_URL, config.url].join('/')
      };
    });
  }
}

export const http = new HttpClient().http;
