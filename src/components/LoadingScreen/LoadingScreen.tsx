import { FC } from "react";
import "./LoadingScreen.css";

const LoadingScreen: FC = () => {
  return (
    <div className="loadingScreen">
      <img className="loadingScreen_gif" src="./images/loading.jpg" alt="" />
    </div>
  );
};

export default LoadingScreen;
