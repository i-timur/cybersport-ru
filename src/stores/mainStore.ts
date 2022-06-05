import {ModalStore} from './modalStore';
import {UserStore} from './userStore';

export class MainStore {
  modalStore: ModalStore;
  userStore: UserStore;

  constructor() {
    this.modalStore = new ModalStore(this);
    this.userStore = new UserStore(this);
  }
}

export const mainStore = new MainStore();
