<script>import { colormodDefaults as defaults } from "./module";
import { useColorMode } from "../../hooks";
export let { modeKey, preferKey } = {
  ...defaults
};
const store = useColorMode();
const { toggle, reset } = store;
function subscribe(fn) {
  return store.subscribe((s) => fn(s, store));
}
</script>

<slot {store} checked={$store} {toggle} {reset} {subscribe} />
