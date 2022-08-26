import React from "react";
import Game from "./Game";

const App = () => {
  return (
    <div className="p-2 bg-gray-800 h-screen">
      <Game height={40} width={40} tileSizr={16} />
    </div>
  );
};

export default App;
