import { AnimatedEnemy } from "./AnimatedEnemy";
import { Base } from "../terrain/Base";

export class BoyEnemy extends AnimatedEnemy {
  life: number = 50;
  speed: number = 1.25;
  cash: number = 5;

  enemySize: number = 36;
  ticksPerFrame: number = Math.floor((Math.random()*15) + 10)
  spriteWidth: number = 16;
  spriteHeight: number = 18;
  animationSrc: string = "img/boy.png";

  cycleLoop: Array<Array<Object>> = [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 2, y: 0 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 2, y: 1 },
    ],
    [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
    ],
    [
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 0, y: 3 },
      { x: 2, y: 3 },
    ],
  ];

  constructor(base: Base, ticksPerFrame: number) {
    super(base, ticksPerFrame);
  }
}
