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
			<div class="border rounded-l-full rounded-r-full text-[16px] py-[6px] px-[14px] dk:text-[20px] dk:py-[10px] dk:px-[20px] text-black bg-[var(--pillColor)]" style="--pillColor:#{(data.status.indexOf("Unbundling") > -1) ? "C7F8FF" : "E0FFC7"}">{data.status}</div>
		</div>
	</Card.Header>
	<Card.Content class="space-y-[15px]">
		<Card.Title class="text-[32px] leading-[36px] dk:text-[54px] dk:leading-[65px] font-[500]">{data.name}</Card.Title>
		<Card.Description class="text-[16px] leading-[22px] dk:text-[20px] dk:leading-[24px] font-[500] text-foreground/30">{data.description}</Card.Description>
	</Card.Content>
	<Card.Footer class="flex flex-col dk:flex-row items-start dk:items-end justify-between gap-[12px]">
		{#if data.tags?.length > 0}
			<div class="flex flex-wrap items-center justify-start gap-[9px]">
				{#each data.tags as tag}
					<div class="border rounded-l-full rounded-r-full text-[16px] py-[6px] px-[14px] dk:text-[20px] dk:py-[10px] dk:px-[20px] max-w-[280px] overflow-hidden overflow-ellipsis whitespace-nowrap">
						<span class="overflow-ellipsis">{tag}</span>
					</div>
				{/each}
			</div>
		{/if}
		{#if data?.date_updated}
			<div class="text-sm text-foreground/30">Last Updated: {data.date_updated}</div>
		{/if}
	</Card.Footer>
</Card.Root>
