<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
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

