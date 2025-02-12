<script>
import { dev } from "$app/environment";
import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
import CardBundled from "$lib/components/modules/CardBundled.svelte";
import SuperDebug from "sveltekit-superforms";

/** @type {import('./$types').PageProps} */
let { data } = $props();

let { categories, companies } = data;

let search = $state(null);
let selectedCategories = $state([]);

/**
 * This is creating a derived array of categories that are selectable in the filter menu
 */
let selectableCategories = $derived.by(() => {

	return categories.map(category => {

		let companiesInCategory = companies.filter(company => company.categories.includes(category.name));

		// now filter our companies that don't hit on the search term
		if(search) {

			companiesInCategory = companiesInCategory.filter(company => {

				let string = (`${company.name} ${company.description} ${company.tags.join(" ")}`).toLowerCase();

				return (string.indexOf(search.toLowerCase()) > -1) ? true : false;
			});
		}

		return {
			name: category.name,
			value: category.name,
			color: category.bg_color || "#C7F8FF",
			count: companiesInCategory.length
		};
	});
});

/**
 * create a derived store that sorts the companies by category and filters out the ones that don't match the search term
 */
let sortedCategories = $derived.by(() => {

	let filterCategories = categories;

	// if there are selected categories, filter the others out
	if(selectedCategories.length > 0) {
		filterCategories = filterCategories.filter(category => selectedCategories.includes(category.name));
	}

	let array = filterCategories.map(category => {

		let companiesInCategory = companies.filter(company => company.categories.includes(category.name));

		// now filter our companies that don't hit on the search term
		if(search) {

			companiesInCategory = companiesInCategory.filter(company => {

				let string = (`${company.name} ${company.description} ${company.tags.join(" ")}`).toLowerCase();

				return (string.indexOf(search.toLowerCase()) > -1) ? true : false;
			});
		}

		return {
			...category,
			companies: companiesInCategory,
		};
	});

	return array;
});

</script>

<section class="flex flex-col justify-center py-18 min-h-[600px] space-y-9">
	<h1 class="text-[64px] leading-[77px] font-[500]">There are only two ways to make money in business: one is to bundle; the other is unbundle.</h1>
	<p>—Jim Barksdale, Netscape</p>
</section>
<section class="border-b py-[40px]">
	<ToggleGroup.Root bind:value={selectedCategories} type="multiple" variant="text" size="none" class="items-start justify-start flex-wrap gap-y-[20px] gap-x-[30px]">
		{#each selectableCategories as category}
			{#if category.count > 0}
				<ToggleGroup.Item value={category.value} class="group data-[state=on]:[&>div]:bg-[var(--bg-color)]" style="--bg-color:{category.color};">
					<div class="h-[14px] w-[14px] bg-foreground rounded-full"></div>
					<span class="group-hover:underline! underline-offset-4">{category.name} ({category.count})</span>
				</ToggleGroup.Item>
			{/if}
		{/each}
	</ToggleGroup.Root>
	<div>
		<!-- SEARCH -->
	</div>
</section>
{#each sortedCategories as category}
	{#if category.companies.length === 0}
		<!-- <p>No companies in {category.name}</p> -->
	{:else}
		<section class="flex flex-col py-18 border-b last:border-0">
			<div class="space-y-3 pb-[30px]" data-sort={category.sort_key}>
				<h2 class="text-[30px] leading-[36px] font-[500]">{category.name}</h2>
				{#if category.description}
					<p class="text-[30px] leading-[36px] font-[500] text-foreground/30">{category.description}</p>
				{/if}
			</div>
			<div class="grid tb:grid-cols-2 gap-5">
				<div>
					{#each category.companies as company}
						{#if (company.status || "").indexOf("Bundling") > -1}
							<CardBundled category={category} data={company} />
						{/if}
					{/each}
				</div>
				<div>
					{#each category.companies as company}
						{#if (company.status || "").indexOf("Unbundling") > -1}
							<CardBundled category={category} data={company} />
						{/if}
					{/each}
				</div>
			</div>
		</section>
	{/if}
{/each}

{#if dev}
	<div class="text-sm">
		<SuperDebug data={sortedCategories} />
	</div>
{/if}