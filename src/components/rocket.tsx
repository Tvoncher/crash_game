import { FC, useEffect } from "react";
import { useAssetManager } from "react-babylonjs";
import { assetsTask } from "../utils/assetsTask";
import { MeshAssetTask } from "@babylonjs/core/Misc/assetsManager";
import { AnimationGroup, Mesh } from "@babylonjs/core";
import { rocketStore } from "../stores/RocketStore";
import { observer } from "mobx-react-lite";

const Rocket: FC = observer(() => {
  const assetManagerResult = useAssetManager(assetsTask);

  useEffect(() => {
    const rocketTask = assetManagerResult.taskNameMap[
      "rocket"
    ] as MeshAssetTask;
    const rocketMesh = rocketTask.loadedMeshes[0] as Mesh;
    const animationGroups: AnimationGroup[] = rocketTask.loadedAnimationGroups;
    const flyANim = [animationGroups[0], animationGroups[1]];
    flyANim.forEach((anim) => anim.stop());

    rocketStore.setRocket(rocketMesh);
    rocketStore.setFlyAnim(flyANim);
  });

  return null;
});

export default Rocket;
