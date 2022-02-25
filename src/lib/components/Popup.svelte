<script lang="ts">
	export let show: boolean = false;
	export let size: 'sm' | 'md' | 'lg';
</script>

<div class="popup size-{size}" class:show>
	<slot />
</div>

<style>
	.popup {
		position: absolute;
		text-align: center;
		font-family: 'Cascadia Code', monospace;
		font-size: 0.8rem;
		top: 20vh;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--theme-cardglass);
		display: none;
		justify-content: center;
		align-items: center;
		z-index: 10;
	}

	.show {
		display: flex;
		flex-direction: column;
		justify-content: center;
		justify-items: center;
	}

	.size-lg {
		height: 40vh;
	}

	.size-md {
		height: 25vh;
	}
</style>
