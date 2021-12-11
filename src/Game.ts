import { gameCtx, backgroundCtx, uiCtx } from "./Canvas";
import { fps } from "./config.json";
import "./Controls";
import { map } from "./Map";
import { camera } from "./Camera";
import { enemyManager } from "./EnemyManager";
import { munitionManager } from "./MunitionManager";
import { controls } from "./Controls";
import { towerPlacer } from "./TowerPlacer";
import "./InterfaceManager";
import "./WavesManager";
import { interfaceManager } from "./InterfaceManager";
import { waveManager } from "./WavesManager";

class Game {
  private updateInterval: number = -1;
  private looping: boolean = true;

  constructor() {
    map.on("added", () => {
      enemyManager.updatePaths();
    });

    this.start();
  }

  start() {
    this.updateInterval = window.setInterval(
      this.updateLoop.bind(this),
      1000 / fps
    );
    requestAnimationFrame(this.drawLoop.bind(this));
    waveManager.start();
  }

  updateLoop() {
    if (controls.tabHasFocus()) {
      camera.update();
      map.update();
      munitionManager.update();
      enemyManager.update();
      towerPlacer.update();
    }
  }

  drawLoop() {
    //uiCtx.save();
    gameCtx.save();
    backgroundCtx.save();

    if(camera.cameraHasChanged()) {
        //uiCtx.clearRect(0, 0, uiCtx.canvas.width, uiCtx.canvas.height);
        gameCtx.clearRect(0, 0, gameCtx.canvas.width, gameCtx.canvas.height);
        backgroundCtx.clearRect(0, 0, backgroundCtx.canvas.width, backgroundCtx.canvas.height);
    };

    camera.process();
    
    map.drawGrid(backgroundCtx);
    map.draw(backgroundCtx);

    enemyManager.draw(gameCtx);
    munitionManager.draw(gameCtx);
    towerPlacer.draw(gameCtx);

    gameCtx.restore();
    backgroundCtx.restore();
    //uiCtx.restore();

    if (this.looping) {
      requestAnimationFrame(this.drawLoop.bind(this));
    }
  }

  gameOver() {
    setTimeout(() => {
      clearInterval(this.updateInterval);
      this.looping = false;
      interfaceManager.showGameOver();
      waveManager.looping = false;
    }, 100);
  }
}

export const game = new Game();
