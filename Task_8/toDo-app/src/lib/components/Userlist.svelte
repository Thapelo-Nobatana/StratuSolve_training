<script>
	import UserItem from "./UserItem.svelte";
   
// @ts-nocheck
 let { users, refresh } = $props();

</script>

<ul class="space-y-2 ">
  {#each users as  user}
    <UserItem  user={user} refresh={refresh}  />
  {/each}
</ul>