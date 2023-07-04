import { ESoundsID } from "./types";
import { Scene } from "@babylonjs/core/scene";
import { ParticleHelper } from "@babylonjs/core/Particles/particleHelper";
import { ParticleSystemSet } from "@babylonjs/core/Particles/particleSystemSet";
import { ParticleSystem } from "@babylonjs/core/Particles/particleSystem";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Color4 } from "@babylonjs/core/Maths/math";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";

export const playSound = (soundID: ESoundsID) => {
  const sound = document.getElementById(soundID) as HTMLAudioElement;
  sound.play();
};

export const createExplosionParticles = (position: Vector3, scene: Scene) => {
  ParticleHelper.CreateAsync("explosion", scene).then(
    (set: ParticleSystemSet) => {
      set.systems.forEach((system) => {
        const sub = system as ParticleSystem;
        sub.disposeOnStop = true;
        sub.worldOffset = position;
      });
      //just dont need this effect
      set.systems[3].dispose();
      set.start();

      //wait till animation ends
      setTimeout(() => {
        set.dispose();
      }, 1500);
    }
  );
};

export const createFlyingParticles = (
  explodeTimer: number,
  scene: Scene | null,
  rocket: Mesh | null
) => {
  const particleSystem = new ParticleSystem("particles", 100, scene!);
  particleSystem.particleTexture = new Texture("textures/spark.png");
  particleSystem.emitter = rocket;
  particleSystem.emitRate = 90;
  particleSystem.minLifeTime = 1.5;
  particleSystem.minSize = 0.05;
  particleSystem.maxSize = 0.2;
  particleSystem.color1 = new Color4(1, 0.5, 0, 1);
  particleSystem.color2 = new Color4(1, 0, 0, 0.8);
  particleSystem.blendMode = ParticleSystem.BLENDMODE_ADD;

  particleSystem.disposeOnStop = true;
  particleSystem.start();

  setTimeout(() => {
    particleSystem.stop();
  }, explodeTimer);
};
