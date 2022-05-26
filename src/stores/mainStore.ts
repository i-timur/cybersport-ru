// eslint-disable-next-line no-warning-comments
//  TODO import/no-cycle как пофиксить?
// eslint-disable-next-line import/no-cycle
import {AuthStore} from './authStore';

export class MainStore {
  authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore(this);
  }
}

export const mainStore = new MainStore();
