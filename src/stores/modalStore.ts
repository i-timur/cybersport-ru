import {makeAutoObservable} from 'mobx';

import {MainStore} from './mainStore';

export class ModalStore {
  currentModal: JSX.Element | null;
  mainStore: MainStore;

  constructor(mainStore: MainStore) {
    this.currentModal = null;
    this.mainStore = mainStore;
    makeAutoObservable(this);
  }

  setCurrentModal = (modal: JSX.Element) => {
    this.currentModal = modal;
  };

  clearCurrentModal = () => {
    this.currentModal = null;
  };
}
