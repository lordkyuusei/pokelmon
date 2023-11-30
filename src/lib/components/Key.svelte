<script lang="ts">
	import type { UseType } from '$lib/types/Types';
	import { types } from '$lib/store/types';
	import { POKEMON_SPRITE_REL_URL } from '$lib/constants';
	import { getCellStatus, tries, item, hasItem } from '$lib/store/game';
	import { ITEM_ICON_MAP } from '$lib/constants';
	import { locale } from '$lib/store/i18n';

	export let id: number = 0;
	export let name: string = '';
	export let type: number = 1;
	export let use: UseType = 'key';

	$: status = getCellStatus(id, $tries);

	$: nameToIcon = {
		enter: '✔️',
		backspace: '🔙',
		item: ITEM_ICON_MAP[$item.name]
	};

	const getTypeFromTypes = (id: number) => types.find((t) => t.id === id).type[$locale.slice(0, 2)];
</script>

<div
	on:click
	title={name}
	class="pokelmon-key state-{status}"
	class:action={use === 'action'}
	class:isItem={use === 'action' && name === 'item'}
	class:hasItem={use === 'action' && name === 'item' && $hasItem}
	data-type={use === 'key' ? getTypeFromTypes(type) : ''}
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
		transition: all 0.25s ease-in-out;
		font-size: 2.5rem;
	}

	.pokelmon-key:not(.action) {
		display: grid;
		grid-template: 100% / 100%;
		place-items: center;
		position: relative;
	}

	.pokelmon-key:not(.action):hover img {
		filter: blur(1px) opacity(0.25);
	}

	.pokelmon-key:not(.action):hover::before {
		opacity: 1;
	}

	.pokelmon-key:not(.action)::before {
		display: grid;
		place-items: center;
		content: attr(data-type);
		position: absolute;
		height: 50%;
		opacity: 0;
		font-size: large;
		z-index: 2;
		pointer-events: none;
	}

	img {
		height: 100%;
		aspect-ratio: 1;
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
