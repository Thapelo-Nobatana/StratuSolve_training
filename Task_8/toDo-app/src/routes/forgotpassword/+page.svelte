<script>
// @ts-nocheck

   import { updatePassword } from "$lib/api/forgotpassword";
     
   // input state 
   let email = $state('');
   let newPassword = $state('');
   let confirm = $state('');


    //error state
     
    let errorState = $state('');



    // Regex
    let passwordRegex = /(?=.*?[A-Z]).{4,}$/

   // show password
   let isShow = $state(false);
   let isConfim = $state(false);



   async function handleUpdate() {

      // validate email
    if(email === '') return alert("Email is required");

     // validate new Password
     if(newPassword === '') return alert("Password is required");
     if(confirm === '') return alert("Please confirm Password");
     if(!passwordRegex.test(newPassword)) return alert("password must contain at least 4 characters, including a uppercase letter")
     if(newPassword !== confirm ) return alert("New Password and Confirm Password don't Match")
     
     let success = await updatePassword(email)

     if(!success) {
         errorState = "something went wrong somewhere";
        return;
     }
   }
</script>




<div class="max-w-sm mx-auto flex flex-col items-center mt-20 border rounded-lg p-8 gap-4">
    <h1 class="text-xl font-bold">Update Password</h1>
    
   
    <input class="w-full p-2 border rounded" type="email" placeholder="Email" bind:value={email}  required/>
    <div class="w-full flex items-center">
      <input class="w-full p-2 border rounded" type={ isShow ? "text": "password"} placeholder="New Password"  title="Must contain at least 4 characters, including a uppercase letter"  autocomplete="new-password" bind:value={newPassword} required/>
      <button  class="ml-[-70px] w-half  p-2 cursor-pointer" onclick={() => isShow = !isShow}>
        	{#if isShow}
             <p class="text-black">Hide</p>
		      	{:else}
             <p class="text-black">Show</p>
			   {/if}
      </button>
    </div>
    <div class="w-full flex items-center">
      <input class="w-full p-2 border rounded" type={isConfim ? "text": "password"} placeholder="Confirm Password"  bind:value={confirm} required />
         <button  class="ml-[-70px] w-half  p-2 cursor-pointer" onclick={() => isConfim = !isConfim}>
        	{#if isConfim}
             <p class="text-black">Hide</p>
		      	{:else}
             <p class="text-black">Show</p>
			   {/if}
      </button>
    </div>
    
         <p class="text-blue">{errorState}</p>
   <button class="bg-blue-600 text-white px-4 py-2 w-full  rounded font-medium transition focus:outline-none focus:ring cursor-pointer" onclick={handleUpdate}>

      Upadate Password
   </button>
</div>





