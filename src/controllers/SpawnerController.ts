import LootController from "./LootController";
import { MonsterController } from "./MonsterController";
import PortalController from "./PortalController";
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
const monsterTable = [
  {
    name: "Ogre magi",
    color: "darkgrey",
    ascii: "0",
    offset: { x: 6, y: 8 },
    health: 6,
  },
  {
    name: "Anti mage",
    color: "red",
    ascii: "AM",
    offset: { x: 2, y: 1 },
    health: 6,
  },
  {
    name: "Axe",
    color: "yellow",
    ascii: "AX",
    offset: { x: 7, y: 3 },
    health: 6,
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
        x: randomInt(this.world.width - 1),
        y: randomInt(this.world.height - 1),
        size: this.world.tileSize,
        attributes: lootTable[randomInt(lootTable.length)],
      });
    });
  }

  spawnMonster(spawnCount: number) {
    this.spawn(spawnCount, () => {
      return new MonsterController({
        x: randomInt(this.world.width - 1),
        y: randomInt(this.world.height - 1),
        size: this.world.tileSize,
        attributes: monsterTable[randomInt(monsterTable.length)],
      });
    });
  }

  spawnPortal() {
    let portal = new PortalController({
      x: this.world.width - 10,
      y: this.world.height - 10,
      size: this.world.tileSize,
      attributes: {},
    });
    this.world.add(portal);
    this.world.initEntity(portal);
  }
}

const randomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};
