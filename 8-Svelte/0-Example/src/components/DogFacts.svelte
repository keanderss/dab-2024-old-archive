<script>
	let fact = "";
	const fetchFact = async () => {
		const res = await fetch('https://dogapi.dog/api/v2/facts');
		const json = await res.json();
		fact = json.data[0].attributes.body;
	};
</script>

<button on:click={fetchFact}>Fetch a dog fact</button>

<p>{fact}</p>
