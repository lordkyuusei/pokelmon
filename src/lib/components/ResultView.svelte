<script lang="ts">
	import { browser } from '$app/env';
	import { t } from '$lib/store/i18n';
	import { ITEM_ICON_MAP, POKEMON_ICON_REL_URL } from '$lib/constants';
	import { game, isLost, isWin, proposal, item } from '$lib/store/game';
	import { GUESS_ICON_MAP } from '$lib/constants';

	import Popup from './Popup.svelte';

	let showResult: boolean = false;
	let stats: any = [];
	let clipboardStatus = $t('game-copy');

	$: {
		if ($isWin || $isLost) {
			showResult = true;
			stats = item.showStats().slice(0, -1);
		}
	}

	// write to clipboard
	const writeClipboard = async () => {
		if (browser) {
			clipboardStatus = $t('game-copy-ongoing');
			const totalTries = $game.length;
			const nbrTries = $game.filter((row) =>
				row.every((cell) => !['blank', 'guess'].includes(cell.status))
			).length;
			const header = `${$t('game-clipboard-header')} - ${nbrTries}/${totalTries}`;
			const tries = $game
				.map((row) => row.map((guess) => GUESS_ICON_MAP[guess.status]).join(''))
				.join('\n');
			const items = stats.map((item) => `${ITEM_ICON_MAP[item.name]}✖️${item.uses}`).join('');
			await navigator.clipboard
				.writeText(`${header}\n${tries}\n${items}`)
				.then(() => (clipboardStatus = $t('game-copy-success')))
				.catch(() => (clipboardStatus = $t('game-copy-failure')));
		}
	};
</script>

<Popup show={showResult} game={true} close={() => (showResult = false)} size="lg">
	<div class:victory={$isWin} class:defeat={$isLost}>
		<h1>{$t(`game-${$isWin ? 'won' : 'lost'}`)}</h1>
		<div class="display-tries">
			{#each $game as row}
				<div class="try-square">
					{#each row as guess}
						<span>{GUESS_ICON_MAP[guess.status]}</span>
					{/each}
				</div>
			{/each}
			{#each stats as stat}
				{ITEM_ICON_MAP[stat.name]}: {stat.uses}&nbsp;
			{/each}
		</div>
		<button on:click={writeClipboard}>{clipboardStatus}</button>
		<div class="display-solution">
			{#each $proposal as id}
				<div class="solution-square">
					<img src="{POKEMON_ICON_REL_URL}{id}.png" alt={id} title={id} />
				</div>
			{/each}
		</div>
	</div>
</Popup>
{#if $isWin || $isLost}
	<button on:click={() => (showResult = true)}>{$t('game-result-show')}</button>
{/if}

<style>
	h1 {
		color: var(--theme-text);
	}

	img {
		image-rendering: pixelated;
		height: 100%;
	}

	button {
		margin: 0.5rem;
		border-radius: 25px;
		border-color: var(--theme-secondary);
		background-color: var(--theme-secondary);
		color: var(--theme-background);
		padding: 0.5rem;
		height: fit-content;
		width: fit-content;
	}

	.display-tries {
		background-color: var(--theme-text);
		border-radius: 25px;
		padding: 0.5rem;
		text-align: center;
	}

	.display-solution {
		background-color: var(--theme-text);
		border-radius: 25px;
		margin: 0.5rem;
		height: fit-content;
		width: fit-content;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.try-square {
		font-size: x-large;
	}

	.victory,
	.defeat {
		width: 100%;
		height: 100%;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		align-content: center;
		flex-direction: column;
		justify-content: space-around;
		color: var(--theme-background);
	}

	img {
		height: auto;
		width: 100%;
		image-rendering: pixelated;
	}
</style>
