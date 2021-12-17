import { AnimatedEnemy } from "./AnimatedEnemy";
import { Base } from "../terrain/Base";

export class SimpleEnemy extends AnimatedEnemy {
  life: number = 50;
  speed: number = 1.25;
  cash: number = 5;
  ticksPerFrame: number = 15;
  cycleLoop = [0, 1, 2];
  spriteWidth: number = 118;
  spriteHeight: number= 91;
  animationSrc: string = "img/schiff.png";


  constructor(base: Base, ticksPerFrame: number) {
    super(base, ticksPerFrame);
  }
}
