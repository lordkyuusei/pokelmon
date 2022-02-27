<script lang="ts">
	export let show: boolean = false;
	export let size: 'sm' | 'md' | 'lg';
	export let game: boolean = false;
	export let close: () => void;

	const closeGame = () => {
		game = false;
		close();
	};
</script>

<div class="popup size-{size}" class:show class:hide={!show} class:game>
	<div class="popup-close" on:click={closeGame}>❌</div>
	<slot />
</div>

<style>
	.popup {
		left: 0;
		right: 0;
		padding: 0.5rem;
		position: absolute;
		text-align: center;
		font-family: 'Cascadia Code', monospace;
		font-size: 0.8rem;
		justify-content: center;
		justify-items: center;
		margin: 0 auto;
		z-index: 10;
		display: flex;
		border-radius: 25px;
		align-items: center;
		align-content: space-around;
		flex-direction: column;
		color: var(--theme-text);
		box-shadow: var(--theme-shadow);
		background-color: var(--theme-background);
		transition: all 0.3s ease-in;
	}

	.show {
		top: 20vh;
	}

	.hide {
		top: -100vh;
	}

	.game {
		transition: all 0.3s ease-in 1500ms;
	}

	.popup-close {
		position: absolute;
		top: -10px;
		right: -15px;
		color: var(--theme-text);
		background-color: var(--theme-text);
		border-radius: 25px;
		padding: 0.5rem;
		cursor: pointer;
		transition: background 0.2s ease-in;
	}

	.popup-close:hover {
		background-color: var(--theme-background);
	}

	.size-lg,
	.size-md {
		width: 50vw;
		height: 50vh;
	}

	.size-lg {
		height: fit-content;
	}

	.size-md {
		height: 30vh;
	}

	@media screen and (max-width: 768px) {
		.show {
			top: 10vh;
		}

		.size-lg,
		.size-md {
			width: 90vw;
		}

		.size-md {
			height: 45vh;
		}
	}
</style>
