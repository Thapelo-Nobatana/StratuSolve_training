<script>
	import TodoItem from "./TodoItem.svelte";

// @ts-nocheck

    let { tasks, onToggle, refresh , onDelete } = $props();
   

</script>



<ul class="space-y-2 ">
  {#each tasks as  task}
    <TodoItem  task={task} onToggle={onToggle} refresh={refresh}  onDelete={onDelete}/>
  {/each}
</ul>