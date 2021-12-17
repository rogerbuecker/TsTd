import { AnimatedEnemy } from "./AnimatedEnemy";
import { Base } from "../terrain/Base";

export class ShipEnemy extends AnimatedEnemy {
  life: number = 25;
  speed: number = 1;
  cash: number = 50;

  enemySize: number = 36;
  ticksPerFrame: number = Math.floor((Math.random()*50) + 30)

  spriteWidth: number = 157;
  spriteHeight: number = 91;
  animationSrc: string = "img/schiff.png";

  cycleLoop: Array<Array<Object>> = [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
  ];

  constructor(base: Base, ticksPerFrame: number) {
    super(base, ticksPerFrame);
  }
}
