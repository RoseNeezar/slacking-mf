import { KeyboardEvent } from "react";
import { KeyboardEventKey } from "../types/keyboardType";

export default class InputManager {
  observers: Function[] = [];

  subscribe(fn: Function) {
    this.observers.push(fn);
  }

  unsubscribe(fn: Function) {
    this.observers = this.observers.filter((sub) => sub != fn);
  }

  broadcast(action: string, data: unknown) {
    this.observers.forEach((sub) => sub(action, data));
  }

  handleKeys = (ev: KeyboardEvent | Event) => {
    ev.preventDefault();
    switch ((ev as KeyboardEvent).key as KeyboardEventKey) {
      case "ArrowLeft":
        this.broadcast("move", { x: -1, y: 0 });
        break;
      case "ArrowUp":
        this.broadcast("move", { x: 0, y: 1 });
        break;
      case "ArrowRight":
        this.broadcast("move", { x: 1, y: 0 });
        break;
      case "ArrowDown":
        this.broadcast("move", { x: 0, y: -1 });
        break;
      default:
        break;
    }
  };

  bindKeys() {
    document.addEventListener("keydown", this.handleKeys);
  }

  unbindKeys() {
    document.removeEventListener("keydown", this.handleKeys);
  }
}
