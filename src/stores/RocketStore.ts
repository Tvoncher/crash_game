import { AnimationGroup } from "@babylonjs/core/Animations/animationGroup";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { action, makeObservable, observable } from "mobx";
import { MAX_FLYING_TIME } from "../utils/consts";
import { userStore } from "./UserStore";
import { Scene } from "@babylonjs/core/scene";
import { ParticleHelper } from "@babylonjs/core/Particles/particleHelper";
import { ParticleSystemSet } from "@babylonjs/core/Particles/particleSystemSet";
import { ParticleSystem } from "@babylonjs/core/Particles/particleSystem";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { Color4 } from "@babylonjs/core/Maths/math";

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
    const explodeTimer = Math.random() * MAX_FLYING_TIME * 1000;

    this.flyAnim?.forEach((anim) => anim.play());

    const particleSystem = new ParticleSystem("particles", 100, this.scene!);
    particleSystem.particleTexture = new Texture("textures/spark.png");

    particleSystem.emitter = this.rocket;

    particleSystem.emitRate = 90;
    particleSystem.minLifeTime = 1.5;
    particleSystem.minSize = 0.05;
    particleSystem.maxSize = 0.2;
    particleSystem.color1 = new Color4(1, 0.5, 0, 1);
    particleSystem.color2 = new Color4(1, 0, 0, 0.8);
    particleSystem.blendMode = ParticleSystem.BLENDMODE_ADD;

    particleSystem.disposeOnStop = true;
    particleSystem.start();

    this.startFlyingTime(explodeTimer);

    if (this.rocket) {
      const interval = setInterval(() => {
        this.position = new Vector3(0, this.position.y + 0.07, 0);
        this.rocket!.position = this.position;
      }, this.speed);

      setTimeout(() => {
        clearInterval(interval);
        particleSystem.stop();
      }, explodeTimer);
    }

    this.setExplodeRocket(explodeTimer);
  }

  @action
  setIsFlying() {
    this.isFlying = !this.isFlying;
  }

  @action
  startFlyingTime(timer: number) {
    const interval = setInterval(() => {
      this.flyingTime += 100;
      userStore.bet *= 1.01;
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
    //TDO: add sound
    this.createExplosion();
    this.rocket!.setEnabled(false);
    userStore.bet = 0;
    rocketStore.setIsFlying();

    //reseting everything for new round
    setTimeout(() => {
      this.rocket!.setEnabled(true);
      this.rocket!.position = Vector3.Zero();
      this.position = Vector3.Zero();

      this.resetFlyingTime();
      this.setIsCashedOut(false);
    }, 1500);
  }

  @action
  createExplosion() {
    ParticleHelper.CreateAsync("explosion", this.scene).then(
      (set: ParticleSystemSet) => {
        set.systems.forEach((system) => {
          const sub = system as ParticleSystem;
          sub.disposeOnStop = true;
          sub.worldOffset = this.position;
        });
        //just dont need this effect
        set.systems[3].dispose();
        set.start();
      }
    );
  }

  //taking money
  @action
  setIsCashedOut(value: boolean) {
    this.isCashedOut = value;
  }
}

export const rocketStore = new RocketStore();
