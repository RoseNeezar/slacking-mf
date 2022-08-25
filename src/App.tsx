import React from "react";
import Game from "./Game";

const App = () => {
  return (
    <div className="p-2">
      <Game height={40} width={40} tileSizr={16} />
    </div>
  );
};

export default App;
