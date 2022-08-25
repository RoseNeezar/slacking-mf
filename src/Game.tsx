import React, { FC, useCallback } from "react";
import InputManager from "./controllers/inputManager";

interface IGame {
  width: number;
  height: number;
  tileSizr: number;
}

const Game: FC<IGame> = ({ height, tileSizr, width }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [player, setPlayer] = React.useState({ x: 64, y: 128 });
  let inputManager = React.useMemo(() => new InputManager(), []);

  const handleInput = useCallback(
    (action: string, data: { x: number; y: number }) => {
      const newPlayer = structuredClone(player);
      newPlayer.x += data.x * tileSizr;
      newPlayer.y += data.y * tileSizr;
      setPlayer(newPlayer);
    },
    [player, tileSizr]
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
    ctx.fillStyle = "#";
    ctx.fillRect(player.x, player.y, tileSizr, tileSizr);
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
