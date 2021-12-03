import { Enemy } from "./Enemy";
import { Base } from "../terrain/Base";

export class SimpleEnemy extends Enemy {
  life: number = 50;
  speed: number = 2.5;
  cash: number = 5;
  radius = 8;

  frameIndex: number = 0;
  numberOfFrames: number = 6;
  tickCount: number = 1;
  ticksPerFrame: number = 1;

  image: HTMLImageElement = new Image();

  constructor(base: Base) {
    super(base);
    this.image.src = "img/running.png";
  }

  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
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