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
</script>

<style>

</style>

<svelte:head>
  <title>Planets overview</title>
</svelte:head>

<h1>Planet overview</h1>

<p>Soon here will be a list of your planets</p>
<ul>
  {#each planets as { id, name }}
    <li>
      <a href="/planet/{id}">{name}</a>
    </li>
  {/each}

</ul>
