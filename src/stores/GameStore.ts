import { action, makeObservable, observable } from "mobx";

export class GameStore {
  @observable
  isLoading = true;

  public constructor() {
    makeObservable(this);
  }

  @action
  setIsLoaded() {
    this.isLoading = false;
  }
}

export const gameStore = new GameStore();
