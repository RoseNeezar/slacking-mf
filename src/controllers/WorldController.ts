import { Map } from "rot-js";
import Player from "./PlayerController";

interface IWorld {
  width: number;
  height: number;
  tileSize: number;
}

export default class WorldController {
  width: number;
  height: number;
  tileSize: number;
  worldMap: number[][];
  entities: unknown[];

  constructor({ height = 1, tileSize = 20, width = 1 }: Partial<IWorld> = {}) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.worldMap = new Array(this.width);
    for (let i = 0; i < this.width; i++) {
      this.worldMap[i] = new Array(this.height);
    }
    this.entities = [
      new Player({
        x: 0,
        y: 0,
        size: tileSize,
      }),
    ];
  }

  get playerEntity() {
    return this.entities[0] as Player;
  }

  movePlayer(dx: number, dy: number) {
    let tmpPlayer = this.playerEntity.copyPlayer();
    tmpPlayer.move(dx, dy);

    const entity = this.getEntityAtLocation(tmpPlayer.x, tmpPlayer.y) as any;
    if (entity) {
      entity.action("bump", this);
      return;
    }

    if (this.isWall(tmpPlayer.x, tmpPlayer.y)) {
      console.log("hit walls");
    } else {
      this.playerEntity.move(dx, dy);
    }
  }

  initEntity(entity: any) {
    for (let x = entity.x; x < this.width; x++) {
      for (let y = entity.y; y < this.height; y++) {
        if (this.worldMap[x][y] === 0) {
          entity.x = x;
          entity.y = y;
          return;
        }
      }
    }
  }

  add(entity: any) {
    this.entities.push(entity);
  }

  remove(entity: any) {
    this.entities = this.entities.filter((e) => e !== entity);
  }

  createCellularMap() {
    const map = new Map.Cellular(this.width, this.height);
    map.randomize(0.5);
    const userCallback = (x: number, y: number, value: number) => {
      if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
        this.worldMap[x][y] = 1; //walls
        return;
      }
      this.worldMap[x][y] = value === 0 ? 1 : 0;
    };
    map.create(userCallback);
    map.connect(userCallback, 1);
  }

  draw(context: CanvasRenderingContext2D) {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.worldMap[i][j] === 1 && this.drawWall(context, i, j);
      }
    }

    this.entities.forEach((e: any) => {
      e.draw(context);
    });
  }

  drawWall(context: CanvasRenderingContext2D, x: number, y: number) {
    context.fillStyle = "#000";
    context.fillRect(
      x * this.tileSize,
      y * this.tileSize,
      this.tileSize,
      this.tileSize
    );
  }

  isWall(x: number, y: number) {
    return (
      this.worldMap[x] === undefined ||
      this.worldMap[y] === undefined ||
      this.worldMap[x][y] === 1
    );
  }

  getEntityAtLocation(x: number, y: number) {
    return this.entities.find((e: any) => e.x === x && e.y === y);
  }
}
