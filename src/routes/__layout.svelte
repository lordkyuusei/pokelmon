<script lang="ts">
	import { onMount } from 'svelte';

	import { POKEMON_ICON_URL } from '$lib/constants';
	import { t, locale, locales } from '$lib/store/i18n';

	import Popup from '$lib/components/Popup.svelte';
	import ThemeContext from '$lib/ThemeContext.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import TypesRelationship from '$lib/components/TypesRelationship.svelte';
	import Credits from '$lib/components/Credits.svelte';

	let showHelp = true;
	let showTable = false;
	let showCredit = false;
	let showSettings = false;

	const updateLocale = () => localStorage.setItem('locale', $locale);
	const exampleTeam = [123, 432, 376, 3, 715, 325];

	onMount(() => {
		$locale = localStorage.getItem('locale') || 'english';
	});
</script>

<svelte:head>
	<title>Pokelmon</title>
</svelte:head>

<ThemeContext>
	<header>
		<button class="icon" on:click={() => (showSettings = true)}>⚙️</button>
		<button class="icon" on:click={() => (showTable = true)}>📊</button>
		<h1>Pokélmon</h1>
		<button class="icon" on:click={() => (showHelp = true)}>❓</button>
		<button class="icon" on:click={() => (showCredit = true)}>🐛</button>
	</header>

	<Popup
		show={showHelp || showSettings || showTable || showCredit}
		close={() => {
			showHelp = false;
			showSettings = false;
			showTable = false;
			showCredit = false;
		}}
		size={showHelp ? 'lg' : 'md'}
	>
		<div
			class="show-{showHelp ? 'help' : showSettings ? 'settings' : showTable ? 'table' : 'credit'}"
		>
			{#if showSettings}
				<h3>{$t('settings-lang')}</h3>
				<div class="languages">
					<select bind:value={$locale} on:change={() => updateLocale()}>
						{#each locales as locale}
							<option value={locale}>{locale}</option>
						{/each}
					</select>
				</div>
				<h3>{$t('settings-accessibility')}</h3>
				<div class="accessibility">
					<ThemeToggle />
				</div>
			{:else if showHelp}
				<h3>{$t('settings-rules')}</h3>
				<p>{$t('settings-rules-1')}</p>
				<div class="example">
					{#each exampleTeam as id}
						<div
							class="row-cell"
							class:cell-misplaced={id % 2 === 0}
							class:cell-wrong={id % 5 === 0}
							class:cell-correct={id % 3 === 0}
						>
							<img src={`${POKEMON_ICON_URL}${id}.png`} alt={`${id}`} />
						</div>
					{/each}
				</div>
				<ul>
					<li>
						{$t('settings-rules-correct')}
					</li>
					<li>
						{$t('settings-rules-misplaced')}
					</li>
					<li>
						{$t('settings-rules-wrong')}
					</li>
				</ul>
				<p>{$t('settings-rules-clue1')}</p>
				<p>{$t('settings-rules-clue2')}</p>
				<h3>{$t('settings-items')}</h3>
				<p>{$t('settings-items-desc')}</p>
				<ul>
					<li>
						{$t('settings-items-1')}
					</li>
					<li>
						{$t('settings-items-2')}
					</li>
				</ul>
			{:else if showTable}
				<TypesRelationship />
			{:else if showCredit}
				<Credits />
			{/if}
		</div>
	</Popup>

	<slot />
</ThemeContext>

<style>
	header {
		display: flex;
		justify-content: space-between;
		background-color: var(--theme-alt-background);
	}

	h1,
	h3 {
		text-align: center;
		font-family: 'Cascadia Code', monospace;
	}

	h1 {
		font-size: 2.5em;
		margin: 0.5rem;
		color: var(--theme-text);
		background-color: var(--theme-alt-background);
	}

	ul {
		text-align: initial;
	}

	button {
		cursor: pointer;
	}

	button:hover {
		transform: scale(1.1);
	}

	.show-help,
	.show-settings,
	.show-table,
	.show-credit {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		align-content: center;
		flex-direction: column;
		justify-content: center;
	}

	.languages,
	.accessibility {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	button {
		margin: 0.5rem;
		border-radius: 25px;
		border-color: var(--theme-secondary);
		color: var(--theme-background);
		padding: 0.5rem;
		height: fit-content;
		width: fit-content;
	}

	.example {
		display: flex;
		gap: 0.2rem;
	}

	.row-cell {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 3rem;
		width: 3rem;
		border: 1px solid var(--theme-border);
		border-radius: 10px;
	}

	.row-cell img {
		margin-top: -10px;
	}

	.cell-misplaced {
		background-color: rgb(255, 174, 0);
	}

	.cell-correct {
		background-color: rgb(0, 255, 179);
	}

	.cell-wrong {
		background-color: rgb(255, 0, 170);
	}

	@media screen and (min-width: 768px) {
		header {
			justify-content: center;
			gap: 1rem;
		}
	}
</style>
