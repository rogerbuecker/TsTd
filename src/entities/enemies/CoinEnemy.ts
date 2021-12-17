import { AnimatedEnemy } from "./AnimatedEnemy";
import { Base } from "../terrain/Base";

export class CoinEnemy extends AnimatedEnemy {
  life: number = 25;
  speed: number = 1;
  cash: number = 50;
  
  enemySize: number = 15;
  ticksPerFrame: number = Math.floor((Math.random()*10) + 5)
  
  spriteWidth: number = 44;
  spriteHeight: number = 40;
  animationSrc: string = "img/coin.png";

  cycleLoop: Array<Array<Object>> = [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 8, y: 0 },
      { x: 9, y: 0 },
    ]
  ];

  constructor(base: Base, ticksPerFrame: number) {
    super(base, ticksPerFrame);
  }
}
