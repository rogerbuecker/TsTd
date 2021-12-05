import { AnimatedEnemy } from "./AnimatedEnemy";
import { Base } from "../terrain/Base";

export class SimpleEnemy extends AnimatedEnemy {
  life: number = 50;
  speed: number = 1.25;
  cash: number = 5;
  radius: number = 8;
  numberOfFrames: number = 4;
  ticksPerFrame: number = 1;
  animationSrc: string = "img/ship.png";

  constructor(base: Base, numberOfFrames: number, ticksPerFrame: number) {
    super(base, numberOfFrames, ticksPerFrame);
  }

}
