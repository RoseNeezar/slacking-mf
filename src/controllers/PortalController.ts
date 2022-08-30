import EntityController from "./EntityController";
import SpawnerController from "./SpawnerController";
import WorldController from "./WorldController";

export default class PortalController extends EntityController {
  attributes = {
    name: "Portal",
    color: "black",
    ascii: ">",
    offset: { x: 2, y: 2 },
  };
  action(verb: string, world: WorldController): void {
    if (verb === "bump") {
      world.addToHistory("You enter the portal");
      world.createCellularMap();
      world.playerEntity.x = 0;
      world.playerEntity.y = 0;
      world.initEntity(world.playerEntity);
      world.entities = world.entities.filter((e) => {
        return e === world.playerEntity;
      });
      let spawner = new SpawnerController(world);
      spawner.spawnLoot(10);
      spawner.spawnMonster(6);
      spawner.spawnPortal();
    }
  }
}
