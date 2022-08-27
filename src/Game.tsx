import React, { FC, useCallback } from "react";
import InputManager from "./controllers/inputManager";
import Player from "./controllers/PlayerController";

interface IGame {
  width: number;
  height: number;
  tileSizr: number;
}

const Game: FC<IGame> = ({ height, tileSizr, width }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  let inputManager = React.useMemo(() => new InputManager(), []);

  const [player, setPlayer] = React.useState(
    () => new Player({ x: 0, y: 2, size: tileSizr })
  );

  const handleInput = useCallback(
    (action: string, data: { x: number; y: number }) => {
      const newPlayer: Player = new Player();
      Object.assign(newPlayer, player);
      newPlayer.move(data.x, data.y);
      setPlayer(newPlayer);
    },
    [player]
  );

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
    player.draw(ctx);
  }, [height, tileSizr, width, player]);

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
