<script lang="ts">
	import { onMount } from 'svelte';
	import {
		collection,
		getDocs,
		getFirestore,
		query,
		where,
		documentId,
		doc,
		setDoc
	} from 'firebase/firestore';
	import { initializeApp } from 'firebase/app';

	import Keyboard from '$lib/components/Keyboard.svelte';
	import GuessBoard from '$lib/components/GuessBoard.svelte';

	import { t } from '$lib/store/i18n';
	import { MAX_TRIALS } from '$lib/constants';
	import { game, tries, proposal, isWin, isLost, item } from '$lib/store/game';

	const handlePokemon = (event) => {
		const { pokemon } = event.detail;
		const id = parseInt(pokemon);
		if (!isNaN(id) && $game[$tries - 1].some((item) => item.id === 0)) {
			game.write(id, $tries - 1);
		}
	};

	// $tries - 2 because -1 (it's an index) and -1 (it's already next turn)
	const handleItem = () => {
		const items = {
			potion: () => {
				game.removeLastTry($tries - 2);
				tries.decrement();
				item.wasUsed('potion');
			},
			pokeball: () => {
				game.showClue($tries - 1, $proposal);
				item.wasUsed('pokeball');
			},
			blank: () => {}
		};
		items[$item.name]?.call(this);
	};

	const handleValidate = () => {
		if (!$isWin && !$isLost) {
			if ($game[$tries - 1].findIndex((p) => p.id === 0) === -1) {
				game.verify($tries - 1, $proposal);
				item.rollItem();
				tries.increment();
			}
		}
	};

	const handleBackspace = () => game.backspace($tries - 1);

	const handleAction = (event) => {
		if (!$isWin && !$isLost) {
			const events = {
				backspace: () => handleBackspace(),
				enter: () => handleValidate(),
				item: () => handleItem()
			};
			events[event.detail.action]?.call(this);
		}
	};

	onMount(async () => {
		const {
			VITE_FB_API_KEY,
			VITE_FB_DOMAIN,
			VITE_FB_PROJECT_ID,
			VITE_FB_STORAGE_BUCKET,
			VITE_FB_MESSAGING_SENDER_ID,
			VITE_FB_APP_ID
		} = import.meta.env;

		const fireApp = initializeApp({
			apiKey: VITE_FB_API_KEY,
			authDomain: VITE_FB_DOMAIN,
			projectId: VITE_FB_PROJECT_ID,
			storageBucket: VITE_FB_STORAGE_BUCKET,
			messagingSenderId: VITE_FB_MESSAGING_SENDER_ID,
			appId: VITE_FB_APP_ID
		});

		const date = new Date();
		const dailyId = `chal-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
		const daily_challenge = await getDocs(
			query(collection(getFirestore(fireApp), 'challenges'), where(documentId(), '==', dailyId))
		);

		if (daily_challenge.empty) {
			const challenge = proposal.init();
			await setDoc(doc(getFirestore(fireApp), 'challenges', dailyId), {
				id: dailyId,
				challenge
			});
		} else {
			const { challenge } = daily_challenge.docs[0].data();
			proposal.init(challenge);
		}
	});
</script>

<main>
	<h2>{$t('game-goal', { MAX_TRIALS: MAX_TRIALS })}</h2>

	<GuessBoard on:pokemon={handlePokemon} />
	<Keyboard on:pokemon={handlePokemon} on:action={handleAction} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		align-content: center;
		justify-content: center;
		background-color: var(--theme-alt-background);
	}

	h2 {
		color: var(--theme-text);
		background-color: var(--theme-alt-background);
		text-align: center;
		font-family: 'Cascadia Code', monospace;
	}

	h2 {
		font-size: 1em;
	}
</style>
