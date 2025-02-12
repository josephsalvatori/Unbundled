<script>
import { dev } from "$app/environment";
import { page } from "$app/state";
import { setContext } from "svelte";
import { ModeWatcher } from "mode-watcher";
import { getFlash } from "sveltekit-flash-message";
import { toast } from "svelte-sonner";
import { Toaster } from "$lib/components/ui/sonner";
import SuperDebug from "sveltekit-superforms";
import { LocalStore } from "$lib/helpers/localStore.svelte.ts";
import "../app.css";

/** @type {import('./$types').LayoutProps} */
let { children } = $props();

const flash = getFlash(page);

$effect(() => {

	if(!$flash) return;

	switch($flash.type) {
		case "success":
			toast.success($flash.message);
			break;
		case "error":
			toast.error($flash.message);
			break;
		case "info":
		default:
			toast.info($flash.message);
			break;
	}

	$flash = undefined;
});

let siteState = new LocalStore("siteState",{
	showAchievements: false,
	showNavigation: false,
});

setContext("siteState", siteState);
</script>

<ModeWatcher />
<Toaster richColors position="bottom-center" />

{@render children?.()}