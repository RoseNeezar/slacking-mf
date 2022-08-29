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
  inventory = [] as any[];

  moving = false;

  constructor({ x = 0, y = 0, size = 10 }: Partial<IPlayer> = {}) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    this.image.src = "img/feral.png";
  }

  add(item: unknown) {
    this.inventory.push(item);
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  draw(context: CanvasRenderingContext2D) {
    context.imageSmoothingEnabled = false;
    if (!this.image.complete) {
      return new Promise((resolve) => {
        this.image.onload = () => {
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
          resolve("done");
        };
      });
    }
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
