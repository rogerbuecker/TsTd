import { EventEmitter } from "./tools/EventEmitter";

class Canvas extends EventEmitter {
  private readonly gameCtx: CanvasRenderingContext2D;
  private readonly uiCtx: CanvasRenderingContext2D;
  private readonly backgroundCtx: CanvasRenderingContext2D;

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

    this.gameCtx = this.gameCanvasElement.getContext("2d")!;
    this.uiCtx = this.gameUiElement.getContext("2d")!;
    this.backgroundCtx = this.gameBackgroundElement.getContext("2d")!;

    this.gameCtx.lineCap = "round";
    this.gameCtx.lineJoin = "round";

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

  public getGameCtx(): CanvasRenderingContext2D {
    return this.gameCtx;
  }

  public getUiCtx(): CanvasRenderingContext2D {
    return this.uiCtx;
  }

  public getBackgroundCtx(): CanvasRenderingContext2D {
    return this.backgroundCtx;
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

/*   updateTransformMatrix() {
    this.transformMatrix = this.gameCtx.getTransform();
  } */
}

const canvas = new Canvas();
const gameCtx = canvas.getGameCtx();
const uiCtx = canvas.getUiCtx();
const backgroundCtx = canvas.getBackgroundCtx();

export { canvas, gameCtx, uiCtx, backgroundCtx };
