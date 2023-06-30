import { Engine, Scene } from "react-babylonjs";
import { observer } from "mobx-react-lite";
import { Suspense } from "react";
import { gameStore } from "./stores/GameStore";
import UI from "./components/UI/UI";
import Rocket from "./components/rocket";
import BaseLight from "./components/baseLight";
import BaseCamera from "./components/baseCamera";
import Environment from "./components/environment";
import SoundsContainer from "./components/Sounds/SoundsContainer";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Elon from "./components/elon";
import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import "./App.css";

const App = observer(() => {
  return (
    <div className="App">
      {gameStore.isLoading && <LoadingScreen />}
      <Engine antialias adaptToDeviceRatio className="canvas">
        <Scene
          blockMaterialDirtyMechanism
          blockfreeActiveMeshesAndRenderingGroups
        >
          <BaseCamera />
          <BaseLight />
          <Suspense>
            <Rocket />
            <Elon />
            <Environment />
          </Suspense>
        </Scene>
      </Engine>
      <SoundsContainer />
      <UI />
    </div>
  );
});

export default App;
