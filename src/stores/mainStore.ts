import {ModalStore} from './modalStore';

export class MainStore {
  modalStore: ModalStore;

  constructor() {
    this.modalStore = new ModalStore(this);
  }
}

export const mainStore = new MainStore();
