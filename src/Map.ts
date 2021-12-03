import { Base } from "./entities/terrain/Base";
import { GridRenderable } from "./interfaces/GridRenderable";
import { Rock } from "./entities/terrain/Rock";
import { Point } from "./interfaces/Point";
import { easyAStar } from "./tools/astar";
import { randIndex } from "./tools/helphers";
import { enemyManager } from "./EnemyManager";
import { EventEmitter } from "./tools/EventEmitter";
import { drawRoundedSquare } from "./tools/shapes";
import { queryParamsManager } from "./QueryParamsManager";

class Map extends EventEmitter {
  public static GRID_W = 25;
  public static GRID_H = 25;
  public static OBSTACLES = 150;
  public grid: (GridRenderable | 0 | 1)[][] = new Array(Map.GRID_W)
    .fill(0)
    .map(() => new Array(Map.GRID_H).fill(0));
  public static TILE_SIZE: number = 40;
  public homeBase: Base;
  public tick: number;
  public enemyBases: Base[] = [];
  private pathsCache: { [k: string]: Point[] | false } = {};
  public waves: { frequency: number; current: number; amplitude: number; }[] = [];

  constructor() {
    super();
    this.homeBase = this.addBase(
      Math.floor(Map.GRID_W / 2),
      Math.floor(Map.GRID_H / 2),
      true
    );

    const difficulty = queryParamsManager.getDifficulty();

    this.enemyBases.push(this.addBase(4, Map.GRID_H - 5));
    if (difficulty > 1) this.enemyBases.push(this.addBase(Map.GRID_W - 5, 4));
    if (difficulty > 2)
      this.enemyBases.push(this.addBase(Map.GRID_W - 5, Map.GRID_H - 5));
    if (difficulty > 3) this.enemyBases.push(this.addBase(4, 4));

    for (let i = 0; i < Map.OBSTACLES; i++) {
      this.addElement(randIndex(this.grid), randIndex(this.grid[0]), Rock);
    }

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

  drawGrid(ctx: CanvasRenderingContext2D) {
    const gridWidth = Map.GRID_W * Map.TILE_SIZE;
    const gridHeight = Map.GRID_H * Map.TILE_SIZE;

    const fullWith = document.body.clientWidth;
    const fullHeight = document.body.clientHeight;

    /* ctx.fillStyle = '#07737a'
        ctx.fillRect(0, 0, gridWidth, gridHeight); */

    this.waves.forEach((wave) => {
      const getY = (x: number) => {
        // Offset by half the canvas to start, and add the extra offset at the end.
        return (
            fullHeight / 2 -
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
      for (let x = 1; x < fullWith; x++) {
        ctx.lineTo(x, getY(x));
      }
      ctx.stroke();

      // Close the shape around the bottom of the canvas.
      ctx.lineTo(fullWith, fullHeight);
      ctx.lineTo(0, fullHeight);
      ctx.closePath();
      ctx.fill();

      this.tick += .01;

      console.log(wave);
    });

    ctx.strokeStyle = "#25272b";
    ctx.lineWidth = 1;
    ctx.beginPath();

    for (let x = 0; x < Map.GRID_W; ++x) {
      ctx.moveTo(x * Map.TILE_SIZE, 0);
      ctx.lineTo(x * Map.TILE_SIZE, gridHeight);
    }
    for (let y = 0; y < Map.GRID_H; ++y) {
      ctx.moveTo(0, y * Map.TILE_SIZE);
      ctx.lineTo(gridWidth, y * Map.TILE_SIZE);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "#4a4a4e";
    ctx.lineWidth = 3;
    drawRoundedSquare(ctx, 0, 0, gridWidth, gridHeight, 4);
    ctx.stroke();
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let x = 0; x < this.grid.length; ++x) {
      for (let y = 0; y < this.grid[x].length; ++y) {
        const element = this.grid[x][y];

        if (element instanceof GridRenderable && !(element instanceof Base)) {
          element.draw(ctx);
        }
      }
    }

    this.homeBase.draw(ctx);
    this.enemyBases.forEach((b) => b.draw(ctx));
  }

  pathFind(i: number, j: number) {
    return easyAStar(
      (x, y) => {
        return (
          this.grid[x] &&
          this.grid[x][y] !== undefined &&
          (this.grid[x][y] === 0 ||
            (<GridRenderable>this.grid[x][y]).traversable)
        );
      },
      { x: i, y: j },
      {
        x: this.homeBase.i,
        y: this.homeBase.j,
      }
    );
  }

  getPathFromGridCell(i: number, j: number) {
    const key = `${i}-${j}`;
    const fromCache = this.pathsCache[key];

    if (fromCache !== undefined) {
      return fromCache;
    } else {
      let path = this.pathFind(i, j);

      if (path) {
        path = path.map((value) => ({
          x: value.x * Map.TILE_SIZE + Map.TILE_SIZE / 2,
          y: value.y * Map.TILE_SIZE + Map.TILE_SIZE / 2,
        }));
      }

      return (this.pathsCache[key] = path);
    }
  }

  invalidatePathsCache() {
    this.pathsCache = {};
  }

  addElement(
    i: number,
    j: number,
    elementClass: new (...args: any[]) => GridRenderable
  ): boolean {
    if (this.canBePlaced(i, j)) {
      this.grid[i][j] = new elementClass(i, j, Map.TILE_SIZE);
      this.invalidatePathsCache();
      this.emit("added");
      return true;
    }
    return false;
  }

  addBase(i: number, j: number, isHome = false): Base {
    const base = new Base(i, j, Map.TILE_SIZE, isHome);
    this.grid[i][j] = base;
    return base;
  }

  canBePlaced(i: number, j: number) {
    if (this.grid[i] && this.grid[i][j] === 0) {
      this.grid[i][j] = 1;
      const canBePlaced =
        this.enemyBases.every((base) => this.pathFind(base.i, base.j)) &&
        enemyManager.canAllReachBase();
      this.grid[i][j] = 0;
      return canBePlaced;
    } else {
      return false;
    }
  }

  update() {
    this.grid.forEach((row) =>
      row.forEach((el) => {
        if (el !== 0 && el !== 1) {
          el.update();
        }
      })
    );
  }

  canvasCoordinateToGridIndex(n: number) {
    return Math.floor(n / Map.TILE_SIZE);
  }
}

const map = new Map();
export { map, Map };
