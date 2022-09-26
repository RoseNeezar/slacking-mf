export interface PubSubEvent<EventName = string, Data = unknown> {
  name: EventName;
  data: Data;
}

export type PubSubHandler<T = unknown> = (data: T) => void | Promise<unknown>;

export type MovingEvent = PubSubEvent<
  "moving",
  {
    currentPosition: number;
  }
>;
export type CleaEvent = PubSubEvent<
  "clea",
  {
    fast: string;
  }
>;

export default function createPubSub() {
  const events: { [name: string]: PubSubHandler[] } = {};

  async function publish<T extends PubSubEvent>(
    name: T["name"],
    data?: T["data"]
  ) {
    const handlers = events[name];
    if (handlers == null) return false;

    await Promise.all(handlers.slice().map((handler) => handler(data)));
    return true;
  }

  function unsubscribe<T extends PubSubEvent>(
    name: T["name"],
    handler: PubSubHandler<T["data"]>
  ) {
    const handlers = events[name];
    if (handlers == null) return;

    const index = handlers.indexOf(handler);
    handlers.splice(index, 1);
  }

  function subscribe<T extends PubSubEvent>(
    name: T["name"],
    handler: PubSubHandler<T["data"]>
  ) {
    if (events[name] == null) {
      events[name] = [];
    }
    events[name].push(handler);

    return () => unsubscribe(name, handler);
  }

  return {
    publish,
    subscribe,
  };
}

export type PubSub = ReturnType<typeof createPubSub>;
