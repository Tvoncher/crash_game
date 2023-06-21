import { Engine, Scene } from "react-babylonjs";
import { observer } from "mobx-react-lite";
import { Suspense } from "react";
import Rocket from "./components/rocket";
import Environment from "./components/environment";
import UI from "./components/UI/UI";
import BaseLight from "./components/baseLight";
import BaseCamera from "./components/baseCamera";
import "@babylonjs/loaders/glTF/2.0/glTFLoader";
import "./App.css";

const App = observer(() => {
  return (
    <div className="App">
      <Engine antialias adaptToDeviceRatio className="canvas">
        <Scene
          blockMaterialDirtyMechanism
          blockfreeActiveMeshesAndRenderingGroups
        >
          <BaseCamera />
          <BaseLight />
          <Suspense>
            <Rocket />
          </Suspense>
          <Environment />
        </Scene>
      </Engine>
      <UI />
    </div>
  );
});

export default App;
