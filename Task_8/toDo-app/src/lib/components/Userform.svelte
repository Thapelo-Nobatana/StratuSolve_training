<script>
	import { fetchUserByEmail } from '$lib/api/tasks';
    import Swal from 'sweetalert2';
// @ts-nocheck

let  { onUserFound } = $props();
 let userEmail = $state("");

// GET
 async function submit() {
  if(userEmail === "") return Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "User email is required!",

});


   try {
     // Search for the user by email
      let res = await fetchUserByEmail(userEmail);

      if(res.error) {
        return Swal.fire({
          icon: "error",
          title: "Not found",
          text: res.error
        });
      }

        await onUserFound(res);
         userEmail = '';

   } catch (err) {
    console.error("Search Failed:", err)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while Searching for the user"
      })
   }

 }
</script>

<div class="flex flex-col justify-center iterms-center gap-2 mb-4">
 <input class="w-full p-3 border rounded " placeholder="Enter user email"   bind:value={userEmail} >
  <button class="w-full  text-white py-2 rounded bg-blue-600  hover:bg-blue-700 focus:ring-blue-300 cursor-pointer" onclick={submit}>
    Search User
  </button>

</div>