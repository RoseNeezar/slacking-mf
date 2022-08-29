import LootController from "./LootController";
import WorldController from "./WorldController";

const lootTable = [
  { name: "Long Sword", color: "darkgrey", ascii: "/", offset: { x: 6, y: 3 } },
  { name: "Health Potion", color: "red", ascii: "!", offset: { x: 6, y: 3 } },
  { name: "Gold coin", color: "yellow", ascii: "$", offset: { x: 3, y: 3 } },
  {
    name: "Long Armor",
    color: "lightgrey",
    ascii: "#",
    offset: { x: 4, y: 3 },
  },
];

export default class SpawnerController {
  world: WorldController;
  constructor(world: WorldController) {
    this.world = world;
  }

  spawn(spawnCount: number, createEntity: Function) {
    for (let count = 0; count < spawnCount; count++) {
      const entity = createEntity();

      this.world.add(entity);
      this.world.initEntity(entity);
    }
  }

  spawnLoot(spawnCount: number) {
    this.spawn(spawnCount, () => {
      return new LootController({
        x: randomInt(this.world.width),
        y: randomInt(this.world.height),
        size: this.world.tileSize,
        attributes: lootTable[randomInt(lootTable.length)],
      });
    });
  }
}

const randomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};
