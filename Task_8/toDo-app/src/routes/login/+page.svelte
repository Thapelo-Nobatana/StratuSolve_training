<script>
    import { login } from '$lib/stores/auth.svelte.js'
    import { goto } from '$app/navigation'
	import { error } from '@sveltejs/kit';
    // import { onMount } from 'svelte';

    let email = $state("");
    let password = $state("");

    async function submit() {
        if(email === '') return alert("Email is required")
         const success = await  login(email, password);

       `     if(!success) {
               error = "Invalid email or password";
                return
            }`


                goto('/');

    }


</script>

<div class="max-w-sm mx-auto flex flex-col items-center mt-20 border rounded-lg p-8 gap-4">
    <h1 class="text-xl font-bold">Login</h1>

    <input class="w-full p-2 border rounded" type="email" placeholder="Email" bind:value={email} required />
    <input type="password"  class="w-full p-2 border rounded" placeholder="Password" bind:value={password} required/>

     <button
      class="w-full bg-green-600 text-white py-2"
      onclick={submit}
     >Login</button>

</div>

