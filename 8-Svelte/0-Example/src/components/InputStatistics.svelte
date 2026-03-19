<script>
	let numbers = [];
	let number = undefined;
	let sum = 0;
	let count = 0;
	let avg = "No data!";
	$: sum = count > 0 ? sum + numbers[count - 1] : 0;
	$: count = numbers.length;
	$: avg = count > 0 ? sum / count : "No data!";
	const addNumber = () => {
		if (number != undefined) {
			numbers = [...numbers, number];
		}
		number = undefined;
	};
</script>

<h1>Statistics generator</h1>

<input type="number" bind:value={number} />
<button on:click={addNumber}>Add value</button>

<h2>Statistics</h2>

<p>Sum: {sum}</p>
<p>Total numbers: {count}</p>
<p>Average: {avg}</p>

<h2>Numbers entered so far</h2>

<ul>
	{#each numbers as number}
		<li>{number}</li>
	{/each}
</ul>
