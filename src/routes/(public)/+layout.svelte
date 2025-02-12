<script>
import Header from "$lib/components/sections/Header.svelte";

/** @type {import('./$types').LayoutProps} */
let { data, children } = $props();
</script>

<Header />
<main id="main" data-uid={data.uid} class="px-[30px] tb:px-[60px]">
	{@render children?.()}
</main>