import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { action, makeObservable, observable } from "mobx";
import { MAX_FLYING_TIME } from "../utils/consts";
import { userStore } from "./UserStore";
import { Scene } from "@babylonjs/core/scene";
import {
  createExplosionParticles,
  createFlyingParticles,
  playSound,
} from "../utils/utils";
import { ESoundsID } from "../utils/types";

export class RocketStore {
  @observable
  rocket: Mesh | null = null;

  @observable
  flyAnim: AnimationGroup[] | null = null;

  @observable
  scene: Scene | null = null;

  @observable
  position = Vector3.Zero();

  @observable
  speed = 10;

  @observable
  flyingTime = 0;

  @observable
  isFlying = false;

  @observable
  isCashedOut = false;

  public constructor() {
    makeObservable(this);
  }

  //handling everything related to rocket mesh
  @action
  setRocket(rocket: Mesh) {
    this.rocket = rocket;
  }

  @action
  setFlyAnim(anim: AnimationGroup[]) {
    this.flyAnim = anim;
  }

  @action
  setScene(scene: Scene) {
    this.scene = scene;
  }

  // launching rocket
  @action
  launchRocket() {
    rocketStore.setIsFlying();
    //converting ms to seconds
    const explodeTimer = Math.random() * MAX_FLYING_TIME * 1000;

    playSound(ESoundsID.Launch);

    this.flyAnim?.forEach((anim) => anim.play());

    createFlyingParticles(explodeTimer, this.scene, this.rocket);

    this.startFlyingTime(explodeTimer);

    if (this.rocket) {
      const interval = setInterval(() => {
        this.setPosition(new Vector3(0, this.position.y + 0.07, 0));
        this.rocket!.position = this.position;
      }, this.speed);

      setTimeout(() => {
        clearInterval(interval);
      }, explodeTimer);
    }

    this.setExplodeRocket(explodeTimer);
  }

  @action
  setPosition(value: Vector3) {
    this.position = value;
  }

  @action
  setIsFlying() {
    this.isFlying = !this.isFlying;
  }

  @action
  startFlyingTime(timer: number) {
    const interval = setInterval(() => {
      this.flyingTime += 100;
      userStore.multiplyBet(1.01);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
    }, timer);
  }

  @action
  resetFlyingTime() {
    this.flyingTime = 0;
  }

  //rocket explosion
  //explodes rocket after some time
  @action
  setExplodeRocket(timer: number) {
    setTimeout(() => {
      this.explodeRocket();
    }, timer);
  }

  @action
  explodeRocket() {
    playSound(ESoundsID.Explosion);
    this.createExplosion();
    this.rocket!.setEnabled(false);
    userStore.bet = 0;
    rocketStore.setIsFlying();

    this.flyAnim!.forEach((anim) => {
      anim.stop();
      anim.reset();
    });

    //reseting everything for new round
    setTimeout(() => {
      this.rocket!.setEnabled(true);
      this.rocket!.position = Vector3.Zero();
      this.setPosition(Vector3.Zero());

      this.resetFlyingTime();
      this.setIsCashedOut(false);
    }, 1500);
  }

  @action
  createExplosion() {
    createExplosionParticles(this.position, this.scene!);
  }

  //taking money
  @action
  setIsCashedOut(value: boolean) {
    this.isCashedOut = value;
  }
}

export const rocketStore = new RocketStore();
