<script>
import { page } from "$app/state";
import SuperDebug from "sveltekit-superforms";
</script>

<div class="gutters whitespace-break-spaces py-10">
	<h1>{page.error.code}: {page.error.name}</h1>
	<SuperDebug label={page.error.name} data={{
		id: page.error.id,
		code: page.error.code,
		message: page.error.message,
	}} status={false} />
	{#if page.error.location}
		<SuperDebug label="Location" data={page.error.location} />
	{/if}
	{#if page.error.pluginCode}
		<div class="super-debug">
			<div class="super-debug--status">
				<div class="super-debug--label">Code</div>
			</div>
			<pre class="super-debug--pre super-debug--with-label super-debug--code"><code class="string">{page.error.pluginCode.trim()}</code></pre>
		</div>
	{/if}
	{#if page.error.stack}
		<div class="super-debug">
			<div class="super-debug--status">
				<div class="super-debug--label">Stack Trace</div>
			</div>
			<pre class="super-debug--pre super-debug--with-label super-debug--code"><code class="string">{page.error.stack.trim()}</code></pre>
		</div>
	{/if}
</div>