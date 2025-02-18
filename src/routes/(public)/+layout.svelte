<script>
import Header from "$lib/components/sections/Header.svelte";
import Footer from "$lib/components/sections/Footer.svelte";

/** @type {import('./$types').LayoutProps} */
let { data, children } = $props();
</script>

<Header />
<main id="main" data-uid={data.uid} class="px-[20px] dk:px-[30px] tb:px-[60px]">
	{@render children?.()}
</main>
<Footer />