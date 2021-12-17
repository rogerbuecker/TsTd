import { Map } from "./Map";
import { canvas } from "./Canvas";
import { controls } from "./Controls";
import { towerPlacer } from "./TowerPlacer";

export class Camera {
  cameraOffset = {
    x: 0,
    y: 0,
  };

  gridOffset = {
    x: (Map.TILE_SIZE * Map.GRID_W) / 2,
    y: (Map.TILE_SIZE * Map.GRID_H) / 2,
  };

  cameraZoom: number = 1;
  cameraRotation: number = 0;

  static MAX_ZOOM: number = 2.5;
  static MIN_ZOOM: number = 0.5;

  static DELTA_MOVE: number = 100;
  static SCROLL_SENSITIVITY: number = 0.1;
  static ROTATION_SENSITIVITY: number = 0.15;

  private isDragging: boolean = false;
  private isRotating: boolean = false;

  private rotateStart: number = 0;
  private dragStart: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    controls.on(
      "keydown:ARROWUP",
      () => (this.cameraOffset.y -= Camera.DELTA_MOVE)
    );
    controls.on(
      "keydown:ARROWDOWN",
      () => (this.cameraOffset.y += Camera.DELTA_MOVE)
    );
    controls.on(
      "keydown:ARROWRIGHT",
      () => (this.cameraOffset.x += Camera.DELTA_MOVE)
    );
    controls.on(
      "keydown:ARROWLEFT",
      () => (this.cameraOffset.x -= Camera.DELTA_MOVE)
    );
    controls.on("wheel:up", () => {
      this.cameraZoom += Camera.SCROLL_SENSITIVITY;
      this.cameraZoom = Math.min(this.cameraZoom, Camera.MAX_ZOOM);
      this.cameraZoom = Math.max(this.cameraZoom, Camera.MIN_ZOOM);
    });
    controls.on("wheel:down", () => {
      this.cameraZoom -= Camera.SCROLL_SENSITIVITY;
      this.cameraZoom = Math.min(this.cameraZoom, Camera.MAX_ZOOM);
      this.cameraZoom = Math.max(this.cameraZoom, Camera.MIN_ZOOM);
    });

    controls.on("mousedown:LEFT", () => {
      if (!towerPlacer.placing) {
        this.isDragging = true;
        this.dragStart = {
          x: controls.mouse.x - this.cameraOffset.x,
          y: controls.mouse.y - this.cameraOffset.y,
        };
      }
    });
    controls.on("mouseup:LEFT", () => {
      this.isDragging = false;
    });

    controls.on("mousedown:RIGHT", () => {
      this.isRotating = true;
      this.rotateStart = controls.mouse.x - this.cameraRotation;
    });
    controls.on("mouseup:RIGHT", () => {
      this.isRotating = false;
    });
  }

  update(): void {
    if (this.isDragging) {
      this.cameraOffset = {
        x: controls.mouse.x - this.dragStart.x,
        y: controls.mouse.y - this.dragStart.y,
      };
    }

    if (this.isRotating) {
      this.cameraRotation = controls.mouse.x - this.rotateStart;
    }
  }

  process(ctx: CanvasRenderingContext2D): void {
    ctx.translate(this.cameraOffset.x, this.cameraOffset.y);

    ctx.translate(
      window.innerWidth / 2 - this.gridOffset.x,
      window.innerHeight / 2 - this.gridOffset.y
    );

    ctx.translate(this.gridOffset.x, this.gridOffset.y);

    ctx.rotate(-this.degreesToRadians(this.cameraRotation) * Camera.ROTATION_SENSITIVITY);
    ctx.scale(this.cameraZoom, this.cameraZoom);

    ctx.translate(-this.gridOffset.x, -this.gridOffset.y);

    canvas.updateTransformMatrix();
  }

  private degreesToRadians(degrees: number) {
    return (Math.PI * degrees) / 180;
  }
}

export const camera = new Camera();
