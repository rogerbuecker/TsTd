import { AnimatedEnemy } from "./AnimatedEnemy";
import { Base } from "../terrain/Base";

export class CoinEnemy extends AnimatedEnemy {
  life: number = 25;
  speed: number = 1;
  cash: number = 50;
  ticksPerFrame: number = 2;

  /*   loop = [
    [0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
  ]; */

  loop = {
    DOWN: {
      x: 0,
      y: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    UP: {
      x: 0,
      y: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  };
  /*   loop = [
    [0, [0, 1, 0, 2]],
    [1, [0, 1, 0, 2]],
    [2, [0, 1, 0, 2]],
    [3, [0, 1, 0, 2]],
  ]; */

  spriteWidth: number = 44.5;
  spriteHeight: number = 47.75;
  animationSrc: string = "img/coin.png";

  constructor(base: Base, ticksPerFrame: number) {
    super(base, ticksPerFrame);
  }
}
