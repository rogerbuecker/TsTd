import { GridRenderable } from "../../interfaces/GridRenderable";
import { drawRoundedSquare } from "../../tools/shapes";
import { colors } from "../../config.json";
import { game } from "../../Game";
import { Map } from "../../Map";

export class Base extends GridRenderable {
  private colors: { primary: string; secondary: string };
  public traversable = true;
  image: HTMLImageElement = new Image();
  private isHome: boolean;
  private maxLife: number = 15;
  private life: number = this.maxLife;
  protected healthBar = {
    yOffset: 23,
    width: Map.TILE_SIZE * 0.8,
    height: 3,
    borderRadius: 1.5,
  };

  constructor(x: number, y: number, width: number, isHome = false) {
    super(x, y, width);
    this.colors = isHome ? colors.homeBase : colors.enemyBase;
    this.isHome = isHome;
    this.image.src = "public/img/base.png";
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.colors.primary;
    ctx.fillRect(this.x, this.y, this.width, this.width);

    ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.x + 6,
      this.y + 6,
      this.width - 12,
      this.width - 12
    );

    if (this.isHome && this.life < this.maxLife) {
      this.drawHealthBar(ctx);
    }
  }

  handleDamage() {
    if (--this.life <= 0) {
      game.gameOver();
    }
  }

  private drawHealthBar(ctx: CanvasRenderingContext2D) {
    const ratio = this.life / this.maxLife;
    ctx.fillStyle = "#4a4a4e";
    drawRoundedSquare(
      ctx,
      this.center.x - this.healthBar.width / 2,
      this.center.y + this.healthBar.yOffset,
      this.healthBar.width,
      this.healthBar.height,
      this.healthBar.borderRadius
    );
    ctx.fill();

    if (this.life > 0) {
      ctx.fillStyle = this.colors.primary;
      drawRoundedSquare(
        ctx,
        this.center.x - this.healthBar.width / 2,
        this.center.y + this.healthBar.yOffset,
        this.healthBar.width * ratio,
        this.healthBar.height,
        this.healthBar.borderRadius
      );
      ctx.fill();
    }
  }
}
