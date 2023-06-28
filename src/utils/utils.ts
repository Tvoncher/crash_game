import { ESoundsID } from "./types";

export const playSound = (soundID: ESoundsID) => {
  const sound = document.getElementById(soundID) as HTMLAudioElement;
  sound.play();
};
