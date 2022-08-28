import create from "zustand";
import { combine } from "zustand/middleware";

interface IPlayer {
  x: number;
  y: number;
  size: number;
}

export const usePlayerStore = create(
  combine({ x: 0, y: 0, size: 10 }, (set, get) => ({
    setPlayer: (data: IPlayer) => {
      set((s) => ({
        ...data,
      }));
    },
    move: (dx: number, dy: number) => {
      set((s) => ({
        x: (s.x += dx),
        y: (s.y += dy),
      }));
    },
    draw: (context: CanvasRenderingContext2D) => {
      context.fillStyle = "#f00";
      context.textBaseline = "hanging";
      context.font = "16px";
      // steps can take
      context.fillText("@", get().x * get().size, get().y * get().size);
    },
  }))
);
