<script>
    import { signup } from '$lib/stores/auth.svelte.js';

    let username = $state('')
    let email = $state('');
    let password = $state('');

 function account() {
    if(username === '') return alert("username ia required")
   
    if(email === '') return alert("Email is required")

    signup(email,username,password);
 
 }
</script>

<div class="max-w-sm mx-auto flex flex-col items-center mt-20 border rounded-lg p-8 gap-4">
    <h1 class="text-xl font-bold">Signup</h1>
    
    <input class="w-full p-2 border rounded" type="text" placeholder="Username" bind:value={username}  required/>
    <input class="w-full p-2 border rounded" type="email" placeholder="Email" bind:value={email}  required/>
    <input class="w-full p-2 border rounded" type="password" placeholder="Password"  bind:value={password} required/>

   <button class="w-full bg-blue-600 text-white py-2" onclick={account}>

    Create Account
   </button>
</div>