<script>
	import { count } from './countStore.js';
	const increment = () => {
		$count++;
	};
</script>

<button on:click={increment}>{$count}</button>
