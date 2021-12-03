import { Base } from "../terrain/Base";
import { Enemy } from "./Enemy";

export abstract class AnimatedEnemy extends Enemy {
  frameIndex: number = 0;
  tickCount: number = 1;
  image: HTMLImageElement = new Image();

  numberOfFrames: number;
  ticksPerFrame: number;
  abstract animationSrc: string;

  constructor(base: Base, numberOfFrames: number, ticksPerFrame: number) {
    super(base);
    this.numberOfFrames = numberOfFrames || 1;
    this.ticksPerFrame = ticksPerFrame || 0; // 0 means no animation
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.image.src = this.animationSrc;

    ctx.drawImage(
      this.image,
      (this.frameIndex * this.image.width) / this.numberOfFrames,
      0,
      this.image.width / this.numberOfFrames,
      this.image.height,
      this.x,
      this.y,
      this.radius * 2,
      this.radius * 2
    );
  }

  update(): void {
    super.update();

    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      // If the current frame index is in range
      if (this.frameIndex < this.numberOfFrames - 1) {
        // Go to the next frame
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }
}
