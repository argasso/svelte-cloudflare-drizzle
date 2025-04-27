<script lang="ts">
    let { data } = $props();


</script>
<h1>Products</h1>
{#each data.products as product}
    <div><a href={`/admin/products/${product.id}`}>{product.title}</a></div>
{/each}