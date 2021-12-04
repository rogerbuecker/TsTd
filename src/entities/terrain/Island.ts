import { GridRenderable } from "../../interfaces/GridRenderable";

export class Island extends GridRenderable {
  public traversable = false;
  image: HTMLImageElement = new Image();

  constructor(x: number, y: number, width: number) {
    super(x, y, width);
    this.image.src = "img/insel.png";
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.x,
      this.y,
      this.width,
      this.width
    );
  }
}