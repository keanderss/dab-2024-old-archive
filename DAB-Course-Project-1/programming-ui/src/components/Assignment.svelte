<script>
    import { userUuid } from "../stores/stores.js";
    
    let n = 1;
    let code = "";
    let assessmentPromise;

    const getAssignment = async (n) => {
        const response = await fetch(`/api/assignments/${n}`)
        return await response.json();
    }

    let assignmentPromise = getAssignment(n);

    const gradeAssignment = async () => {
        const data = {
            user: $userUuid,
            code: code,
        }

        const response = await fetch(`/api/grade/${n}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        assessmentPromise = await response.json();
        
    }
    // Further implementation notes
    // When the assignment is completed and you get
    // a correct confirmation from the server
    // A fetch is triggered that attempts to pull the
    // next assignment 
</script>

{#await assignmentPromise}
	<p>Loading assignments...</p>
{:then assignment}
	{#if assignment.length == 0}
		<p>Assignment {n} not found</p>
	{:else}
        <h1>{assignment[0].title}</h1>
        <p>{assignment[0].handout}</p>
        <textarea class="w-full h-1/2" type="text" bind:value={code}></textarea>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded m-4" on:click={gradeAssignment}>Submit</button>
	{/if}
{/await}
<p>Assessment:</p>
{#await assessmentPromise}
    <p>{assessmentPromise}</p>
    <p>{JSON.stringify(assessmentPromise)}</p>
{:then assessment}
    {#if assessment}
        <p>{assessmentPromise}</p>
        <p>{JSON.stringify(assessmentPromise)}</p>
        <p>{assessment}</p>
        <p>{JSON.stringify(assessment)}</p>
        <p>{assessment.result}</p>
    {/if}
{/await}