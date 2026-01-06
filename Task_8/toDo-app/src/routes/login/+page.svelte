<script>
    import { login } from '$lib/stores/auth.svelte.js'
    import { goto } from '$app/navigation'
	

    let email = $state("");
    let password = $state("");
    let errorState = $state("")

    // show password
   let isShow = $state(false);

    async function submit() {
        if(email === '') return alert("Email is required")
         const success = await  login(email, password);

               if(!success) {

                 errorState = "Invalid email or password";
                return
            }

                goto('/');
         
    }


</script>

<div class="max-w-sm mx-auto flex flex-col items-center mt-20 border rounded-lg p-8 gap-4">
    <h1 class="text-xl font-bold">Login</h1>

    <input class="w-full p-2 border rounded" type="email" placeholder="Email" bind:value={email} required />
    <div class="w-full flex items-center">
          <input type={isShow ? "text" : "password"}  class="w-full p-2 border rounded" placeholder="Password" bind:value={password} required/>
              <button  class="ml-[-70px] w-half  p-2 cursor-pointer" onclick={() => isShow = !isShow}>
        	{#if isShow}
             <p class="text-black">Hide</p>
		      	{:else}
             <p class="text-black">Show</p>
			   {/if}
      </button>
    </div>
  
        <p class="text-red">{errorState}</p>
     <button
      class="bg-blue-600 text-white px-4 py-2 w-full  rounded font-medium transition focus:outline-none focus:ring cursor-pointer"
      onclick={submit}
     >Login</button>
    <a class="text-blue-400" href="/forgotpassword">Forgot Password</a>
</div>

