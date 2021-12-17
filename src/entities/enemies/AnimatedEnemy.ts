import {
  FACING_DOWN,
  FACING_LEFT,
  FACING_RIGHT,
  FACING_UP,
} from "../../tools/constants";
import { Base } from "../terrain/Base";
import { Enemy } from "./Enemy";

export abstract class AnimatedEnemy extends Enemy {
  frameIndex: number = 0;
  tickCount: number = 1;
  movementSpeed: number = 1;
  image: HTMLImageElement = new Image();

  framePositionX: number = 0;
  framePositionY: number = 0;

  ticksPerFrame: number;
  currentDirection:
    | typeof FACING_DOWN
    | typeof FACING_UP
    | typeof FACING_LEFT
    | typeof FACING_RIGHT;

  //abstract loop: any;
  abstract cycleLoop: any;
  abstract spriteWidth: number;
  abstract spriteHeight: number;
  abstract animationSrc: string;

  constructor(base: Base, ticksPerFrame: number) {
    super(base);
    this.currentDirection = FACING_DOWN;
    this.ticksPerFrame = ticksPerFrame || 0; // 0 means no animation
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.image.src = this.animationSrc;

    /* ctx.drawImage(
      this.image,
      this.framePositionX,
      this.framePositionY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      Enemy.ENEMY_SIZE,
      Enemy.ENEMY_SIZE
    ); */

    /*  this.x - this.healthBar.width / 2,
     this.y + this.healthBar.yOffset, */
    ctx.drawImage(
      this.image,
      this.cycleLoop[this.frameIndex] * this.spriteWidth,
      //this.currentDirection * this.spriteHeight,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x - Enemy.ENEMY_SIZE / 2,
      this.y - Enemy.ENEMY_SIZE / 2,
      Enemy.ENEMY_SIZE,
      Enemy.ENEMY_SIZE
    );
  }

  update(): void {
    super.update();

    this.tickCount += 1;

    const target = this.getCurrentTarget();

    if (target) {
      if (this.x < target.x) {
        this.currentDirection = FACING_RIGHT;
      } else if (this.x > target.x) {
        this.currentDirection = FACING_LEFT;
      }

      if (this.y < target.y) {
        this.currentDirection = FACING_DOWN;
      } else if (this.y > target.y) {
        this.currentDirection = FACING_UP;
      }
    }

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      this.frameIndex += 1;

      if (this.frameIndex >= this.cycleLoop.length) {
        this.frameIndex = 0;
      }
    }
  }
}
