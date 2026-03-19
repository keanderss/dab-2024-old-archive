<script>
    import { items } from "./itemStore"
    let item = "";

    const addItem = () => {
        if (item.length > 0) {
            $items = [...$items, item]
            item = "";
        }
    }
</script>

<h2>Add an item</h2>

<input type="text" bind:value={item}/>
<button on:click={addItem}>Add!</button>