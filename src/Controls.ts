import { EventEmitter } from "./tools/EventEmitter";
import { canvas } from "./Canvas";

class Controls extends EventEmitter {
  private gameElement: HTMLElement;
  private bounds: DOMRect;
  public mouse = { x: 0, y: 0 };
  mouseInCanvas = false;

  constructor() {
    super();
    this.gameElement = canvas.getGameElement();
    this.bounds = this.gameElement.getBoundingClientRect();
    canvas.on(
      "resize",
      () => (this.bounds = this.gameElement.getBoundingClientRect())
    );

    //prevent context menue from showing
    window.addEventListener(
      "contextmenu",
      function (event) {
        event.preventDefault();
      },
      false
    );

    window.addEventListener("keydown", ({ key }) =>
      this.emit(`keydown:${key.toUpperCase()}`)
    );
    window.addEventListener("click", (event) =>
      this.emit("click", this.boundMouseCoordinates(event))
    );
    window.addEventListener(
      "mousemove",
      (event) => (this.mouse = this.boundMouseCoordinates(event))
    );

    window.addEventListener("focus", () => this.emit("focusin"), false);
    window.addEventListener("blur", () => this.emit("focusout"), false);

    window.addEventListener("mousedown", (event) => {
      switch (event.button) {
        case 0:
          this.emit("mousedown:LEFT", this.boundMouseCoordinates(event));
          break;
        case 1:
          this.emit("mousedown:MIDDLE", this.boundMouseCoordinates(event));
          break;
        case 2:
          this.emit("mousedown:RIGHT", this.boundMouseCoordinates(event));
          break;
      }
    });

    window.addEventListener("mouseup", (event) => {
      switch (event.button) {
        case 0:
          this.emit("mouseup:LEFT", this.boundMouseCoordinates(event));
          break;
        case 1:
          this.emit("mouseup:MIDDLE", this.boundMouseCoordinates(event));
          break;
        case 2:
          this.emit("mouseup:RIGHT", this.boundMouseCoordinates(event));
          break;
      }
    });

    window.addEventListener(
      "wheel",
      (event) => {
        if (event.deltaY > 0) {
          this.emit("wheel:down");
        } else if (event.deltaY < 0) {
          this.emit("wheel:up");
        }
      },
      { passive: true }
    );

    canvas
      .getUiElement()
      .addEventListener("mouseenter", () => (this.mouseInCanvas = true));
    canvas
      .getUiElement()
      .addEventListener("mouseleave", () => (this.mouseInCanvas = false));
  }

  boundMouseCoordinates(e: MouseEvent) {
    const screenX =
      (e.clientX - this.bounds.left) *
      (this.gameElement.clientWidth / this.bounds.width);
    const screenY =
      (e.clientY - this.bounds.top) *
      (this.gameElement.clientHeight / this.bounds.height);

    const transform = canvas.getGameCtx().getTransform().inverse();
    return transform.transformPoint(e);
    /* if (transform.isIdentity) {
      return {
        x: screenX,
        y: screenY,
      };
    } else {
      return transform.transformPoint(e); */
      /* 
    const invMat = transform.invertSelf();
    return {
      x: Math.round(screenX * invMat.a + screenY * invMat.c + invMat.e),
      y: Math.round(screenX * invMat.b + screenY * invMat.d + invMat.f),
    }; 
    }*/
  }

  tabHasFocus() {
    return document.hasFocus();
  }
}

export const controls = new Controls();
