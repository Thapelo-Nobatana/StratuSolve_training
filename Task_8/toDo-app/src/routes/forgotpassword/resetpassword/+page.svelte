<script>
// @ts-nocheck
   import Swal from "sweetalert2";
//    import { updatePassword } from "$lib/api/forgotpassword";
    import { sendResetEmail } from "$lib/api/forgotpassword";
    import { goto } from "$app/navigation";

   // input state
   let email = $state('');

   // isLoading 
   let isLoading = $state(false)

    //error state
    let errorState = $state('');

   async function handleSubmit() {

      // validate email
    if(email === '') {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email is required!",
            });
    }

    isLoading = true;
    try {

         let success = await sendResetEmail(email)

         if(!success) {
               errorState = "something went wrong. Please try again.";
            return;
         }

         email = '';


      Swal.fire({
                  icon: "success",
                  title: "Success!...",
                  text: "Email has been Sent, please check your inbox",
                  });

         goto('/login');

    } catch {
         errorState = "something went wrong. Please try again.";
    } finally {
      isLoading = false
    }
   }
</script>




<div class="max-w-sm mx-auto flex flex-col items-center mt-20 border rounded-lg p-8 gap-4">
    <h1 class="text-xl font-bold">Forgot Password</h1>

    <input class="w-full p-2 border rounded" type="email" placeholder="Email" bind:value={email}  required/>


        <p class="text-red-500">{errorState}</p>
   <button class="bg-blue-600 text-white px-4 py-2 w-full  rounded font-medium transition focus:outline-none focus:ring cursor-pointer" onclick={handleSubmit} disabled={isLoading}>
       {#if isLoading }
           Sending...
         {:else}
            Send Email
       {/if}
   </button>
</div>





