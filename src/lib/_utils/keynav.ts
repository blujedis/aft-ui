export type NavEvent = 'prev' | 'next' | 'first' | 'last';
export type ArrowEvent = keyof typeof arrowMap;

const arrowMap = {
  ArrowUp: 'prev',
  ArrowDown: 'next',
  ArrowLeft: 'left',
  ArrowRight: 'right'
};

export class Keynav<E extends HTMLElement>{

  element!: E;
  max = 0;
  start = -1;
  current = -1;

  events = {
    prev: [] as ((e: KeyboardEvent) => void)[],
    next: [] as ((e: KeyboardEvent) => void)[],
    first: [] as ((e: KeyboardEvent) => void)[],
    last: [] as ((e: KeyboardEvent) => void)[],
  };

  constructor(element: E, len = 0, current = -1) {
    this.max = Math.max(0, len - 1);
    this.current = Math.max(0, current - 1);
    this.start = current;
    this.bind(element, ['ArrowUp', 'ArrowDown']);
  }

  private bind(element: E, events: ArrowEvent[]) {
    element.addEventListener('keydown', (e) => {
      const code = e.code as ArrowEvent;
      const eventName = arrowMap[code as keyof typeof arrowMap] as NavEvent;
      if (eventName && events.includes(code))
        this.events[eventName].forEach(cb => cb(e));
    });
  }

  prev() {
    this.current = Math.max(0, this.current - 1);
    return this;
  }

  next() {
    this.current = Math.min(this.max, this.current + 1);
    return this;
  }

  first() {
    this.current = 0;
    return this;
  }

  last() {
    this.current = this.max;
  }

  goto(index: number) {
    this.current = index;
    return this;
  }

  reset() {
    this.current = this.start;
    return this;
  }

  on(key: NavEvent, cb: (e: KeyboardEvent) => void) {
    this.events[key].push(cb);
    return this;
  }

}