<script lang="ts">
	import { types } from '$lib/store/types';
	import type { Type } from '$lib/types/Types';
	import { locale, t } from '$lib/store/i18n';

	let type: Type = types[0];

	$: strengths = types.filter((t) => t.strengths.includes(type.id));
	$: weaknesses = types.filter((t) => t.weaknesses.includes(type.id));

	$: console.log(strengths);
</script>

<div class="types-relationship">
	<select bind:value={type}>
		{#each types as elem}
			<option value={elem}>{elem.type[$locale.slice(0, 2)]}</option>
		{/each}
	</select>
	<div class="relationship-detail">
		<div class="detail-strengths">
			<p>{$t('pokemon-weaknesses')}</p>
			{#each strengths as strength}
				<div class="strength">{strength.type[$locale.slice(0, 2)]}</div>
			{/each}
		</div>
		⏩
		<div class="detail-type">
			<div class="type">{type.type[$locale.slice(0, 2)]}</div>
		</div>
		⏩
		<div class="detail-weaknesses">
			<p>{$t('pokemon-strengths')}</p>
			{#each weaknesses as weakness}
				<div class="weakness">{weakness.type[$locale.slice(0, 2)]}</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.types-relationship {
		display: grid;
		grid-template: 15% 85% / 100%;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
		margin: 0 auto;
		height: 100%;
		width: 100%;
		padding: 0.5rem;
	}

	.types-relationship select {
		width: 100%;
		border-radius: 1.5rem;
		text-indent: 0.5rem;
		height: 100%;
		margin-bottom: 0.5rem;
	}

	.relationship-detail {
		display: grid;
		grid-auto-flow: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: 1.5rem;
		font-size: medium;
	}

	.detail-weaknesses,
	.detail-strengths {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		border: 1px solid var(--theme-text);
		border-radius: 0.5rem;
		line-height: 0.5rem;
	}

	.detail-strengths p {
		color: var(--theme-primary);
	}

	.detail-weaknesses p {
		color: var(--theme-secondary);
	}

	.weakness,
	.strength {
		margin: 0.5rem;
	}

	.detail-type {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		padding: 0.5rem;
		border: 1px solid var(--theme-text);
		border-radius: 0.5rem;
	}
</style>
