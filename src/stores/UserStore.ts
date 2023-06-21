import { action, makeObservable, observable } from "mobx";
import { STARTING_BALANCE } from "../utils/consts";

export class UserStore {
  @observable
  balance = STARTING_BALANCE;

  @observable
  bet = 0;

  public constructor() {
    makeObservable(this);
  }

  @action
  setBalance(value: number) {
    this.balance += value;
  }

  @action
  placeBet(value: number) {
    this.balance -= value;
    this.bet += value;
  }
}

export const userStore = new UserStore();
