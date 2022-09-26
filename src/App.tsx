import React, { useState } from "react";
import Game from "./Game";
import { CleaEvent, MovingEvent } from "./pubsub/createPubSub";
import { useGameObject, GameObject } from "./pubsub/GlobalState";
import useGameObjectEvent from "./pubsub/useGameObjectEvent";

const Layer = () => {
  const { publish } = useGameObject();
  return (
    <button
      onClick={() =>
        publish<MovingEvent>("moving", {
          currentPosition: Math.floor(Math.random() * 10),
        })
      }>
      CLick Layer 1
    </button>
  );
};

const Layer2 = () => {
  const { publish } = useGameObject();
  return (
    <button
      onClick={() =>
        publish<CleaEvent>("clea", {
          fast: `new number${Math.floor(Math.random() * 100)} `,
        })
      }>
      CLick Layer2
    </button>
  );
};
const Stuff = () => {
  const [first, setFirst] = useState(0);
  useGameObjectEvent<MovingEvent>("moving", ({ currentPosition }) => {
    setFirst(currentPosition);
  });
  console.log("RERENDER Stuff 1");
  return <div>{first}</div>;
};
const Stuff2 = () => {
  const [first, setFirst] = useState("");
  useGameObjectEvent<CleaEvent>("clea", ({ fast }) => {
    console.log("Gas--", fast);

    // setFirst(fast);
  });
  console.log("RERENDER Stuff 2");
  return <div>{first}</div>;
};

const App = () => {
  return (
    <GameObject>
      <div className="flex flex-col h-screen p-2 bg-gray-800">
        <div className="">hello</div>
        <Layer />
        <Layer2 />
        <Stuff />
        <Stuff2 />
      </div>
    </GameObject>
  );
};

export default App;
