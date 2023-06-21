import { observer } from "mobx-react-lite";
import { FC } from "react";
import { rocketStore } from "../stores/RocketStore";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

const BaseCamera: FC = observer(() => {
  return (
    <arcRotateCamera
      name="camera1"
      target={rocketStore.position.add(new Vector3(0, 1, 0))}
      alpha={Math.PI / 2}
      beta={Math.PI / 1.8}
      radius={15}
      minZ={0}
    />
  );
});

export default BaseCamera;
