import { AnimatedEnemy } from "./AnimatedEnemy";
import { Base } from "../terrain/Base";

export class SimpleEnemy extends AnimatedEnemy {
  life: number = 50;
  speed: number = 2.5;
  cash: number = 5;
  radius: number = 8;
  numberOfFrames: number = 6;
  ticksPerFrame: number = 1;
  animationSrc: string = "img/running.png";

  constructor(base: Base, numberOfFrames: number, ticksPerFrame: number) {
    super(base, numberOfFrames, ticksPerFrame);
  }

}
