import React, { FC, useCallback, useRef } from "react";
import InputManager from "./controllers/inputManager";
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
    []
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

  React.useEffect(() => {
    if (!hasRender.current) {
      const newWorld = new WorldController();
      Object.assign(newWorld, world);
      newWorld.createCellularMap();
      newWorld.initEntity(world.playerEntity);
      setWorld(newWorld);

      hasRender.current = true;
    }
  }, [world]);

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
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width * tileSizr, height * tileSizr);
    world.playerEntity.handlePlayerFrame();
    world.draw(ctx);
  }, [width, tileSizr, height, world]);

  return (
    <canvas
      ref={canvasRef}
      width={width * tileSizr}
      height={height * tileSizr}
      className="border-2 border-solid border-black"
    />
  );
};

export default Game;
