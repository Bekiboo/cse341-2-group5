<!------------------------------ JS ------------------------------>
<script>
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import LoadingModal from './LoadingModal.svelte'
  // export let name;

  let todos = []
  let json = {}
  $: loading = false

  let inputField
  let newFieldValue = ''

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
        todos = resData.todos
      })
    loading = false
  })

  let deleteTodo = (id) => {
    loading = true
    fetch('http://localhost:3000/todoList/todo/' + id, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status == 200) {
        loading = false
        todos = todos.filter((t) => t._id !== id)
      }
    })
  }

  let createTodo = (e) => {
    e.preventDefault()
    loading = true
    const formData = new FormData(e.target)
    json = Object.fromEntries(formData.entries())
    console.log(json);
    fetch('http://localhost:3000/todoList/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    }).then((res) => {
      if (res.status == 201) {
        loading = true
        fetch('http://localhost:3000/todoList/todos')
          .then((res) => {
            if (res.status !== 200) {
              throw new Error('Failed to fetch todos.')
            }
            return res.json()
          })
          .then((resData) => {
            todos = resData.todos
          })

        inputField.value = ''
        loading = false
      }
    })
  }
</script>

<!----------------------------- HTML ----------------------------->
<main>
  {#if loading}
    <LoadingModal />
  {/if}
  <h1>Family Todos</h1>

  <form on:submit={createTodo}>
    <!-- <label for="task" /> -->
    <input
      id="task"
      name="task"
      type="text"
      placeholder="Add Todo"
      bind:this={inputField}
      bind:value={newFieldValue}
    />
    <button>Submit</button>
  </form>

  {#if todos.length > 0}
    {#each todos as todo (todo._id)}
      <label transition:fly={{ x: 50, duration: 500 }}>
        <input type="checkbox" />
        {todo.task}
        <button on:click={() => deleteTodo(todo._id)}>x</button>
      </label>
    {/each}
  {:else}
    <p>There are currently no task to show</p>
  {/if}
</main>

<!------------------------------ CSS ----------------------------->
<style>
  main {
    text-align: center;
    padding: 1em;
    width: 100%;
    margin: 0 auto;
  }

  /* .popup {
      position: absolute;
      background-color: black;
      width: 100vw;
      height: 100vh;
    } */
</style>
