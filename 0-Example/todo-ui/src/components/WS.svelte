<script>
  import { onMount } from "svelte";

  let messages = [];
  let ws;

  onMount(() => {
    const host = window.location.hostname;
    ws = new WebSocket("ws://" + host + ":7800/api/json-ws");
    ws.onmessage = (event) => {
      let data = JSON.parse(event.data);
      messages = [...messages, `${data.user}: ${data.message}`]
    }

    return () => {
      if (ws.readySate === 1) {
        ws.close()
      }
    }
  });
</script>

<h2>Messages</h2>

<ul>
  {#each messages as msg}
    <li>{msg}</li>
  {/each}
</ul>