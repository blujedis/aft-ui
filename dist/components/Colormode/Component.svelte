<script>import { useColorMode } from "../../hooks";
export let prefers = void 0;
export let init = false;
const store = useColorMode(init, prefers);
const { set, toggle, reset } = store;
function subscribe(fn) {
  return store.subscribe((s) => fn(s, store));
}
</script>

<slot {store} dark={$store} {set} {toggle} {reset} {subscribe} />
