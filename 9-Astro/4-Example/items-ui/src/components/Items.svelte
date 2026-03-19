<script>
	let name = "";
	const getItems = async () => {
		const response = await fetch("/api/items");
		return await response.json();
	};

	let itemsPromise = getItems();

	const addItem = async () => {
		if (name.length == 0) {
			return;
		}

		const newItem = { name };

		await fetch("/api/items", {
			method: "POST",
			body: JSON.stringify(newItem),
		});

		name = "";

		itemsPromise = getItems();
	};
</script>

<h1>Items</h1>

<input type="text" bind:value={name} />
<button on:click={addItem}>Add item</button>

{#await itemsPromise}
	<p>Loading items</p>
{:then items}
	{#if items.length == 0}
		<p>No items available</p>
	{:else}
		<ul>
			{#each items as item}
				<li>{item.name}</li>
			{/each}
		</ul>
	{/if}
{/await}
