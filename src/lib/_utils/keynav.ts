
export type NavEvent = 'prev' | 'next' | 'first' | 'last' | 'enter' | 'escape';

export type CodeEvent = keyof typeof codeToEvent;

export type EventHandler = (e: KeyboardEvent) => void;

export interface KeyNavOptions {
  items: any[];
  current: number;
  codes: CodeEvent[];
}

const codeToEvent = {
  ArrowUp: 'prev',
  ArrowDown: 'next',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'enter',
  Escape: 'escape'
};

export class Keynav<E extends HTMLElement>{

  element!: E;
  options!: KeyNavOptions;

  max = 0;
  start = -1;
  current = -1;

  events = {
    prev: [] as EventHandler[],
    next: [] as EventHandler[],
    first: [] as EventHandler[],
    last: [] as EventHandler[],
    enter: [] as EventHandler[],
    escape: [] as EventHandler[],
  };

  constructor(element: E, options: Partial<KeyNavOptions>) {
    this.element = element;
    this.options = options as Required<KeyNavOptions>;
  }

  private get codes() {
    return this.options.codes;
  }

  private handler(e: KeyboardEvent) {
    if (e.repeat) return;
    const code = e.code as CodeEvent;
    const eventName = codeToEvent[code] as NavEvent;
    if (eventName && this.codes.includes(code))
      this.events[eventName].forEach(cb => cb(e));
  }

  private unbind() {
    this.element.removeEventListener('keydown', this.handler.bind(this));
  }

  private bind() {
    this.unbind();
    this.element.addEventListener('keydown', this.handler.bind(this));
  }

  init(options: Partial<KeyNavOptions>) {
    options = {
      items: [],
      current: -1,
      codes: ['ArrowUp', 'ArrowDown', 'Enter', 'Escape'] as CodeEvent[],
      ...options
    };
    this.options = options as Required<KeyNavOptions>;
    this.max = Math.max(0, this.options.items.length - 1);
    this.current = Math.max(0, this.options.current - 1);
    this.start = this.options.current;
    this.bind();
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

  escape() {
    return this;
  }

  enter() {
    return this;
  }

  on(key: NavEvent, cb: (e: KeyboardEvent) => void) {
    this.events[key].push(cb);
    return this;
  }

}