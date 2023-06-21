import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { FC } from "react";

const BaseLight: FC = () => {
  return (
    <>
      <hemisphericLight
        name="light__main"
        intensity={1}
        direction={new Vector3(0, 1, 0)}
      />
      <hemisphericLight
        name="light__secondary"
        intensity={2}
        diffuse={new Color3(1, 0.3, 0)}
        direction={new Vector3(1, 1, -1)}
      />
    </>
  );
};

export default BaseLight;
