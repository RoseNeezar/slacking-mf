import React, { FC, useCallback, useRef } from "react";
import InputManager from "./controllers/inputManager";
import SpawnerController from "./controllers/SpawnerController";
import WorldController from "./controllers/WorldController";

interface IGame {
  width: number;
  height: number;
  tileSizr: number;
}

const Game: FC<IGame> = ({ height, tileSizr, width }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const hasRender = useRef<boolean | null>(false);
  const [world, setWorld] = React.useState(
    () =>
      new WorldController({
        height,
        width,
        tileSize: tileSizr,
      })
  );
  let inputManager = React.useMemo(
    () => new InputManager(world.playerEntity),
    [world.playerEntity]
  );

  const handleInput = useCallback(
    (action: string, data: { x: number; y: number }) => {
      const newWorld = new WorldController();
      Object.assign(newWorld, world);
      newWorld.movePlayer(data.x, data.y);
      setWorld(newWorld);
    },
    [world]
  );

  const handleInitWorld = useCallback(() => {
    const newWorld = new WorldController();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.initEntity(world.playerEntity);

    let spawner = new SpawnerController(newWorld);
    spawner.spawnLoot(10);
    setWorld(newWorld);
  }, [world]);

  const handleUpdateWorld = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width * tileSizr, height * tileSizr);
    world.playerEntity.handlePlayerFrame();
    world.draw(ctx);
  }, [world, width, tileSizr, height]);

  React.useEffect(() => {
    if (!hasRender.current) {
      handleInitWorld();
      hasRender.current = true;
    }
  }, [handleInitWorld]);

  React.useEffect(() => {
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  }, [inputManager, handleInput]);

  React.useEffect(() => {
    console.log("Canvas");
    handleUpdateWorld();
  }, [handleUpdateWorld]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width * tileSizr}
        height={height * tileSizr}
        className="border-2 border-solid border-black bg-gray-900"
      />
      <ul>
        {world.playerEntity.inventory.map((r, i) => {
          return <li key={i}>{r.attributes.name}</li>;
        })}
      </ul>
    </>
  );
};

export default Game;
