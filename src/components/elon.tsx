import { FC, useEffect } from "react";
import { useAssetManager } from "react-babylonjs";
import { assetsTask } from "../utils/assetsTask";
import { MeshAssetTask } from "@babylonjs/core/Misc/assetsManager";
import { Mesh, Vector3 } from "@babylonjs/core";
import { observer } from "mobx-react-lite";

const Elon: FC = observer(() => {
  const assetManagerResult = useAssetManager(assetsTask);

  useEffect(() => {
    const ElonTask = assetManagerResult.taskNameMap["elon"] as MeshAssetTask;
    const ElonMesh = ElonTask.loadedMeshes[0] as Mesh;

    ElonMesh.scaling = new Vector3(0.5, 0.5, 0.5);
    ElonMesh.rotation = new Vector3(0, -0.7, 0);
    ElonMesh.position = new Vector3(1.5, -5, 0);
  });

  return null;
});

export default Elon;
