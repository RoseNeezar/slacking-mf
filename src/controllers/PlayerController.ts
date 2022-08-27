interface IPlayer {
  x: number;
  y: number;
  size: number;
}

export default class Player {
  x: number;
  y: number;
  size: number;

  constructor({ x = 0, y = 0, size = 10 }: Partial<IPlayer> = {}) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "#f00";
    context.textBaseline = "hanging";
    context.font = "16px";
    // steps can take
    context.fillText("@", this.x * this.size, this.y * this.size);
  }
}
