import { AnimatedEnemy } from "./AnimatedEnemy";
import { Base } from "../terrain/Base";

export class CoinEnemy extends AnimatedEnemy {
  life: number = 25;
  speed: number = 1;
  cash: number = 50;
  ticksPerFrame: number = 2;
  cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  spriteWidth: number = 44;
  spriteHeight: number = 40;
  animationSrc: string = "img/coin.png";

  constructor(base: Base, ticksPerFrame: number) {
    super(base, ticksPerFrame);
  }
}
