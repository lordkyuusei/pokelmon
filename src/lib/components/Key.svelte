<script lang="ts">
	import type { UseType } from '$lib/types/Types';
	import { POKEMON_SPRITE_REL_URL } from '$lib/constants';
	import { getCellStatus, tries, item, hasItem } from '$lib/store/game';

	export let id: number = 0;
	export let name: string = '';
	export let use: UseType = 'key';

	$: status = getCellStatus(id, $tries);

	const iconToUse = {
		blank: '🔘',
		potion: '💊',
		pokeball: '🔴'
	};

	$: nameToIcon = {
		enter: '✔️',
		backspace: '🔙',
		item: iconToUse[$item.name]
	};
</script>

<div
	on:click
	title={name}
	class="pokelmon-key state-{status}"
	class:action={use === 'action'}
	class:isItem={use === 'action' && name === 'item'}
	class:hasItem={use === 'action' && name === 'item' && $hasItem}
>
	{#if use === 'key'}
		<img src="{POKEMON_SPRITE_REL_URL}{id}.png" alt={name} title={`${id}`} />
	{:else}
		<span class="action-icon" title={name}>{nameToIcon[name]}</span>
	{/if}
</div>

<style>
	.pokelmon-key {
		display: flex;
		color: var(--theme-text);
		margin: 0.2rem;
		justify-content: center;
		align-items: flex-start;
		width: 5rem;
		height: 4rem;
		border-radius: 10px;
		transition: all 0.2s ease-in-out;
		font-size: 2.5rem;
	}

	.pokelmon-key:hover:not(.isItem),
	.pokelmon-key:hover.isItem.hasItem {
		background-color: var(--theme-cardglass);
		cursor: pointer;
	}

	.isItem:not(.hasItem) {
		opacity: 0.5;
	}

	.state-blank {
		background-color: var(--theme-text);
	}

	.state-misplaced {
		background-color: rgb(255, 174, 0);
	}

	.state-correct {
		background-color: rgb(0, 255, 179);
	}

	.state-wrong {
		background-color: rgb(255, 0, 170);
	}

	img {
		height: 65px;
		image-rendering: auto;
	}

	@media screen and (max-width: 1024px) {
		.pokelmon-key {
			width: 3rem;
			height: 3rem;
			font-size: xx-large;
		}

		img {
			height: 40px;
		}
	}
</style>
