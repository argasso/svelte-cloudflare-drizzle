<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { productInsertSchema } from '$lib/db/schema';

	let { data } = $props();

	const form = superForm(data.form!, {
		validators: zodClient(productInsertSchema)
	});

	const { form: formData, enhance } = form;

  $inspect(data.form);
</script>

<h1>Product</h1>

<!-- <form method="POST">
    {#if data.entity?.id}
        <input type="hidden" name="id" value={data.entity.id} />
    {/if}
    <input type="text" name="title" value={data.entity?.title} />
    <input type="text" name="description" value={data.entity?.description} />
    <input type="text" name="shopifyId" value={data.entity?.shopifyId} />
    <Button type="submit">Save</Button>
</form> -->
<form method="POST" use:enhance>
	{#if $formData.id}
		<input type="hidden" name="id" value={$formData.id} />
	{/if}
	<Form.Field {form} name="title">
		<Form.Control>
			{#snippet children({ attrs })}
				<Form.Label>Titel</Form.Label>
				<Input {...attrs} bind:value={$formData.title} />
			{/snippet}
		</Form.Control>
		<Form.Description>Bokens titel</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Spara</Form.Button>
</form>
