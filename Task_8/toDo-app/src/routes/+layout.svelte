<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import { onMount } from 'svelte';
	import { restoreSessions, user } from '$lib/stores/auth.svelte';
	import { get } from 'svelte/store';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { goto } from '$app/navigation';
	let { children } = $props();

	onMount( async () => {

	    restoreSessions()

	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

 <div class="min-h-screen flex flex-col">

	<NavBar />

	<main class="flex-1">
		{@render children()}
	</main>
	
	<Footer />
 </div>

