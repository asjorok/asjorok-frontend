<script>
    
  const planetIds = [ 10, 20, 123 ];
  
</script>

<style>

</style>

<svelte:head>
	<title>Planets overview</title>
</svelte:head>

<h1>Planet overview</h1>

<p>Soon here will be a list of your planets</p>
<ul>
  {#each planetIds as id}
    <li><a href="/planet/{id}">Planet {id}</a></li>
  {/each}
  
</ul>
