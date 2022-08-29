import { KeyboardEvent } from "react";
import { KeyboardEventKey } from "../types/keyboardType";
import Player from "./PlayerController";

export default class InputManager {
  observers: Function[] = [];

  playerEntity: Player;
  constructor(player: Player) {
    this.playerEntity = player;
  }

  subscribe(fn: Function) {
    this.observers.push(fn);
  }

  unsubscribe(fn: Function) {
    this.observers = this.observers.filter((sub) => sub !== fn);
  }

  broadcast(action: string, data: unknown) {
    this.observers.forEach((sub) => sub(action, data));
  }

  handleKeys = (ev: KeyboardEvent | Event) => {
    // ev.preventDefault();
    ev.stopPropagation();
    switch ((ev as KeyboardEvent).key as KeyboardEventKey) {
      case "a":
        this.broadcast("move", { x: -1, y: 0 });
        this.playerEntity.frameY = 1;
        break;
      case "w":
        this.broadcast("move", { x: 0, y: -1 });
        // this.playerEntity.frameY = 3;
        break;
      case "d":
        this.broadcast("move", { x: 1, y: 0 });
        this.playerEntity.frameY = 0;
        break;
      case "s":
        this.broadcast("move", { x: 0, y: 1 });
        // this.playerEntity.frameY = 0;
        break;
      default:
        break;
    }
  };

  bindKeys() {
    document.addEventListener("keydown", this.handleKeys, {});
  }

  unbindKeys() {
    document.removeEventListener("keydown", this.handleKeys);
  }
}
