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

  ticksPerFrame: number;
  currentDirection:
    | typeof FACING_DOWN
    | typeof FACING_UP
    | typeof FACING_LEFT
    | typeof FACING_RIGHT;

  abstract cycleLoop: any;

  abstract enemySize: number;
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

    ctx.drawImage(
      this.image,
      this.cycleLoop[this.currentDirection][this.frameIndex].x *
        this.spriteWidth,
      this.cycleLoop[this.currentDirection][this.frameIndex].y *
        this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - this.enemySize / 2,
      this.y - this.enemySize / 2,
      this.enemySize,
      this.enemySize,
    );
  }

  update(): void {
    super.update();

    this.tickCount += 1;

    const target = this.getCurrentTarget();

    //only animate if we have a target and cycleLoop is long enough
    if (target && this.cycleLoop.length === 4) {
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

      if (this.frameIndex >= this.cycleLoop[this.currentDirection].length) {
        this.frameIndex = 0;
      }
    }
  }
}
