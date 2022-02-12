<script lang="ts">
	import { POKEMON_SPRITE_URL } from '$lib/constants';

	export let id: number = 0;
	export let name: string = '';
	export let use: 'key' | 'action' = 'key';
	export let state: 'blank' | 'misplaced' | 'correct' | 'wrong' = 'blank';

	const nameToIcon = {
		backspace: '🔙',
		enter: '✔️',
		clear: '➰'
	};

	$: image = `${POKEMON_SPRITE_URL}${id}.png`;
</script>

<div class="pokelmon-key state-{state}" class:action={use === 'action'} title={name} on:click>
	{#if use === 'key'}
		<img src={image} alt={name} title={`${id}`} />
	{:else}
		<span class="action-icon" title={name}>{nameToIcon[name]}</span>
	{/if}
</div>

<style>
	.pokelmon-key {
		display: flex;
		margin: 0.2rem;
		justify-content: center;
		align-items: flex-start;
		width: 5rem;
		height: 4rem;
		border-radius: 10px;
		transition: all 0.2s ease-in-out;
		font-size: 2.5rem;
	}

	.pokelmon-key:hover {
		background-color: var(--theme-cardglass);
		cursor: pointer;
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

	@media screen and (max-width: 600px) {
		.pokelmon-key {
			width: 2rem;
			height: 2rem;
			font-size: medium;
		}

		img {
			height: 25px;
		}
	}
</style>
