<script>
	let item = "";
	const getTodos = async () => {
		const response = await fetch("/api/todos");
		return await response.json();
	};

	let todosPromise = getTodos();

	const addTodo = async () => {
		if (item.length == 0) {
			return;
		}

		await fetch("/api/todos", {
			method: "POST",
			body: JSON.stringify({ item }),
		});

		item = "";

		todosPromise = getTodos();
	};

	const removeTodo = async (id) => {
		await fetch(`/api/todos/${id}`, {
			method: "DELETE",
		});

		todosPromise = getTodos();
	};
</script>

<h1>Todos</h1>

<input type="text" bind:value={item} />
<button on:click={addTodo}>Add todo</button>

{#await todosPromise}
	<p>Loading todos</p>
{:then todos}
	{#if todos.length == 0}
		<p>No todos available</p>
	{:else}
		<ul>
			{#each todos as todo}
				<li>
					{todo.item}
					<button on:click={() => removeTodo(todo.id)}>Remove todo</button>
				</li>
			{/each}
		</ul>
	{/if}
{/await}
