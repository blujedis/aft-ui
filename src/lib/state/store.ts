
import { writable, type Readable, type Subscriber, type Unsubscriber, type Writable } from 'svelte/store';

import { storage } from './storage';

interface Store<T> {
  subscribe: Readable<T>['subscribe'],
  set: Writable<T>['set'],
}

export interface PersistentStore<T> extends Store<T> {
  usePersistence: (fn?: Subscriber<T>) => Unsubscriber;
  resetPersistence: () => void;
}

export function createStore<T>(def?: T): Store<T> {
  const { subscribe, set } = writable(def);
  return {
    subscribe,
    set
  };
}

export function createPersistentStore<T>(key: string, def?: T): PersistentStore<T> {

  const { subscribe, set } = writable(def);

  return {
    subscribe,
    set,
    usePersistence: (fn?: Subscriber<T>): Unsubscriber => {
      const storageValue = storage.get<T>(key);
      if (storageValue)
        set(storageValue);
      const unsubscriber = subscribe(current => {
        storage.set(key, current);
        if (fn) fn(current);
      });
      return unsubscriber;
    },
    resetPersistence: () => {
      storage.remove(key);
    }
  }

}