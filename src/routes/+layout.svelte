<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Party from '$lib/components/Party.svelte';

	// Blobs
	import BlobOne from '$lib/components/blobs/BlobOne.svelte';
	import { generalData } from '$lib/stores/generalData';

	let { children } = $props();
</script>

<BlobOne />

{#if $generalData.partyMode}
	<Party />
{/if}

<div class="flex flex-col lg:flex-row relative z-10">
	<Header />
	<div class="w-full pl-6 lg:pl-[157px]">
		{@render children()}
	</div>
</div>
