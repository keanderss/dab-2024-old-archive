<script>
  import { onMount } from "svelte";

  let messages = [];
  let eventSource;

  onMount(() => {
    eventSource = new EventSource("/api/json-sse");
    eventSource.onmessage = (event) => {
      let data = JSON.parse(event.data);
      messages = [...messages, `${data.user}: ${data.message}`];
    };

    return () => {
      if (eventSource.readyState === 1) {
        eventSource.close();
      }
    };
  });
</script>

<h2>Messages</h2>

<ul>
  {#each messages as msg}
    <li>{msg}</li>
  {/each}
</ul>
