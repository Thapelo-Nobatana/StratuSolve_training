<script>
	import TodoItem from "./TodoItem.svelte";

// @ts-nocheck
  let { tasks, refresh } = $props();
</script>

<ul class="space-y-2 ">
  {#each tasks as  task}
    <TodoItem  task={task} refresh={refresh}  />
  {/each}
</ul>