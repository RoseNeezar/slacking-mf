interface IPlayer {
  x: number;
  y: number;
  size: number;
}

export default class Player {
  x: number;
  y: number;
  size: number;
  color: string;
  image = new Image();
  width = 82;
  height = 82;
  frameX = 0;
  frameY = 0;

  moving = false;

  constructor({ x = 0, y = 0, size = 10 }: Partial<IPlayer> = {}) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    this.image.src = "img/feral.png";
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  draw(context: CanvasRenderingContext2D) {
    context.imageSmoothingEnabled = false;
    if (!this.image.complete) {
      this.image.onload = () => {
        context.drawImage(
          this.image,
          this.width,
          this.height * this.frameY,
          this.width,
          this.height,
          this.x * this.size,
          this.y * this.size,
          this.size,
          this.size
        );
      };
    } else {
      context.drawImage(
        this.image,
        0,
        this.height * this.frameY,
        this.width,
        this.height,
        this.x * this.size,
        this.y * this.size,
        this.size,
        this.size
      );
    }
  }

  handlePlayerFrame() {
    if (this.frameX < 3) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }

  copyPlayer() {
    const newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}
