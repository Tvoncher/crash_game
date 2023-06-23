import { ESounds } from "./types";

export const playSound = (soundID: ESounds) => {
  const sound = document.getElementById(soundID) as HTMLAudioElement;
  sound.play();
};
