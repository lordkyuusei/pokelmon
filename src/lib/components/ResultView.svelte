<script lang="ts">
	import { browser } from '$app/env';
	import { t } from '$lib/store/i18n';
	import { game, isLost, isWin, proposal } from '$lib/store/game';

	import Popup from './Popup.svelte';

	const mapGuessToIcon = {
		blank: '🔳',
		wrong: '🟥',
		correct: '🟩',
		misplaced: '🟧'
	};

	let showResult: boolean = true;
	let clipboardStatus = $t('game-copy');

	// write to clipboard
	const writeClipboard = async () => {
		if (browser) {
			clipboardStatus = $t('game-copy-ongoing');
			const totalTries = $game.length;
			const nbrTries = $game.filter((row) => row.every((cell) => cell.status !== 'blank')).length;
			const header = `${$t('game-clipboard-header')} - ${nbrTries}/${totalTries}`;
			const tries = $game
				.map((row) => row.map((guess) => mapGuessToIcon[guess.status]).join(''))
				.join('\n');
			await navigator.clipboard
				.writeText(header + '\n' + tries)
				.then(() => (clipboardStatus = $t('game-copy-success')))
				.catch(() => (clipboardStatus = $t('game-copy-failure')));
		}
	};
</script>

{#if $isWin || $isLost}
	<Popup show={showResult} close={() => (showResult = false)} size="lg">
		<div class:victory={$isWin} class:defeat={$isLost}>
			<h1>{$t(`game-${$isWin ? 'won' : 'lost'}`)}</h1>
			<div class="display-tries">
				{#each $game as row}
					<div class="try-square">
						{#each row as guess}
							<span>{mapGuessToIcon[guess.status]}</span>
						{/each}
					</div>
				{/each}
			</div>
			<button on:click={writeClipboard}>{clipboardStatus}</button>
			<div class="display-solution">
				{#each $proposal as id}
					<img src="/keyboard/{id}.png" alt={id} title={id} />
				{/each}
			</div>
		</div>
	</Popup>
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
	}

	.display-solution {
		background-color: var(--theme-text);
		border-radius: 25px;
		margin: 0.5rem;
		height: 20%;
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
</style>