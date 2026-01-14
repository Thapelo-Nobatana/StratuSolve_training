<script>
// @ts-nocheck
   import Swal from "sweetalert2";
   import { page } from "$app/stores";
  
   import { resetPassword } from "$lib/api/forgotpassword";
	import { goto } from "$app/navigation";

   // input state
 
   let newPassword = $state('');
   let confirm = $state('');
 

    // isLoading State

    let isLoading = $state(false);
    //error state
    let errorState = $state('');



    // Regex
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

   // show password
   let isShow = $state(false);
   let isConfim = $state(false);



   async function handleUpdate() {



     // validate new Password
     if(newPassword === '') {
         return  Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password is required!",
            });
     };
     if(confirm === '') {

          return  Swal.fire({
            icon: "error",
            title: "Oops...",
            text: " Please confirm Password",
            });

     }
     if(!passwordRegex.test(newPassword)) {

            return  Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
            });
     }
     if(newPassword !== confirm ) {

                  return  Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "New Password and Confirm Password don't Match",
            });
     }
     const token = $page.url.searchParams.get("token");

     if(!token) {
       return Swal.fire({
         icon: "error",
         title: "Oops...",
         text: "Invalid password reset token.",
       })
     }
     isLoading = true;
     errorState = '';
     try {

          let success = await resetPassword(token, newPassword)

          if(!success) {
              errorState = "something went wrong. Please try again.";
              return;
          }

        
          newPassword = '';
          confirm = ''
            errorState = ''

            Swal.fire({
                  icon: "success",
                  title: "Success!...",
                  text: "Password updated successfully",
                  });

          goto('/login')

     } catch {

       errorState = "something went wrong. Please try again"

     } finally {
          isLoading = false;
     }


   }
</script>




<div class="max-w-sm mx-auto flex flex-col items-center mt-20 border rounded-lg p-8 gap-4">
    <h1 class="text-xl font-bold">Update Password</h1>

    <div class="w-full flex items-center">
      <input class="w-full p-2 border rounded" type={ isShow ? "text": "password"} placeholder="New Password"  title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."  autocomplete="new-password" bind:value={newPassword} required/>
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
         <p class="text-red-500">{errorState}</p>
   <button class="bg-blue-600 text-white px-4 py-2 w-full  rounded font-medium transition focus:outline-none focus:ring cursor-pointer" onclick={handleUpdate} disabled={isLoading}>
         {#if isLoading}
              <span class="flex items-center justify-center gap-2">
                <span class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Updating...
              </span>
            {:else}
                  Update Password
         {/if}
  
   </button>
</div>





