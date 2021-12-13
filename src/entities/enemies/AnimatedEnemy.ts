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

  abstract  cycleLoop: Array<number>;
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
      this.cycleLoop[this.frameIndex] * 40,
      this.currentDirection * 40,
      40,
      40,
      this.x,
      this.y,
      this.radius * 2,
      this.radius * 2
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
