import React, { FC } from "react";

interface IGame {
  width: number;
  height: number;
  tileSizr: number;
}

const Game: FC<IGame> = ({ height, tileSizr, width }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    console.log("Canvas");
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width * tileSizr, height * tileSizr);
    ctx.fillStyle = "#";
    ctx.fillRect(12, 0, 16, 16);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width * tileSizr}
      height={height * tileSizr}
      className="border-2 border-solid border-black"></canvas>
  );
};

export default Game;
