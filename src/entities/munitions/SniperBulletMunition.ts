import {BasicBulletMunition} from "./BasicBulletMunition";

export class SniperBulletMunition extends BasicBulletMunition {
    private counter = 2;

    update() {
        if (--this.counter <= 0) {
            this.alive = false;
            this.dealDamage()
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.emitter.colors.primary
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(this.emitter.center.x, this.emitter.center.y);
        ctx.lineTo(this.target.x, this.target.y);
        ctx.stroke()

    }
}
