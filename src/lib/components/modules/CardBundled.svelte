<script>
import * as Card from "$lib/components/ui/card/index.js";

let {
	data = {},
	class: className,
	children,
	...restProps
} = $props();
</script>

<Card.Root class="aspect-[1/0.82] flex flex-col justify-between shadow-muted" style="box-shadow: 0px 0px 15px 2px var(--tw-shadow-color);">
	<Card.Header>
		<div class="flex items-center justify-between">
			<div class="border rounded-l-full rounded-r-full py-[10px] px-[20px] text-black bg-[var(--pillColor)]" style="--pillColor:#{(data.status.indexOf("Unbundling") > -1) ? "C7F8FF" : "E0FFC7"}">{data.status}</div>
		</div>
	</Card.Header>
	<Card.Content class="space-y-[15px]">
		<Card.Title class="text-[54px] leading-[65px] font-[500]">{data.name}</Card.Title>
		<Card.Description class="text-[20px] leading-[24px] font-[500] text-foreground/30">{data.description}</Card.Description>
	</Card.Content>
	<Card.Footer class="flex items-end justify-between">
		{#if data.tags?.length > 0}
			<div class="flex items-center justify-start gap-[9px]">
				{#each data.tags as tag}
					<div class="border rounded-l-full rounded-r-full py-[10px] px-[20px]">{tag}</div>
				{/each}
			</div>
		{/if}
		<div class="text-sm text-foreground/30">Last Updated: 03-18-2024</div>
	</Card.Footer>
</Card.Root>
