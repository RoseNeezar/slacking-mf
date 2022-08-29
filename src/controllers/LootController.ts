import EntityController from "./EntityController";
import WorldController from "./WorldController";

export default class LootController extends EntityController {
  action(verb: string, world: WorldController) {
    if (verb === "bump") {
      world.playerEntity.add(this);
      world.remove(this);
    }
    if (verb === "drop") {
      console.log("drop", this);
    }
  }
}
