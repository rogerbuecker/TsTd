import { AnimatedEnemy } from "./AnimatedEnemy";
import { Base } from "../terrain/Base";

export class CoinEnemy extends AnimatedEnemy {
  life: number = 25;
  speed: number = 1;
  cash: number = 50;
  radius: number = 5;

  numberOfFrames: number = 10;
  ticksPerFrame: number = 0;
  animationSrc: string = "img/coin.png";

  constructor(base: Base, ticksPerFrame: number) {
    super(base, ticksPerFrame);
  }

}
