import { FC, useCallback } from "react";
import { rocketStore } from "../../../stores/RocketStore";
import "./Launch.css";

const Launch: FC = () => {
  const handleLaunch = useCallback(() => {
    rocketStore.launchRocket();
  }, []);

  return (
    <button className="launch pulsing neon_green" onClick={handleLaunch}>
      LAUNCH
    </button>
  );
};

export default Launch;
