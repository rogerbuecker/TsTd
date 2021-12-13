import { AnimatedEnemy } from "./AnimatedEnemy";
import { Base } from "../terrain/Base";

export class SimpleEnemy extends AnimatedEnemy {
  life: number = 50;
  speed: number = 1.25;
  cash: number = 5;
  radius: number = 8;
  ticksPerFrame: number = 15;
  cycleLoop = [0, 1, 0, 2];
  animationSrc: string = "img/boy.png";

  constructor(base: Base, ticksPerFrame: number) {
    super(base, ticksPerFrame);
  }
}
