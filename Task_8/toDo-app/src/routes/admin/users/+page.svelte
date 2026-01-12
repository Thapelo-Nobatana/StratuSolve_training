<script>
// @ts-nocheck


import { fetchAllUsers } from "$lib/api/users";
import { sessionLoading, user } from '$lib/stores/auth.svelte.js';
import { goto } from '$app/navigation'
import {  onMount } from 'svelte';
import { restoreSessions } from '$lib/stores/auth.svelte.js';
import { get } from 'svelte/store';
import Userlist from "$lib/components/Userlist.svelte";
import UserItem from "$lib/components/UserItem.svelte";
import Userform from "$lib/components/Userform.svelte";

      let allUsers = $state([]);

     onMount( async () => {

       await restoreSessions()
       await refreshAllUsers()

      if(!get(user) && !get(sessionLoading)) {
        goto('/login')
      }

     });


    async function refreshAllUsers(){

      allUsers = await fetchAllUsers()

      console.log("all users:", allUsers);
    }

</script>


<div class="bg-gray-100-100 flex mt-5 items-center justify-center">
  <div class="bg-white w-full md:w-1/2 p-6 rounded-xl shadow-xl">
    <h1 class="text-2xl font-bold mb-4 text-center">User List</h1>
    <Userform  update={refreshAllUsers}/>

    <Userlist users={allUsers}  refresh={refreshAllUsers} />
  </div>
</div>
  