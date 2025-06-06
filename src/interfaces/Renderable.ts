export abstract class Renderable {
  public x: number;
  public y: number;
  public last_x: number = 0;
  public last_y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  abstract update(): void;

  abstract draw(ctx: CanvasRenderingContext2D): void;

  setCoordinates(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
