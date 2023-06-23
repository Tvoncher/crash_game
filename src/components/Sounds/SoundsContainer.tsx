import { FC } from "react";
import { observer } from "mobx-react-lite";
import { ESounds } from "../../utils/types";

const SoundsContainer: FC = observer(() => {
  return (
    <div style={{ position: "fixed", top: -100, left: -100 }}>
      <audio id={ESounds.Explosion} src={"sounds/explosion.mp3" as string} />
      <audio id={ESounds.Launch} src={"sounds/launch.mp3" as string} />
    </div>
  );
});

export default SoundsContainer;
