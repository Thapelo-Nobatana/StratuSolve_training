<script>
// @ts-nocheck

   import { user, logout } from '$lib/stores/auth.svelte.js';
   import defaultPhoto from '$lib/assets/default.png';

</script>





{#if $user}
   <nav class="bg-orange-300 text-white px-4 py-3 flex justify-between">
     <div class="flex items-center gap-2">
      <a href="/profile">
         <img src={ $user.photo || defaultPhoto} class="w-8 h-8 rounded-full mx-auto" alt="profle" />
      </a>
       <a href="/profile" class="text-black">{$user.username}</a>
     </div>

     <button  onclick={logout}>Logout</button>
   </nav>

   
   {:else}
   <nav class="bg-gray-800 text-white px-4 py-3 flex justify-between">
   <span class="font-bold">TodoApp</span>

   <div class="flex gap-2">
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
   </div>
   </nav>
{/if}
