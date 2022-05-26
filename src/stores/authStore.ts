import {action, makeAutoObservable} from 'mobx';

import {FbAuthResponse, User} from '../types';
import {http} from '../client';

// eslint-disable-next-line no-warning-comments
//  TODO Как убрать этот import/no-cycle?
// eslint-disable-next-line import/no-cycle
import {MainStore} from './mainStore';

export class AuthStore {
  mainStore: MainStore;
  state = 'pending';

  constructor(mainStore: MainStore) {
    makeAutoObservable(this, {}, {autoBind: true});
    this.mainStore = mainStore;
  }

  get token(): string | null {
    const expToken = localStorage.getItem('fb-token-exp');
    if (!expToken) {
      return null;
    }
    const expDate = new Date(expToken);
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  setToken(response: FbAuthResponse | null): void {
    if (response) {
      const expIn = Number(response.expiresIn) * 1000;
      const expDate = new Date(new Date().getTime() + expIn);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  // eslint-disable-next-line no-warning-comments
  // TODO Как решить проблему с типизацией при использовании интерцепторов, ведь ожидается, что ответ типа AxiosResponse?
  login(user: User): Promise<void> {
    this.state = 'pending';
    user.returnSecureToken = true;
    return new Promise((resolve, reject) => {
      http.post(
        `accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        user
      )
        .then(action((resp) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.setToken(resp);
          this.state = 'done';
          resolve();
        }))
        .catch(action((err) => {
          this.state = 'error';
          reject(err);
        }));
    });
  }

  logout(): void {
    this.setToken(null);
  }

  get isAuthenticated(): boolean {
    if (this.token) {
      return true;
    }
    return false;
  }
}
