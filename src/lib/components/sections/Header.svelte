<script>
import ModeSwitch from "$lib/components/molecules/ModeSwitch.svelte";
</script>

<div class="w-full h-20">
	<div class="bg-background text-foreground h-20 w-full px-[30px] tb:px-[60px] fixed flex justify-between items-center top-0">
		<ul class="flex">
			<li class="text-[32px] leading-[38px] font-[500]">The Bundle Index</li>
		</ul>
		<ul class="flex items-center gap-[30px]">
			<!-- <li class="text-[32px] leading-[38px] font-[500]">
				<a href="javascript:void(0);" class="text-foreground/30">About</a>
			</li> -->
			<li><ModeSwitch /></li>
		</ul>
	</div>
</div>