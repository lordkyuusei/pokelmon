<script lang="ts">
	export let show: boolean = false;
	export let size: 'sm' | 'md' | 'lg';
	export let close: () => void;
</script>

<div class="popup size-{size}" class:show>
	<div class="popup-close" on:click={close}>❌</div>
	<slot />
</div>

<style>
	.popup {
		position: absolute;
		top: -100vh;
		left: 0;
		right: 0;
		text-align: center;
		font-family: 'Cascadia Code', monospace;
		font-size: 0.8rem;
		background: var(--theme-cardglass);
		display: flex;
		flex-direction: column;
		justify-content: center;
		justify-items: center;
		align-items: center;
		margin: 0 auto;
		transition: top 0.2s ease-in;
		z-index: 10;
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

	.show {
		top: 20vh;
		transition: top 0.2s ease-out;
	}

	.size-lg,
	.size-md {
		width: 50vw;
		height: 50vh;
	}

	.size-lg {
		height: 60vh;
	}

	.size-md {
		height: 30vh;
	}

	@media screen and (max-width: 768px) {
		.size-lg,
		.size-md {
			width: 90vw;
		}

		.size-lg {
			height: 60vh;
		}

		.size-md {
			height: 25vh;
		}
	}
</style>
