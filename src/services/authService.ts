import {FbAuthResponse, User} from '../types';
import {http} from '../client';

export class AuthService {
  state = 'pending';

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

  login(user: User): Promise<void> {
    this.state = 'pending';
    user.returnSecureToken = true;
    return new Promise((resolve, reject) => {
      http.post(
        `${process.env.REACT_APP_API_URL}/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        user
      )
        .then((resp) => {
          // @ts-ignore
          this.setToken(resp);
          this.state = 'done';
          resolve();
        })
        .catch((err) => {
          this.state = 'error';
          reject(err);
        });
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
