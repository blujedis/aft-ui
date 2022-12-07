
export type NavEvent = 'prev' | 'next' | 'first' | 'last' | 'enter' | 'escape';

export type CodeEvent = keyof typeof codeToEvent;

export type EventHandler = (active: number, e: KeyboardEvent) => void;

export interface KeyNavOptions {
  items: any[];
  current: number;
  codes: CodeEvent[];
}

const codeToEvent = {
  ArrowUp: 'prev',
  ArrowDown: 'next',
  Enter: 'enter',
  Escape: 'escape'
};

const codes = ['ArrowUp', 'ArrowDown', 'Enter', 'Escape'] as CodeEvent[];

export function useNav<P extends HTMLElement, T>(parent?: P) {

  let _max = 0;
  let _selected = -1;
  let _active = -1;

  const _events = {
    prev: [] as EventHandler[],
    next: [] as EventHandler[],
    first: [] as EventHandler[],
    last: [] as EventHandler[],
    enter: [] as EventHandler[],
    escape: [] as EventHandler[],
  };

  const api = {
    bind,
    unbind,
    init,
    first,
    last,
    prev,
    next,
    select,
    on,
  };

  function init(items: T[], selected?: number) {
    _max = Math.max(0, items.length - 1);
    _selected = selected || -1;
    _active = _selected;
    unbind();
    bind();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.repeat) return;
    const code = e.code as CodeEvent;
    const eventName = codeToEvent[code] as NavEvent;
    if (eventName && codes.includes(code))
      _events[eventName].forEach(cb => cb(_active, e));
  }

  function bind() {
    parent && parent.addEventListener('keydown', onKeyDown);
  }

  function unbind() {
    parent && parent.removeEventListener('keydown', onKeyDown);
  }

  function canNav(next: number) {
    return next >= 0 && next <= _max;
  }

  function first() {
    _active = 0;
    return api;
  }

  function last() {
    _active = _max;
    return api;
  }

  function prev() {
    const next = _active -1;
    if (canNav(next))
      _active = next;
    return api;
  }

  function next() {
    const next = _active + 1;
    if (canNav(next))
      _active = next;
    return api;
  }

  function select(value: number) {
    _active = value;
    return api;
  }

  function on(key: NavEvent, cb: (active: number, e: KeyboardEvent) => void) {
    _events[key].push(cb);
    return api;
  }

  return api;

}