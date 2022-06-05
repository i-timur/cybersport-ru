import {action, makeAutoObservable} from 'mobx';

import {User} from '../interfaces';
import {http} from '../client';

import {MainStore} from './mainStore';

export class UserStore {
  user?: User;
  mainStore: MainStore;

  constructor(mainStore: MainStore) {
    this.mainStore = mainStore;
    makeAutoObservable(this);
    this.getUser();
  }

  getUser() {
    const userId: string | null = localStorage.getItem('fb-id');

    if (userId) {
      http.get('users.json')
        .then(
          action('fetchSuccess', (resp: any) => {
            Object.keys(resp).map((key) => {
              if (resp[key].id === userId) {
                this.user = resp[key] as User;
              }
            });
          })
        );
    }
  }
}
