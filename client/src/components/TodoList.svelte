<script>
  import { onMount } from 'svelte'
  import { flip } from 'svelte/animate'
  import Todo from './Todo.svelte'
  import AddTodo from './AddTodo.svelte'
  import MembersPanel from './MembersPanel.svelte'
  import { Todos, loggedIn } from '../stores/Writable'

  let logged

  loggedIn.subscribe((bool) => (logged = bool))

  let todos = []

  Todos.subscribe((data) => {
    todos = data
  })

  onMount(() => {
    fetch('http://localhost:3000/todoList/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch todos.')
        }
        return res.json()
      })
      .then((resData) => {
        Todos.update((t) => resData.todos)
      })
      .catch((err) => console.log(err))
  })
</script>

<main class="flex flex-col">
  {#if logged == true}
    <MembersPanel />
    <AddTodo />

    {#if todos.length > 0}
      {#each todos as todo (todo._id)}
        <Todo {todo} />
        <!-- transition:fly={{ x: 50, duration: 100 }} -->
      {/each}
    {:else}
      <p>There are currently no task to show</p>
    {/if}
  {:else}
    <p>You need to be logged in</p>
  {/if}
</main>

<style>
</style>
