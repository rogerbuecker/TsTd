import { EventEmitter } from "./tools/EventEmitter";

class Canvas extends EventEmitter {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly canvasElement: HTMLCanvasElement;
  transformMatrix: DOMMatrix | undefined;

  r = 0;
  g = 127;
  b = 255;
  shouldInc = true;
  waves: { frequency: number; current: number; amplitude: number }[] = [];
  tick: number;

  constructor() {
    super();
    this.canvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    this.canvasElement.tabIndex = 1;
    this.ctx = this.canvasElement.getContext("2d")!;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    this.resize();

    window.addEventListener("resize", this.resize.bind(this));

    this.waves.push({
      frequency: 0.02,
      current: 0.04,
      amplitude: 0,
    });
    this.waves.push({
      frequency: 0.02,
      current: 0.032,
      amplitude: 25,
    });
    this.waves.push({
      frequency: 0.025,
      current: 0.03,
      amplitude: 15,
    });
    this.tick = 0;
  }

  private resize() {
    // Check if the canvas is not the same size.
    const needResize =
      this.canvasElement.width !== document.body.clientWidth ||
      this.canvasElement.height !== document.body.clientHeight;

    if (needResize) {
      this.canvasElement.width = document.body.clientWidth;
      this.canvasElement.height = document.body.clientHeight;
      this.emit("resize", this.canvasElement);
    }
  }

  public getElement(): HTMLCanvasElement {
    return this.canvasElement;
  }

  public getCtx(): CanvasRenderingContext2D {
    return this.ctx;
  }

  clear() {
    if (this.g === 255) this.shouldInc = false;
    if (this.g === 0) this.shouldInc = true;
    this.shouldInc ? this.r++ : this.r--;
    this.shouldInc ? this.g++ : this.g--;
    this.shouldInc ? this.b++ : this.b--;
    let gradient = ctx.createLinearGradient(0, 0, 0, this.canvasElement.height);
    gradient.addColorStop(
      0,
      "rgb(" +
        Math.abs(this.r) +
        ", " +
        Math.abs(this.g) +
        ", " +
        Math.abs(this.b) +
        ")"
    );
    gradient.addColorStop(
      1,
      "rgb(" +
        Math.abs(255 - this.r) +
        ", " +
        Math.abs(255 - this.g) +
        ", " +
        Math.abs(255 - this.b) +
        ")"
    );

    ctx.fillStyle = gradient;
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    /*     this.waves.forEach((wave) => {
      const getY = (x: number) => {
        return (
          this.canvasElement.height / 2 -
          Math.cos(x * wave.frequency - this.tick) *
            wave.amplitude *
            Math.cos(this.tick) +
          Math.sin(this.tick) * (wave.amplitude / 2)
        );
      };

      ctx.shadowColor = "#4aA9C8";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;
      ctx.strokeStyle = "#3a99b8";
      ctx.fillStyle = "#3a99b8";
      ctx.beginPath();

      // Move to first coordinate.
      ctx.moveTo(0, getY(0));

      // Draw the wave across the x axis.
      for (let x = 1; x < this.canvasElement.width; x++) {
        ctx.lineTo(x, getY(x));
      }
      ctx.stroke();

      // Close the shape around the bottom of the canvas.
      ctx.lineTo(this.canvasElement.width, this.canvasElement.height);
      ctx.lineTo(0, this.canvasElement.height);
      ctx.closePath();
      ctx.fill();

      this.tick += 0.01;
    }); */
  }

  updateTransformMatrix() {
    this.transformMatrix = this.ctx.getTransform();
  }
}

const canvas = new Canvas();
const ctx = canvas.getCtx();

export { canvas, ctx };
