import { FC } from "react";
import { observer } from "mobx-react-lite";
import { ESoundsID } from "../../utils/types";

const SoundsContainer: FC = observer(() => {
  return (
    <div style={{ position: "fixed", top: -100, left: -100 }}>
      <audio
        loop={true}
        id={ESoundsID.Background}
        src={"sounds/background.mp3" as string}
        autoPlay={true}
      />
      <audio id={ESoundsID.Explosion} src={"sounds/explosion.mp3" as string} />
      <audio id={ESoundsID.Launch} src={"sounds/launch.mp3" as string} />
    </div>
  );
});

export default SoundsContainer;
