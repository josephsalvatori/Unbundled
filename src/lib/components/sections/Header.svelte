<script>
import ModeSwitch from "$lib/components/molecules/ModeSwitch.svelte";
import * as Sheet from "$lib/components/ui/sheet/index.js";

let sheetTrigger = $state(false);
</script>

<div class="w-full h-20">
	<div class="bg-background border-b dk:border-0 text-foreground h-20 w-full px-[20px] dk:px-[30px] tb:px-[60px] fixed flex justify-between items-center top-0">
		<ul class="flex">
			<li class="text-[24px] dk:text-[32px] dk:leading-[38px] font-[500]">The Bundle Index</li>
		</ul>
		<!-- <ul class="flex items-center gap-[30px]">
			<li class="text-[20px] dk:text-[32px] dk:leading-[38px] font-[500]">
				<a href="javascript:void(0);" onclick={() => sheetTrigger = !sheetTrigger} class="text-foreground/30">About</a>
			</li>
		</ul> -->
	</div>
</div>

<!-- <Sheet.Root bind:open={sheetTrigger}>
	<Sheet.Content class="w-[90%] max-w-[1400px]!">
		<Sheet.Header>
			<Sheet.Title> &nbsp; </Sheet.Title>
		</Sheet.Header>
		<div class="h-full flex flex-col items-start justify-center gap-[30px] dk:gap-[50px] dk:px-[30px]">
			<div class="text-[32px] leading-[46px] dk:text-[64px] dk:leading-[77px] font-[500]">About Title</div>
			<div class="text-[16px] leading-[20px] dk:text-[20px] dk:leading-[24px] text-[500]">About Copy</div>
		</div>
	</Sheet.Content>
</Sheet.Root> -->