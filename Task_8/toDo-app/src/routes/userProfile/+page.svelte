<script>
// @ts-nocheck
    import Button from '$lib/components/Button.svelte';
    import {  user,userValues, updateProfile } from '$lib/stores/auth.svelte.js'
    import defaultPhoto from '$lib/assets/default.png';
    import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

       // user edit
    let isEditing = $state(false);
    let username = $state('');
    let email = $state('')
    let password = $state('');
    let photo = $state(null);
    let completedTasks = $state([]);



     // load Photo on Profile
    function handlePhoto(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {

            photo = reader.result
        };

        reader.readAsDataURL(file)
    }


        // update the Profile 
    async function saveProfile() {

      const res = await updateProfile({
            username,
            email,
            password,
            photo
        });

        const data = await res.json()
    }
</script>
    <div class="flex flex-col items-center gap-2 p-6">
        <div  class="self-start ">
            <div class="cursor-pointer">
            <a href="/" class="cursor-pointer">BACK</a>
            </div>
       </div>
        <div class="flex w-full items-center p-4 gap-1">

                    <div class="bg-white w-full  flex flex-col p-4 items-center rounded shadow-lg max-w-sm max-w-md mx-auto mt-10">
                        <h2 class="text-xl font-bold mb-4">User Profile</h2>

                        {#if !isEditing}
                            <div class="flex flex-col items-center gap-4">
                            <img src={ photo || defaultPhoto} class="w-24 h-24 rounded-full" alt="profile"/>
                            <p class="text-lg font-semibold"> username: {userValues.username}</p>
                            <p class="text-sm text-gray-500">{userValues.email}</p>
                            <button class="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer" onclick={() => isEditing = true}>
                                Edit Profile
                            </button>
                            </div>
                            {:else}
                            <div class="space-y-4">
                                <img src={  photo || defaultPhoto} class="w-24 h-24 rounded-full max-w-sm mx-auto" alt="profile"/>
                                <input type="file"  onchange={handlePhoto}/>
                                <input type="text" placeholder=" Username" class="w-full p-2 border" bind:value={username} />
                                <input type="email"  placeholder="Email" class="w-full p-2 border" bind:value={email}/>
                                <input type="password" placeholder="New Password" class="w-full p-2 border" bind:value={password} />
                                <div class="flex  gap-2">
                                <button class="px-4 py-2 w-full  rounded font-medium transition focus:outline-none focus:ring cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300 cursor-pointer" onClick={saveProfile}>Save</button>
                                <Button variant="secondary" onClick={() => isEditing = false}>Cancel</Button>
                                </div>
                            </div>
                        {/if}
                    </div>
            </div>

    </div>
  