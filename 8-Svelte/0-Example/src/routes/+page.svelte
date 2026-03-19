<script>
	import Tasks from '../components/Tasks.svelte';
    import Greeting from "../components/Greeting.svelte";
    import Invitation from '../components/Invitation.svelte';
	import Monitor from '../components/Monitor.svelte';
	import InputStatistics from '../components/InputStatistics.svelte';
	import Counter from '../components/Counter.svelte';
    import TheCount from '../components/TheCount.svelte';
	import ItemApp from '../components/State-management-meets-a-list-of-items/ItemApp.svelte';
	import DogFacts from '../components/DogFacts.svelte';
	import HelloAstro from '../components/HelloAstro.svelte';
    let name = "world";
</script>

<HelloAstro />

<DogFacts />

<ItemApp />

<Tasks />

<Greeting {name}>
    Once upon a time...
</Greeting>

<Invitation name="Alice">
    We cordially invite you to the party!
</Invitation>

<Invitation name="Bob">
    The time is nigh!
</Invitation>

<Monitor>

</Monitor>

<InputStatistics />

<Counter />

<TheCount />