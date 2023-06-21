import { CubeTexture } from "@babylonjs/core";
import { FC } from "react";
import { useScene } from "react-babylonjs";

const Environment: FC = () => {
  const scene = useScene();
  if (scene) {
    const envText: CubeTexture = CubeTexture.CreateFromPrefilteredData(
      "textures/environment.env",
      scene
    );

    scene.environmentTexture = envText;
    scene.createDefaultSkybox(envText, true);
  }

  return null;
};

export default Environment;
