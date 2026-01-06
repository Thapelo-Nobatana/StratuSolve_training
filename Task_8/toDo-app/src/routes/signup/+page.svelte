<script>
// @ts-nocheck

    import { signup } from '$lib/stores/auth.svelte.js';

    // user input state
    let username = $state('')
    let email = $state('');
    let password = $state('');
    let confirmPassword = $state('')
    let errorState = $state('')

   // Regex
    let passwordRegex = /(?=.*?[A-Z]).{4,}$/
    let emailRegex = /(?=.*?[#?!@$%^&*-].{1})$/
   
   // show password 
   let isShow = $state(false);
   let isConfim = $state(false);


   // Create Account function 
  async function account() {

        // validate username
        if(username === '') return alert("username ia required");

        // validate email
        if(email === '') return alert("Email is required");
        // if(!emailRegex.test(email)) return alert("Please include an '@' in the email address")
        
        // validate password
        if(password === '') return alert("Password is required");
        if(confirmPassword === '') return alert("Please confirm Password");
        if(!passwordRegex.test(password)) return alert("password must contain at least 4 characters, including a uppercase letter")
        if(password !== confirmPassword ) return alert("Invild Password");

          // Post signup
        const success = await signup(email,username,password);
      
        if(!success){
            errorState = "User Already exists"
            return
        }
 
 }
</script>

<div class="max-w-sm mx-auto flex flex-col items-center mt-20 border rounded-lg p-8 gap-4">
    <h1 class="text-xl font-bold">Signup</h1>
    
    <input class="w-full p-2 border rounded" type="text" placeholder="Username" bind:value={username}  required/>
    <input class="w-full p-2 border rounded" type="email" placeholder="Email" bind:value={email}  required/>
    <div class="w-full flex items-center">
      <input class="w-full p-2 border rounded" type={ isShow ? "text": "password"} placeholder="Password"  title="Must contain at least 4 characters, including a uppercase letter"  autocomplete="new-password" bind:value={password} required/>
      <button  class="ml-[-70px] w-half  p-2 cursor-pointer" onclick={() => isShow = !isShow}>
        	{#if isShow}
             <p class="text-black">Hide</p>
		      	{:else}
             <p class="text-black">Show</p>
			   {/if}
      </button>
    </div>
    <div class="w-full flex items-center">
      <input class="w-full p-2 border rounded" type={isConfim ? "text": "password"} placeholder="Confirm Password"  bind:value={confirmPassword} required />
         <button  class="ml-[-70px] w-half  p-2 cursor-pointer" onclick={() => isConfim = !isConfim}>
        	{#if isConfim}
             <p class="text-black">Hide</p>
		      	{:else}
             <p class="text-black">Show</p>
			   {/if}
      </button>
    </div>
    
         <p class="text-blue">{errorState}</p>
   <button class="bg-blue-600 text-white px-4 py-2 w-full  rounded font-medium transition focus:outline-none focus:ring cursor-pointer" onclick={account}>

    Create Account
   </button>
</div>