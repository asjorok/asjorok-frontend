<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`/data/planet/test`);

    if (res.status !== 200) {
      console.log("Fetch error:");
      console.log(await res.json());
      return { planets: [] };
    }

    return await res.json();
  }
</script>

<script>
  export let planets;
  const planetIds = [10, 20, 123];
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
    <li>
      <a href="/planet/{id}">Planet {id}</a>
    </li>
  {/each}

</ul>
<h3>MQ DATA</h3>
<span>{planets}</span>
