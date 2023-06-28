import { CubeTexture } from "@babylonjs/core";
import { FC } from "react";
import { useScene } from "react-babylonjs";
import { gameStore } from "../stores/GameStore";

const Environment: FC = () => {
  const scene = useScene();
  if (scene) {
    const envText: CubeTexture = CubeTexture.CreateFromPrefilteredData(
      "textures/environment.env",
      scene
    );

    scene.environmentTexture = envText;
    scene.createDefaultSkybox(envText, true);

    scene.onReadyObservable.add(() => {
      gameStore.setIsLoaded();
    });
  }

  return null;
};

export default Environment;
