import { Map } from "rot-js";
import create from "zustand";
import { combine } from "zustand/middleware";
import Player from "../controllers/PlayerController";

interface IWorld {
  width: number;
  height: number;
  tileSize: number;
}

export const useWorldStore = create(
  combine(
    {
      width: 0,
      height: 0,
      tileSize: 10,
      worldMap: [] as number[][],
      entities: [] as unknown[],
    },
    (set, get, store) => ({
      initWorld: (data: IWorld) => {
        let worldMapTmp = new Array(data.width);
        for (let i = 0; i < data.width; i++) {
          worldMapTmp[i] = new Array(data.height);
        }

        set((s) => ({
          ...data,
          worldMap: worldMapTmp,
          entities: [
            new Player({
              x: 0,
              y: 0,
              size: 10,
            }),
          ],
        }));
      },
      createCellularMap: () => {
        const map = new Map.Cellular(get().width, get().height);
        map.randomize(0.5);
        const userCallback = (x: number, y: number, value: number) => {
          if (
            x === 0 ||
            y === 0 ||
            x === get().width - 1 ||
            y === get().height - 1
          ) {
            const tmp = get().worldMap;
            tmp[x][y] = 1;
            set((s) => ({
              worldMap: tmp,
            })); //walls
            return;
          }
          const tmp = get().worldMap;
          tmp[x][y] = [x][y] = value === 0 ? 1 : 0;
          set((s) => ({
            worldMap: tmp,
          }));
        };
        map.create(userCallback);
        map.connect(userCallback, 1);
      },
      movePlayer: (dx: number, dy: number) => {
        const tmp = get().entities as any;
        (tmp[0] as Player).move(dx, dy);

        set((s) => ({
          entities: tmp,
        }));
      },

      draw: (context: CanvasRenderingContext2D) => {
        for (let i = 0; i < get().width; i++) {
          for (let j = 0; j < get().height; j++) {
            get().worldMap[i][j] === 1 &&
              useWorldStore.getState().drawWall(context, i, j);
          }
        }

        get().entities.forEach((e) => {
          (e as Player).draw(context);
        });
      },
      drawWall: (context: CanvasRenderingContext2D, x: number, y: number) => {
        context.fillStyle = "#000";
        context.fillRect(
          x * get().tileSize,
          y * get().tileSize,
          get().tileSize,
          get().tileSize
        );
      },
    })
  )
);
