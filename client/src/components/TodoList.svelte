<script>
  import { onMount } from 'svelte'
  import { flip } from 'svelte/animate'
  import LoadingModal from './LoadingModal.svelte'
  import Todo from './Todo.svelte'
  import AddTodo from './AddTodo.svelte'
  import Todos from '../stores/Todos'
  let todos = []

  Todos.subscribe((data) => {
    todos = data
  })
  $: loading = false

  onMount(() => {
    loading = true
    fetch('http://localhost:3000/todoList/todos')
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch todos.')
        }
        return res.json()
      })
      .then((resData) => {
        Todos.update((t) => resData.todos)
      })
    loading = false
  })

  
</script>

<main class="flex flex-col">
  {#if loading}
    <LoadingModal />
  {/if}

  <AddTodo />

  {#if todos.length > 0}
    {#each todos as todo (todo._id)}
      <Todo {todo} />
      <!-- transition:fly={{ x: 50, duration: 100 }} -->
    {/each}
  {:else}
    <p>There are currently no task to show</p>
  {/if}
</main>

<style>
</style>
