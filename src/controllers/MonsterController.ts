import EntityController from "./EntityController";
import WorldController from "./WorldController";

export class MonsterController extends EntityController {
  action(verb: string, world: WorldController): void {
    if (verb === "bump") {
      world.addToHistory(`Player attacks ${this.attributes.name}!`);
      this.attributes.health = this.attributes.health - 1;
      if (this.attributes.health <= 0) {
        world.addToHistory(`${this.attributes.name} dies!`);
        world.remove(this);
      } else {
        world.addToHistory(
          `${this.attributes.name}'s health = ${this.attributes.health}`
        );
        world.playerEntity.health = world.playerEntity.health - 1;
        if (world.playerEntity.health <= 0) {
          world.addToHistory("You died");
        } else {
          world.addToHistory(
            `Your current health is ${world.playerEntity.health}`
          );
        }
      }
    }
  }
}
