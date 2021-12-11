import { EventEmitter } from "./tools/EventEmitter";

class Canvas extends EventEmitter {
  private readonly ctx: CanvasRenderingContext2D;

  private readonly gameCanvasElement: HTMLCanvasElement;
  private readonly gameBackgroundElement: HTMLCanvasElement;
  private readonly gameUiElement: HTMLCanvasElement;
  transformMatrix: DOMMatrix | undefined;

  constructor() {
    super();
    this.gameCanvasElement = <HTMLCanvasElement>document.getElementById("game");
    this.gameBackgroundElement = <HTMLCanvasElement>(
      document.getElementById("background")
    );
    this.gameUiElement = <HTMLCanvasElement>document.getElementById("ui");

    this.gameCanvasElement.tabIndex = 2;
    this.gameBackgroundElement.tabIndex = 1;
    this.gameUiElement.tabIndex = 3;

    this.ctx = this.gameCanvasElement.getContext("2d")!;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
  }

  private resize() {
    this.gameCanvasElement.width = document.body.clientWidth;
    this.gameCanvasElement.height = document.body.clientHeight;

    this.gameBackgroundElement.width = document.body.clientWidth;
    this.gameBackgroundElement.height = document.body.clientHeight;

    this.gameUiElement.width = document.body.clientWidth;
    this.gameUiElement.height = document.body.clientHeight;

    this.emit("resize", this.gameCanvasElement);
  }

  public getGameElement(): HTMLCanvasElement {
    return this.gameCanvasElement;
  }

  public getUiElement(): HTMLCanvasElement {
    return this.gameUiElement;
  }

  public getBackgroungElement(): HTMLCanvasElement {
    return this.gameBackgroundElement;
  }

  public getCtx(): CanvasRenderingContext2D {
    return this.ctx;
  }

  //Lets hope we dont need this...
  /*   clear() {
    this.ctx.clearRect(
      0,
      0,
      this.gameCanvasElement.width,
      this.gameCanvasElement.height
    );
  } */

  updateTransformMatrix() {
    this.transformMatrix = this.ctx.getTransform();
  }
}

const canvas = new Canvas();
const ctx = canvas.getCtx();

export { canvas, ctx };
