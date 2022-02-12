<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { t, locale, locales } from '$lib/store/i18n';
	import ThemeContext from '$lib/ThemeContext.svelte';
	import { onMount } from 'svelte';
	import { POKEMON_ICON_URL } from '$lib/constants';

	let showSettings = false;
	let showHelp = false;

	const updateLocale = () => localStorage.setItem('locale', $locale);
	onMount(() => {
		$locale = localStorage.getItem('locale') || 'english';
	});
</script>

<svelte:head>
	<title>Pokelmon</title>
</svelte:head>

<ThemeContext>
	<header>
		<button class="icon" on:click={() => (showSettings = !showSettings)}>⚙️</button>
		<button class="icon" on:click={() => (showHelp = !showHelp)}>❓</button>
	</header>

	<div class="popup" class:shown={showHelp || showSettings}>
		<div class="content">
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
				<button on:click={() => (showSettings = !showSettings)}>Close</button>
			{:else if showHelp}
				<h3>{$t('settings-rules')}</h3>
				<p>{$t('settings-rules-1')}</p>
				<div class="example">
					<div class="row-cell cell-misplaced">
						<img src="{POKEMON_ICON_URL}123.png" alt="123" />
					</div>
					<div class="row-cell cell-correct">
						<img src="{POKEMON_ICON_URL}432.png" alt="432" />
					</div>
					<div class="row-cell cell-wrong">
						<img src="{POKEMON_ICON_URL}541.png" alt="541" />
					</div>
					<div class="row-cell cell-wrong">
						<img src="{POKEMON_ICON_URL}326.png" alt="326" />
					</div>
					<div class="row-cell cell-misplaced">
						<img src="{POKEMON_ICON_URL}623.png" alt="623" />
					</div>
					<div class="row-cell cell-correct">
						<img src="{POKEMON_ICON_URL}264.png" alt="264" />
					</div>
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
				<button on:click={() => (showHelp = !showHelp)}>{$t('settings-close')}</button>
			{/if}
		</div>
	</div>

	<slot />
</ThemeContext>

<style>
	header {
		display: flex;
		justify-content: space-between;
		background-color: var(--theme-alt-background);
	}

	h3 {
		text-align: center;
		font-family: 'Cascadia Code', monospace;
	}

	.popup {
		position: absolute;
		text-align: center;
		font-family: 'Cascadia Code', monospace;
		font-size: 0.8rem;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--theme-cardglass);
		display: none;
		justify-content: center;
		align-items: center;
		z-index: 10;
	}

	.content {
		padding: 0.5rem;
		width: 80%;
		height: 60%;
		color: var(--theme-text);
		background-color: var(--theme-background);
		border: 1px solid var(--theme-border);
		box-shadow: var(--theme-shadow);
		display: flex;
		flex-direction: column;
		align-content: center;
		align-items: center;
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

	.shown {
		display: flex;
		justify-content: center;
		justify-items: center;
	}

	button:not(.icon) {
		width: 50%;
		height: 2rem;
		border-radius: 50px;
		font: inherit;
		margin: 0.2rem;
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
		width: 100%;
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
</style>
