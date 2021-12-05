import { EventEmitter } from "./tools/EventEmitter";
import { canvas } from "./Canvas";

class Controls extends EventEmitter {
  private element: HTMLElement;
  private bounds: DOMRect;
  public mouse = { x: 0, y: 0 };
  mouseInCanvas = false;

  constructor() {
    super();
    this.element = canvas.getElement();
    this.bounds = this.element.getBoundingClientRect();
    canvas.on(
      "resize",
      () => (this.bounds = this.element.getBoundingClientRect())
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

    canvas
      .getElement()
      .addEventListener("mouseenter", () => (this.mouseInCanvas = true));
    canvas
      .getElement()
      .addEventListener("mouseleave", () => (this.mouseInCanvas = false));
    canvas.getElement().addEventListener(
      "wheel",
      (e) => {
        if (e.deltaY > 0) {
          this.emit("wheel:down");
        } else if (e.deltaY < 0) {
          this.emit("wheel:up");
        }
      },
      { passive: true }
    );
  }

  boundMouseCoordinates(e: MouseEvent) {
    const screenX =
      (e.clientX - this.bounds.left) *
      (this.element.clientWidth / this.bounds.width);
    const screenY =
      (e.clientY - this.bounds.top) *
      (this.element.clientHeight / this.bounds.height);

    const transform = canvas.getCtx().getTransform();
    if (transform.isIdentity) {
      return {
        x: screenX,
        y: screenY,
      };
    } else {
      const invMat = transform.invertSelf();
      return {
        x: Math.round(screenX * invMat.a + screenY * invMat.c + invMat.e),
        y: Math.round(screenX * invMat.b + screenY * invMat.d + invMat.f),
      };
    }
  }

  tabHasFocus() {
    return document.hasFocus();
  }
}

export const controls = new Controls();
