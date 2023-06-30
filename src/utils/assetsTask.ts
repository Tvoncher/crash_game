import { MeshTask, TaskType } from "react-babylonjs";

export const assetsTask: MeshTask[] = [
  {
    taskType: TaskType.Mesh,
    rootUrl: `models/`,
    sceneFilename: "rocket.glb",
    name: "rocket",
  },
  {
    taskType: TaskType.Mesh,
    rootUrl: `models/`,
    sceneFilename: "elon.glb",
    name: "elon",
  },
];
