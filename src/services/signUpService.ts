import {UserCreateDto} from '../dto/UserCreateDto';
import {http} from '../client';

import {AuthService} from './authService';

export class SignUpService {
  auth: AuthService;

  constructor() {
    this.auth = new AuthService();
  }

  signUp(userCreateDto: UserCreateDto): Promise<void> {
    return new Promise((resolve, reject) => {
      http.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
        userCreateDto
      )
        .then((resp: any) => {
          this.auth.setToken(resp);
          this.auth.setUserId(resp);

          const user: UserCreateDto = {
            ...userCreateDto,
            id: resp.localId
          };

          http.post('users.json', user).then(() => resolve());
        })
        .catch((err) => reject(err));
    });
  }
}
