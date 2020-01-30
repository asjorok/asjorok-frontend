<script>
    
  import { stores } from "@sapper/app";


  const { page } = stores();
  $: id = Number.parseInt($page.params.id);

  
</script>

<style>

</style>

<svelte:head>
	<title>Planet overview</title>
</svelte:head>

<h1>Planet overview</h1>
<span>This is the id i got: {id}</span>
<a href="/planet/{(id - 1)}">Previous</a>
<a href="/planet/{(id + 1)}">Next</a>
