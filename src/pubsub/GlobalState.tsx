import React, { useContext, useState } from "react";
import createPubSub, { PubSub } from "./createPubSub";

export interface GameObjectContextValue extends PubSub {}

export const GameObjectContext =
  React.createContext<GameObjectContextValue | null>(null);

export interface GameObjectProps {
  children?: React.ReactNode;
}

export const GameObject = ({ children }: GameObjectProps) => {
  const [pubSub] = useState(() => createPubSub());

  const contextValue: GameObjectContextValue = {
    ...pubSub,
  };

  return (
    <GameObjectContext.Provider value={contextValue}>
      {children}
    </GameObjectContext.Provider>
  );
};

export const useGameObject = () => {
  return useContext(GameObjectContext) as GameObjectContextValue;
};
