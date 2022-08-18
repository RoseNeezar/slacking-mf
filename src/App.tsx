import React from "react";
import { useStorageHook } from "./hooks/useStorageHook";

function App() {
  const [data, setData] = useStorageHook("name");

  return (
    <div className="bg-red-300 h-screen">
      <button onClick={() => setData(`rando-${Math.random() * 10}`)}>
        Update
      </button>
      hello - {data}
    </div>
  );
}

export default App;
